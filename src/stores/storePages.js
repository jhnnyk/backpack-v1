import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useStorePages = defineStore('pages', () => {
  const route = useRoute()

  // state
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

  const currentPageId = ref('')

  // helpers
  watch(route, () => (currentPageId.value = route.params.pageId), {
    immediate: true,
  })

  // actions
  const addPage = () => {
    console.log('add page...')
  }

  return {
    pages,
    currentPageId,
    addPage,
  }
})
