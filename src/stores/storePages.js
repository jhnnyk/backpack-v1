import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { db } from 'src/boot/firebase'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

export const useStorePages = defineStore('pages', () => {
  const route = useRoute()

  // state
  const pages = ref([])
  const error = ref(null)
  const addItemError = ref(null)
  const pagesAreLoading = ref(false)
  const currentPage = ref({})

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
    pagesAreLoading.value = true
    let pagesCollectionRef = collection(db, 'pages')
    const q = query(
      pagesCollectionRef,
      where('owner', '==', userId),
      orderBy('pageSort')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapShot) => {
        let results = []
        snapShot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        pages.value = results
        pagesAreLoading.value = false
      },
      (err) => {
        console.log(err.message)
        pages.value = null
        error.value = 'could not fetch pages'
        pagesAreLoading.value = false
      }
    )

    watchEffect((onInvalidate) => {
      // unsub from collection when watcher is stopped (component unmounted)
      onInvalidate(() => unsubscribe())
    })
  }

  const addNewItem = async (newItem) => {
    addItemError.value = null
    await currentPage.value.content.push(newItem)
    try {
      const itemRef = doc(db, 'pages', currentPage.value.id)
      await updateDoc(itemRef, { content: currentPage.value.content })
    } catch (err) {
      addItemError.value = err.message
    }
  }

  // helpers
  watch(
    [route, () => pages.value],
    () => {
      currentPage.value = pages.value.find(
        (page) => page.id === route.params.pageId
      )
    },
    { immediate: true }
  )

  return {
    pages,
    error,
    addItemError,
    currentPage,
    pagesAreLoading,
    addPage,
    addNewItem,
    loadPages,
  }
})
