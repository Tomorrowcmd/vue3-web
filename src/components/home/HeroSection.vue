<template>
  <section class="welcome-section">
    <div class="hero-inner">
      <div class="hero-copy-area">
        <p class="eyebrow">读书札记 · Book Notes</p>
        <h1>在书海中打捞片刻安静，把思考留给明天。</h1>
        <p class="hero-copy">
          记录每一次被文字击中的瞬间，从书评、书单到阅读感受，慢慢搭起属于自己的精神书架。
        </p>

        <div class="cta-group">
          <RouterLink class="btn-primary" to="/reviews">开始探索</RouterLink>
          <RouterLink class="btn-secondary" to="/booklists">整理书单</RouterLink>
        </div>

        <div class="stats-list">
          <div class="stat-item">
            <span class="num">{{ stats.bookCount }}</span>
            <p class="label">已收录书籍</p>
          </div>

          <div class="stat-item">
            <span class="num">{{ stats.articleCount }}</span>
            <p class="label">书评文章</p>
          </div>

          <div class="stat-item">
            <span class="num">{{ stats.listCount }}</span>
            <p class="label">精选书单</p>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="visual-stack">
          <article v-for="book in featuredBooks" :key="book.id" class="visual-card">
            <img :src="book.cover" :alt="book.title"/>
            <div class="visual-info">
              <span class="visual-category">{{ book.category }}</span>
              <h3>{{ book.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'
import type {BookCardItem} from "@/types/book.ts";


defineProps<{
  stats: {
    bookCount: number
    articleCount: number
    listCount: number
  }
  featuredBooks: BookCardItem[]
}>()
</script>

<style scoped>
.welcome-section {
  position: relative;
  overflow: hidden;
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 40px;
  width: min(1240px, calc(100% - 48px));
  min-height: 420px;
  margin: 0 auto;
  padding: 74px 0 40px;
}

.hero-copy-area {
  max-width: 760px;
}

.hero-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
      90deg,
      rgba(255, 249, 242, 0.96) 0%,
      rgba(255, 249, 242, 0.9) 42%,
      rgba(255, 249, 242, 0.42) 100%
  ),
  url('@/assets/img/ning.jpg') center / cover;
  z-index: -2;
}

.hero-inner::after {
  content: '';
  position: absolute;
  inset: auto auto 36px 50%;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, rgba(191, 154, 111, 0.16), transparent 68%);
  transform: translateX(-10%);
  z-index: -1;
}

.eyebrow {
  margin-bottom: 16px;
  color: #b18857;
  font-size: 13px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.hero-inner h1 {
  width: min(760px, 100%);
  color: #3f2d1e;
  font-size: clamp(2.25rem, 4vw, 4rem);
  line-height: 1.15;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.hero-copy {
  width: min(620px, 100%);
  margin-top: 20px;
  color: rgba(81, 58, 36, 0.76);
  font-size: 18px;
  line-height: 1.8;
}

.cta-group {
  display: flex;
  gap: 16px;
  margin: 32px 0 38px;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 28px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 999px;
  transition: transform 0.25s ease,
  box-shadow 0.25s ease,
  background-color 0.25s ease;
}

.btn-primary {
  color: #fff;
  background: #9f7d55;
  border: 1px solid #9f7d55;
  box-shadow: 0 12px 24px rgba(159, 125, 85, 0.18);
}

.btn-secondary {
  color: #946f45;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(148, 111, 69, 0.2);
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-2px);
}

.stats-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 180px));
  gap: 18px;
}

.stat-item {
  padding: 22px 24px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(178, 149, 116, 0.16);
  border-radius: 20px;
  backdrop-filter: blur(6px);
}

.num {
  display: block;
  margin-bottom: 6px;
  color: #7f5b38;
  font-size: 2rem;
  font-weight: 700;
}

.label {
  color: rgba(85, 62, 40, 0.72);
  font-size: 14px;
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.visual-stack {
  position: relative;
  width: 100%;
  min-height: 420px;
}

.visual-card {
  position: absolute;
  overflow: hidden;
  width: 240px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(178, 149, 116, 0.16);
  border-radius: 26px;
  box-shadow: 0 22px 40px rgba(92, 66, 40, 0.12);
}

.visual-card:nth-child(1) {
  top: 16px;
  right: 20px;
  transform: rotate(-6deg);
}

.visual-card:nth-child(2) {
  top: 120px;
  left: 18px;
  transform: rotate(4deg);
}

.visual-card:nth-child(3) {
  right: 64px;
  bottom: 10px;
  transform: rotate(-2deg);
}

.visual-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.visual-info {
  padding: 16px 18px 18px;
}

.visual-category {
  display: inline-flex;
  margin-bottom: 10px;
  padding: 5px 12px;
  color: #a47b4e;
  font-size: 13px;
  background: #fbf5ee;
  border-radius: 999px;
}

.visual-info h3 {
  color: #4a3321;
  font-size: 16px;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
    width: min(1240px, calc(100% - 32px));
    min-height: auto;
    padding: 52px 0 28px;
  }

  .stats-list {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .cta-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .visual-stack {
    min-height: auto;
  }

  .visual-card {
    position: relative;
    inset: auto;
    width: 100%;
    margin-bottom: 16px;
    transform: none !important;
  }
}
</style>
