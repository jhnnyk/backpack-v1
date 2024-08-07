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
  const todos = ref([
    // {
    //   id: 'id1',
    //   pageId: 'pageId1',
    //   name: 'Go Shopping',
    //   description: 'lorem ipsum',
    //   completed: false,
    // },
    // {
    //   id: 'id2',
    //   pageId: 'pageId1',
    //   name: 'Buy skateboard',
    //   description: 'lorem ipsum',
    //   completed: false,
    // },
    // {
    //   id: 'id3',
    //   pageId: 'pageId2',
    //   name: 'buy car tires',
    //   description: 'lorem ipsum',
    //   completed: false,
    // },
    // {
    //   id: 'id4',
    //   pageId: 'pageId2',
    //   name: 'walk the dog',
    //   description: 'lorem ipsum',
    //   completed: false,
    // },
  ])
  const error = ref(null)

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
    addNewTodo,
    loadTodos,
    pageTodos,
  }
})
