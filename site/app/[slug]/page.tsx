import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction } from "../components/CallToAction";
import { RecoveredPage } from "../components/RecoveredPage";
import { StaticImage } from "../components/StaticImage";
import {
  getLiveArticle,
  liveArticles,
  type LiveArticle,
} from "../lib/live-content.generated";
import {
  getRecoveredRootPage,
  recoveredRootPages,
} from "../lib/recovered-pages";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...recoveredRootPages.map((page) => ({ slug: page.slug })),
    ...liveArticles.map((article) => ({ slug: article.slug })),
  ];
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recoveredPage = getRecoveredRootPage(slug);

  if (recoveredPage) {
    return {
      title: recoveredPage.title,
      description: recoveredPage.description,
      alternates: {
        canonical: recoveredPage.canonicalPath ?? `/${recoveredPage.slug}/`,
      },
      robots: recoveredPage.noindex
        ? { index: false, follow: true }
        : undefined,
      openGraph: {
        title: recoveredPage.title,
        description: recoveredPage.description,
        images: recoveredPage.image
          ? [{ url: recoveredPage.image.src }]
          : undefined,
      },
    };
  }

  const article = getLiveArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

function ReadingOutline({ article }: { article: LiveArticle }) {
  if (!article.headings.length) {
    return null;
  }

  return (
    <aside className="article-outline">
      <span>Inside this guide</span>
      <ol>
        {article.headings.slice(0, 8).map((heading) => (
          <li key={heading}>{heading}</li>
        ))}
      </ol>
    </aside>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const recoveredPage = getRecoveredRootPage(slug);

  if (recoveredPage) {
    return <RecoveredPage page={recoveredPage} />;
  }

  const article = getLiveArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <header className="article-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog/">Blog</Link>
            <span aria-hidden="true">/</span>
            <span>{article.category}</span>
          </nav>

          <div className="article-title-grid">
            <div>
              <span className="eyebrow">{article.category}</span>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <div className="article-meta">
                <span>Media87 editorial</span>
                <span>Live URL preserved</span>
                <span>Editorial migration draft</span>
              </div>
            </div>
            <ReadingOutline article={article} />
          </div>

          <figure className="article-hero-image">
            <StaticImage
              src={article.image}
              alt={`Conceptual illustration for ${article.title}`}
              width={1600}
              height={900}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1200px) 100vw, 1180px"
            />
            <figcaption>
              Conceptual Media87 visual. The page text was migrated from the
              existing live URL and remains in editorial review.
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="section article-section">
        <div className="shell article-layout">
          <div className="article-rail">
            <span>Migration status</span>
            <strong>Content preserved</strong>
            <p>
              Structure, sources, screenshots and internal links still require a
              page-by-page editorial pass before launch.
            </p>
            <Link className="text-link" href="/blog/">
              All articles <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="article-body">
            {article.paragraphs.map((paragraph, index) => {
              const looksLikeHeading =
                paragraph.length < 76 &&
                !/[.!?]$/.test(paragraph) &&
                index > 1;

              if (looksLikeHeading) {
                return <h2 key={`${paragraph}-${index}`}>{paragraph}</h2>;
              }

              return <p key={`${paragraph.slice(0, 36)}-${index}`}>{paragraph}</p>;
            })}
          </div>
        </div>
      </section>

      <CallToAction
        title="Need help applying this to your business?"
        body="Bring the current situation, target outcome and constraints. Media87 will help identify the smallest useful next step."
      />
    </article>
  );
}
