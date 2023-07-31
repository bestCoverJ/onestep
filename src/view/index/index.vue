<template>
  <div class="index-page flex flex-col justify-between min-h-screen p-12">
    <div class="index-page-top flex justify-between">
      <p>Search</p>
      <p>Home</p>
    </div>
    <div class="index-page-search">
      <Search />
    </div>
    <div class="index-page-bottom flex justify-between">
      <p>design by CoverJ</p>
      <div class="flex flex-col justify-center text-stone-400">
        <div>{{ statement.hitokoto }}</div>
        <div class="flex items-center justify-center gap-2">
          <span>{{ statement.from }}</span>
          <span v-if="statement.from_who">{{ statement.from_who }}</span>
        </div>
      </div>
      <p>About</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import Search from '@/components/search/index.vue'
import { useStatementStore } from '@/store/statement'

const statementStore = useStatementStore()
const { statement } = storeToRefs(statementStore)
const { setStatement } = statementStore

setStatement()
</script>

<style lang="scss">
.index-page {
  .index-page-search {
    @apply mb-96;
  }
}
</style>
