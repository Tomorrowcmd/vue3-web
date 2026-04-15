<template>
  <AppHeader :search-query="searchQuery" @submit="handleSearch" />

  <main class="detail-page">
    <template v-if="book">
      <section class="detail-hero">
        <div class="detail-hero-inner">
          <RouterLink class="back-link" to="/reviews">← 返回书评列表</RouterLink>

          <div class="detail-layout">
            <div class="detail-copy">
              <span class="category-chip">{{ book.category }}</span>
              <h1>{{ book.title }}</h1>
              <p class="intro">{{ book.intro }}</p>

              <div class="meta-row">
                <span>{{ book.author }}</span>
                <span>{{ book.date }}</span>
                <span>{{ book.readTime }}</span>
              </div>

              <div class="tag-row">
                <span v-for="tag in book.tags" :key="tag" class="tag-chip">#{{ tag }}</span>
              </div>
            </div>

            <div class="cover-card">
              <img :src="book.cover" :alt="book.title" />
            </div>
          </div>
        </div>
      </section>

      <section class="content-shell">
        <div class="article-layout">
          <article class="article-card">
            <div class="article-heading">
              <p class="eyebrow">Review Essay</p>
              <h2>正文</h2>
            </div>

            <div class="article-content">
              <p v-for="paragraph in book.content" :key="paragraph">{{ paragraph }}</p>
            </div>
          </article>

          <aside class="sidebar">
            <section class="side-card">
              <h3>阅读摘要</h3>
              <dl class="summary-list">
                <div>
                  <dt>作者</dt>
                  <dd>{{ book.author }}</dd>
                </div>
                <div>
                  <dt>分类</dt>
                  <dd>{{ book.category }}</dd>
                </div>
                <div>
                  <dt>评分</dt>
                  <dd>{{ book.rating }} / 5</dd>
                </div>
              </dl>
            </section>

            <section class="side-card">
              <h3>相关推荐</h3>
              <div class="related-list">
                <RouterLink
                  v-for="item in relatedBooks"
                  :key="item.id"
                  :to="item.href"
                  class="related-item"
                >
                  <img :src="item.cover" :alt="item.title" />
                  <div>
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.category }}</span>
                  </div>
                </RouterLink>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </template>

    <section v-else class="empty-state">
      <h1>这篇书评暂时不存在</h1>
      <p>可能是链接失效了，或者这篇内容还没有整理完成。</p>
      <RouterLink to="/reviews" class="empty-link">返回书评页</RouterLink>
    </section>
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useBookListStore } from '@/stores/bookListStore'

const route = useRoute()
const store = useBookListStore()
const { latestReviews } = storeToRefs(store)

const searchQuery = ref('')

const bookId = computed(() => Number(route.params.id))
const book = computed(() => store.bookById(bookId.value))

const relatedBooks = computed(() => {
  if (!book.value) {
    return []
  }

  return latestReviews.value
    .filter((item) => item.id !== book.value?.id)
    .filter(
      (item) =>
        item.category === book.value?.category ||
        item.tags.some((tag) => book.value?.tags.includes(tag)),
    )
    .slice(0, 3)
})

const handleSearch = (value: string) => {
  searchQuery.value = value
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #fbf7f2 0%, #f8f3ed 100%);
}

.detail-hero {
  padding: 34px 0 24px;
}

.detail-hero-inner,
.content-shell {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
}

.back-link,
.empty-link {
  display: inline-flex;
  margin-bottom: 24px;
  color: #a47e52;
  text-decoration: none;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 34px;
  align-items: start;
}

.detail-copy,
.cover-card,
.article-card,
.side-card {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(186, 161, 129, 0.18);
  border-radius: 24px;
  box-shadow: 0 16px 34px rgba(108, 85, 58, 0.08);
}

.detail-copy {
  padding: 32px;
}

.category-chip,
.tag-chip {
  display: inline-flex;
  padding: 7px 14px;
  color: #a47e52;
  background: #fffaf4;
  border: 1px solid rgba(164, 126, 82, 0.18);
  border-radius: 999px;
}

.detail-copy h1 {
  margin: 18px 0 16px;
  color: #3f2d1e;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.2;
  font-family: 'Georgia', serif;
}

.intro {
  color: rgba(81, 58, 36, 0.78);
  font-size: 18px;
  line-height: 1.8;
}

.meta-row,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
  color: rgba(95, 70, 46, 0.72);
}

.cover-card {
  overflow: hidden;
}

.cover-card img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
}

.content-shell {
  padding: 8px 0 80px;
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 34px;
}

.article-card {
  padding: 32px;
}

.article-heading {
  margin-bottom: 22px;
}

.eyebrow {
  margin-bottom: 10px;
  color: #b18857;
  font-size: 13px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.article-heading h2,
.side-card h3 {
  color: #493423;
  font-size: 24px;
  font-family: 'Georgia', serif;
}

.article-content p {
  color: #5b4029;
  font-size: 17px;
  line-height: 1.95;
}

.article-content p + p {
  margin-top: 18px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.side-card {
  padding: 24px;
}

.summary-list {
  margin-top: 18px;
}

.summary-list div + div {
  margin-top: 14px;
}

.summary-list dt {
  margin-bottom: 6px;
  color: rgba(95, 70, 46, 0.58);
  font-size: 13px;
  text-transform: uppercase;
}

.summary-list dd {
  color: #5a4029;
  font-size: 16px;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
}

.related-item {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.related-item img {
  width: 76px;
  height: 76px;
  object-fit: cover;
  border-radius: 14px;
}

.related-item strong {
  display: block;
  margin-bottom: 6px;
  color: #4a3321;
  font-size: 15px;
  line-height: 1.5;
}

.related-item span {
  color: rgba(95, 70, 46, 0.68);
  font-size: 13px;
}

.empty-state {
  width: min(720px, calc(100% - 48px));
  margin: 0 auto;
  padding: 96px 0 140px;
  text-align: center;
}

.empty-state h1 {
  margin-bottom: 14px;
  color: #3f2d1e;
  font-size: 36px;
}

.empty-state p {
  margin-bottom: 24px;
  color: rgba(95, 70, 46, 0.72);
  font-size: 17px;
}

@media (max-width: 1080px) {
  .detail-layout,
  .article-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .detail-hero-inner,
  .content-shell,
  .empty-state {
    width: min(1240px, calc(100% - 24px));
  }

  .detail-copy,
  .article-card,
  .side-card {
    padding: 24px;
  }
}
</style>
