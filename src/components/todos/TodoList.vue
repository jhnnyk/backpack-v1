<template>
  <q-list class="full-width q-pt-md">
    <Sortable
      @end="storeTodos.sortEnd"
      :list="pageTodos"
      :options="{ handle: '.handle' }"
      item-key="id"
      tag="div"
    >
      <template #item="{ element, index }">
        <ToDoItem :key="element.id" :todo="element" :index="index" dense />
      </template>
    </Sortable>
  </q-list>
</template>

<script setup>
import { Sortable } from 'sortablejs-vue3'
import { useStoreTodos } from 'src/stores/storeTodos'
import ToDoItem from 'src/components/todos/ToDoItem.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const storeTodos = useStoreTodos()
const route = useRoute()

let pageTodos = ref([])

watch(
  [route, storeTodos.pageTodos],
  () => {
    pageTodos.value = storeTodos.pageTodos(route.params.pageId)
  },
  { immediate: true }
)
</script>
