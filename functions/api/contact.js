const MAX_BODY_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost(context) {
  const { request, env } = context;
  const requestUrl = new URL(request.url);
  const wantsJson = request.headers.get("accept")?.includes("application/json");

  if (!isSameSiteRequest(request, requestUrl)) {
    return respond({ ok: false, message: "This submission could not be verified." }, 403, wantsJson, requestUrl);
  }

  const bodySize = Number(request.headers.get("content-length") || 0);
  if (bodySize > MAX_BODY_BYTES) {
    return respond({ ok: false, message: "The message is too large." }, 413, wantsJson, requestUrl);
  }

  let payload;
  try {
    payload = await readPayload(request);
  } catch {
    return respond({ ok: false, message: "The form could not be read." }, 400, wantsJson, requestUrl);
  }

  // Quietly accept honeypot submissions so automated senders do not learn how
  // the filter works.
  if (clean(payload.company, 200)) {
    return respond({ ok: true, message: "Thank you. Your enquiry has been sent." }, 200, wantsJson, requestUrl);
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const phone = clean(payload.phone, 80);
  const businessName = clean(payload.business_name, 160);
  const message = clean(payload.message, 4_000);
  const page = clean(payload.page, 500);

  const validationMessage = validateFields({ name, email, phone, message });
  if (validationMessage) {
    return respond({ ok: false, message: validationMessage }, 422, wantsJson, requestUrl);
  }

  const startedAt = Number(payload.form_started_at || 0);
  if (startedAt && Date.now() - startedAt < 1_200) {
    return respond({ ok: false, message: "Please review the form and try again." }, 429, wantsJson, requestUrl);
  }

  if (env.TURNSTILE_SECRET) {
    const token = clean(
      payload["cf-turnstile-response"] || payload.turnstileToken,
      2_048,
    );
    const turnstile = await verifyTurnstile(
      token,
      env.TURNSTILE_SECRET,
      request.headers.get("CF-Connecting-IP"),
    );
    if (!turnstile.success) {
      return respond(
        { ok: false, message: "Please complete the security check and try again." },
        403,
        wantsJson,
        requestUrl,
      );
    }
  }

  const hasHostingerSmtp =
    Boolean(env.HOSTINGER_SMTP_USER) &&
    Boolean(env.HOSTINGER_SMTP_PASSWORD);
  const hasCloudflareEmail =
    Boolean(env.CLOUDFLARE_ACCOUNT_ID) &&
    Boolean(env.CLOUDFLARE_EMAIL_API_TOKEN);

  if (!hasHostingerSmtp && !hasCloudflareEmail) {
    console.error("Media87 contact form is missing email delivery configuration");
    return respond(
      {
        ok: false,
        message: "Email delivery is temporarily unavailable. Please email hello@media87.com.",
      },
      503,
      wantsJson,
      requestUrl,
    );
  }

  const recipient = clean(
    env.CONTACT_RECIPIENT || env.HOSTINGER_SMTP_USER,
    254,
  );
  const sender = clean(
    hasHostingerSmtp
      ? env.HOSTINGER_SMTP_USER
      : env.CONTACT_FROM || "website@media87.com",
    254,
  );
  if (!EMAIL_PATTERN.test(recipient) || !EMAIL_PATTERN.test(sender)) {
    console.error("Media87 contact form has invalid sender or recipient configuration");
    return respond(
      {
        ok: false,
        message: "Email delivery is temporarily unavailable. Please email hello@media87.com.",
      },
      503,
      wantsJson,
      requestUrl,
    );
  }
  const subject = `Media87 website enquiry — ${name}`;
  const text = [
    "New Media87 website enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Business: ${businessName || "Not provided"}`,
    `Page: ${page || requestUrl.origin + "/contact-us/"}`,
    "",
    "What they would like to improve:",
    message,
  ].join("\n");
  const html = `
    <h1>New Media87 website enquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
    <p><strong>Business:</strong> ${escapeHtml(businessName || "Not provided")}</p>
    <p><strong>Page:</strong> ${escapeHtml(page || requestUrl.origin + "/contact-us/")}</p>
    <h2>What they would like to improve</h2>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  try {
    if (hasHostingerSmtp) {
      const { sendHostingerEmail } = await import("../lib/hostinger-smtp.js");
      await sendHostingerEmail({
        username: env.HOSTINGER_SMTP_USER,
        password: env.HOSTINGER_SMTP_PASSWORD,
        from: sender,
        to: recipient,
        replyTo: email,
        replyToName: name,
        subject,
        text,
        html,
      });
    } else {
      const emailResponse = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(env.CLOUDFLARE_ACCOUNT_ID)}/email/sending/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: recipient,
            from: { address: sender, name: "Media87 Website" },
            reply_to: { address: email, name },
            subject,
            text,
            html,
          }),
        },
      );
      const emailResult = await emailResponse.json().catch(() => ({}));
      if (!emailResponse.ok || !emailResult.success) {
        const code = emailResult.errors?.[0]?.code || emailResponse.status;
        throw new Error(`Cloudflare Email Service error ${code}`);
      }
    }
  } catch (error) {
    console.error("Media87 contact email delivery failed", error?.code || error?.name || "unknown");
    return respond(
      {
        ok: false,
        message: "We could not send the enquiry. Please email hello@media87.com.",
      },
      502,
      wantsJson,
      requestUrl,
    );
  }

  return respond(
    { ok: true, message: "Thank you. Your enquiry has been sent to Media87." },
    200,
    wantsJson,
    requestUrl,
  );
}

export function onRequestGet() {
  return new Response("Method not allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
}

function isSameSiteRequest(request, requestUrl) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).hostname === requestUrl.hostname;
  } catch {
    return false;
  }
}

async function readPayload(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await request.json();
  }
  const data = await request.formData();
  return Object.fromEntries(data.entries());
}

function validateFields({ name, email, phone, message }) {
  if (name.length < 2) return "Please enter your name.";
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";
  if (phone.length > 80) return "Please enter a valid phone number.";
  if (message.length < 20) return "Please add a little more detail to your message.";
  return "";
}

async function verifyTurnstile(token, secret, remoteip) {
  if (!token) return { success: false };
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteip) body.set("remoteip", remoteip);
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    return await response.json();
  } catch {
    return { success: false };
  }
}

function clean(value, limit) {
  return String(value || "").replace(/\0/g, "").trim().slice(0, limit);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function respond(payload, status, wantsJson, requestUrl) {
  if (!wantsJson) {
    if (payload.ok) {
      const target = new URL("/contact-us/?sent=1#contact-form", requestUrl);
      return Response.redirect(target, 303);
    }
    const backUrl = new URL("/contact-us/#contact-form", requestUrl).href;
    return new Response(
      `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Media87 enquiry</title><body><main><h1>We could not send the enquiry</h1><p>${escapeHtml(payload.message)}</p><p><a href="${escapeHtml(backUrl)}">Return to the contact form</a> or email <a href="mailto:hello@media87.com">hello@media87.com</a>.</p></main></body></html>`,
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/html; charset=utf-8",
          "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  }
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
