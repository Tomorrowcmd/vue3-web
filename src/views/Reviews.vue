<template>
  <AppHeader :search-query="searchQuery" @submit="handleSearch" />

  <main class="page-shell">
    <PageIntro
      eyebrow="Review Atlas"
      title="书评页面"
      description="按时间整理近期书评内容，保留搜索入口，让每一次阅读感受都能在这里继续被找到。"
    />

    <section class="content-wrap">
      <div class="overview-grid">
        <article v-for="item in statsOverview" :key="item.label" class="overview-card">
          <span class="overview-label">{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <p>{{ item.hint }}</p>
        </article>
      </div>

      <div class="reviews-layout">
        <section class="reviews-column">
          <div class="section-heading">
            <span>全部书评</span>
            <p>共 {{ filteredReviews.length }} 篇与关键字相关的内容</p>
          </div>

          <div class="review-list">
            <BookCard v-for="book in filteredReviews" :key="book.id" :book="book" />
          </div>
        </section>

        <aside class="side-panel">
          <div class="panel-card">
            <h3>最近更新</h3>
            <ul>
              <li v-for="book in latestReviews.slice(0, 4)" :key="book.id">
                <strong>{{ book.title }}</strong>
                <span>{{ book.date }}</span>
              </li>
            </ul>
          </div>

          <div class="panel-card">
            <h3>热门标签</h3>
            <div class="tag-cloud">
              <span v-for="tag in popularTags" :key="tag.name" class="tag-chip">#{{ tag.name }}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import PageIntro from '@/components/common/PageIntro.vue'
import BookCard from '@/components/books/BookCard.vue'
import { useBookListStore } from '@/stores/bookListStore'

const store = useBookListStore()
const { latestReviews, popularTags, statsOverview } = storeToRefs(store)

const searchQuery = ref('')

const filteredReviews = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  if (!keyword) {
    return latestReviews.value
  }

  return latestReviews.value.filter((book) =>
    [book.title, book.category, book.intro, ...book.tags].join(' ').toLowerCase().includes(keyword),
  )
})

const handleSearch = (value: string) => {
  searchQuery.value = value
}
</script>

<style scoped>
.page-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #fbf7f2 0%, #f8f3ed 100%);
}

.content-wrap {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 12px 0 80px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 32px;
}

.overview-card,
.panel-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(186, 161, 129, 0.18);
  border-radius: 22px;
  box-shadow: 0 16px 34px rgba(108, 85, 58, 0.08);
}

.overview-label {
  display: block;
  margin-bottom: 14px;
  color: #a47b4e;
  font-size: 14px;
}

.overview-card strong {
  display: block;
  margin-bottom: 8px;
  color: #4a3321;
  font-size: 30px;
}

.overview-card p,
.section-heading p,
.panel-card li span {
  color: rgba(95, 70, 46, 0.68);
  font-size: 14px;
}

.reviews-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 28px;
}

.section-heading {
  margin-bottom: 24px;
}

.section-heading span,
.panel-card h3 {
  color: #493423;
  font-size: 22px;
  font-weight: 600;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.panel-card + .panel-card {
  margin-top: 20px;
}

.panel-card ul {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
  list-style: none;
}

.panel-card li {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.panel-card li strong {
  color: #5a4029;
  font-size: 15px;
  line-height: 1.6;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.tag-chip {
  padding: 8px 14px;
  color: #a47e52;
  font-size: 14px;
  background: #fffaf4;
  border: 1px solid rgba(164, 126, 82, 0.22);
  border-radius: 999px;
}

@media (max-width: 1080px) {
  .overview-grid,
  .reviews-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .content-wrap {
    width: min(1240px, calc(100% - 24px));
  }
}
</style>
