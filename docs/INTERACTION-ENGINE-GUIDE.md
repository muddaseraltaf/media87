# Media87 Interaction Engine Guide

## Purpose

This guide defines the motion language for the rebuilt Media87 website. It is
the shared contract for new pages, so interaction remains coherent as the site
grows instead of becoming a collection of unrelated effects.

The reference page supplied for this work was useful because its cursor,
reveals, magnetic buttons, tilt, progress, parallax and marquees were
coordinated. Media87 adopts that coordination model while keeping React
rendering, accessibility and page speed predictable.

## Architecture

The system has four layers:

1. **Global micro-interaction engine** — `InteractionEngine.tsx` runs one
   coordinated animation frame for the cursor, progress bar, visible floating
   elements and visible marquees. It also owns reveal, tilt and magnetic event
   handling.
2. **Isolated WebGL moments** — `MeshHero.tsx` is reserved for the homepage and
   selected high-value service or product pages. It does not become a global
   background.
3. **CSS ambience** — orbit rings, gradients and slow ambient movement provide
   depth without another client dependency.
4. **Click-to-load rich media** — video and external embeds stay out of the
   initial load until the visitor asks for them.

The global engine is mounted once in the root layout. Pages opt into behavior
through HTML data attributes, so most future page templates remain server
rendered and contain no interaction code of their own.

## Authoring contract

| Contract | Purpose | Recommended use |
| --- | --- | --- |
| `data-reveal` | Reveal one section or meaningful block when it enters the viewport | Section introductions, editorial media, CTA bands |
| `data-reveal-stagger` | Reveal the direct children in a short sequence | Card grids, process lists, related-page lists |
| `data-tilt="2"` | Add restrained pointer tilt; accepted strength is 1–7 | Visual cards and product previews only |
| `data-magnetic="0.18"` | Add pointer pull; buttons already receive it automatically | Special controls that are not `.button` elements |
| `data-cursor-label="View"` | Add a short cursor label over an interactive item | High-value cards; keep labels to one word |
| `data-float-speed="-0.04"` | Move a decorative or editorial element with scroll | Orbs and selected image compositions |
| `data-marquee` | Move a duplicated horizontal track | Short capability or category tickers |
| `data-marquee="reverse"` | Move a duplicated track in the opposite direction | A second ticker only when composition needs it |

Example:

```tsx
<div className="card-grid" data-reveal-stagger>
  {items.map((item) => (
    <Link
      data-cursor-label="Explore"
      data-tilt="3"
      href={item.href}
      key={item.href}
    >
      {item.title}
    </Link>
  ))}
</div>
```

For a marquee, render the same sequence twice inside one track and mark the
second sequence `aria-hidden="true"`. The engine uses half of the track width as
the seamless loop boundary.

## Motion tiers

### Tier 1 — signature

Use on the homepage and a small number of strategically important product or
service pages:

- Mesh headline or one purpose-built canvas experience
- Ambient orbit or restrained scroll float
- Cursor labels on primary exploration cards
- One marquee
- Section reveals and magnetic buttons

### Tier 2 — expressive

Use on service hubs, product detail pages and major commercial pages:

- Section and staggered reveals
- Magnetic buttons
- A few card tilts
- One ambient decorative treatment
- Mesh only when the interaction explains the offer

### Tier 3 — restrained

Use on articles, legal pages, trust pages and system pages:

- Section reveals
- Progress bar and standard cursor feedback
- Magnetic primary CTA
- No WebGL, flow field, marquee or decorative tilt unless the content needs it

## Performance rules

- Keep one global request-animation-frame scheduler for micro-interactions.
- Pause the scheduler when the document is hidden.
- Observe float and marquee elements and update only those near the viewport.
- Use the mesh only on selected pages; use the flow field only where it explains
  an automation system.
- Do not place more than one active canvas/WebGL experience in a viewport.
- Do not add a general-purpose animation library for effects already covered by
  this engine.
- Do not animate layout properties such as `top`, `left`, width or height.
  Prefer transforms, `translate` and opacity.
- Avoid autoplay third-party video. Use the click-to-load embed.
- Treat animation bundle size and page route chunks as part of build review.

## Accessibility rules

- Every effect must have a complete static state.
- `prefers-reduced-motion: reduce` removes reveals, tilt, floats, marquees,
  cursor replacement and ambient rotation.
- Custom cursor behavior is enabled only for a fine pointer with hover support.
- Keyboard focus and native link/button semantics remain primary.
- Never hide information exclusively inside a hover or cursor state.
- Decorative orbit, grid and cursor elements remain hidden from assistive
  technology.
- Motion must not be required to understand a service, price, limitation or
  call to action.

## Design rules

- Motion should clarify hierarchy, direction or relationship.
- Use stronger interaction on exploration surfaces, not every paragraph.
- A page should have one visual protagonist: mesh, flow field, product preview
  or editorial image—not all of them competing.
- Cursor labels use direct verbs such as “View”, “Read”, “Open” or “Explore”.
- Tilt should feel like depth, not a game control. Strength 2–3 is the normal
  range.
- Floating speed should normally stay between `-0.06` and `0.06`.
- Brand ambience uses the Media87 charcoal, coral and orange system.

## Patterns deliberately excluded

- DOM word-splitting after React renders. It can cause hydration and
  accessibility problems.
- Multiple independent scroll and animation loops.
- Large animation libraries for simple transforms.
- Motion-only navigation cues.
- Imported counters, testimonials or performance claims that are not verified
  Media87 evidence.
- Canvas effects on every page.

## Review checklist for every new page

- Does the page use the correct motion tier?
- Is there only one visual protagonist?
- Do all effects disappear cleanly under reduced motion?
- Does the page remain complete with JavaScript disabled?
- Are interactive elements keyboard accessible?
- Are cursor labels short and useful?
- Are only visible float and marquee elements doing work?
- Is external video click-to-load?
- Does the production build keep the page within the agreed performance budget?
- Has the page been checked at mobile, tablet and desktop breakpoints?

