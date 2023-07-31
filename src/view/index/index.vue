<template>
  <div class="index-page flex flex-col justify-between min-h-screen p-12">
    <div class="index-page-top flex justify-between">
      <p></p>
      <p></p>
    </div>
    <div class="index-page-search flex flex-col justify-center">
      <div class="text-center mb-4">
        <span class="text-6xl text-bold">
          {{ currentTime }}
        </span>
        <div class="text-xl mt-2 mb-4">{{ currentDate }}</div>
        <!-- <div class="text-stone-400">{{ statement.hitokoto }}</div> -->
      </div>
      <Search />
    </div>
    <div class="index-page-bottom flex justify-between">
      <p class="text-bold text-lg text-stone-500 tracking-wide">OneStep</p>
      <div class="flex flex-col justify-center text-stone-500">
        <div>{{ statement.hitokoto }}</div>
        <!-- <div class="flex items-center justify-center gap-2">
          <span>{{ statement.from }}</span> -->
        <!-- <span v-if="statement.from_who">{{ statement.from_who }}</span> -->
        <!-- </div> -->
      </div>
      <p class="flex gap-2">
        <el-link :underline="false">
          <el-icon><QuestionFilled /></el-icon>
        </el-link>
        <el-link :underline="false">
          <el-icon><Link /></el-icon>
        </el-link>
        <el-link :underline="false">
          <el-icon><Setting /></el-icon>
        </el-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

import Search from '@/components/search/index.vue'
import { useStatementStore } from '@/store/statement'
import { ref } from 'vue'
import { onUnmounted } from 'vue'
import { getWeekDay } from '@/utils'
import { computed } from 'vue'
import { Setting, QuestionFilled, Link } from '@element-plus/icons-vue'

const statementStore = useStatementStore()
const { statement } = storeToRefs(statementStore)
const { setStatement } = statementStore
setStatement()

const currentTime = ref(dayjs().format('HH:mm'))
const currentDate = computed(() => {
  const day = dayjs().format('MM/DD')
  const week = dayjs().format('dddd')
  return `${day} ${getWeekDay(week)}`
})
const timer = setInterval(() => {
  currentTime.value = dayjs().format('HH:mm')
}, 1000 * 60)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss">
.index-page {
  .index-page-search {
    @apply mb-96;
  }
}
</style>
