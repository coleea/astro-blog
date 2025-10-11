---
title: Life of a Navigation
published: 2025-10-08
description: "the entire process when Navigation of web browser is triggered"
image: "./index.jpeg"
tags: []
category: Default
draft: false

---


# 내비게이션의 생애
내비게이션은 브라우저의 주요 기능 중 하나입니다. 사용자가 문서를 로드하는 과정을 말합니다. 이 문서는 URL 바에 URL이 입력된 순간부터 웹 페이지가 완전히 로드될 때까지의 내비게이션 생애를 추적합니다. 이는 여러 유형의 내비게이션 중 하나의 예시이며, 일부는 렌더러 프로세스와 같은 다른 위치에서 시작될 수 있습니다.
참고 자료:
 * [내비게이션의 생애 기술 강연](https://youtu.be/mX7jQsGCF6E) 및 [슬라이드](https://docs.google.com/presentation/d/1YVqDmbXI0cllpfXD7TuewiexDNZYfwk6fRdmoXJbBlM/edit), Chrome University의 개요.
 * [내비게이션 개념](navigation_concepts.md), Chromium의 내비게이션 관련 개념에 대한 유용한 정보.
[TOC]
## BeforeUnload
URL이 입력되면 내비게이션의 첫 번째 단계는, 만약 문서가 이미 로드된 상태라면 이전 문서의 beforeunload 이벤트 핸들러를 실행하는 것입니다. 이를 통해 이전 문서는 사용자에게 페이지를 떠날 것인지 물어보며, 저장되지 않은 데이터의 손실을 방지할 수 있습니다. 이 경우 사용자는 내비게이션을 취소할 수 있으며 더 이상의 작업은 수행되지 않습니다.
## 네트워크 요청 및 응답
beforeunload 핸들러가 등록되어 있지 않거나 사용자가 진행에 동의하면, 다음 단계는 렌더링할 문서의 콘텐츠를 가져오기 위해 지정된 URL로 네트워크 요청을 보내는 것입니다. (ServiceWorker, WebUI, 캐시, data: 등과 같은 경우에는 모든 내비게이션이 실제 네트워크로 연결되지는 않습니다.)
네트워크 오류(예: DNS 확인 오류, 소켓 연결 시간 초과 등)가 발생하지 않는다고 가정하면, 서버는 응답 헤더가 먼저 도착하는 데이터로 응답할 것입니다. 파싱된 헤더는 다음에 수행해야 할 작업을 결정하기에 충분한 정보를 제공합니다.
HTTP 응답 코드를 통해 브라우저 프로세스는 다음 조건 중 하나가 발생했는지 알 수 있습니다.
* 성공적인 응답이 이어짐 (2xx)
* 리디렉션이 발생함 (응답 3xx)
* HTTP 수준의 오류가 발생함 (응답 4xx, 5xx)
새로운 문서가 렌더링되지 않고 내비게이션 네트워크 요청이 완료될 수 있는 두 가지 경우가 있습니다. 첫 번째는 HTTP 응답 코드 204 또는 205로, 브라우저에 응답은 성공적이었지만 뒤따르는 콘텐츠가 없으므로 현재 문서가 계속 활성 상태를 유지해야 함을 알립니다. 다른 경우는 서버가 `Content-Disposition` 응답 헤더로 응답하여 해당 응답을 내비게이션 대신 다운로드로 처리해야 함을 나타내는 경우입니다.
서버가 리디렉션으로 응답하면 Chromium은 HTTP 응답 코드와 Location 헤더를 기반으로 다른 요청을 보냅니다. 브라우저는 오류나 성공적인 응답을 만날 때까지 리디렉션을 계속 따릅니다.
더 이상 리디렉션이 없으면 네트워크 스택은 서버가 보낸 응답 유형을 감지하기 위해 MIME 타입 스니핑이 필요한지 결정합니다. 이는 응답이 204/205도 아니고 다운로드도 아니며, 이미 `Content-Type` 응답 헤더가 없고 `X-Content-Type-Options: nosniff` 응답 헤더를 포함하지 않는 경우에만 필요합니다. MIME 타입 스니핑이 필요한 경우 네트워크 스택은 커밋을 진행하기 전에 실제 응답 데이터의 작은 덩어리를 읽습니다.
## 커밋
이 시점에서 응답은 렌더링할 새 문서를 사용하는 브라우저 프로세스로 네트워크 스택에서 전달됩니다. 브라우저 프로세스는 응답의 출처와 헤더, 그리고 현재 프로세스 모델 및 격리 정책을 기반으로 새 문서에 적합한 렌더러 프로세스를 선택합니다. 그런 다음 선택된 프로세스로 응답을 보내고, 해당 프로세스가 문서를 생성하고 확인 응답을 보낼 때까지 기다립니다. 렌더러 프로세스로부터의 이 확인 응답은 _커밋_ 시간을 표시하며, 이때 브라우저 프로세스는 새 문서를 반영하도록 보안 상태를 변경하고 이전 문서에 대한 세션 기록 항목을 생성합니다.
새 문서를 생성하는 과정의 일부로, 이전 문서는 언로드되어야 합니다. 동일한 렌더러 프로세스에 머무는 내비게이션에서는, 등록된 unload 핸들러 실행을 포함하여 새 문서가 생성되기 전에 Blink에 의해 이전 문서가 언로드됩니다. 크로스-프로세스로 이동하는 내비게이션의 경우, 이전 문서의 프로세스에서 모든 unload 핸들러가 새 프로세스에서 새 문서 생성과 동시에 실행됩니다.
새 문서 생성이 완료되고 브라우저 프로세스가 렌더러 프로세스로부터 커밋 메시지를 받으면 내비게이션이 완료됩니다.
## 로딩
내비게이션이 완료되어도 사용자는 아직 새 페이지를 실제로 볼 수 없습니다. 대부분의 사람들은 한 페이지에서 다른 페이지로 이동하는 행위를 설명하기 위해 내비게이션이라는 단어를 사용하지만, Chromium에서는 해당 프로세스를 두 단계로 분리합니다. 지금까지 설명한 것은 _내비게이션_ 단계입니다. 내비게이션이 커밋되면 Chromium은 _로딩_ 단계로 이동합니다. 로딩은 서버로부터 남은 응답 데이터를 읽고, 파싱하고, 사용자가 볼 수 있도록 문서를 렌더링하고, 함께 제공된 스크립트를 실행하고, 문서에 지정된 모든 하위 리소스를 로드하는 것으로 구성됩니다.
이 두 단계로 나누는 주된 이유는 내비게이션이 커밋되기 전과 후에 오류가 다르게 처리되기 때문입니다. 서버가 HTTP 오류 코드로 응답하는 경우를 생각해 보십시오. 이런 경우 브라우저는 여전히 새 문서를 커밋하지만, 그 문서는 오류 페이지입니다. 오류 페이지는 HTTP 응답 코드를 기반으로 생성되거나 서버로부터 응답 데이터로 읽힙니다. 반면에 성공적인 내비게이션이 실제 문서를 커밋하고 로딩 단계로 넘어간 경우에도 예를 들어 네트워크 연결이 종료되거나 시간 초과되는 등의 오류가 발생할 수 있습니다. 이 경우 브라우저는 오류 페이지를 표시하지 않고 가능한 한 많은 새 문서를 표시합니다.
## WebContentsObserver
Chromium은 [WebContentsObserver] 인터페이스의 메서드를 통해 내비게이션 및 문서 로딩의 다양한 단계를 노출합니다.
### 내비게이션
* `DidStartNavigation` - beforeunload 이벤트 핸들러를 실행한 후, 초기 네트워크 요청을 보내기 전에 호출됩니다.
* `DidRedirectNavigation` - 서버 리디렉션이 발생할 때마다 호출됩니다.
* `ReadyToCommitNavigation` - 브라우저 프로세스가 내비게이션을 커밋하기로 결정하고 렌더러 프로세스를 선택했지만, 렌더러 프로세스로 보내기 전에 호출됩니다. 동일-문서 내비게이션에서는 호출되지 않습니다.
* `DidFinishNavigation` - 내비게이션이 커밋되면 호출됩니다. 커밋은 서버가 오류 코드로 응답한 경우 오류 페이지이거나 성공적인 문서일 수 있습니다.
### 로딩
* `DidStartLoading` - 내비게이션이 시작되기 직전, beforeunload 핸들러를 실행한 후 WebContents당 한 번 호출됩니다. 이는 브라우저 UI가 내비게이션을 위해 스피너나 다른 시각적 표시기를 보여주기 시작하는 것과 동일하며, 내비게이션의 DidStartNavigation 메서드보다 먼저 호출됩니다.
* `DOMContentLoaded` - 문서 자체의 로딩이 완료되었지만 하위 리소스의 로딩이 완료되기 전에 RenderFrameHost당 호출됩니다.
* `DidFinishLoad` - 문서와 모든 하위 리소스의 로딩이 완료되었을 때 RenderFrameHost당 호출됩니다.
* `DidStopLoading` - 최상위 문서, 모든 하위 리소스, 모든 하위 프레임 및 그 하위 리소스의 로딩이 완료되었을 때 WebContents당 한 번 호출됩니다. 이는 브라우저 UI가 내비게이션 및 로딩을 위한 스피너나 다른 시각적 표시기를 멈추는 것과 동일합니다.
* `DidFailLoad` - 예를 들어 모든 응답 데이터를 읽기 전에 네트워크 연결이 종료되는 등 문서 로드에 실패했을 때 RenderFrameHost당 호출됩니다.
## NavigationThrottles
NavigationThrottles는 주어진 내비게이션을 관찰, 지연, 차단 및 취소할 수 있게 합니다. [내비게이션 개념](navigation_concepts.md#rules-for-canceling-navigations)에서 논의된 바와 같이, 일반적으로 내비게이션을 수정하는 데(예: 리디렉션 시뮬레이션) 사용되어서는 안 됩니다. 일반적으로 `NavigationThrottleRegistryImpl::RegisterNavigationThrottles` 또는 `ContentBrowserClient::CreateThrottlesForNavigation`에 등록됩니다.
가장 일반적인 NavigationThrottles 이벤트는 `WillStartRequest`, `WillRedirectRequest`, `WillProcessResponse`이며, 네트워크 요청을 보내기 전, 리디렉션 중, 응답을 받은 후에 내비게이션을 가로챌 수 있게 합니다. 이러한 이벤트는 URLLoader가 필요한 내비게이션에서만 호출됩니다 (NavigationRequest::NeedsUrlLoader 참조).
비-URLLoader 내비게이션(동일-문서 내비게이션, about:blank 등)을 가로채려는 NavigationThrottle은 `NavigationThrottleRegistryImpl::RegisterNavigationThrottlesForCommitWithoutUrlLoader`에 자신을 등록해야 하며, 네트워크 요청 중심의 전체 이벤트 세트 대신 단일 `WillCommitWithoutUrlLoader` 이벤트를 받게 됩니다. 사전 렌더링된 페이지를 활성화하거나 이전-다음 캐시에서 페이지를 복원하는 것과 같은 페이지-활성화 내비게이션은 NavigationThrottles를 완전히 건너뜁니다.
[WebContentsObserver]: https://source.chromium.org/chromium/chromium/src/+/main:content/public/browser/web_contents_observer.h

---

# Life of a Navigation
Navigation is one of the main functions of a browser. It is the process through
which the user loads documents. This documentation traces the life of a
navigation from the time a URL is typed in the URL bar to the time the web page
is completely loaded. This is one example of many types of navigations, some of
which may start in different places (e.g., in the renderer process).
See also:
 * [Life of a Navigation tech talk](https://youtu.be/mX7jQsGCF6E) and
   [slides](https://docs.google.com/presentation/d/1YVqDmbXI0cllpfXD7TuewiexDNZYfwk6fRdmoXJbBlM/edit),
   for an overview from Chrome University.
 * [Navigation Concepts](navigation_concepts.md), for useful notes on
   navigation-related concepts in Chromium.
[TOC]
## BeforeUnload
Once a URL is entered, the first step of a navigation is to execute the
beforeunload event handler of the previous document, if a document is already
loaded. This allows the previous document to prompt the user whether they want
to leave, to avoid losing any unsaved data. In this case, the user can cancel
the navigation and no more work will be performed.
## Network Request and Response
If there is no beforeunload handler registered, or the user agrees to proceed,
the next step is making a network request to the specified URL to retrieve the
contents of the document to be rendered. (Note that not all navigations will go
to the actual network, for cases like ServiceWorkers, WebUI, cache, data:, etc.)
Assuming no network error is encountered (e.g. DNS resolution error, socket
connection timeout, etc.), the server will respond with data, with the response
headers coming first. The parsed headers give enough information to determine
what needs to be done next.
The HTTP response code allows the browser process to know whether one of the
following conditions has occurred:
* A successful response follows (2xx)
* A redirect has been encountered (response 3xx)
* An HTTP level error has occurred (response 4xx, 5xx)
There are two cases where a navigation network request can complete without
resulting in a new document being rendered. The first one is HTTP response code
204 or 205, which tells the browser that the response was successful, but there
is no content that follows, and therefore the current document must remain
active. The other case is when the server responds with a `Content-Disposition`
response header indicating that the response must be treated as a download
instead of a navigation.
If the server responds with a redirect, Chromium makes another request based on
the HTTP response code and the Location header. The browser continues following
redirects until either an error or a successful response is encountered.
Once there are no more redirects, the network stack determines if MIME type
sniffing is needed to detect what type of response the server has sent. This is
only needed if the response is not a 204/205 nor a download, doesn't already
have a `Content-Type` response header, and doesn’t include a
`X-Content-Type-Options: nosniff` response header. If MIME type sniffing is
needed, the network stack will read a small chunk of the actual response data
before proceeding with the commit.
## Commit
At this point the response is passed from the network stack to the browser
process to be used for rendering a new document. The browser process selects
an appropriate renderer process for the new document based on the origin and
headers of the response as well as the current process model and isolation
policy. It then sends the response to the chosen process, waiting for it to
create the document and send an acknowledgement. This acknowledgement from the
renderer process marks the _commit_ time, when the browser process changes its
security state to reflect the new document and creates a session history entry
for the previous document.
As part of creating the new document, the old document needs to be unloaded.
In navigations that stay in the same renderer process, the old document is
unloaded by Blink before the new document is created, including running any
registered unload handlers. In the case of a navigation that goes
cross-process, any unload handlers are executed in the previous document’s
process concurrently with the creation of the new document in the new process.
Once the creation of the new document is complete and the browser process
receives the commit message from the renderer process, the navigation is
complete.
## Loading
Even once navigation is complete, the user doesn't actually see the new page
yet. Most people use the word navigation to describe the act of moving from
one page to another, but in Chromium we separate that process into two phases.
So far we have described the _navigation_ phase; once the navigation has been
committed, Chromium moves into the _loading_ phase. Loading consists of
reading the remaining response data from the server, parsing it, rendering the
document so it is visible to the user, executing any script accompanying it,
and loading any subresources specified by the document.
The main reason for splitting into these two phases is that errors are treated
differently before and after a navigation commits. Consider the case where the
server responds with an HTTP error code. When this happens, the browser still
commits a new document, but that document is an error page. The error page is
either generated based on the HTTP response code or read as the response data
from the server. On the other hand, if a successful navigation has committed a
real document and has moved to the loading phase, it is still possible to
encounter an error, for example a network connection can be terminated or
times out. In that case the browser displays as much of the new document as it
can, without showing an error page.
## WebContentsObserver
Chromium exposes the various stages of navigation and document loading through
methods on the [WebContentsObserver] interface.
### Navigation
* `DidStartNavigation` - invoked after executing the beforeunload event handler
  and before making the initial network request.
* `DidRedirectNavigation` - invoked every time a server redirect is encountered.
* `ReadyToCommitNavigation` - invoked at the time the browser process has
  determined that it will commit the navigation and has picked a renderer
  process for it, but before it has sent it to the renderer process. It is not
  invoked for same-document navigations.
* `DidFinishNavigation` - invoked once the navigation has committed. The commit
  can be either an error page if the server responded with an error code or a
  successful document.
### Loading
* `DidStartLoading` - invoked once per WebContents, when a navigation is about
  to start, after executing the beforeunload handler. This is equivalent to the
  browser UI starting to show a spinner or other visual indicator for
  navigation and is invoked before the DidStartNavigation method for the
  navigation.
* `DOMContentLoaded` - invoked per RenderFrameHost, when the document itself
  has completed loading, but before subresources may have completed loading.
* `DidFinishLoad` - invoked per RenderFrameHost, when the document and all of
  its subresources have finished loading.
* `DidStopLoading` - invoked once per WebContents, when the top-level document,
  all of its subresources, all subframes, and their subresources have completed
  loading. This is equivalent to the browser UI stop showing a spinner or other
  visual indicator for navigation and loading.
* `DidFailLoad` - invoked per RenderFrameHost, when the document load failed,
  for example due to network connection termination before reading all of the
  response data.
## NavigationThrottles
NavigationThrottles allow observing, deferring, blocking, and canceling a given
navigation. They should not generally be used for modifying a navigation (e.g.,
simulating a redirect), as discussed in
[Navigation Concepts](navigation_concepts.md#rules-for-canceling-navigations).
They are typically registered in
`NavigationThrottleRegistryImpl::RegisterNavigationThrottles` or
`ContentBrowserClient::CreateThrottlesForNavigation`.
The most common NavigationThrottles events are `WillStartRequest`,
`WillRedirectRequest`, and `WillProcessResponse`, which allow intercepting a
navigation before sending the network request, during any redirects, and after
receiving the response. These events are only invoked on navigations that
require a URLLoader (see NavigationRequest::NeedsUrlLoader).
A NavigationThrottle that wishes to intercept a non-URLLoader navigation
(same-document navigations, about:blank, etc.) should register itself in
`NavigationThrottleRegistryImpl::RegisterNavigationThrottlesForCommitWithoutUrlLoader`,
and will get a single `WillCommitWithoutUrlLoader` event instead of the full
set of events centered on network requests. Page-activation navigations, such
as activating a prerendered page or restoring a page from the back-forward
cache, skip NavigationThrottles entirely.
[WebContentsObserver]: https://source.chromium.org/chromium/chromium/src/+/main:content/public/browser/web_contents_observer.h
