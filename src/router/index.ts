import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Reviews from '@/views/Reviews.vue'
import ReviewDetail from '@/views/ReviewDetail.vue'
import BookLists from '@/views/BookLists.vue'
import Stats from '@/views/Stats.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/reviews', name: 'reviews', component: Reviews },
    { path: '/reviews/:id', name: 'review-detail', component: ReviewDetail },
    { path: '/booklists', name: 'booklists', component: BookLists },
    { path: '/stats', name: 'stats', component: Stats },
  ],
})

export default router
