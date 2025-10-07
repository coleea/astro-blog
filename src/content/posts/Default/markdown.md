---
title: Markdown Example
published: 1001-10-01
description: A simple example of a Markdown blog post.
image: "https://api.boxmoe.com/random.php"
tags: [Markdown, Blogging, Demo]
category: Default
draft: false
series: Examples
---

# An h1 header
# 1단계 제목

Paragraphs are separated by a blank line.
단락은 빈 줄로 구분됩니다.

2nd paragraph. _Italic_, **bold**, and `monospace`. Itemized lists
look like:
두 번째 단락. *이탤릭체*, **굵게**, 그리고 `고정폭 글꼴`. 목록은 다음과 같이 보입니다:

- this one
- 이것
- that one
- 저것
- the other one
- 다른 것

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.
참고로 --- 별표를 고려하지 않고 --- 실제 텍스트 내용은 4열부터 시작합니다.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.
> 인용 블록은 이렇게 작성됩니다.
>
> 원하시면 여러 단락에 걸쳐 작성할 수 있습니다.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺
긴 대시는 3개의 대시를 사용합니다. 범위는 2개의 대시를 사용합니다(예: "모두 12-14장에 있습니다"). 세 개의 점...은 줄임표로 변환됩니다. 유니코드를 지원합니다. ☺

## An h2 header
## 2단계 제목

Here's a numbered list:
다음은 번호가 매겨진 목록입니다:

1. first item
1. 첫 번째 항목
2. second item
2. 두 번째 항목
3. third item
3. 세 번째 항목

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:
실제 텍스트가 4열부터 시작하는 것을 다시 주목하세요(왼쪽에서 4자). 다음은 코드 샘플입니다:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:
예상하셨겠지만, 4칸 들여쓰기입니다. 참고로, 블록 들여쓰기 대신 원하시면 구분된 블록을 사용할 수 있습니다:

```
define foobar() {
    print "Welcome to flavor country!";
}
```

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:
(이렇게 하면 복사 및 붙여넣기가 더 쉬워집니다). 선택적으로 Pandoc이 구문 강조를 하도록 구분된 블록을 표시할 수 있습니다:

```python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
```

### An h3 header
### 3단계 제목

Now a nested list:
이제 중첩 목록입니다:

1. First, get these ingredients:
1. 먼저, 다음 재료를 준비하세요:

    - carrots
    - 당근
    - celery
    - 셀러리
    - lentils
    - 렌즈콩

2. Boil some water.
2. 물을 끓이세요.

3. Dump everything in the pot and follow
    this algorithm:
3. 모든 것을 냄비에 넣고 다음 알고리즘을 따르세요:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.
    나무 숟가락을 건드리지 마세요. 떨어질 것입니다.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).
텍스트가 항상 4칸 들여쓰기에 정렬되는 것을 다시 주목하세요(위의 3번 항목을 계속하는 마지막 줄 포함).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].
다음은 [웹사이트](http://foo.bar) 링크, [로컬 문서](local-doc.html) 링크, 그리고 [현재 문서의 섹션 제목](#an-h2-header) 링크입니다. 다음은 각주입니다[^1].

[^1]: Footnote text goes here.
[^1]: 각주 텍스트가 여기에 들어갑니다.

Tables can look like this:
표는 다음과 같이 보일 수 있습니다:

size material color

---

9 leather brown
10 hemp canvas natural
11 glass transparent

Table: Shoes, their sizes, and what they're made of
표: 신발, 크기 및 재질

(The above is the caption for the table.) Pandoc also supports
multi-line tables:
(위는 표의 캡션입니다.) Pandoc은 여러 줄 표도 지원합니다:

---

keyword text

---

red Sunsets, apples, and
other red or reddish
things.

green Leaves, grass, frogs
and other things it's
not easy being.

---

A horizontal rule follows.
다음은 수평선입니다.

---

Here's a definition list:
다음은 정의 목록입니다:

apples
: Good for making applesauce.
사과
: 애플소스를 만드는 데 좋습니다.

oranges
: Citrus!
오렌지
: 감귤류 과일!

tomatoes
: There's no "e" in tomatoe.
토마토
: "tomato"에는 "e"가 없습니다.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)
다시, 텍스트는 4칸 들여쓰기됩니다. (각 용어/정의 쌍 사이에 빈 줄을 넣으면 내용이 더 분산됩니다.)

Here's a "line block":
다음은 "라인 블록"입니다:

| Line one
| 첫 번째 줄
| Line too
| 두 번째 줄
| Line tree
| 세 번째 줄

and images can be specified like so:
이미지는 다음과 같이 지정할 수 있습니다:

[//]: # (![example image]&#40;./demo-banner.png "An exemplary image"&#41;)

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:
인라인 수학 방정식은 다음과 같이 삽입됩니다: $\omega = d\phi / dt$. 디스플레이 수학은 별도의 줄에 두 개의 달러 기호로 둘러싸야 합니다:

$$I = \int \rho R^{2} dV$$

$$
\begin{equation*}
\pi
=3.1415926535
 \;8979323846\;2643383279\;5028841971\;6939937510\;5820974944
 \;5923078164\;0628620899\;8628034825\;3421170679\;\ldots
\end{equation*}
$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.
그리고 문자 그대로 표시하고 싶은 구두점 문자는 백슬래시로 이스케이프할 수 있습니다. 예: \`foo\`, \*bar\* 등.
