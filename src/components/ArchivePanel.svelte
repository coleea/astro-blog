<script lang="ts">
import { onMount } from "svelte";
import { getPostUrlBySlug } from "../utils/url-utils";

// 컴포넌트가 받는 속성 정의
export let tags: string[] = [];
export let categories: string[] = [];
export let sortedPosts: Post[] = [];

// 게시글과 연도별 그룹화를 위한 데이터 구조 정의
interface Post {
    slug: string;
    data: {
        title: string;
        tags: string[];
        category?: string;
        published: Date;
    };
}

interface Group {
    year: number;
    posts: Post[];
}

// 그룹화된 게시글 데이터 저장
let groups: Group[] = [];

/**
 * 날짜를 MM-DD 형식으로 포맷
 * @param date 날짜 객체
 * @returns 포맷된 날짜 문자열
 */
function formatDate(date: Date) {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
}

/**
 * 태그 배열을 #태그1 #태그2 형식의 문자열로 포맷
 * @param tagList 태그 배열
 * @returns 포맷된 태그 문자열
 */
function formatTag(tagList: string[]) {
    return tagList?.map((t) => `#${t}`).join(" ") || "";
}

onMount(async () => {
    // URL 쿼리 파라미터에서 필터 조건 가져오기
    const params = new URLSearchParams(window.location.search);
    const urlTags = params.getAll("tag");
    const urlCategories = params.getAll("category");
    const uncategorized = params.has("uncategorized");

    // 전체 게시글로 초기화
    let filteredPosts: Post[] = [...sortedPosts];

    // 태그로 필터링
    if (urlTags.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) =>
                Array.isArray(post.data.tags) &&
                urlTags.some((tag) => post.data.tags.includes(tag))
        );
    }

    // 카테고리로 필터링
    if (urlCategories.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) => post.data.category && urlCategories.includes(post.data.category)
        );
    }

    // 미분류 게시글 필터링
    if (uncategorized) {
        filteredPosts = filteredPosts.filter((post) => !post.data.category);
    }

    // 연도별로 게시글 그룹화
    const grouped = filteredPosts.reduce((acc, post) => {
        const year = post.data.published.getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {} as Record<number, Post[]>);

    // 그룹화된 객체를 배열로 변환하고 연도 내림차순으로 정렬
    groups = Object.entries(grouped)
        .map(([year, posts]) => ({
            year: parseInt(year),
            posts,
        }))
        .sort((a, b) => b.year - a.year);
});
</script>

<div class="card-base px-8 py-6">
    <!-- 연도별로 그룹 순회 -->
    {#each groups as group}
        <div>
            <!-- 연도 제목 행 -->
            <div class="flex flex-row w-full items-center h-[3.75rem]">
                <!-- 연도 표시 -->
                <div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
                    {group.year}
                </div>

                <!-- 연도 표시 점 -->
                <div class="w-[15%] md:w-[10%]">
                    <div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
                </div>

                <!-- 게시글 수량 통계 -->
                <div class="w-[70%] md:w-[80%] transition text-left text-50">
                    {group.posts.length} 개의 글
                </div>
            </div>

            <!-- 현재 연도의 게시글 목록 -->
            {#each group.posts as post}
                <a
                    href={getPostUrlBySlug(post.slug)}
                    aria-label={post.data.title}
                    class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                >
                    <div class="flex flex-row justify-start items-center h-full">
                        <!-- 발행 날짜 -->
                        <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                            {formatDate(post.data.published)}
                        </div>

                        <!-- 타임라인 표시 -->
                        <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                            <div
                                class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                                       bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
                                       outline outline-4 z-50
                                       outline-[var(--card-bg)]
                                       group-hover:outline-[var(--btn-plain-bg-hover)]
                                       group-active:outline-[var(--btn-plain-bg-active)]"
                            ></div>
                        </div>

                        <!-- 게시글 제목 -->
                        <div
                            class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
                                   group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                                   text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
                        >
                            {post.data.title}
                        </div>

                        <!-- 게시글 태그 (대화면 표시) -->
                        <div
                            class="hidden md:block md:w-[15%] text-left text-sm transition
                                   whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
                        >
                            {formatTag(post.data.tags)}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/each}
</div>
