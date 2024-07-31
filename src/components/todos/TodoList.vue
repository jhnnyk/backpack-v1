<template>
  <q-list class="full-width q-pt-md">
    <ToDoItem v-for="todo in pageTodos" :key="todo.id" :todo="todo" dense />
  </q-list>
</template>

<script setup>
import { useStoreTodos } from 'src/stores/storeTodos'
import ToDoItem from 'src/components/todos/ToDoItem.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const storeTodos = useStoreTodos()
const route = useRoute()

let pageTodos = ref([])

watch(
  route,
  () => {
    pageTodos.value = storeTodos.pageTodos(route.params.pageId)
  },
  { immediate: true }
)
</script>
