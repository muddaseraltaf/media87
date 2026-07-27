import type { Metadata } from "next";
import Link from "next/link";
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
          <form
            className="contact-form"
            action="mailto:hello@media87.com"
            method="post"
            encType="text/plain"
          >
            <div className="form-heading">
              <span>Project brief</span>
              <strong>A few useful details</strong>
              <p>
                Submitting opens your email application with the brief addressed
                to Media87. A hosted form endpoint will replace this before
                production launch.
              </p>
            </div>

            <div className="field-row">
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>

            <label>
              <span>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>

            <label>
              <span>What would you like to improve?</span>
              <textarea name="message" rows={6} required />
            </label>

            <button className="button button-lime" type="submit">
              Prepare the email <span aria-hidden="true">→</span>
            </button>
          </form>

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
    </>
  );
}
