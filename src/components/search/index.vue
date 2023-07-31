<template>
  <div class="search flex items-center justify-center">
    <div class="left-body">
      <el-select
        v-model="currentSearch"
        class="search-select w-24"
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
        width="24rem"
        placement="bottom"
        :show-after="200"
        :show-arrow="false"
        popper-class="custom-popvoer-class"
      >
        <template #reference>
          <el-input
            class="search-input"
            v-model.lazy="searchContent"
            placeholder="请输入要搜索的内容"
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
            class="p-1 hover:text-sky-600 hover:bg-stone-50 hover:rounded cursor-pointer"
            @click="clickSearchSuggest(sIndex)"
          >
            {{ suggest.q }}
          </div>
        </div>
      </el-popover>
    </div>
    <div class="right-body">
      <el-button type="primary" size="large"
        ><span class="flex items-center text-xl tracking-wide"
          >搜索</span
        ></el-button
      >
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'

import { Search } from '@element-plus/icons-vue'
import { useSearchStore } from '@/store/search'
import { getSearchSuggestion } from '@/api/api.js'
import IconBaidu from '@/assets/icons/IconBaidu.vue'

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
  if (value) {
    getSearchSuggestion({
      wd: value,
      prod: 'pc',
    }).then((res) => {
      if (res.g) {
        setSearchSuggest(res.g)
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
  if (searchSuggest.value.length) {
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
</script>

<style lang="scss">
.search {
  .left-body {
    .search-select {
      .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        .el-input__inner {
          @apply text-base;
        }
      }
    }
  }
  .search-body {
    .search-input {
      .el-input__wrapper {
        @apply text-lg w-96;
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
      @apply text-sky-600 bg-stone-100 rounded;
    }
  }
}
</style>
