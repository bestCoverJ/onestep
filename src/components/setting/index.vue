<template>
  <div class="settings">
    <el-form ref="form" :model="setting">
      <el-form-item label="时间信息">
        <el-switch
          v-model="setting.isShowTime"
          active-text="启用"
          inactive-text="关闭"
          @change="setIsShowTime"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="搜索联想">
        <el-switch
          v-model="setting.isShowSuggest"
          active-text="启用"
          inactive-text="关闭"
          @change="setIsShowSuggest"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="每日一言">
        <el-switch
          v-model="setting.isShowStatement"
          active-text="启用"
          inactive-text="关闭"
          @change="setIsShowStatement"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="暗色模式">
        <el-switch
          v-model="setting.isDark"
          active-text="启用"
          inactive-text="自动"
          @change="setDarkMode"
        >
        </el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { useSettingStore } from '@/store/setting'
const settingStore = useSettingStore()
const { isShowSuggest, isShowTime, isShowStatement, isDark } =
  storeToRefs(settingStore)
const { setIsShowSuggest, setIsShowTime, setIsShowStatement, setDarkMode } =
  settingStore
const setting = reactive({
  isShowSuggest: isShowSuggest.value,
  isShowTime: isShowTime.value,
  isShowStatement: isShowStatement.value,
  isDark: isDark.value,
})
</script>

<style lang="scss">
.settings {
  .el-form {
    .el-form-item {
      @apply mb-0;
      &.form-button-group {
        @apply mt-2;
        .el-form-item__content {
          @apply justify-end;
        }
      }
    }
  }
}
</style>
