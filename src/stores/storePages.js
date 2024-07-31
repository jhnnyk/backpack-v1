import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStorePages = defineStore('pages', () => {
  const pages = ref([
    {
      id: 'pageId1',
      name: 'Errands',
    },
    {
      id: 'pageId2',
      name: 'Chores',
    },
  ])

  return {
    pages,
  }
})
