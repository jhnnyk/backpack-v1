import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useStorePages = defineStore('pages', () => {
  const route = useRoute()

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

  watch(route, () => (currentPageId.value = route.params.pageId), {
    immediate: true,
  })

  return {
    pages,
    currentPageId,
  }
})
