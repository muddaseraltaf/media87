# Media87 Contact Forms: Tally

Media87 uses the Tally form `aQXBzB` anywhere the website collects an
enquiry. This keeps delivery independent of Cloudflare Pages Functions and
Hostinger SMTP.

## Form locations

- `/contact-us/` — general Media87 enquiries
- `/localzen/` — LocalZen demo enquiries

Both pages use Tally's standard embed script, transparent background and
dynamic-height mode. The surrounding Media87 card provides the page-specific
heading, explanation and privacy wording.

## Submission delivery

Submissions are stored in the Tally workspace that owns the form. In Tally,
open the form and configure email notifications for `contact@media87.com`.
Test the notification after changing its recipient or rules.

The website also provides `hello@media87.com` as a fallback if the embedded
form is unavailable.

## Cloudflare settings

The Tally embed does not need the former Hostinger SMTP variables or a
Cloudflare Pages Function. These variables can be removed from the Cloudflare
Pages project:

- `HOSTINGER_SMTP_USER`
- `HOSTINGER_SMTP_PASSWORD`
- `CONTACT_RECIPIENT`
- `CONTACT_FROM`

Removing these variables does not change the Hostinger mailbox, DNS records or
normal incoming and outgoing email.

## Editing the form

Edit field labels, required fields, confirmation messages and notification
rules in Tally. Keep the published form ID unchanged unless both website embeds
are updated at the same time.
