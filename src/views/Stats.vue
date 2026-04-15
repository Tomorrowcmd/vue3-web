<template>
  <AppHeader :search-query="searchQuery" @submit="handleSearch" />

  <main class="page-shell">
    <PageIntro
      eyebrow="Reading Data"
      title="统计页面"
      description="把阅读行为变成可回看的数据：书籍数量、平均评分、标签分布和最近书评节奏，帮助你看见阅读偏好。"
    />

    <section class="content-wrap">
      <div class="metric-grid">
        <article v-for="item in statsOverview" :key="item.label" class="metric-card">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <p>{{ item.hint }}</p>
        </article>
      </div>

      <div class="stats-layout">
        <section class="panel-card">
          <div class="panel-heading">
            <h2>分类占比</h2>
            <p>基于当前书单内容自动汇总</p>
          </div>

          <div class="bar-list">
            <div v-for="item in categoryBreakdown" :key="item.name" class="bar-row">
              <div class="bar-meta">
                <span>{{ item.name }}</span>
                <strong>{{ item.count }} 本 · {{ item.percent }}%</strong>
              </div>
              <div class="bar-track">
                <div class="bar-fill" :style="{ width: `${item.percent}%` }"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="panel-card">
          <div class="panel-heading">
            <h2>标签热度</h2>
            <p>搜索和整理时最常出现的关键词</p>
          </div>

          <div class="tag-cloud">
            <span v-for="tag in popularTags" :key="tag.name" class="tag-chip">
              #{{ tag.name }} · {{ tag.count }}
            </span>
          </div>
        </section>
      </div>

      <section class="panel-card highlights-card">
        <div class="panel-heading">
          <h2>最近书评节奏</h2>
          <p>按时间查看你的近期阅读输出</p>
        </div>

        <div class="highlight-list">
          <article v-for="item in reviewHighlights" :key="item.id" class="highlight-item">
            <span class="highlight-rank">{{ item.ranking }}</span>
            <div class="highlight-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.summary }}</p>
            </div>
            <div class="highlight-meta">
              <span>{{ item.category }}</span>
              <strong>{{ item.date }}</strong>
              <em>{{ item.readTime }}</em>
            </div>
          </article>
        </div>
      </section>
    </section>
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import PageIntro from '@/components/common/PageIntro.vue'
import { useBookListStore } from '@/stores/bookListStore'

const store = useBookListStore()
const { categoryBreakdown, popularTags, reviewHighlights, statsOverview } = storeToRefs(store)

const searchQuery = ref('')

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

.metric-grid,
.stats-layout {
  display: grid;
  gap: 20px;
}

.metric-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-bottom: 28px;
}

.stats-layout {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 28px;
}

.metric-card,
.panel-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(186, 161, 129, 0.18);
  border-radius: 22px;
  box-shadow: 0 16px 34px rgba(108, 85, 58, 0.08);
}

.metric-card span,
.panel-heading p,
.highlight-body p,
.highlight-meta {
  color: rgba(95, 70, 46, 0.68);
}

.metric-card strong {
  display: block;
  margin: 12px 0 8px;
  color: #4a3321;
  font-size: 32px;
}

.panel-heading {
  margin-bottom: 20px;
}

.panel-heading h2 {
  color: #493423;
  font-size: 24px;
  font-family: 'Georgia', serif;
}

.bar-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bar-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #5a4029;
  font-size: 15px;
}

.bar-track {
  height: 12px;
  background: #f2e8db;
  border-radius: 999px;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #b58d60 0%, #8f6d49 100%);
  border-radius: 999px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-chip {
  padding: 10px 14px;
  color: #a47e52;
  font-size: 14px;
  background: #fffaf4;
  border: 1px solid rgba(164, 126, 82, 0.22);
  border-radius: 999px;
}

.highlight-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.highlight-item {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) 140px;
  gap: 18px;
  align-items: start;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(186, 161, 129, 0.18);
}

.highlight-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.highlight-rank {
  color: #b18857;
  font-size: 28px;
  font-weight: 700;
}

.highlight-body h3 {
  margin-bottom: 8px;
  color: #4a3321;
  font-size: 20px;
}

.highlight-body p {
  font-size: 15px;
  line-height: 1.7;
}

.highlight-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  text-align: right;
}

.highlight-meta strong {
  color: #5a4029;
  font-size: 15px;
}

.highlight-meta em {
  font-style: normal;
}

@media (max-width: 1080px) {
  .metric-grid,
  .stats-layout {
    grid-template-columns: 1fr 1fr;
  }

  .highlight-item {
    grid-template-columns: 56px 1fr;
  }

  .highlight-meta {
    text-align: left;
  }
}

@media (max-width: 720px) {
  .metric-grid,
  .stats-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .content-wrap {
    width: min(1240px, calc(100% - 24px));
  }
}
</style>
