import Link from "next/link";
import { primaryNavigation } from "../lib/site-data";
import { StaticImage } from "./StaticImage";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand brand-logo-link" href="/" aria-label="Media87 home">
          <StaticImage
            className="brand-logo"
            src="/logo-media87.png"
            alt="Media87"
            width={168}
            height={38}
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-lime header-cta" href="/contact-us/">
          Start a conversation
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact-us/">Contact</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
