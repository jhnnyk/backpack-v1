import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { db } from 'src/boot/firebase'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'

export const useStorePages = defineStore('pages', () => {
  const route = useRoute()

  // state
  const pages = ref([])
  const error = ref(null)
  const currentPageId = ref('')
  const pagesAreLoading = ref(false)

  // actions
  const addPage = async (newPage) => {
    error.value = null
    try {
      await addDoc(collection(db, 'pages'), newPage)
    } catch (err) {
      error.value = err
    }
  }

  const loadPages = (userId) => {
    let pagesCollectionRef = collection(db, 'pages')
    const q = query(pagesCollectionRef, where('owner', '==', userId))

    const unsubscribe = onSnapshot(
      q,
      (snapShot) => {
        let results = []
        snapShot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        pages.value = results
      },
      (err) => {
        console.log(err.message)
        pages.value = null
        error.value = 'could not fetch pages'
      }
    )

    watchEffect((onInvalidate) => {
      // unsub from collection when watcher is stopped (component unmounted)
      onInvalidate(() => unsubscribe())
    })
  }

  // helpers
  watch(route, () => (currentPageId.value = route.params.pageId), {
    immediate: true,
  })

  // getters
  const pageName = (pageId) => {
    return pages.value.filter((pages) => pages.id == pageId)[0]
  }

  return {
    pages,
    error,
    currentPageId,
    pagesAreLoading,
    addPage,
    loadPages,
    pageName,
  }
})
