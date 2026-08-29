# Image performance audit

All source images are global Hugo resources under `assets/media/`; there are no raster images in `static/` or page bundles. The repository contains no SVG logo, so the existing official BITS Pilani JPG is preserved as the source and emitted as small, aspect-preserving WebP variants. No source file was deleted or upscaled.

Rendered dimensions are the intended CSS layout dimensions at representative 320 px mobile and 1440 px desktop viewports. The browser selects one generated file from each `srcset`, so variant totals are build-output totals rather than per-page transfer size.

| Source | Format; source size; intrinsic | Rendered use | Fold | Oversized before | Generated output |
| --- | --- | --- | --- | --- | --- |
| `bits-pilani-logo.jpg` | JPG; 15,334 B; 250×200 | Header, 50×40 mobile / 55×44 desktop, `object-contain` | Above | Yes | WebP 50w 1,152 B; 100w 3,178 B; eager; explicit 250×200 attributes |
| `hero-lab.jpg` | JPG; 172,649 B; 1024×572 | Decorative header layer, viewport width × 76 px with cover crop | Above | Yes for a shallow, low-opacity header | WebP 320w 18,466 B; 640w 57,446 B; 960w 107,438 B; eager |
| `research-lab-background.png` | PNG; 1,783,922 B; 1802×873 | Homepage hero, about 292×360 mobile / 1120×400 desktop with cover crop | Above | Severely | WebP 320w 6,134 B; 640w 16,992 B; 960w 30,356 B; 1280w 46,000 B; eager; sole `fetchpriority="high"` image |
| `enterprise-feedback-analytics.jpg` | JPG; 181,808 B; 1024×572 | Featured research image, about 292×183 mobile / 536×335 desktop | Above on desktop; near/below fold on mobile | Moderately | WebP 320w 18,166 B; 640w 57,598 B; 960w 109,088 B; eager because it is visible in common desktop viewports |
| `featured-demo-paper.png` | PNG; 1,767,979 B; 1536×1024 | Research spotlight, about 292×183 mobile / 455×284 desktop | Below | Severely | WebP 320w 6,482 B; 640w 18,780 B; 960w 34,370 B; lazy |
| `project-investigation.png` | PNG; 1,963,980 B; 1536×1024 | Homepage project card, about 292×245 mobile / 352×245 desktop with cover crop | Below | Severely | WebP 320w 5,192 B; 640w 21,414 B; lazy |
| `project-federated-learning.png` | PNG; 1,855,096 B; 1536×1024 | Homepage project card, about 292×245 mobile / 352×245 desktop with cover crop | Below | Severely | WebP 320w 4,214 B; 640w 14,606 B; lazy |
| `project-business-recommendations.png` | PNG; 1,679,529 B; 1536×1024 | Homepage project card, about 292×245 mobile / 352×245 desktop with cover crop | Below | Severely | WebP 320w 3,254 B; 640w 9,062 B; lazy |
| `pratik-narang.jpg` | JPG; 4,023 B; 204×192 | Homepage/directory/profile portrait, 82–140 px square with cover crop | Below | No; close to a useful 2× source for small uses | WebP 96w 1,286 B; 160w 2,378 B; 192w 3,044 B; lazy; no 320w upscale |
| `member-1.jpg` | JPG; 16,386 B; 425×470 | Homepage/directory/profile portrait, 78–140 px square with cover crop | Below | Yes for small cards | WebP 96w 2,110 B; 160w 3,958 B; 192w 4,842 B; 320w 8,516 B; lazy |
| `member-2.png` | PNG; 11,209 B; 447×447 | Homepage/directory/profile portrait, 78–140 px square | Below | Yes for small cards | WebP 96w 1,848 B; 160w 3,026 B; 192w 3,626 B; 320w 6,052 B; lazy |
| `iot-federated-learning.jpg` | JPG; 216,176 B; 1024×572 | Not referenced by any generated page | Not transferred | Unused rather than oversized | No output variant; retained as recoverable source media |

## Summary

- Before: the clean site would copy roughly 9.67 MB of original raster files when all referenced originals were emitted; individual homepage PNGs were 1.68–1.96 MB.
- After: Hugo emits 32 WebP variants totalling 630,074 B across the entire build. A visitor downloads only the variant selected by `sizes`/`srcset`, not all 32.
- Every rendered raster has `srcset`, `sizes`, `width`, `height`, `decoding="async"`, and an intentional eager/lazy policy.
- The BITS logo is no longer forced into a square. The image keeps its 5:4 ratio, uses `object-contain`, is not lazy-loaded, and is accompanied by visible “BITS Pilani” text.
- AVIF was not added: WebP already removes the dominant multi-megabyte PNG cost, while a second format would multiply build artifacts for limited material benefit on these mostly illustrative assets.
