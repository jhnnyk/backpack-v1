<template>
  <q-page>
    <q-list v-for="todo in storeTodos.todos" :key="todo.id" class="full-width">
      <ToDoItem :todo="todo" dense />
    </q-list>
  </q-page>
</template>

<script setup>
import { useStoreTodos } from 'src/stores/storeTodos'
import ToDoItem from 'src/components/todos/ToDoItem.vue'

const storeTodos = useStoreTodos()
</script>
