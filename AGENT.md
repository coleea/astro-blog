# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fuwari is an Astro-based static blog template with extensive markdown processing capabilities, custom plugins, and a sophisticated content management system. The blog supports features like series, categories, tags, TOC, code highlighting with custom components, and mathematical equations.

## Development Commands

```bash
# Development server
pnpm dev           # Start dev server on localhost:4321

# Building
pnpm build         # Build site and generate search index with pagefind
pnpm preview       # Preview production build locally

# Code Quality
pnpm format        # Format code with Biome
pnpm lint          # Lint and auto-fix with Biome
pnpm check         # Run Astro diagnostics
pnpm type-check    # TypeScript type checking with isolated declarations

# Content Creation
pnpm new-post -- <filename>  # Create new post with frontmatter template
```

**Important**: This project uses `pnpm` exclusively (enforced by preinstall hook).

## Architecture Overview

### Content System

Posts are managed through Astro's content collections in `src/content/posts/`. The content pipeline:

1. **Content Collection Schema** ([src/content/config.ts](src/content/config.ts)): Defines two collections:
   - `posts`: Blog posts with comprehensive frontmatter (title, published, tags, category, series, draft, pinned, etc.)
   - `spec`: Special pages (about, friends, etc.)

2. **Content Utilities** ([src/utils/content-utils.ts](src/utils/content-utils.ts)):
   - `getSortedPosts()`: Returns posts sorted by pinned status, then date, with next/prev navigation links injected
   - `getTagList()`: Aggregates and counts all tags across posts
   - `getCategoryList()`: Builds category list with URLs
   - `getPostSeries()`: Retrieves posts belonging to a series, sorted chronologically
   - Draft posts are hidden in production but visible in development

3. **Post Properties**:
   - `pinned: true` - Pin posts to top of list
   - `draft: true` - Hide in production
   - `series: "series-name"` - Group related posts
   - Navigation links (prev/next) are automatically injected during sorting

### Markdown Processing Pipeline

The blog uses an extensive markdown processing pipeline defined in [astro.config.mjs](astro.config.mjs):

**Remark Plugins** (process markdown AST):
- `remark-math` → `remark-reading-time` → `remark-excerpt` → `remark-github-admonitions-to-directives` → `remark-directive` → `remark-sectionize` → `parseDirectiveNode`

**Rehype Plugins** (process HTML AST):
- `rehype-katex` → `rehype-slug` → `rehype-components` → `rehype-external-links` → `rehype-autolink-headings`

**Custom Plugins** ([src/plugins/](src/plugins/)):
- `remark-reading-time.mjs`: Calculates reading time, stores in frontmatter
- `remark-excerpt.js`: Extracts post excerpt
- `remark-directive-rehype.js`: Processes markdown directives (`::[type]` syntax)
- `rehype-component-admonition.mjs`: Renders GitHub-style admonitions (note, tip, important, caution, warning)
- `rehype-component-github-card.mjs`: Embeds GitHub repo cards
- `rehype-component-link-card.mjs`: Creates rich link previews
- `expressive-code/language-badge.ts`: Adds language badges to code blocks
- `expressive-code/custom-copy-button.ts`: Custom copy button styling

### Code Blocks

Powered by Expressive Code with custom plugins:
- Collapsible sections support
- Line numbers (disabled for `shellsession`)
- Language badges
- Custom copy button
- Theme: `github-dark` (configured in [src/config.ts](src/config.ts))
- Custom styling via CSS variables (`--codeblock-bg`, `--codeblock-topbar-bg`, etc.)

### Configuration System

**Main Configuration** ([src/config.ts](src/config.ts)):
- `siteConfig`: Site title, subtitle, theme color (hue), banner, TOC settings, favicon
- `navBarConfig`: Navigation links (uses LinkPreset enum or custom links)
- `profileConfig`: Avatar, bio, social links (using Iconify icons)
- `licenseConfig`: Content license information
- `expressiveCodeConfig`: Code block theme

**Type Definitions** ([src/types/config.ts](src/types/config.ts)): Central type definitions for all configuration objects.

### Page Structure

**Dynamic Routes**:
- `src/pages/[...page].astro`: Paginated post list (home page)
- `src/pages/posts/[...slug].astro`: Individual post pages with TOC, series navigation, and metadata
- `src/pages/archive.astro`: Chronological archive
- `src/pages/series.astro`: Series index
- `src/pages/about.astro` & `src/pages/friends.astro`: Special pages from `spec` collection

**Layouts**:
- `src/layouts/Layout.astro`: Base layout with global styles, Swup transitions
- `src/layouts/MainGridLayout.astro`: Main grid layout with sidebar

**Components**:
- `src/components/widget/`: Sidebar widgets (Profile, TOC, Categories, Tags, Series)
- `src/components/control/`: UI controls (Pagination, BackToTop, Buttons)
- `src/components/misc/`: Utilities (Markdown rendering, Image handling, Giscus comments, License)

### Styling

- **Tailwind CSS** with typography plugin and custom sans-serif font (Roboto)
- **Dark mode**: Manual toggle via class-based dark mode
- **PostCSS**: Import and nesting support
- **Stylus**: For legacy/custom styling
- **Theme System**: Dynamic theme color based on HSL hue value (configured in `siteConfig.themeColor.hue`)

### Search

Uses Pagefind for static search index generation (runs post-build via `pagefind --site dist`).

### Integrations

- **Swup**: Page transitions (containers: `main`, `#toc`, `#series`)
- **Sitemap**: Automatic sitemap generation
- **RSS**: Feed generation at `/rss.xml`
- **Partytown**: Third-party script optimization
- **Icons**: Iconify with Material Symbols, Font Awesome, and MDI icon sets

### Build Configuration

- Concurrency limited to 1 for stability
- HTML compression enabled
- CSS minification enabled
- Trailing slashes enforced
- Assets inline limit: 4KB

## Creating Custom Components

To add custom markdown components:

1. Create rehype component in `src/plugins/` following existing patterns
2. Register in `astro.config.mjs` under `rehype-components` config
3. Component receives element and children, returns HTML structure

## Icon Usage

Icons use Iconify with pre-installed collections. Visit https://icones.js.org/ for icon codes. Format: `collection:icon-name` (e.g., `fa6-brands:github`).

## Working with Series

Posts in a series are automatically linked. Set `series: "series-name"` in frontmatter. The SeriesPanel component displays series navigation on post pages.
