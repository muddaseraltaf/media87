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
return a friendly “temporarily unavailable” message until the Email Service API
settings and recipient variable exist.

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

### 3. Create a restricted Email Sending API token

1. Open your Cloudflare profile and choose **API Tokens**.
2. Select **Create Custom Token**.
3. Add the permission **Account → Email Sending → Edit**.
4. Restrict the account resource to the Cloudflare account that owns `media87.com`.
5. Create the token and copy it immediately. Cloudflare only displays it once.

Do not place this token in the repository or in browser-side JavaScript. The
Pages Function reads it only on Cloudflare's server.

### 4. Add the production variables and secret

In **Workers & Pages → media87 → Settings → Variables and secrets**, add:

- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID that owns `media87.com`.
- `CLOUDFLARE_EMAIL_API_TOKEN`: the token from step 3. Save this one as an
  encrypted secret.
- `CONTACT_RECIPIENT`: the verified destination mailbox from step 1.
- `CONTACT_FROM`: `website@media87.com`.

The Pages Function calls Cloudflare Email Service directly. None of these values
are sent to the visitor's browser.

### 5. Redeploy and optionally add stronger bot protection

Trigger a new production deployment after saving the settings so the Function
receives them.

The endpoint already supports a `TURNSTILE_SECRET` secret. Do not add it until
a matching Turnstile widget and public site key have been added to the contact
page, because server verification becomes mandatory as soon as this secret
exists.

## Verification

After the variables are saved and the project is redeployed:

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
- https://developers.cloudflare.com/email-service/get-started/send-emails/
- https://developers.cloudflare.com/api/resources/email_sending/methods/send/
- https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
