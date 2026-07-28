import { onRequestGet, onRequestPost } from "../functions/api/contact.js";
import { sendSmtpEmail } from "../functions/lib/smtp-client.js";

const emailRequests = [];
const originalFetch = globalThis.fetch;
const env = {
  CLOUDFLARE_ACCOUNT_ID: "test-account",
  CLOUDFLARE_EMAIL_API_TOKEN: "test-token",
  CONTACT_RECIPIENT: "verified@example.com",
  CONTACT_FROM: "website@media87.com",
};

globalThis.fetch = async (url, options = {}) => {
  if (String(url).includes("/email/sending/send")) {
    emailRequests.push({
      url: String(url),
      headers: options.headers,
      body: JSON.parse(options.body),
    });
    return Response.json({
      success: true,
      errors: [],
      result: { delivered: ["verified@example.com"] },
    });
  }
  return originalFetch(url, options);
};

const invalid = await submit({
  name: "M",
  email: "not-an-email",
  message: "Too short",
});
assert(invalid.status === 422, "Invalid fields must be rejected");
assert(emailRequests.length === 0, "Invalid fields must not send email");

const honeypot = await submit({
  name: "Automated Sender",
  email: "bot@example.com",
  message: "This looks long enough to pass normal validation.",
  company: "Spam Company",
});
assert(honeypot.status === 200, "Honeypot submission should receive a quiet success");
assert(emailRequests.length === 0, "Honeypot submission must not send email");

const valid = await submit({
  name: "Media87 Test",
  email: "visitor@example.com",
  phone: "+971 50 000 0000",
  message: "I would like help improving our website enquiry journey.",
  page: "https://media87.com/contact-us/",
  form_started_at: String(Date.now() - 5_000),
});
const validPayload = await valid.json();
assert(valid.status === 200 && validPayload.ok, "Valid submission must succeed");
assert(emailRequests.length === 1, "Valid submission must send exactly one email");
assert(
  emailRequests[0].url.includes("/accounts/test-account/email/sending/send"),
  "Email request must use the configured Cloudflare account",
);
assert(
  emailRequests[0].headers.Authorization === "Bearer test-token",
  "Email request must use the configured API token",
);
assert(
  emailRequests[0].body.to === "verified@example.com",
  "Email must use the configured recipient",
);
assert(
  emailRequests[0].body.reply_to.address === "visitor@example.com",
  "Reply-To must use the visitor email",
);
assert(!JSON.stringify(validPayload).includes("visitor@example.com"), "Response must not expose personal data");

const smtpWrites = [];
await sendSmtpEmail({
  connect: createMockSmtpConnect(smtpWrites),
  hostname: "smtp.hostinger.com",
  port: 465,
  username: "contact@media87.com",
  password: "test-password",
  from: "contact@media87.com",
  to: "contact@media87.com",
  replyTo: "visitor@example.com",
  replyToName: "Media87 Test",
  subject: "Media87 website enquiry",
  text: "A plain-text website enquiry.",
  html: "<p>A website enquiry.</p>",
});
const smtpTranscript = smtpWrites.join("");
assert(smtpTranscript.includes("AUTH LOGIN\r\n"), "SMTP delivery must authenticate");
assert(
  smtpTranscript.includes("Reply-To: \"Media87 Test\" <visitor@example.com>"),
  "SMTP delivery must set the visitor as Reply-To",
);
assert(
  smtpTranscript.includes("From: \"Media87 Website\" <contact@media87.com>"),
  "SMTP delivery must use the Hostinger mailbox as sender",
);

const wrongOrigin = await submit(
  {
    name: "Media87 Test",
    email: "visitor@example.com",
    message: "This message should not pass the origin validation.",
  },
  "https://example.net",
);
assert(wrongOrigin.status === 403, "Cross-site submissions must be rejected");

const getResponse = onRequestGet();
assert(getResponse.status === 405, "GET must not submit the form");

console.log(
  JSON.stringify(
    {
      status: "passed",
      tests: 6,
      emailsSent: emailRequests.length,
      smtpSimulations: 1,
    },
    null,
    2,
  ),
);

globalThis.fetch = originalFetch;

async function submit(fields, origin = "https://media87.com") {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  const request = new Request("https://media87.com/api/contact", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Origin: origin,
    },
    body: data,
  });
  return onRequestPost({ request, env });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function createMockSmtpConnect(writes) {
  const responses = [
    "220 smtp.hostinger.com ESMTP ready\r\n",
    "250-smtp.hostinger.com\r\n250 AUTH LOGIN\r\n",
    "334 VXNlcm5hbWU6\r\n",
    "334 UGFzc3dvcmQ6\r\n",
    "235 2.7.0 Authentication successful\r\n",
    "250 2.1.0 Sender accepted\r\n",
    "250 2.1.5 Recipient accepted\r\n",
    "354 End data with <CR><LF>.<CR><LF>\r\n",
    "250 2.0.0 Message accepted\r\n",
    "221 2.0.0 Bye\r\n",
  ].join("");
  const encodedResponses = new TextEncoder().encode(responses);

  return (address, options) => {
    assert(address.hostname === "smtp.hostinger.com", "SMTP must use Hostinger");
    assert(address.port === 465, "SMTP must use Hostinger SSL port 465");
    assert(options.secureTransport === "on", "SMTP must use TLS");
    return {
      opened: Promise.resolve({ remoteAddress: "203.0.113.10" }),
      readable: new ReadableStream({
        start(controller) {
          controller.enqueue(encodedResponses);
        },
      }),
      writable: new WritableStream({
        write(chunk) {
          writes.push(new TextDecoder().decode(chunk));
        },
      }),
      async close() {},
    };
  };
}
