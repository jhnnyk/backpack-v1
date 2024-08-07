import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
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

  // actions
  const addNewTodo = async (newTodo) => {
    const docRef = await addDoc(collection(db, 'todos'), newTodo)
    console.log('Document written with ID: ', docRef.id)
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

  // getters
  const pageTodos = (pageId) => {
    return todos.value.filter((todo) => todo.pageId == pageId)
  }

  return {
    todos,
    error,
    todosAreLoading,
    addNewTodo,
    loadTodos,
    pageTodos,
  }
})
