"use client";

import { useState } from "react";

export type PortfolioVideo = {
  id: string;
  title: string;
  format: "short" | "long";
};

function LiteVideo({
  video,
  active,
  onPlay,
}: {
  video: PortfolioVideo;
  active: boolean;
  onPlay: () => void;
}) {
  if (active) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="lite-video-poster"
      onClick={onPlay}
      aria-label={`Play ${video.title}`}
    >
      {/* The thumbnail is substantially lighter than loading a YouTube player. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        width="480"
        height="360"
      />
      <span className="lite-video-play" aria-hidden="true">▶</span>
      <span className="lite-video-label">Play original</span>
    </button>
  );
}

export function VideoPortfolio({ videos }: { videos: PortfolioVideo[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const shortVideos = videos.filter((video) => video.format === "short");
  const longVideos = videos.filter((video) => video.format === "long");

  return (
    <div className="video-portfolio">
      <div className="video-portfolio-group">
        <div className="video-group-heading">
          <span>01</span>
          <div>
            <h3>Short-form experiments and campaign formats</h3>
            <p>
              Original Media87 examples across advertising, product mock-ups,
              motivational storytelling and interview-style concepts.
            </p>
          </div>
        </div>
        <div className="video-grid video-grid-short">
          {shortVideos.map((video) => (
            <article key={video.id}>
              <div className="lite-video-frame">
                <LiteVideo
                  video={video}
                  active={activeVideo === video.id}
                  onPlay={() => setActiveVideo(video.id)}
                />
              </div>
              <h4>{video.title}</h4>
            </article>
          ))}
        </div>
      </div>

      <div className="video-portfolio-group">
        <div className="video-group-heading">
          <span>02</span>
          <div>
            <h3>Long-form explainers and educational video</h3>
            <p>
              Longer original pieces that demonstrate product explanation,
              agency positioning, platform education and expert-led content.
            </p>
          </div>
        </div>
        <div className="video-grid video-grid-long">
          {longVideos.map((video) => (
            <article key={video.id}>
              <div className="lite-video-frame">
                <LiteVideo
                  video={video}
                  active={activeVideo === video.id}
                  onPlay={() => setActiveVideo(video.id)}
                />
              </div>
              <h4>{video.title}</h4>
            </article>
          ))}
        </div>
      </div>

      <p className="portfolio-performance-note">
        YouTube players load only after a visitor presses play. Until then, the
        page uses lightweight preview images to protect initial speed.
      </p>
    </div>
  );
}
