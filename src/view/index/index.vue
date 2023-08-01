<template>
  <div
    class="index-page flex flex-col justify-between min-h-screen p-4 md:p-12 pt-24 md:pt-48"
  >
    <!-- <div class="index-page-top flex justify-between">
      <p></p>
      <p></p>
    </div> -->
    <div class="index-page-search flex flex-col justify-center">
      <div v-show="isShowTime" class="text-center mb-4">
        <span class="text-6xl text-bold text-slate-900 dark:text-white">
          {{ currentTime }}
        </span>
        <div class="text-xl mt-2 mb-4 text-slate-900 dark:text-white">
          {{ currentDate }}
        </div>
      </div>
      <Search />
    </div>
    <div
      class="index-page-bottom flex justify-between relative items-end md:justify-end"
    >
      <div
        v-show="isShowStatement"
        class="flex flex-col justify-center text-stone-500 dark:text-slate-400 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <p class="index-page-statement">「 {{ statement.hitokoto }} 」</p>
        <!-- <div class="flex items-center justify-center gap-2">
          <span>{{ statement.from }}</span> -->
        <!-- <span v-show="statement.from_who">{{ statement.from_who }}</span> -->
        <!-- </div> -->
      </div>
      <div class="flex">
        <el-tooltip
          class="box-item"
          content="2023 OneStep design by CoverJ"
          placement="top-end"
        >
          <el-button text="plain">
            <el-icon><QuestionFilled /></el-icon>
          </el-button>
        </el-tooltip>

        <el-popover
          placement="top-end"
          title="设置"
          width="220"
          trigger="click"
        >
          <template #reference>
            <el-button text="plain">
              <el-icon><Setting /></el-icon>
            </el-button>
          </template>
          <SettingCom />
        </el-popover>
        <!-- <p class="text-bold text-lg text-stone-500 tracking-wide">OneStep</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

import { Setting, QuestionFilled, Link } from '@element-plus/icons-vue'
import Search from '@/components/search/index.vue'
import SettingCom from '@/components/setting/index.vue'
import { useStatementStore } from '@/store/statement'
import { onMounted, ref } from 'vue'
import { onUnmounted } from 'vue'
import { getWeekDay } from '@/utils'
import { computed } from 'vue'

import { useSettingStore } from '@/store/setting'
const settingStore = useSettingStore()
const { isShowTime, isShowStatement } = storeToRefs(settingStore)

const statementStore = useStatementStore()
const { statement } = storeToRefs(statementStore)
const { setStatement } = statementStore
if (isShowStatement.value) {
  setStatement()
}

const currentTime = ref(dayjs().format('HH:mm'))
const currentDate = computed(() => {
  const day = dayjs().format('MM/DD')
  const week = dayjs().format('dddd')
  return `${day} ${getWeekDay(week)}`
})
const timer = setInterval(() => {
  currentTime.value = dayjs().format('HH:mm')
}, 1000 * 60)

onMounted(() => {
  if (!isShowTime.value) {
    clearInterval(timer)
  }
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss">
.index-page {
  .index-page-search {
    // @apply mb-96;
  }
  .index-page-bottom {
    .index-page-statement {
      line-height: 32px;
    }
  }
}
</style>
