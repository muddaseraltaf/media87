import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "../components/CallToAction";
import { StaticImage } from "../components/StaticImage";
import { currentArticles } from "../lib/current-articles";

export const metadata: Metadata = {
  title: "Digital Marketing Blog",
  description:
    "Media87 guidance across search, paid media, local marketing, practical AI automation and creative production.",
  alternates: { canonical: "/blog/" },
};

const categories = [...new Set(currentArticles.map((article) => article.category))];

export default function BlogPage() {
  return (
    <>
      <section className="page-hero blog-hero">
        <div className="hero-orb hero-orb-lime" />
        <div className="hero-orb hero-orb-violet" />
        <div className="shell page-hero-inner">
          <span className="eyebrow">Media87 blog</span>
          <h1>Practical guidance for better marketing and automation decisions.</h1>
          <p>
            The recovered live library contains {currentArticles.length} current
            articles. Each URL is preserved here while evidence, screenshots,
            internal links and editorial quality receive a page-by-page review.
          </p>
        </div>
      </section>

      <section className="insight-filter">
        <div className="shell topic-pills" aria-label="Article topics">
          <span>All current articles</span>
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </section>

      <section className="section section-tight">
        <div className="shell editorial-disclosure">
          <strong>Migration note</strong>
          <p>
            Nine older local article drafts remain outside this current blog
            index until search, backlink and editorial evidence decides whether
            to restore, consolidate or retire them.
          </p>
          <Link href="/editorial-guidelines/">
            Read the editorial standard <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="shell insight-grid">
          {currentArticles.map((article) => (
            <Link
              className="insight-card"
              href={`/${article.slug}/`}
              key={article.slug}
            >
              <div className="insight-card-image">
                <StaticImage
                  src={article.image}
                  alt=""
                  width={720}
                  height={405}
                  loading="lazy"
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <span>{article.category}</span>
              </div>
              <div className="insight-card-copy">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span className="text-link">
                  Read the guide <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CallToAction
        title="What decision do your customers keep struggling with?"
        body="The strongest article opportunities begin with real sales questions, delivery experience, original examples or useful data—not a keyword list alone."
      />
    </>
  );
}
