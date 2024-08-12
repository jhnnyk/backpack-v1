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
      updatePage({ content: currentPage.value.content })
    } catch (err) {
      addItemError.value = err.message
    }
  }

  const sortEnd = ({ oldIndex, newIndex }) => {
    const movedEntry = currentPage.value.content[oldIndex]
    currentPage.value.content.splice(oldIndex, 1)
    currentPage.value.content.splice(newIndex, 0, movedEntry)

    updatePage({ content: currentPage.value.content })
  }

  const updatePage = async (updates) => {
    error.value = null
    const itemRef = doc(db, 'pages', currentPage.value.id)
    try {
      await updateDoc(itemRef, updates)
    } catch (err) {
      error.value = err.message
    }
  }

  const deleteContentItem = (contentItemId) => {
    const index = getContentItemIndex(contentItemId)
    currentPage.value.content.splice(index, 1)

    updatePage({ content: currentPage.value.content })
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

  const getContentItemIndex = (contentItemId) => {
    return currentPage.value.content.findIndex(
      (item) => item.id === contentItemId
    )
  }

  return {
    pages,
    error,
    addItemError,
    currentPage,
    pagesAreLoading,
    addPage,
    addNewItem,
    sortEnd,
    loadPages,
    deleteContentItem,
  }
})
