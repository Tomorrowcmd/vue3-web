<template>
  <nav class="header">
    <div class="header-inner">
      <div class="logo-group">
        <el-icon class="ico-logo" :size="30">
          <Notebook/>
        </el-icon>
        <span class="title">书海拾贝</span>
      </div>

      <ul class="nav-list">
        <li>
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/reviews">书评</RouterLink>
        </li>
        <li>
          <RouterLink to="/booklists">书单</RouterLink>
        </li>
        <li>
          <RouterLink to="/stats">统计</RouterLink>
        </li>
      </ul>

      <div class="right-actions">
        <div class="search-wrapper">
          <el-icon class="icon-inside" @click="handleSubmit">
            <Search/>
          </el-icon>

          <input
              ref="searchInputRef"
              v-model="localQuery"
              type="text"
              class="search-input"
              placeholder="搜索书籍、作者或标签..."
              @keyup.enter="handleSubmit"
          />
        </div>

        <div class="user-profile-placeholder">阅读空间</div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {Notebook, Search} from '@element-plus/icons-vue'

const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits<{
  submit: [value: string]
}>()

const localQuery = ref(props.searchQuery)
const searchInputRef = ref<HTMLInputElement | null>(null)

watch(
    () => props.searchQuery,
    (value) => {
      localQuery.value = value
    },
)

const handleSubmit = () => {
  emit('submit', localQuery.value.trim())
  searchInputRef.value?.focus()
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(14px);
  background: rgba(251, 247, 242, 0.82);
  border-bottom: 1px solid rgba(183, 158, 131, 0.14);
}

.header-inner {
  display: flex;
  width: min(1240px, calc(100% - 48px));
  align-items: center;
  gap: 28px;
  margin: 0 auto;
  padding: 18px 0;
}

.logo-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 10px;
}

.ico-logo {
  color: #9e7c55;
}

.title {
  color: #6f4d2e;
  font-size: 25px;
  font-weight: 700;
  font-family: 'Georgia', serif;
}

.nav-list {
  display: flex;
  gap: 10px;
  color: #8d6b47;
  font-size: 16px;
  list-style: none;
}

.nav-list a {
  display: inline-flex;
  padding: 8px 14px;
  color: inherit;
  text-decoration: none;
  border-radius: 999px;
  transition: all 0.25s ease;
}

.nav-list a:hover,
.nav-list .router-link-active {
  color: #704d2d;
  background: rgba(168, 134, 92, 0.12);
}

.right-actions {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-left: auto;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.icon-inside {
  position: absolute;
  top: 50%;
  left: 14px;
  z-index: 5;
  color: rgba(125, 96, 65, 0.64);
  cursor: pointer;
  transform: translateY(-50%);
}

.search-input {
  width: 280px;
  padding: 12px 16px 12px 42px;
  color: #6f4d2e;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(176, 146, 110, 0.16);
  border-radius: 999px;
  outline: none;
  transition: all 0.25s ease;
}

.search-input:focus {
  width: 320px;
  border-color: rgba(159, 125, 85, 0.42);
  box-shadow: 0 0 0 5px rgba(159, 125, 85, 0.08);
}

.user-profile-placeholder {
  padding: 10px 16px;
  color: #9a7a58;
  font-size: 14px;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(176, 146, 110, 0.16);
  border-radius: 999px;
}

@media (max-width: 960px) {
  .header-inner {
    width: min(1240px, calc(100% - 24px));
    flex-wrap: wrap;
  }

  .nav-list {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .right-actions {
    margin-left: 0;
  }

  .search-input,
  .search-input:focus {
    width: 240px;
  }
}

@media (max-width: 640px) {
  .right-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .user-profile-placeholder {
    text-align: center;
  }

  .search-input,
  .search-input:focus {
    width: 100%;
  }
}
</style>
