---
title: Markdown Extended Features
published: 1002-05-01
updated: 1002-11-29
description: 'Read more about Markdown features in Fuwari'
image: 'https://eopageapi.2x.nz/pic?img=ua'
tags: [Demo, Example, Markdown, Fuwari]
category: 'Default'
draft: true
series: Examples
---

## GitHub Repository Cards
## GitHub 저장소 카드

You can add dynamic cards that link to GitHub repositories, on page load, the repository information is pulled from the GitHub API.
GitHub 저장소에 링크되는 동적 카드를 추가할 수 있으며, 페이지 로드 시 저장소 정보는 GitHub API에서 가져옵니다.

::github{repo="Fabrizz/MMM-OnSpotify"}

Create a GitHub repository card with the code `::github{repo="<owner>/<repo>"}`.
`::github{repo="<소유자>/<저장소명>"}` 코드를 사용하여 GitHub 저장소 카드를 생성합니다.

```markdown
::github{repo="saicaca/fuwari"}
```

## Admonitions
## 주의 상자

Following types of admonitions are supported: `note` `tip` `important` `warning` `caution`
다음 유형의 주의 상자가 지원됩니다: `note`(노트) `tip`(팁) `important`(중요) `warning`(경고) `caution`(주의)

:::note
Highlights information that users should take into account, even when skimming.
:::note
훑어볼 때도 사용자가 고려해야 할 정보를 강조합니다.
:::

:::tip
Optional information to help a user be more successful.
:::tip
사용자가 더 성공적으로 작업할 수 있도록 돕는 선택적 정보입니다.
:::

:::important
Crucial information necessary for users to succeed.
:::important
사용자가 성공하는 데 필요한 중요한 정보입니다.
:::

:::warning
Critical content demanding immediate user attention due to potential risks.
:::warning
잠재적 위험으로 인해 사용자의 즉각적인 주의가 필요한 중요한 내용입니다.
:::

:::caution
Negative potential consequences of an action.
:::caution
행동의 잠재적인 부정적 결과입니다.
:::

### Basic Syntax
### 기본 구문

```markdown
:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::
```

### Custom Titles
### 사용자 정의 제목

The title of the admonition can be customized.
주의 상자의 제목을 사용자 정의할 수 있습니다.

:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::note[나만의 사용자 정의 제목]
사용자 정의 제목이 있는 노트입니다.
:::

```markdown
:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::
```

### GitHub Syntax
### GitHub 구문

> [!TIP]
> [The GitHub syntax](https://github.com/orgs/community/discussions/16925) is also supported.
> [!TIP]
> [GitHub 구문](https://github.com/orgs/community/discussions/16925)도 지원됩니다.

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```

### Spoiler
### 스포일러

You can add spoilers to your text. The text also supports **Markdown** syntax.
텍스트에 스포일러를 추가할 수 있습니다. 텍스트는 **Markdown** 구문도 지원합니다.

The content :spoiler[is hidden **ayyy**]!
내용 :spoiler[숨겨져 있어요 **아이고**]!

```markdown
The content :spoiler[is hidden **ayyy**]!
```
