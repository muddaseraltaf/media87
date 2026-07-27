# Media87 deployment

## GitHub

- Repository visibility: public, as approved by the site owner
- Production branch: `main`
- Do not commit credentials, account exports, `.env` files, build caches, or dependencies

## Cloudflare Pages

Use the Git integration with these settings:

- Framework preset: None
- Production branch: `main`
- Root directory: `main architecture`
- Build command: `exit 0`
- Build output directory: `.`

The root directory already contains the deployable static HTML, assets, redirects, headers, robots file, XML sitemap, `ads.txt`, and custom 404 page.

## Production checks

After the first Pages deployment:

1. check the generated `pages.dev` URL before connecting `media87.com`;
2. verify representative routes, images, scrolling, redirects, the 404 response, and consent choices;
3. check `/robots.txt`, `/sitemap.xml`, and `/ads.txt`;
4. confirm optional Google, Meta, and AdSense requests do not load before the relevant visitor choice;
5. connect the custom domain only after the preview passes;
6. retain the existing WordPress deployment until DNS rollback is documented;
7. submit the production sitemap to Google Search Console and Bing Webmaster Tools.

## Account-level work still required

- Confirm that Google AdSense Privacy & messaging is enabled with a Google-certified CMP for applicable visitors.
- Verify the Search Console Domain property through Cloudflare DNS.
- Confirm the Google tag destination and Meta Pixel access in their respective accounts.
- Replace the current email-client contact form with an approved server-side form endpoint when available.

