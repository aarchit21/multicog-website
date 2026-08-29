# Typography audit

The former stylesheet ended with a “Global 30% reduction” block that overrode earlier heading rules. Those final computed declarations are the baseline below. Values are CSS sizes before font rendering; `clamp()` values vary with viewport width.

| Role | Previous mobile | New mobile | Tablet/desktop treatment |
| --- | --- | --- | --- |
| Page/detail `h1` | `clamp(2.03rem, 4.2vw, 3.85rem)`; 32.48 px at 320–390 px | `2.44rem`; 39.04 px, +20.2% | Restores existing `clamp(1.65rem, 2.94vw, 2.8rem)` at 781 px |
| Homepage hero `h1` | `clamp(1.58rem, 2.59vw, 2.63rem)`; 25.28 px on mobile | `1.9rem`; 30.4 px, +20.3% | Restores the same existing clamp at 781 px |
| Homepage section `h2` | `clamp(1.02rem, 1.54vw, 1.54rem)`; 16.32 px on mobile | `1.225rem`; 19.6 px, +20.1% | Restores the same existing clamp at 781 px |
| Publication year `h2` | `1.26rem`; 20.16 px | 24 px, +19.0% | 17.5 px, matching the previous 17.44 px desktop value |
| Detail-body `h2` | `1.11rem`; 17.76 px | 21.3 px, +19.9% | Restores 17.76 px at 781 px |
| Collaboration detail `h2` | `1rem`; 16 px | 19.2 px, +20% | Restores 16 px at 781 px |
| Homepage news title | `1.3rem`; 20.8 px | 25 px, +20.2% | 20 px; meets the required desktop minimum while remaining near the previous 20.8 px |
| Publication title | `0.85rem`; 13.6 px | 21.6 px | 18 px; the old size was objectively below the required 18 px, so the corrected desktop minimum is used as the base and mobile is 20% larger |
| Project title | as low as `0.84rem`; 13.44 px on mobile, up to 18.08 px desktop | 21.6 px | 18 px; preserves the old desktop cap and applies +20% on mobile |
| News/search/list title | 16 px mobile / 14.08 px desktop | 24 px | 20 px; corrects the old values to the required news-title minimum and makes mobile 20% larger |
| Directory/profile card title | 14.08 px | 22 px | 18 px; corrects the old undersized desktop value, with mobile approximately 20% larger |
| Research-area title | at least 17.92 px mobile | 24 px | Restores existing `clamp(1.02rem, 1.61vw, 1.4rem)` at 781 px; the mobile value was raised further to maintain hierarchy and wrapping |

Body copy is 16 px on mobile and 17 px on desktop with a 1.68 line height. Navigation is 15 px desktop and 17 px mobile; publication authors are 15 px; publication/project metadata is 14–15 px; footer copy is 15 px. The smallest meaningful labels are 12 px uppercase kickers; no meaningful text is below 12 px.
