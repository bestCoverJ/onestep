import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const searchSuggest = ref([])
  const popoverisShow = ref(false)
  const popoverSelectIndex = ref(null)

  const setPopoverisShow = (bool) => {
    popoverisShow.value = bool || false
  }
  const setPopoverSelectIndex = () => {
    popoverSelectIndex.value = null
  }
  const setSearchSuggest = (suggests) => {
    searchSuggest.value = suggests || []
  }

  const addPopoverSelectIndex = () => {
    if (Number.isFinite(popoverSelectIndex.value)) {
      popoverSelectIndex.value++
    } else {
      popoverSelectIndex.value = 0
    }
  }

  const subtractPopoverSelectIndex = () => {
    if (Number.isFinite(popoverSelectIndex.value)) {
      popoverSelectIndex.value--
    } else {
      popoverSelectIndex.value = 0
    }
  }
  return {
    popoverisShow,
    searchSuggest,
    popoverSelectIndex,
    setPopoverisShow,
    setSearchSuggest,
    setPopoverSelectIndex,
    addPopoverSelectIndex,
    subtractPopoverSelectIndex,
  }
})
