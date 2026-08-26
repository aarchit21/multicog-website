# MultiCOG Website Draft

This repository contains the first dummy draft of a static research-group website for MultiCOG at BITS Pilani. It is built as a Hugo site with content stored in Markdown/YAML-style front matter so future updates can be made without editing layouts.

## Local Development

Install Hugo Extended, then run:

```powershell
hugo server
```

In this workspace, a portable Hugo binary was used:

```powershell
.\.tools\hugo\hugo.exe server
```

## Production Build

```powershell
hugo --minify
```

Portable workspace command:

```powershell
.\.tools\hugo\hugo.exe --minify
```

The generated static site is written to `public/`.

## Add A Publication

Create a new folder in `content/publication/` with an `index.md` file. Copy an existing publication bundle and update the title, venue, year, authors, summary, associated project, and placeholders. Add real paper, DOI, code, dataset, BibTeX, or demo links only after they are approved.

## Add A Project

Create a new folder in `content/project/` with an `index.md` file. Public project pages currently show only title, agency, duration, and draft placeholder text. Keep descriptions clearly marked as placeholders until confirmed.

## Add A Person

Create a new folder in `content/authors/` with an `index.md` file. Supported fields include name, role, photograph placeholder, short biography, research interests, email, Google Scholar, GitHub, LinkedIn, and personal website. Unconfirmed people must stay visibly labelled as placeholders.

## Replace Paper Figures

Place approved images in `assets/paper-figures/` or `assets/media/`, then update the publication layout or publication front matter to reference the approved image. Keep the placeholder diagram until an approved figure is supplied.

## Add Demo Videos

Create or edit a bundle in `content/demo/`. Add a YouTube embed or external video link and a code link only when those assets are confirmed. Until then, keep the placeholder text.

## Later Deployment

For GitHub Pages or Cloudflare Pages, push the repository to GitHub and configure the build command as `hugo --minify` with output directory `public`. Add any platform-specific base URL or build environment settings after the hosting target is chosen.
