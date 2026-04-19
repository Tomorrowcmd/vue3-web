<template>
  <aside class="sidebar">
    <section class="side-card">
      <div class="card-title">
        <span class="title-icon">#</span>
        <h3>分类</h3>
      </div>

      <button
          type="button"
          class="category-button"
          :class="{ active: selectedCategory === '全部' }"
          @click="$emit('select-category', '全部')"
      >
        <span>全部</span>
        <strong>{{ total }}</strong>
      </button>

      <button
          v-for="item in categories"
          :key="item.name"
          type="button"
          class="category-button ghost"
          :class="{ active: selectedCategory === item.name }"
          @click="$emit('select-category', item.name)"
      >
        <span>{{ item.name }}</span>
        <strong>{{ item.count }}</strong>
      </button>
    </section>

    <section class="side-card">
      <div class="card-title">
        <span class="title-icon">*</span>
        <h3>热门标签</h3>
      </div>

      <div class="tag-cloud">
        <button
            v-for="tag in tags"
            :key="tag.name"
            type="button"
            class="tag-chip"
            :class="{ active: selectedTag === tag.name }"
            @click="$emit('select-tag', tag.name)"
        >
          #{{ tag.name }}
        </button>
      </div>
    </section>

    <section class="stats-card">
      <h3>本月阅读</h3>

      <div class="stats-list">
        <div class="stat-row">
          <span>已读书籍</span>
          <strong>{{ monthlyStats.booksCount }} 本</strong>
        </div>

        <div class="stat-row">
          <span>阅读时长</span>
          <strong>{{ monthlyStats.hoursCount }}h</strong>
        </div>

        <div class="stat-row">
          <span>完成书评</span>
          <strong>{{ monthlyStats.reviewsCount }}条</strong>
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import type {MonthlyReadingStats} from '@/types/book'

defineProps<{
  categories: Array<{ name: string; count: number }>
  tags: Array<{ name: string; count: number }>
  selectedCategory: string
  selectedTag: string
  total: number
  monthlyStats: MonthlyReadingStats
}>()

defineEmits<{
  'select-category': [value: string]
  'select-tag': [value: string]
}>()
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.side-card,
.stats-card {
  padding: 28px 30px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(186, 161, 129, 0.18);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(108, 85, 58, 0.08);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #4e3622;
}

.card-title h3,
.stats-card h3 {
  font-size: 18px;
  font-weight: 600;
}

.title-icon {
  font-size: 18px;
}

.category-button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding: 14px 16px;
  color: #fff;
  font-size: 16px;
  background: #9d825f;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.category-button strong {
  font-size: 16px;
}

.category-button.ghost {
  color: #76563a;
  background: transparent;
}

.category-button.ghost strong {
  color: rgba(118, 86, 58, 0.55);
}

.category-button:hover {
  transform: translateY(-1px);
}

.category-button.ghost:hover,
.category-button.active {
  color: #fff;
  background: #9d825f;
  box-shadow: 0 10px 22px rgba(157, 130, 95, 0.18);
}

.category-button.active strong,
.category-button.ghost:hover strong {
  color: rgba(255, 255, 255, 0.86);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-chip {
  padding: 9px 16px;
  color: #a47e52;
  font-size: 14px;
  background: #fffaf4;
  border: 1px solid rgba(164, 126, 82, 0.22);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tag-chip:hover,
.tag-chip.active {
  color: #fff;
  background: #b18b5d;
  border-color: #b18b5d;
}

.stats-card {
  color: #fff;
  background: linear-gradient(180deg, #9b7d5a 0%, #87694b 100%);
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 28px;
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-row span {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.82);
}

.stat-row strong {
  font-size: 26px;
  font-weight: 700;
}
</style>
