import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { db } from 'src/boot/firebase'
import { addDoc, collection } from 'firebase/firestore'

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
  const addPage = async (newPage) => {
    const docRef = await addDoc(collection(db, 'pages'), newPage)
    console.log('Document written with ID: ', docRef.id)
  }

  return {
    pages,
    currentPageId,
    addPage,
  }
})
