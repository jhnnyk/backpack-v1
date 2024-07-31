import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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

  // getters
  const pageTodos = computed(() => {
    return (pageId) => todos.value.filter((todo) => todo.pageId == pageId)
  })

  return {
    todos,
    pageTodos,
  }
})
