import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="shell page-hero-inner">
        <span className="eyebrow">404</span>
        <h1>This page is not part of the architecture.</h1>
        <p>
          The route may have moved, may still be under review or may never have
          passed the page-creation gate.
        </p>
        <div className="hero-actions">
          <Link className="button button-ink" href="/">Return home</Link>
          <Link className="button button-outline" href="/services/">Explore services</Link>
        </div>
      </div>
    </section>
  );
}
