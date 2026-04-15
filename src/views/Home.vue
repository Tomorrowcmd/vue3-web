<template>
  <AppHeader :search-query="searchQuery" @submit="handleSearch" />

  <main class="main-content">
    <HeroSection :stats="stats" :featured-books="featuredBooks" />

    <section class="content-shell">
      <div class="content-layout">
        <section class="latest-reviews">
          <div class="section-heading">
            <span>最新书评</span>
            <p>
              当前展示 {{ filteredBooks.length }} 篇
              <template v-if="selectedCategory !== '全部'"> · {{ selectedCategory }}</template>
              <template v-if="selectedTag"> · #{{ selectedTag }}</template>
            </p>
          </div>

          <div class="book-list">
            <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
          </div>
        </section>

        <ReviewSidebar
          :categories="categories"
          :tags="popularTags"
          :selected-category="selectedCategory"
          :selected-tag="selectedTag"
          :total="bookList.length"
          :monthly-stats="monthlyStats"
          @select-category="handleCategorySelect"
          @select-tag="handleTagSelect"
        />
      </div>
    </section>
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ReviewSidebar from '@/components/home/ReviewSidebar.vue'
import BookCard from '@/components/books/BookCard.vue'
import { useBookListStore, type BookCardItem } from '@/stores/bookListStore'

interface StatData {
  bookCount: number
  articleCount: number
  listCount: number
}

const bookListStore = useBookListStore()
const { bookList, totalBooks, categories, featuredBooks, popularTags, monthlyStats } =
  storeToRefs(bookListStore)

const searchQuery = ref('')
const selectedCategory = ref('全部')
const selectedTag = ref('')
const stats = reactive<StatData>({
  bookCount: 0,
  articleCount: 0,
  listCount: 0,
})

const timers: number[] = []

const matchesSearch = (book: BookCardItem) => {
  const keyword = searchQuery.value.trim().toLowerCase()

  if (!keyword) {
    return true
  }

  const searchTarget = [book.title, book.category, book.intro, ...book.tags]
    .join(' ')
    .toLowerCase()

  return searchTarget.includes(keyword)
}

const filteredBooks = computed(() => {
  return bookList.value.filter((book) => {
    const matchesKeyword = matchesSearch(book)
    const matchesCategory =
      selectedCategory.value === '全部' || book.category === selectedCategory.value
    const matchesTag = !selectedTag.value || book.tags.includes(selectedTag.value)

    return matchesKeyword && matchesCategory && matchesTag
  })
})

const animateNumber = (target: keyof StatData, endValue: number) => {
  let start = 0
  const duration = 1000
  const stepTime = 20
  const increment = endValue / (duration / stepTime)

  const timer = window.setInterval(() => {
    start += increment

    if (start >= endValue) {
      stats[target] = endValue
      window.clearInterval(timer)
      return
    }

    stats[target] = Math.floor(start)
  }, stepTime)

  timers.push(timer)
}

const handleSearch = (value: string) => {
  searchQuery.value = value
}

const handleCategorySelect = (value: string) => {
  selectedCategory.value = value
}

const handleTagSelect = (value: string) => {
  selectedTag.value = selectedTag.value === value ? '' : value
}

onMounted(() => {
  window.setTimeout(() => {
    animateNumber('bookCount', totalBooks.value)
    animateNumber('articleCount', 92)
    animateNumber('listCount', 30)
  }, 200)
})

onUnmounted(() => {
  timers.forEach((timer) => window.clearInterval(timer))
})
</script>

<style scoped>
.main-content {
  background:
    radial-gradient(circle at top, rgba(224, 206, 182, 0.18), transparent 34%),
    linear-gradient(180deg, #fbf7f2 0%, #f8f3ed 100%);
}

.content-shell {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 42px 0 88px;
}

.content-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 36px;
  align-items: start;
}

.latest-reviews {
  min-width: 0;
}

.section-heading {
  margin-bottom: 26px;
}

.section-heading span {
  display: block;
  margin-bottom: 8px;
  color: #493423;
  font-size: 26px;
  font-weight: 600;
  font-family: 'Georgia', serif;
}

.section-heading p {
  color: rgba(98, 74, 51, 0.64);
  font-size: 15px;
}

.book-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

@media (max-width: 1080px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .content-shell {
    width: min(1240px, calc(100% - 24px));
    padding: 28px 0 64px;
  }

  .section-heading span {
    font-size: 22px;
  }
}
</style>
