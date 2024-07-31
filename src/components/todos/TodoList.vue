<template>
  <q-list class="full-width q-pt-md">
    <ToDoItem v-for="todo in pageTodos" :key="todo.id" :todo="todo" dense />
  </q-list>
</template>

<script setup>
import { useStoreTodos } from 'src/stores/storeTodos'
import ToDoItem from 'src/components/todos/ToDoItem.vue'

const storeTodos = useStoreTodos()

const props = defineProps({
  currentPageId: {
    type: String,
    required: true,
  },
})

const pageTodos = storeTodos.pageTodos(props.currentPageId)
</script>
