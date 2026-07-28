import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { consultationUrl } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Contact Media87",
  description:
    "Talk to Media87 about local SEO, digital marketing, content creation, paid media or practical AI automation.",
  alternates: { canonical: "/contact-us/" },
};

const contactOptions = [
  {
    label: "Email",
    value: "hello@media87.com",
    href: "mailto:hello@media87.com",
  },
  {
    label: "Call",
    value: "+971 50 332 1743",
    href: "tel:+971503321743",
  },
  {
    label: "Consultation chat",
    value: "Open the guided brief",
    href: consultationUrl,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="contact-stage">
        <div className="shell contact-heading">
          <span className="eyebrow">Contact Media87</span>
          <h1>Tell us where growth is getting stuck.</h1>
          <p>
            Start with the outcome, the current situation and the handoff causing
            the most friction. Media87 can then recommend the smallest useful
            next step.
          </p>
        </div>

        <div className="shell contact-grid">
          <div className="contact-form tally-form-card">
            <div className="form-heading">
              <span>Project brief</span>
              <strong>A few useful details</strong>
              <p>
                Share your contact details and what you would like to improve.
                Media87 will review the enquiry and recommend a practical next
                step.
              </p>
            </div>

            <div className="tally-embed-wrap">
              <iframe
                className="tally-embed"
                data-tally-src="https://tally.so/embed/aQXBzB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                src="https://tally.so/embed/aQXBzB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="eager"
                width="100%"
                height="620"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact Media87"
              />
            </div>

            <p className="form-privacy tally-privacy">
              This form is provided by Tally. Your details are used to respond
              to your enquiry. See the{" "}
              <Link href="/privacy-policy/">privacy policy</Link>.
            </p>
            <noscript>
              <p className="form-noscript">
                Open the{" "}
                <a href="https://tally.so/r/aQXBzB">
                  Media87 contact form
                </a>
                , or email{" "}
                <a href="mailto:hello@media87.com">hello@media87.com</a>.
              </p>
            </noscript>
          </div>

          <aside className="contact-aside">
            <span className="contact-orbit" aria-hidden="true">
              Dubai ↗ world
            </span>
            <div>
              <span className="scope-label">Direct contact</span>
              <h2>Choose the easiest route.</h2>
              <div className="contact-options">
                {contactOptions.map((option) => (
                  <a
                    href={option.href}
                    key={option.label}
                    rel={option.href.startsWith("http") ? "noreferrer" : undefined}
                    target={option.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span>{option.label}</span>
                    <strong>{option.value}</strong>
                    <small aria-hidden="true">↗</small>
                  </a>
                ))}
              </div>
              <p className="location-context">
                <span aria-hidden="true">●</span> Based in Dubai. International
                enquiries are welcome.
              </p>
              <Link className="text-link" href="/services/">
                Explore services first <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
    </>
  );
}
