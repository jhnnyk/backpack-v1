<template>
  <q-page>
    <q-list class="full-width q-pt-md">
      <ToDoItem
        v-for="todo in storeTodos.todos"
        :key="todo.id"
        :todo="todo"
        dense
      />
    </q-list>
  </q-page>
</template>

<script setup>
import { useStoreTodos } from 'src/stores/storeTodos'
import ToDoItem from 'src/components/todos/ToDoItem.vue'

const storeTodos = useStoreTodos()
</script>
