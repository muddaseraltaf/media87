import type { Metadata } from "next";
import { DetailPage } from "../components/DetailPage";
import {
  VideoPortfolio,
  type PortfolioVideo,
} from "../components/VideoPortfolio";
import { getServiceDetail } from "../lib/service-details";
import { aiVideoService } from "../lib/site-data";

export const metadata: Metadata = {
  title: "AI Video Creation Service",
  description: aiVideoService.summary,
  alternates: { canonical: "/ai-video-creation-service/" },
};

const portfolioVideos: PortfolioVideo[] = [
  { id: "oUkmajfjjWw", title: "AI television advert concept", format: "short" },
  { id: "JrQtqVrLDmc", title: "AI clothing mock-up", format: "short" },
  { id: "XtKawsPWaqE", title: "Motivational short-form story", format: "short" },
  { id: "VExavVNg1s4", title: "AI narrative concept", format: "short" },
  { id: "8-OWObRmbYQ", title: "Street interview concept", format: "short" },
  { id: "Y8qq0MIVGRA", title: "Media87 AI content promo", format: "short" },
  { id: "k9WLLAxQScQ", title: "Reputation management explainer", format: "long" },
  { id: "xOpdC7gRCfM", title: "What Media87 does", format: "long" },
  { id: "JNEkWmQaJms", title: "Meta advertising education", format: "long" },
  { id: "CCZ0S2T3KZs", title: "Skills and educational content", format: "long" },
];

export default function AiVideoCreationPage() {
  return (
    <DetailPage
      record={aiVideoService}
      parentLabel="Services"
      parentHref="/services/"
      detail={getServiceDetail(aiVideoService.slug)}
    >
      <section className="section ai-video-portfolio-section">
        <div className="shell split-heading">
          <div>
            <span className="eyebrow">Original Media87 portfolio</span>
            <h2>See the formats already explored.</h2>
          </div>
          <p>
            These are selected videos embedded on the original service page.
            They are presented as production examples—not as evidence of client
            results.
          </p>
        </div>
        <div className="shell">
          <VideoPortfolio videos={portfolioVideos} />
        </div>
      </section>
    </DetailPage>
  );
}
