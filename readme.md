# MultiCOG Website Draft

This repository contains the first dummy draft of a static research-group website for MultiCOG at BITS Pilani. It is built as a Hugo site with content stored in Markdown/YAML-style front matter so future updates can be made without editing layouts.

## Local Development

Install Hugo Extended and Node.js, then install the pinned Tailwind dependencies:

```powershell
npm ci
npm run build:css
hugo server
```

For live CSS changes, run `npm run watch:css` alongside `hugo server`.

In this workspace, the ignored portable Node and Hugo binaries can be used:

```powershell
$taskNodeDir = (Resolve-Path .\.tools\node).Path
$env:Path = "$taskNodeDir;$env:Path"
npm ci
npm run build:css
.\.tools\hugo\hugo.exe server
```

## Production Build

```powershell
npm ci
npm run build:css
hugo --minify
```

Portable workspace command:

```powershell
$taskNodeDir = (Resolve-Path .\.tools\node).Path
$env:Path = "$taskNodeDir;$env:Path"
npm ci
npm run build:css
.\.tools\hugo\hugo.exe --minify
```

Tailwind scans all Hugo layouts, Markdown content, and site JavaScript, then writes an ignored intermediate file at `assets/css/tailwind.generated.css`. Hugo fingerprints that compiled, purged stylesheet and writes the static site to `public/`.

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

For GitHub Pages, set the repository's Pages source to **GitHub Actions**. The included workflow builds with the Pages-provided base URL, so it works for the project URL `https://aarchit21.github.io/multicog-website/` without hard-coding a placeholder. The generated `public/` directory is intentionally ignored.
