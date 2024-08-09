<template>
  <h3 class="text-center" v-if="pageName">{{ pageName.name }}</h3>
  <div v-if="storeTodos.todosAreLoading" class="text-center">
    <LoadingSpinner />
  </div>

  <div v-else>
    <div class="row">
      <q-space />
      <q-btn
        @click="storeTodos.options.sort = !storeTodos.options.sort"
        :label="!storeTodos.options.sort ? 'Sort' : 'Done'"
        class="q-px-sm q-mr-md"
        color="primary"
        rounded
        no-caps
        dense
      />
    </div>

    <q-list class="full-width q-pt-md">
      <Sortable
        @end="onSortEnd"
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

    <AddTodoItem />
  </div>
</template>

<script setup>
import { Sortable } from 'sortablejs-vue3'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreTodos } from 'src/stores/storeTodos'
import { useStorePages } from 'src/stores/storePages'
import ToDoItem from 'src/components/todos/ToDoItem.vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import AddTodoItem from 'src/components/todos/AddTodoItem.vue'

const storeTodos = useStoreTodos()
const storePages = useStorePages()
const route = useRoute()

let pageTodos = ref([])
const pageName = ref('')

watch(
  [route, storeTodos.pageTodos],
  () => {
    pageTodos.value = storeTodos.pageTodos(route.params.pageId)
  },
  { immediate: true }
)

watch(
  [route, storePages.pageName],
  () => {
    pageName.value = storePages.pageName(route.params.pageId)
  },
  { immediate: true }
)

const onSortEnd = (evt) => {
  const movedEntry = pageTodos.value[evt.oldIndex]
  pageTodos.value.splice(evt.oldIndex, 1)
  pageTodos.value.splice(evt.newIndex, 0, movedEntry)

  pageTodos.value.forEach(async (todo, index) => {
    await storeTodos.updateTodo(todo.id, { sort: index })
  })
}
</script>
