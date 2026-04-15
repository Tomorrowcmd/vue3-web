<template>
  <section class="page-intro">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p class="description">{{ description }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<style scoped>
.page-intro {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 42px 0 20px;
}

.eyebrow {
  margin-bottom: 12px;
  color: #b18857;
  font-size: 13px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.page-intro h1 {
  margin-bottom: 14px;
  color: #3f2d1e;
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1.15;
  font-family: 'Georgia', serif;
}

.description {
  max-width: 720px;
  color: rgba(81, 58, 36, 0.74);
  font-size: 17px;
  line-height: 1.75;
}

@media (max-width: 640px) {
  .page-intro {
    width: min(1240px, calc(100% - 24px));
    padding-top: 28px;
  }
}
</style>
