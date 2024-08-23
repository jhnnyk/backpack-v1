import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { reactive, watch } from 'vue'

export const useStoreSettings = defineStore('settings', () => {
  // state
  const settings = reactive({
    confirmDeletePage: true,
    showUnfinishedTodoCount: false,
  })

  // watch settings
  watch(settings, () => {
    saveSettings()
  })

  // actions
  const saveSettings = () => {
    LocalStorage.set('settings', settings)
  }

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings')

    if (savedSettings) {
      Object.assign(settings, savedSettings)
    }
  }

  // return
  return {
    settings,
    loadSettings,
  }
})
