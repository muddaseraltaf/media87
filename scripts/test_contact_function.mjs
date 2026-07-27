import { onRequestGet, onRequestPost } from "../functions/api/contact.js";

const sent = [];
const env = {
  CONTACT_RECIPIENT: "verified@example.com",
  CONTACT_FROM: "website@media87.com",
  EMAIL: {
    async send(message) {
      sent.push(message);
      return { messageId: "test-message" };
    },
  },
};

const invalid = await submit({
  name: "M",
  email: "not-an-email",
  message: "Too short",
});
assert(invalid.status === 422, "Invalid fields must be rejected");
assert(sent.length === 0, "Invalid fields must not send email");

const honeypot = await submit({
  name: "Automated Sender",
  email: "bot@example.com",
  message: "This looks long enough to pass normal validation.",
  company: "Spam Company",
});
assert(honeypot.status === 200, "Honeypot submission should receive a quiet success");
assert(sent.length === 0, "Honeypot submission must not send email");

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
assert(sent.length === 1, "Valid submission must send exactly one email");
assert(sent[0].to === "verified@example.com", "Email must use the configured recipient");
assert(sent[0].replyTo.email === "visitor@example.com", "Reply-To must use the visitor email");
assert(!JSON.stringify(validPayload).includes("visitor@example.com"), "Response must not expose personal data");

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
      tests: 5,
      emailsSent: sent.length,
    },
    null,
    2,
  ),
);

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
