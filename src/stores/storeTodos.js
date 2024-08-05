import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from 'src/boot/firebase'
import { collection, addDoc } from 'firebase/firestore'

export const useStoreTodos = defineStore('todos', () => {
  // state
  const todos = ref([
    {
      id: 'id1',
      pageId: 'pageId1',
      name: 'Go Shopping',
      description: 'lorem ipsum',
      completed: false,
    },
    {
      id: 'id2',
      pageId: 'pageId1',
      name: 'Buy skateboard',
      description: 'lorem ipsum',
      completed: false,
    },
    {
      id: 'id3',
      pageId: 'pageId2',
      name: 'buy car tires',
      description: 'lorem ipsum',
      completed: false,
    },
    {
      id: 'id4',
      pageId: 'pageId2',
      name: 'walk the dog',
      description: 'lorem ipsum',
      completed: false,
    },
  ])

  // actions
  const addNewTodo = async (newTodo) => {
    const docRef = await addDoc(collection(db, 'todos'), newTodo)
    console.log('Document written with ID: ', docRef.id)
  }

  // getters
  const pageTodos = (pageId) => {
    return todos.value.filter((todo) => todo.pageId == pageId)
  }

  return {
    todos,
    addNewTodo,
    pageTodos,
  }
})
