F:\github\test\astro-blog [main ≡]> pnpm build

> fuwari-astro-blog-template@0.0.1 build F:\github\test\astro-blog
> astro build && pagefind --site dist

14:30:00 [vite] Forced re-optimization of dependencies
14:30:01 [content] Syncing content
14:30:01 [content] Astro config changed
14:30:01 [content] Astro version changed
14:30:01 [content] Clearing content store
14:30:02 [content] Synced content
14:30:02 [types] Generated 1.54s
14:30:02 [build] output: "static"
14:30:02 [build] mode: "static"
14:30:02 [build] directory: F:\github\test\astro-blog\dist\
14:30:02 [build] Collecting build info...
14:30:02 [build] ✓ Completed in 1.71s.
14:30:02 [build] Building static entrypoints...
14:30:06 [vite] ✓ built in 4.18s
14:30:06 [build] ✓ Completed in 4.29s.

 building client (vite) 
14:30:07 [vite] ✓ 186 modules transformed.
14:30:07 [vite] dist/_astro/ec.g1fg5.js                                                0.94 kB
14:30:07 [vite] dist/_astro/ec.hjiv9.css                                              19.69 kB │ gzip:  4.40 kB
14:30:07 [vite] dist/_astro/Layout.FysXtlUb.css                                       29.82 kB │ gzip:  5.89 kB
14:30:07 [vite] dist/_astro/url-utils.CHWdgz7q.js                                      0.28 kB │ gzip:  0.18 kB
14:30:07 [vite] dist/_astro/lifecycle.4RJr1wVS.js                                      0.54 kB │ gzip:  0.35 kB
14:30:07 [vite] dist/_astro/input.CcGWhDUD.js                                          0.75 kB │ gzip:  0.43 kB
14:30:07 [vite] dist/_astro/SwupScriptsPlugin.DeeT9ppa.js                              1.10 kB │ gzip:  0.62 kB
14:30:07 [vite] dist/_astro/client.svelte.CsTMswN-.js                                  1.16 kB │ gzip:  0.65 kB
14:30:07 [vite] dist/_astro/setting-utils.Dzly6n8B.js                                  1.25 kB │ gzip:  0.61 kB
14:30:07 [vite] dist/_astro/index.modern.D46RI4Wq.js                                   1.77 kB │ gzip:  0.91 kB
14:30:07 [vite] dist/_astro/DisplaySettings.Pp1lHLL5.js                                2.06 kB │ gzip:  1.13 kB
14:30:07 [vite] dist/_astro/SwupHeadPlugin.DvOZNxAa.js                                 2.58 kB │ gzip:  1.28 kB
14:30:07 [vite] dist/_astro/LightDarkSwitch.CHy6ow4R.js                                3.30 kB │ gzip:  1.40 kB
14:30:07 [vite] dist/_astro/ArchivePanel.CQITc9z9.js                                   3.57 kB │ gzip:  1.56 kB
14:30:07 [vite] dist/_astro/each.B6NhhFus.js                                           3.75 kB │ gzip:  1.88 kB
14:30:07 [vite] dist/_astro/render.DYyMPRCR.js                                         4.42 kB │ gzip:  2.01 kB
14:30:07 [vite] dist/_astro/SwupA11yPlugin.BIyElFLX.js                                 5.25 kB │ gzip:  2.12 kB
14:30:07 [vite] dist/_astro/page.CnjYp0uj.js                                           5.37 kB │ gzip:  2.33 kB
14:30:07 [vite] dist/_astro/Search.B1IWq6A6.js                                         5.44 kB │ gzip:  2.40 kB
14:30:07 [vite] dist/_astro/SwupPreloadPlugin.BFr0xV-N.js                              6.06 kB │ gzip:  2.35 kB
14:30:07 [vite] dist/_astro/SwupScrollPlugin.DTcbGiCQ.js                               8.00 kB │ gzip:  2.40 kB
14:30:07 [vite] dist/_astro/props.DlEwSLNC.js                                          8.00 kB │ gzip:  3.71 kB
14:30:07 [vite] dist/_astro/Icon.lymwO5qu.js                                          20.22 kB │ gzip:  8.13 kB
14:30:07 [vite] dist/_astro/Swup.BWOMRtvc.js                                          21.62 kB │ gzip:  7.41 kB
14:30:07 [vite] dist/_astro/utils.Cg4U3nbu.js                                         23.60 kB │ gzip:  9.49 kB
14:30:07 [vite] dist/_astro/Layout.astro_astro_type_script_index_0_lang.CsPR6YoS.js  142.20 kB │ gzip: 52.29 kB
14:30:07 [vite] ✓ built in 1.11s

 generating static routes 
14:30:07 ▶ src/pages/about.astro
14:30:07   └─ /about/index.html (+29ms) 
14:30:07 ▶ src/pages/archive.astro
14:30:07   └─ /archive/index.html (+6ms) 
14:30:07 ▶ src/pages/friends.astro
14:30:07   └─ /friends/index.html (+7ms)
14:30:07 ▶ src/pages/posts/[...slug].astro
14:30:07   ├─ /posts/default/link-cards/index.html (+11ms) 
14:30:07   ├─ /posts/default/markdown-extended/index.html (+8ms) 
14:30:07   ├─ /posts/default/expressive-code/index.html (+11ms)
14:30:07   ├─ /posts/default/index.html (+16ms) 
14:30:08   ├─ /posts/default/markdown/index.html (+14ms) 
14:30:08   ├─ /posts/default/video/index.html (+12ms) 
14:30:08   └─ /posts/default/draft/index.html (+32ms) 
14:30:08 λ src/pages/robots.txt.ts
14:30:08   └─ /robots.txt (+10ms) 
14:30:08 λ src/pages/rss.xml.ts
14:30:08   └─ /rss.xml (+48ms) 
14:30:08 ▶ src/pages/series.astro
14:30:08   └─ /series/index.html (+4ms)
14:30:08 ▶ src/pages/[...page].astro
14:30:08   └─ /index.html (+8ms) 
14:30:08 ✓ Completed in 1.16s.

 generating optimized images 
14:30:08   ▶ /_astro/index.CgGywNHJ_Z1rzKbO.webp (reused cache entry) (+36ms) (1/3)
14:30:08   ▶ /_astro/Celestia.NOkCSlDU_Z2jVoSF.webp (reused cache entry) (+37ms) (2/3)
14:30:09   ▶ /_astro/avatar3.BTcsJymL_3Btrq.webp (before: 234kB, after: 154kB) (+179ms) (3/3)
14:30:09 ✓ Completed in 181ms.

14:30:09 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
14:30:09 [build] 12 page(s) built in 8.74s
14:30:09 [build] Complete!

Running Pagefind v1.4.0 (Extended)
Running from: "F:\\github\\test\\astro-blog"
Source:       "dist"
Output:       "dist\\pagefind"

[Walking source directory]
Found 12 files matching **/*.{html}

[Parsing files]
Found a data-pagefind-body element on the site.
↳ Ignoring pages without this tag.

[Reading languages]
Discovered 1 language: ko

[Building search indexes]
Total:
  Indexed 1 language
  Indexed 8 pages
  Indexed 1889 words
  Indexed 0 filters
  Indexed 0 sorts
Note: Pagefind doesn't support stemming for the language ko.
Search will still work, but will not match across root words.
Note: Pagefind doesn't support stemming for the language ko.
Search will still work, but will not match across root words.

Finished in 0.066 seconds
F:\github\test\astro-blog [main ≡]> 