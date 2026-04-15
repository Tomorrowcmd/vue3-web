<template>
  <article class="book-card">
    <div class="card-image">
      <img :src="book.cover" :alt="book.title" />
    </div>

    <div class="card-content">
      <div class="content-top">
        <div class="content-header">
          <span class="category-tag">{{ book.category }}</span>

          <div class="rating" :aria-label="`评分 ${book.rating} 星`">
            <span v-for="star in 5" :key="star" class="star">
              {{ star <= book.rating ? '❤' : '♡' }}
            </span>
          </div>
        </div>

        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-intro">{{ book.intro }}</p>

        <div class="tag-group">
          <span v-for="tag in book.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </div>

      <div class="content-footer">
        <span class="date-info">{{ book.date }} · {{ book.readTime }}</span>
        <RouterLink :to="book.href" class="read-more">阅读全文 →</RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { BookCardItem } from '@/stores/bookListStore'

defineProps<{
  book: BookCardItem
}>()
</script>

<style scoped>
.book-card {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  overflow: hidden;
  width: 100%;
  min-height: 286px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(187, 164, 136, 0.18);
  border-radius: 24px;
  box-shadow: 0 14px 36px rgba(104, 79, 55, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 42px rgba(104, 79, 55, 0.12);
}

.card-image {
  min-height: 286px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  padding: 30px 28px 26px;
}

.content-top {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.category-tag {
  padding: 7px 16px;
  color: #a47b4e;
  font-size: 14px;
  background: #fbf5ee;
  border-radius: 999px;
}

.rating {
  display: flex;
  gap: 7px;
}

.star {
  color: #d7a972;
  font-size: 18px;
}

.book-title {
  color: #46301e;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.45;
}

.book-intro {
  display: -webkit-box;
  overflow: hidden;
  color: #75553a;
  font-size: 17px;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 6px 12px;
  color: #b08c61;
  font-size: 14px;
  background: #fffaf4;
  border: 1px solid rgba(176, 140, 97, 0.16);
  border-radius: 10px;
}

.content-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
}

.date-info {
  color: rgba(135, 103, 72, 0.78);
  font-size: 15px;
}

.read-more {
  color: #ac7f4c;
  font-size: 17px;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .book-card {
    grid-template-columns: 1fr;
  }

  .card-image {
    min-height: 220px;
  }

  .content-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
