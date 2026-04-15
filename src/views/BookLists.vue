<template>
  <AppHeader :search-query="searchQuery" @submit="handleSearch" />

  <main class="page-shell">
    <PageIntro
      eyebrow="Reading Shelves"
      title="书单页面"
      description="按照分类重新整理你的书架，把同一主题下的阅读线索串联起来，方便后续继续补充。"
    />

    <section class="content-wrap">
      <div class="overview-strip">
        <article v-for="item in categories" :key="item.name" class="strip-card">
          <span>{{ item.name }}</span>
          <strong>{{ item.count }}</strong>
        </article>
      </div>

      <section v-for="category in groupedBooks" :key="category.name" class="shelf-section">
        <div class="shelf-heading">
          <div>
            <h2>{{ category.name }}</h2>
            <p>{{ category.books.length }} 本与这一主题有关的阅读记录</p>
          </div>
        </div>

        <div class="shelf-grid">
          <article v-for="book in category.books" :key="book.id" class="shelf-card">
            <img :src="book.cover" :alt="book.title" />
            <div class="shelf-content">
              <span class="book-meta">{{ book.date }} · {{ book.readTime }}</span>
              <h3>{{ book.title }}</h3>
              <p>{{ book.intro }}</p>
              <div class="tag-row">
                <span v-for="tag in book.tags" :key="tag" class="tag-chip">#{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
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
import { useBookListStore } from '@/stores/bookListStore'

const store = useBookListStore()
const { bookList, categories } = storeToRefs(store)

const searchQuery = ref('')

const groupedBooks = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  const filtered = keyword
    ? bookList.value.filter((book) =>
        [book.title, book.category, book.intro, ...book.tags].join(' ').toLowerCase().includes(keyword),
      )
    : bookList.value

  return categories.value
    .map((category) => ({
      name: category.name,
      books: filtered.filter((book) => book.category === category.name),
    }))
    .filter((category) => category.books.length > 0)
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

.overview-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
}

.strip-card,
.shelf-card {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(186, 161, 129, 0.18);
  border-radius: 22px;
  box-shadow: 0 16px 34px rgba(108, 85, 58, 0.08);
}

.strip-card {
  padding: 22px;
}

.strip-card span {
  display: block;
  margin-bottom: 10px;
  color: #a47b4e;
  font-size: 14px;
}

.strip-card strong {
  color: #493423;
  font-size: 28px;
}

.shelf-section + .shelf-section {
  margin-top: 42px;
}

.shelf-heading {
  margin-bottom: 20px;
}

.shelf-heading h2 {
  color: #493423;
  font-size: 24px;
  font-family: 'Georgia', serif;
}

.shelf-heading p,
.book-meta,
.shelf-content p {
  color: rgba(95, 70, 46, 0.7);
}

.shelf-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.shelf-card {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  overflow: hidden;
}

.shelf-card img {
  width: 100%;
  height: 100%;
  min-height: 240px;
  object-fit: cover;
}

.shelf-content {
  padding: 22px 22px 20px;
}

.shelf-content h3 {
  margin: 10px 0 12px;
  color: #4a3321;
  font-size: 22px;
  line-height: 1.45;
}

.shelf-content p {
  font-size: 15px;
  line-height: 1.7;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.tag-chip {
  padding: 8px 12px;
  color: #a47e52;
  font-size: 13px;
  background: #fffaf4;
  border: 1px solid rgba(164, 126, 82, 0.22);
  border-radius: 999px;
}

@media (max-width: 1080px) {
  .shelf-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .shelf-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .content-wrap {
    width: min(1240px, calc(100% - 24px));
  }
}
</style>
