# Media87 Contact Form: Hostinger SMTP on Cloudflare

Updated: 28 July 2026

## Selected approach

The site uses a Cloudflare Pages Function at `/api/contact` and sends enquiries
through the dedicated Hostinger mailbox `contact@media87.com`. The SMTP password
is stored as an encrypted Cloudflare production secret and is never included in
the browser, generated site or Git repository.

This setup does not require Cloudflare Email Routing. Keep the existing
Hostinger MX, SPF, DKIM and other mail records unchanged so normal Hostinger
email continues working. The form includes:

- required browser and server validation;
- strict field and request-size limits;
- a hidden honeypot;
- same-site submission checks;
- a visible sending, success and error state;
- a direct-email fallback;
- an analytics success event containing no personal data;
- optional server-side Turnstile verification when it is configured.

## One-time configuration

The code can be deployed before these settings are added, but the endpoint will
return a friendly “temporarily unavailable” message until the Hostinger SMTP
username and password exist.

### 1. Confirm the mailbox

Sign in to Hostinger webmail with `contact@media87.com` and confirm that the new
mailbox can both send and receive a normal test email.

### 2. Add the production variable and secret

In **Workers & Pages → media87 → Settings → Variables and secrets**, add:

- `HOSTINGER_SMTP_USER`: `contact@media87.com` — save as a normal variable.
- `HOSTINGER_SMTP_PASSWORD`: the password for that dedicated mailbox — save as
  an encrypted secret.

`CONTACT_RECIPIENT` is optional. When it is absent, enquiries are delivered to
the same address as `HOSTINGER_SMTP_USER`. Add it only if leads should go to a
different mailbox.

Do not send the password in chat, commit it to GitHub or add it to any HTML or
browser-side JavaScript.

### 3. Redeploy and optionally add stronger bot protection

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
3. Confirm the email arrives at `contact@media87.com`.
4. Reply to the message and confirm the reply is addressed to the visitor.
5. Check the Pages Function logs if delivery is delayed.

## Delivery details

- SMTP host: `smtp.hostinger.com`
- SMTP port: `587`
- Transport: STARTTLS
- Authenticated sender: `contact@media87.com`
- Reply-To: the validated visitor email
- Recipient: `CONTACT_RECIPIENT` or `contact@media87.com`

Cloudflare blocks outbound SMTP on port 25, but its Workers TCP sockets support
TLS connections on other ports. Hostinger documents port 587 with STARTTLS as
the fallback when the primary port 465 connection has encryption or connection
problems. Production testing from Cloudflare showed that fallback was required.

## Existing fallback

The Function retains support for Cloudflare Email Sending if
`CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_EMAIL_API_TOKEN` already exist. Hostinger
SMTP takes precedence as soon as both Hostinger settings are present.

## Official references

- https://developers.cloudflare.com/pages/functions/
- https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
- https://www.hostinger.com/support/1575756-how-to-get-email-account-configuration-details-for-hostinger-email/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
