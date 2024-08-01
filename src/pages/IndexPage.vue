<template>
  <q-page>
    <p class="q-ma-md">Hello {{ user.displayName }}!</p>
    <TodoList />
  </q-page>
</template>

<script setup>
import TodoList from 'src/components/todos/TodoList.vue'

const props = defineProps({
  user: { type: Object },
})
</script>
