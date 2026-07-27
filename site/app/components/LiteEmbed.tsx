"use client";

import { useState } from "react";

type LiteEmbedProps = {
  title: string;
  src: string;
  label?: string;
  poster?: string;
  aspect?: "video" | "tall";
};

export function LiteEmbed({
  title,
  src,
  label = "Load original media",
  poster,
  aspect = "video",
}: LiteEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={`lite-embed lite-embed-${aspect}`}>
      {active ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          className="lite-embed-trigger"
          type="button"
          onClick={() => setActive(true)}
          aria-label={`${label}: ${title}`}
          style={
            poster
              ? {
                  backgroundImage: `linear-gradient(135deg, rgba(42, 35, 35, 0.2), rgba(42, 35, 35, 0.72)), url("${poster}")`,
                }
              : undefined
          }
        >
          <span className="lite-embed-mark" aria-hidden="true">
            ▶
          </span>
          <strong>{title}</strong>
          <small>{label} · loaded only after this click</small>
        </button>
      )}
    </div>
  );
}
