import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local Media87 assets are already web-sized and should be emitted as
    // direct static URLs. This avoids relying on a Cloudflare Images binding in
    // local preview or on deployments that only use Pages static assets.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
