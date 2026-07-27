# Media87 Contact Form: Cloudflare Setup

Updated: 27 July 2026

## Selected approach

The site uses a Cloudflare Pages Function at `/api/contact` and Cloudflare Email
Service. This keeps the existing Media87 design, validates submissions on the
server and avoids sending enquiry data through a separate form-dashboard
provider.

Cloudflare currently allows Pages Functions on the Workers Free plan and allows
email to verified destination addresses free of charge. The form also includes:

- required browser and server validation;
- strict field and request-size limits;
- a hidden honeypot;
- same-site submission checks;
- a visible sending, success and error state;
- a direct-email fallback;
- an analytics success event containing no personal data;
- optional server-side Turnstile verification when it is configured.

## One-time Cloudflare configuration

The code can be deployed before these settings are added, but the endpoint will
return a friendly “temporarily unavailable” message until both the email binding
and recipient variable exist.

### 1. Verify the receiving inbox

1. In Cloudflare, open **Compute → Email Service → Email Routing**.
2. Open **Destination addresses**.
3. Add the real mailbox that should receive Media87 leads.
4. Open Cloudflare’s verification email in that mailbox and approve it.

Use the actual destination mailbox here. It can be different from the public
`hello@media87.com` alias.

### 2. Onboard the sending domain

1. Open **Compute → Email Service → Email Sending**.
2. Select **Onboard Domain**.
3. Choose `media87.com`.
4. Approve the DNS records Cloudflare proposes for the sending domain.

The form sends from `website@media87.com` by default and uses the visitor’s
address only as `Reply-To`.

### 3. Add the Pages email binding

1. Open **Workers & Pages → media87 → Settings → Bindings**.
2. Add an **Email sending** binding.
3. Set the variable name to `EMAIL`.
4. Restrict the destination to the verified mailbox from step 1.
5. Save it for **Production**.

### 4. Add the production variables

In **Workers & Pages → media87 → Settings → Variables and secrets**, add:

- `CONTACT_RECIPIENT`: the verified destination mailbox from step 1.
- `CONTACT_FROM`: `website@media87.com`.

Neither value is a password. The email binding itself controls delivery.

### 5. Optional stronger bot protection

The endpoint already supports a `TURNSTILE_SECRET` secret. Do not add it until
a matching Turnstile widget and public site key have been added to the contact
page, because server verification becomes mandatory as soon as this secret
exists.

## Verification

After the binding and variables are saved:

1. Submit one enquiry from the deployed contact page.
2. Confirm the page shows the success message.
3. Confirm the email arrives in the verified mailbox.
4. Reply to the message and confirm the reply is addressed to the visitor.
5. Check Cloudflare Email Service activity logs if delivery is delayed.

## Considered hosted alternatives

- **Formspree:** mature and easy to embed, with server-side validation and spam
  filtering; its free tier starts at 50 submissions per month and stores free
  plan submissions for 30 days.
- **Formspark:** 250 free submissions total, not a renewable monthly allowance.
- **Basin:** capable form backend with spam filtering, but adds another processor
  and account dashboard.

These remain practical fallbacks if Cloudflare Email Service is not available
for the account.

## Official references

- https://developers.cloudflare.com/pages/functions/
- https://developers.cloudflare.com/pages/functions/pricing/
- https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
- https://developers.cloudflare.com/email-service/configuration/send-bindings/
- https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
