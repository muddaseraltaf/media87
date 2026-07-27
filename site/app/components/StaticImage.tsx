import type { ImgHTMLAttributes } from "react";

type StaticImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
  fill?: boolean;
};

export function StaticImage({
  alt,
  fill = false,
  className,
  ...props
}: StaticImageProps) {
  const classes = [fill ? "static-image-fill" : "", className]
    .filter(Boolean)
    .join(" ");

  // These assets live in /public and are intentionally served directly by
  // Cloudflare Pages instead of passing through a runtime image proxy.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt} className={classes || undefined} />;
}
