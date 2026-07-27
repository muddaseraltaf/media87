import Link from "next/link";

type CallToActionProps = {
  title?: string;
  body?: string;
};

export function CallToAction({
  title = "Ready to turn the moving parts into one growth system?",
  body = "Start with the business outcome, the current bottleneck and the evidence already available. Media87 will use that to shape the right next step.",
}: CallToActionProps) {
  return (
    <section className="section section-tight">
      <div className="shell">
        <div className="cta-band" data-reveal>
          <span className="eyebrow eyebrow-dark">Start with the real problem</span>
          <h2>{title}</h2>
          <p>{body}</p>
          <Link className="button button-lime" href="/contact-us/">
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
