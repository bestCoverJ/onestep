import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)
export const useSettingStore = defineStore('setting', () => {
  if (!localStorage.getItem('isShowSuggest')) {
    localStorage.setItem('isShowSuggest', true)
  }
  if (!localStorage.getItem('isShowTime')) {
    localStorage.setItem('isShowTime', true)
  }
  if (!localStorage.getItem('isShowStatement')) {
    localStorage.setItem('isShowStatement', true)
  }

  const isShowSuggest = ref(localStorage.getItem('isShowSuggest') === 'true')
  const isShowTime = ref(localStorage.getItem('isShowTime') === 'true')
  const isShowStatement = ref(localStorage.getItem('isShowStatement') === 'true')

  const setIsShowSuggest = (value) => {
    localStorage.setItem('isShowSuggest', value)
    isShowSuggest.value = value
  }
  const setIsShowTime = (value) => {
    localStorage.setItem('isShowTime', value)
    isShowTime.value = value
  }
  const setIsShowStatement = (value) => {
    console.log(value);
    localStorage.setItem('isShowStatement', value)
    isShowStatement.value = value
  }
  const setDarkMode = () => {
    toggleDark()
  }

  return {
    isShowSuggest,
    isShowTime,
    isShowStatement,
    isDark,
    setIsShowSuggest,
    setIsShowTime,
    setIsShowStatement,
    setDarkMode,
  }
})
