<template>
  <div class="search flex items-center justify-center mt-8 md:mt-4">
    <div class="left-body">
      <el-select
        v-model="currentSearch"
        class="search-select"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div class="flex items-center">
            <IconBaidu class="h-4 w-4 mx-2" /> {{ item.label }}
          </div>
        </el-option>
      </el-select>
    </div>
    <div class="search-body">
      <el-popover
        :visible="popoverisShow"
        :show-after="200"
        :show-arrow="false"
        :width="popoverWidth"
        placement="bottom"
        popper-class="custom-popvoer-class"
      >
        <template #reference>
          <el-input
            class="search-input"
            v-model.lazy="searchContent"
            placeholder="我想搜……"
            @input="onSearchChange"
            @focus="onSearchFocus"
            @blur="onSearchBlur"
            @keyup="onSearchKeyup"
            size="large"
            clearable
          />
        </template>
        <div class="search-suggest flex flex-col">
          <div
            v-for="(suggest, sIndex) in searchSuggest"
            :key="sIndex"
            :class="{ 'is-selected': popoverSelectIndex === sIndex }"
            class="p-1 hover:text-sky-600 hover:bg-stone-50 hover:rounded cursor-pointer dark:hover:bg-stone-700"
            @click="clickSearchSuggest(sIndex)"
          >
            {{ suggest.q }}
          </div>
        </div>
      </el-popover>
    </div>
    <div class="right-body">
      <el-button type="primary" size="large">
        <span class="flex items-center text-sm md:text-xl tracking-wide"
          >搜索</span
        >
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { width: windowWidth, height: windowHeight } = useWindowSize()

import { Search } from '@element-plus/icons-vue'
import { useSearchStore } from '@/store/search'
import { getSearchSuggestion } from '@/api/api.js'
import IconBaidu from '@/assets/icons/IconBaidu.vue'

import { useSettingStore } from '@/store/setting'
const settingStore = useSettingStore()
const { isShowSuggest } = storeToRefs(settingStore)

const searchStore = useSearchStore()
const { popoverisShow, popoverSelectIndex, searchSuggest } =
  storeToRefs(searchStore)
const {
  setPopoverisShow,
  addPopoverSelectIndex,
  subtractPopoverSelectIndex,
  setPopoverSelectIndex,
  setSearchSuggest,
} = searchStore

const currentSearch = ref('/baidu')
const options = [
  {
    value: '/baidu',
    label: '百度',
    searchUrl: 'https://www.baidu.com/s?wd=',
  },
]

const searchContent = ref('')
const onSearchChange = (value) => {
  if (isShowSuggest.value && value) {
    getSearchSuggestion({
      format: 'json',
      query: value,
    }).then((res) => {
      if (res.data) {
        setSearchSuggest(res.data)
        setPopoverisShow(true)
      } else {
        setSearchSuggest([])
        setPopoverisShow(false)
      }
    })
  }
}
const onSearchSubmit = () => {
  window.location.href =
    options.find((o) => o.value === currentSearch.value).searchUrl +
    searchContent.value
}
const addPopoverSelect = () => {
  addPopoverSelectIndex()
  searchContent.value = searchSuggest.value[popoverSelectIndex.value].q
}
const subtractPopoverSelect = () => {
  subtractPopoverSelectIndex()
  searchContent.value = searchSuggest.value[popoverSelectIndex.value].q
}

const onSearchBlur = (event) => {
  setPopoverisShow(false)
}
const onSearchFocus = (event) => {
  if (isShowSuggest.value && searchSuggest.value.length) {
    setPopoverisShow(true)
  }
}
const onSearchKeyup = ({ key, code }) => {
  switch (key) {
    case 'Enter': {
      onSearchSubmit()
      break
    }
    case 'ArrowDown': {
      if (
        popoverisShow.value &&
        popoverSelectIndex.value < searchSuggest.value.length - 1
      ) {
        addPopoverSelect()
      }
      break
    }
    case 'ArrowUp': {
      if (popoverisShow.value && popoverSelectIndex.value > 0) {
        subtractPopoverSelect()
      }
      break
    }
    default: {
      setPopoverSelectIndex()
      break
    }
  }
}
const clickSearchSuggest = (sIndex) => {
  searchContent.value = searchSuggest.value[sIndex].q
  onSearchSubmit()
}
const isMobile = computed(() => {
  return windowWidth.value <= 640
})
const popoverWidth = computed(() => {
  let width
  if (!isMobile.value) {
    width = '24rem'
  } else {
    width = '21rem'
  }
  return width
})
</script>

<style lang="scss">
.search {
  .left-body {
    .search-select {
      @apply w-20 md:w-24;
      .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        .el-input__inner {
          @apply text-sm md:text-base;
        }
      }
    }
  }
  .search-body {
    .search-input {
      .el-input__wrapper {
        @apply text-sm md:text-lg w-48 md:w-96;
        border-radius: 0;
      }
    }
  }
  .right-body {
    .el-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}

.custom-popvoer-class {
  .search-suggest {
    .is-selected {
      @apply text-sky-600 bg-stone-100 rounded dark:bg-slate-700;
    }
  }
}
</style>
