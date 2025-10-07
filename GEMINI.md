# Project: Fuwari Astro Blog

## Project Overview

This is a static blog template called "Fuwari" built with [Astro](https://astro.build). It's designed to be a personal blog, featuring a clean and modern design. The project uses Svelte for interactive components and Tailwind CSS for styling. It includes a variety of features such as a light/dark mode switch, a search component, and support for series and tags. The blog content is written in Markdown, and the project uses several remark and rehype plugins to enhance the reading experience, including support for admonitions, code blocks with syntax highlighting, and LaTeX equations.

## Building and Running

This project uses `pnpm` as the package manager.

### Key Commands

*   **Installation:**
    ```bash
    pnpm install
    ```

*   **Development:**
    ```bash
    pnpm dev
    ```
    This command starts the development server, and you can view the site at `http://localhost:4321`.

*   **Building:**
    ```bash
    pnpm build
    ```
    This command builds the static site for production. The output will be in the `dist` directory.

*   **Previewing the Build:**
    ```bash
    pnpm preview
    ```
    This command starts a local server to preview the production build.

*   **Creating a New Post:**
    ```bash
    pnpm new-post
    ```
    This command runs a script to create a new blog post.

*   **Linting and Formatting:**
    ```bash
    pnpm lint
    pnpm format
    ```
    These commands use Biome to lint and format the codebase.

## Development Conventions

*   **Package Manager:** The project enforces the use of `pnpm`.
*   **Linting and Formatting:** The project uses Biome for code linting and formatting.
*   **Content:** Blog posts are located in the `src/content/posts` directory. Each post is a Markdown file with frontmatter that adheres to the schema defined in `src/content/config.ts`.
*   **Configuration:** The main site configuration is in `src/config.ts`, and the Astro configuration is in `astro.config.mjs`.
*   **Styling:** The project uses Tailwind CSS, with custom styles defined in the `src/styles` directory.
