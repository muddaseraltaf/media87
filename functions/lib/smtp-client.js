const DEFAULT_TIMEOUT_MS = 12_000;

export async function sendSmtpEmail({
  connect,
  hostname,
  port = 465,
  username,
  password,
  from,
  fromName = "Media87 Website",
  to,
  replyTo,
  replyToName,
  subject,
  text,
  html,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}) {
  if (typeof connect !== "function") throw new Error("SMTP transport is unavailable");

  const socket = connect(
    { hostname, port: Number(port) },
    { secureTransport: "on", allowHalfOpen: true },
  );
  const session = createSession(socket, timeoutMs);

  try {
    await withTimeout(socket.opened, timeoutMs, "SMTP connection");
    await session.expect([220]);
    await session.command(`EHLO ${hostname}`, [250]);
    await session.command("AUTH LOGIN", [334]);
    await session.command(toBase64(username), [334]);
    await session.command(toBase64(password), [235]);
    await session.command(`MAIL FROM:<${from}>`, [250]);
    await session.command(`RCPT TO:<${to}>`, [250, 251]);
    await session.command("DATA", [354]);
    await session.write(`${buildMessage({
      from,
      fromName,
      to,
      replyTo,
      replyToName,
      subject,
      text,
      html,
    })}\r\n.\r\n`);
    await session.expect([250]);
    await session.command("QUIT", [221]);
  } finally {
    await session.close();
  }
}

function createSession(socket, timeoutMs) {
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let pending = "";

  async function readLine() {
    while (!pending.includes("\n")) {
      const result = await withTimeout(reader.read(), timeoutMs, "SMTP response");
      if (result.done) throw new Error("SMTP connection closed unexpectedly");
      pending += decoder.decode(result.value, { stream: true });
    }
    const newline = pending.indexOf("\n");
    const line = pending.slice(0, newline).replace(/\r$/, "");
    pending = pending.slice(newline + 1);
    return line;
  }

  async function expect(expectedCodes) {
    const lines = [];
    while (true) {
      const line = await readLine();
      lines.push(line);
      const match = /^(\d{3})([ -])/.exec(line);
      if (!match || match[2] !== " ") continue;
      const code = Number(match[1]);
      if (!expectedCodes.includes(code)) {
        throw new Error(`SMTP server returned ${code}`);
      }
      return { code, lines };
    }
  }

  async function write(value) {
    await withTimeout(
      writer.write(encoder.encode(value)),
      timeoutMs,
      "SMTP request",
    );
  }

  return {
    expect,
    write,
    async command(value, expectedCodes) {
      await write(`${value}\r\n`);
      return expect(expectedCodes);
    },
    async close() {
      try {
        await reader.cancel();
      } catch {}
      try {
        writer.releaseLock();
      } catch {}
      try {
        await socket.close();
      } catch {}
    },
  };
}

function buildMessage({
  from,
  fromName,
  to,
  replyTo,
  replyToName,
  subject,
  text,
  html,
}) {
  const boundary = `media87-${crypto.randomUUID()}`;
  const headers = [
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@media87.com>`,
    `From: ${formatAddress(fromName, from)}`,
    `To: ${formatAddress("", to)}`,
    `Reply-To: ${formatAddress(replyToName, replyTo)}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  const body = [
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    normalizeLineEndings(text),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    normalizeLineEndings(html),
    `--${boundary}--`,
    "",
  ];
  return dotStuff([...headers, "", ...body].join("\r\n"));
}

function formatAddress(name, email) {
  const safeEmail = String(email || "").replace(/[\r\n<>]/g, "");
  const safeName = String(name || "").replace(/[\r\n"]/g, " ").trim();
  return safeName ? `"${encodeHeader(safeName)}" <${safeEmail}>` : `<${safeEmail}>`;
}

function encodeHeader(value) {
  const safe = String(value || "").replace(/[\r\n]+/g, " ").trim();
  return /^[\x20-\x7E]*$/.test(safe)
    ? safe
    : `=?UTF-8?B?${toBase64(safe)}?=`;
}

function normalizeLineEndings(value) {
  return String(value || "").replace(/\r?\n/g, "\r\n");
}

function dotStuff(value) {
  return value.replace(/(^|\r\n)\./g, "$1..");
}

function toBase64(value) {
  const bytes = new TextEncoder().encode(String(value || ""));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function withTimeout(promise, timeoutMs, label) {
  let timeout;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timeout = setTimeout(
        () => reject(new Error(`${label} timed out`)),
        timeoutMs,
      );
    }),
  ]).finally(() => clearTimeout(timeout));
}
