---
title: Simple Guides for Fuwari
published: 1002-04-01
description: "How to use this blog template."
image: "./index.jpeg"
tags: ["Fuwari", "Blogging", "Customization"]
category: Default
draft: false
series: Examples
---

> Cover image source: [Source](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg)
> 표지 이미지 출처: [출처](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg)

This blog template is built with [Astro](https://astro.build/). For the things that are not mentioned in this guide, you may find the answers in the [Astro Docs](https://docs.astro.build/).
이 블로그 템플릿은 [Astro](https://astro.build/)로 구축되었습니다. 이 가이드에서 언급되지 않은 내용은 [Astro 문서](https://docs.astro.build/)에서 답을 찾을 수 있습니다.

## Front-matter of Posts
## 게시글의 Front-matter 설정

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| Attribute     | Description                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | The title of the post. <br/> 게시글의 제목.                                                                                                                                                                 |
| `published`   | The date the post was published. <br/> 게시글이 발행된 날짜.                                                                                                                                                    |
| `description` | A short description of the post. Displayed on index page. <br/> 게시글의 간단한 설명. 인덱스 페이지에 표시됩니다.                                                                                                           |
| `image`       | The cover image path of the post.<br/>1. Start with `http://` or `https://`: Use web image<br/>2. Start with `/`: For image in `public` dir<br/>3. With none of the prefixes: Relative to the markdown file <br/> 게시글의 표지 이미지 경로.<br/>1. `http://` 또는 `https://`로 시작: 웹 이미지 사용<br/>2. `/`로 시작: `public` 디렉토리의 이미지를 가리킴<br/>3. 접두사 없음: Markdown 파일의 상대 위치 |
| `tags`        | The tags of the post. <br/> 게시글의 태그.                                                                                                                                                                  |
| `category`    | The category of the post. <br/> 게시글의 카테고리.                                                                                                                                                             |
| `draft`       | If this post is still a draft, which won't be displayed. <br/> 게시글이 초안인 경우 표시되지 않습니다.                                                                                                           |

## Where to Place the Post Files
## 게시글 파일 위치

Your post files should be placed in `src/content/posts/` directory. You can also create sub-directories to better organize your posts and assets.
게시글 파일은 `src/content/posts/` 디렉토리에 배치해야 합니다. 게시글과 자산을 더 잘 정리하기 위해 하위 디렉토리를 만들 수도 있습니다.

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```
