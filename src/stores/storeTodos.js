import { defineStore } from 'pinia'
import { reactive, ref, watchEffect } from 'vue'
import { db } from 'src/boot/firebase'
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore'

export const useStoreTodos = defineStore('todos', () => {
  // state
  const todos = ref([])
  const error = ref(null)
  const todosAreLoading = ref(false)
  const options = reactive({
    sort: true,
  })

  // actions
  const addNewTodo = async (newTodo) => {
    error.value = null
    try {
      await addDoc(collection(db, 'todos'), newTodo)
    } catch (err) {
      error.value = err.message
    }
  }

  const loadTodos = (userId) => {
    let todoCollectionRef = collection(db, 'todos')
    const q = query(todoCollectionRef, where('owner', '==', userId))

    const unsubscribe = onSnapshot(
      q,
      (snapShot) => {
        let results = []
        snapShot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        todos.value = results
      },
      (err) => {
        console.log(err.message)
        todos.value = null
        error.value = 'could not fetch todos'
      }
    )

    watchEffect((onInvalidate) => {
      // unsub from collection when watcher is stopped (component unmounted)
      onInvalidate(() => unsubscribe())
    })
  }

  const sortEnd = ({ oldIndex, newIndex }) => {
    const movedEntry = todos.value[oldIndex]
    todos.value.splice(oldIndex, 1)
    todos.value.splice(newIndex, 0, movedEntry)
  }

  // getters
  const pageTodos = (pageId) => {
    return todos.value.filter((todo) => todo.pageId == pageId)
  }

  return {
    todos,
    error,
    todosAreLoading,
    options,
    addNewTodo,
    loadTodos,
    pageTodos,
    sortEnd,
  }
})
