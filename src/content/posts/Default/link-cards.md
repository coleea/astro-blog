---
title: Link Cards Example
published: 2025-02-23T00:00:00+00:00
description: Guide to using the link card feature.
tags: [Markdown, Blogging, Demo]
category: Default
draft: true
series: Examples
---

## About Link Cards
## 링크 카드 소개

Link Cards are similar to the `<LinkCard>` component in [Starlight](https://starlight.astro.build), displaying links in a card format.
링크 카드는 [Starlight](https://starlight.astro.build)의 `<LinkCard>` 컴포넌트와 유사하며, 링크를 카드 형식으로 표시합니다.

## Usage
## 사용 방법
> 현재 업데이트됨, 호출 방법은 다음과 같습니다
### 사용자 정의 제목 및 설명
```
::link-card{url="https://fuwari.oh1.top" title="yCENzh's Blog" description="Ciallo~"}
```
::link-card{url="https://fuwari.oh1.top" title="yCENzh's Blog" description="Ciallo~"}

### 이미지 포함
```
::link-card{url="https://github.com" title="Github" description="Hello World!" icon="https://github.com/github.png"}
```
::link-card{url="https://github.com" title="Github" description="Hello World!" icon="https://github.com/github.png"}

> 아래 항목은 모두 더 이상 유효하지 않습니다

Include only a single "bare" link (a link without descriptive text), or something similar, within a paragraph in Markdown, and it will automatically be converted into a Link Card.
Markdown 단락에 설명 텍스트가 없는 단일 "베어 링크"(순수 URL) 또는 유사한 구조만 포함하면 자동으로 링크 카드로 변환됩니다.

```markdown
**External Links**
**외부 링크**

https://astro.build/

<https://github.com/saicaca/fuwari/>

[https://fuwari.oh1.top/](https://fuwari.oh1.top/)

**Internal Links**
**내부 링크**

[/archive/](/archive/)

For more details, see the internalLink option section.
자세한 내용은 internalLink 옵션 섹션을 참조하세요.

**IDN (Internationalized Domain Name)**
**IDN(국제화 도메인 이름)**

https://はじめよう.みんな/
```

https://astro.build/

<https://github.com/yCENzh/Fuwari-yCENzh/>

[https://fuwari.oh1.top/](https://fuwari.oh1.top/)

[/archive/](/archive/)

https://はじめよう.みんな/

> [!NOTE]
> 참고
> Once the cards are displayed, try changing the theme color or enabling dark mode!
> 카드가 표시되면 테마 색상을 변경하거나 다크 모드를 활성화해 보세요!

## Options
## 구성 옵션

You can specify the options in the `astro.config.mjs` file.
`astro.config.mjs` 파일에서 구성 옵션을 지정할 수 있습니다.

```javascript
...
import fuwariLinkCard from "./src/plugins/fuwari-link-card.ts"
...
export default defineConfig({
  ...
  integrations: [
    ...
    fuwariLinkCard(), // Plugin here // 여기에 플러그인 추가
    ...
```

If the order of plugins is complex, you can also specify it as a remark plugin.
플러그인 순서가 복잡한 경우 remark 플러그인으로 지정할 수도 있습니다.

```javascript
...
import remarkLinkCard from "./src/plugins/remark-link-card.ts"
...
export default defineConfig({
  ...
  markdown: {
    ...
    remarkPlugins: [
      ...
      remarkLinkCard, // Plugin here // 여기에 플러그인 추가
      ...
```

| Name             | Type            | Default                                                                                                                                        | Description                                                                                                                                                                                                                                                                    |  
|------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| devMode          | boolean         | [import.meta.env.DEV](https://docs.astro.build/en/guides/environment-variables/#default-environment-variables "Default environment variables") | Enable or disable development mode.                                                                                                                                                                                                                                            |
|                  |                 |                                                                                                                                                | 개발 모드 활성화 또는 비활성화                                                                                                                                                                                                                                                            |
| excludedUrls     | Array<string \| RegExp> | []                                                                                                                                             | A list of strings or regular expressions to exclude specific URLs from processing. This can also help prevent conflicts with other plugins.                                                                                                                                    |
|                  |                 |                                                                                                                                                | 특정 URL을 처리에서 제외하기 위한 문자열 또는 정규 표현식 목록, 다른 플러그인과의 충돌 방지 가능                                                                                                                                                                                                                |
| linkAttributes   | Object          | { target: '', rel: '' }                                                                                                                        | Set the target and relationship attributes for external links. These attributes can also be left unset to delegate handling to other plugins.                                                                                                                                  |
|                  |                 |                                                                                                                                                | 외부 링크의 target 및 rel 속성 설정, 비워두면 다른 플러그인이 처리                                                                                                                                                                                                                     |
| rewriteRules     | Array\<Object\> | []                                                                                                                                             | Rewrite specific metadata attributes fetched from links, such as the title and description.                                                                                                                                                                                    |
|                  |                 |                                                                                                                                                | 링크에서 가져온 특정 메타데이터 속성(예: 제목 및 설명) 재작성                                                                                                                                                                                                                |
| base             | string          | '/'                                                                                                                                            | Specify the same base path as Astro's. For details, refer [here](https://docs.astro.build/en/reference/configuration-reference/#base "Configuration Reference"). **When used as an integration, if not specified, this option will be determined automatically.**              |
|                  |                 |                                                                                                                                                | Astro와 동일한 기본 경로 지정([자세한 내용](https://docs.astro.build/en/reference/configuration-reference/#base)). **통합으로 사용 시 지정하지 않으면 자동으로 결정됨**                                                                                                                              |
| defaultThumbnail | string          | ''                                                                                                                                             | Path to the default thumbnail image to use when the metadata does not include image data. It should be relative to the public directory. For example, set `defaultThumbnail` to 'images/default-thumbnail.jpg' if the image is located at public/images/default-thumbnail.jpg. |
|                  |                 |                                                                                                                                                | 메타데이터에 이미지가 없을 때 사용할 기본 썸네일 경로(public 디렉토리 기준). 예: 이미지가 public/images/default-thumbnail.jpg에 있으면 'images/default-thumbnail.jpg'로 설정                                                                                                                              |
| internalLink     | Object          | { enabled: false, site: '' }                                                                                                                   | Enable internal link processing within your site.                                                                                                                                                                                                                              |
|                  |                 |                                                                                                                                                | 사이트 내부 링크 처리 활성화                                                                                                                                                                                                                                                          |
| cache            | Object          | See detailed options below.                                                                                                                    | Download and cache images during the build process.                                                                                                                                                                                                                            |
|                  |                 |                                                                                                                                                | 빌드 과정에서 이미지 다운로드 및 캐시                                                                                                                                                                                                                                                    |

### linkAttributes
### 링크 속성 구성

| Name   | Type   | Default | Description                                                                                                                      |
|--------|--------|---------|----------------------------------------------------------------------------------------------------------------------------------|
| target | string | ''      | Specify where to open linked documents. The default (empty) does not set a target on links.                                      |
|        |        |         | 링크 문서를 여는 위치 지정(기본값은 비워두면 target 미설정)                                                                                    |
| rel    | string | ''      | Define the relationship between the current document and the linked document. The default (empty) does not set any relationship. |
|        |        |         | 현재 문서와 링크된 문서 간의 관계 정의(기본값은 비워두면 rel 미설정)                                                                               |

### rewriteRules
### 재작성 규칙

| Name         | Type            | Default | Description                                                   |
|--------------|-----------------|---------|---------------------------------------------------------------|
| url          | RegExp          |         | A regular expression pattern is used to match a specific URL. |
|              |                 |         | 특정 URL을 일치시키기 위한 정규 표현식 패턴                             |
| rewriteSteps | Array\<Object\> |         | Defines rewrite rules for specific metadata attributes.       |
|              |                 |         | 특정 메타데이터 속성에 대한 재작성 규칙 정의                                  |

Below is an example that shows how to rewrite the "title" and "description" for metadata fetched from links pointing to a GitHub repository.
다음 예제는 GitHub 저장소를 가리키는 링크에서 가져온 "title" 및 "description" 메타데이터를 재작성하는 방법을 보여줍니다:

```javascript
rewriteRules: [
  {
    url: /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/,
    rewriteSteps: [
      { key: "title", pattern: /:.*/, replacement: "" },
      {
        key: "description",
        pattern: /(?: (?:\. )?Contribute to (?:.+\/.+) .+\.?)|(?: - (?:.+\/.+))$/,
        replacement: "",
      },
      {
        key: "description",
        pattern: /^Contribute to (?:.+\/.+) .+\.?$/,
        replacement: "No description provided.",
      },
    ],
  },
],
```

| Name        | Type   | Default | Description                                                                                                                                             |
|-------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| key         | string |         | Metadata attribute key to be rewritten.                                                                                                                 |
|             |        |         | 재작성할 메타데이터 속성 키 이름                                                                                                                                  |
| pattern     | RegExp |         | Regular expression pattern used to match the current value of the metadata attribute. The part of the value that matches this pattern will be replaced. |
|             |        |         | 메타데이터 속성의 현재 값을 일치시키기 위한 정규 표현식, 일치하는 부분이 교체됨                                                                                                  |
| replacement | string |         | String to replace the matched pattern in the metadata attribute.                                                                                        |
|             |        |         | 메타데이터 속성에서 일치하는 패턴을 교체할 문자열                                                                                                                          |

### internalLink
### 내부 링크 구성

| Name    | Type    | Default | Description                                                                                                                                                                                                                                                          |
|---------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enabled | boolean | false   | Enable or disable internal link processing.                                                                                                                                                                                                                          |
|         |         |         | 내부 링크 처리 활성화 또는 비활성화                                                                                                                                                                                                                                               |
| site    | string  | ''      | Specify the same deployed URL as Astro's. For details, refer [here](https://docs.astro.build/en/reference/configuration-reference/#site "Configuration Reference"). **When used as an integration, if not specified, this option will be determined automatically.** |
|         |         |         | Astro와 동일한 배포 URL 지정([자세한 내용](https://docs.astro.build/en/reference/configuration-reference/#site)). **통합으로 사용 시 지정하지 않으면 자동으로 결정됨**                                                                                                                      |

### cache
### 캐시 구성

| Name         | Type    | Default                                                                                                           | Description                                                                                                                                                                                                                              |  
|--------------|---------|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enabled      | boolean | false                                                                                                             | Enable or disable caching.                                                                                                                                                                                                               |
|              |         |                                                                                                                   | 캐싱 활성화 또는 비활성화                                                                                                                                                                                                                           |
| outDir       | string  | './dist/'                                                                                                         | Output directory path.  For details, refer [here](https://docs.astro.build/en/reference/configuration-reference/#outdir "Configuration Reference"). **Aligning with Astro allows you to benefit from features like image optimization.** |
|              |         |                                                                                                                   | 출력 디렉토리 경로([자세한 내용](https://docs.astro.build/en/reference/configuration-reference/#outdir)). **Astro와 정렬하면 이미지 최적화 등의 기능 혜택**                                                                                                       |
| cacheDir     | string  | './link-card/'                                                                                                    | Cache directory path. If `devMode` is set to true, the final URL to the cached images will be `base + outDir + cacheDir`. Otherwise, it will be `base + cacheDir`.                                                                       |
|              |         |                                                                                                                   | 캐시 디렉토리 경로. `devMode=true`일 때 최종 URL은 `base + outDir + cacheDir`, 그렇지 않으면 `base + cacheDir`                                                                                                                                           |
| maxFileSize  | number  | 0                                                                                                                 | Maximum file size (in bytes) to cache. Set to 0 for no limit.                                                                                                                                                                            |
|              |         |                                                                                                                   | 파일당 최대 캐시 크기(바이트), 0은 무제한                                                                                                                                                                                                 |
| maxCacheSize | number  | 0                                                                                                                 | Maximum total cache size (in bytes). Set to 0 for no limit.                                                                                                                                                                              |
|              |         |                                                                                                                   | 전체 캐시 크기 상한(바이트), 0은 무제한                                                                                                                                                                                                     |
| userAgent    | string  | 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36' | Identifier included in HTTP request headers to specify the client.                                                                                                                                                                       |
|              |         |                                                                                                                   | HTTP 요청 헤더에 포함된 클라이언트 식별자                                                                                                                                                                                                              |

### Quick and Easy Options Setup
### 빠른 옵션 설정

This plugin uses `@fastify/deepmerge` to simplify options setup.
이 플러그인은 `@fastify/deepmerge`를 사용하여 옵션 설정을 간소화합니다.

<https://www.npmjs.com/package/@fastify/deepmerge>

## HTML Structure for Styling
## 스타일링을 위한 HTML 구조

The styles are specified in `src/styles/link-card.css`, and the HTML is automatically generated. Below is an example structure to guide you when customizing the styles:
스타일은 `src/styles/link-card.css`에 정의되어 있으며, HTML은 자동으로 생성됩니다. 다음은 스타일을 사용자 정의할 때 참고할 구조 예제입니다:

```html
<div class="link-card__container">
  <a href="https://astro.build/" class="link-card">
    <div class="link-card__info">
      <div class="link-card__title">Astro</div>
      <div class="link-card__description">Astro builds fast content sites, powerful web applications, dynamic server APIs, and everything in-between.</div>
      <div class="link-card__metadata">
        <div class="link-card__domain">
          <img alt="favicon" class="link-card__favicon" src="https://www.google.com/s2/favicons?domain=astro.build">
          <span class="link-card__domain-name">astro.build</span>
        </div>
      </div>
    </div>
    <div class="link-card__thumbnail">
      <img alt="Astro - Build the web you want." class="link-card__image" src="https://astro.build/og/astro.jpg">
    </div>
  </a>
</div>
```
