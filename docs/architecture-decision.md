# Architecture decision: keep Hugo

Decision:
Keep Hugo

Reasons:
1. Hugo materially provides shared layouts, Markdown-driven publication, project, person, research, collaboration, demo, and news pages, plus relationships between them.
2. Hugo already supplies static GitHub Pages output, sitemap/RSS/metadata generation, and native responsive-image processing without adding visitor-side runtime cost.
3. Four visual variants can share the same content tree and data relationships through alternate Hugo layouts or configuration; replacing Hugo would duplicate content or recreate a build system.

Costs:
1. Local and CI builds require Hugo Extended plus Node and Tailwind.
2. Contributors must understand both Hugo templates and the Tailwind build command.

Migration consequences:
1. Keep the existing content model, routes, and GitHub Pages workflow, and migrate only templates, styling, image processing, and browser behavior.
2. Compile one purged Tailwind stylesheet before Hugo builds, and use a shared responsive-image partial for page resources and global assets.

## Options considered

| Option | Build/dependencies | Shared content and four designs | Images/search/metadata | Maintenance and risk | Output/runtime |
| --- | --- | --- | --- | --- | --- |
| Keep Hugo + Tailwind | Hugo Extended, Node, Tailwind CLI, Typography | One Markdown source and reusable layouts | Native image pipeline; existing small client-side search/filter; automatic sitemap/RSS | Lowest migration and data-consistency risk | Static, minified HTML/CSS/JS |
| Plain HTML + Tailwind | Node and Tailwind, but many hand-authored pages | High duplication across pages and designs | Image variants, feeds, metadata, and relationship pages must be recreated | Superficially simple; highest broken-link and inconsistent-data risk | Static, with no meaningful runtime advantage over Hugo |
| Replace Hugo with another generator | New generator, plugins, Node | Possible, but requires a full content/template migration | Depends on plugins or custom code | Migration risk without a material capability gain | Static and broadly equivalent |
| Shared structured-data build system | Requires a generator or custom build | Correct architectural direction | Must implement rendering, images, feeds, and links | Useful only if a current system is absent | Static |

The fourth option describes what this repository already has: Hugo is the shared structured-data build system. Its cost is build and maintenance complexity, not browser runtime.
