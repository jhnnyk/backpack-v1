<template>
  <q-page>
    <TodoList :currentPageId="storePages.currentPageId" />
  </q-page>
</template>

<script setup>
import { useStorePages } from 'src/stores/storePages'
import TodoList from 'src/components/todos/TodoList.vue'

const storePages = useStorePages()
</script>
