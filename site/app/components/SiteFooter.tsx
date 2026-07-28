import Link from "next/link";
import { StaticImage } from "./StaticImage";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/media87hq" },
  { label: "Instagram", href: "https://www.instagram.com/media87hq/" },
  { label: "TikTok", href: "https://www.tiktok.com/@media87hq" },
  { label: "YouTube", href: "https://www.youtube.com/@media87hq" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link
            className="brand brand-inverse brand-logo-surface"
            href="/"
            aria-label="Media87 home"
          >
            <StaticImage
              className="brand-logo brand-logo-footer"
              src="/logo-media87.png"
              alt="Media87"
              width={180}
              height={41}
            />
          </Link>
          <p>
            Search, paid media, content and practical AI automation—connected
            into one measurable growth system.
          </p>
          <p className="location-line">Based in Dubai. Available for international engagements.</p>
          <p>
            <a href="mailto:hello@media87.com">hello@media87.com</a>
            <br />
            <a href="tel:+971503321743">+971 50 332 1743</a>
          </p>
        </div>

        <div>
          <h2>Services</h2>
          <ul>
            <li><Link href="/local-seo-services/">Local SEO</Link></li>
            <li><Link href="/ai-powered-conversations/">AI Conversations</Link></li>
            <li><Link href="/ads-management/">Ads Management</Link></li>
            <li><Link href="/services/ai-automation/">AI Automation</Link></li>
          </ul>
        </div>

        <div>
          <h2>Products & tools</h2>
          <ul>
            <li><Link href="/chatzen/">ChatZen</Link></li>
            <li><Link href="/localzen/">LocalZen</Link></li>
            <li><Link href="/prompts/">Prompt library</Link></li>
            <li><Link href="/geo-tagging-images-for-seo/">Image geo-tagging</Link></li>
          </ul>
        </div>

        <div>
          <h2>Resources</h2>
          <ul>
            <li><Link href="/blog/">Blog</Link></li>
            <li><Link href="/ai-video-creation-service/">AI Video</Link></li>
            <li><Link href="/workshop/">OpenClaw workshop</Link></li>
            <li><Link href="/about-us/">About</Link></li>
            <li><Link href="/contact-us/">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© 2026 Media87. Local architecture preview.</span>
        <div className="footer-policy-links" aria-label="Media87 policies">
          <Link href="/privacy-policy/">Privacy</Link>
          <Link href="/terms-of-services/">Terms</Link>
          <Link href="/editorial-guidelines/">Editorial</Link>
        </div>
        <div className="social-links" aria-label="Media87 social profiles">
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
