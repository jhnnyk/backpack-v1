<template>
  <h3 class="text-center" v-if="storePages.currentPage">
    {{ storePages.currentPage.name }}
  </h3>
  <div v-if="storePages.pagesAreLoading" class="text-center">
    <LoadingSpinner />
  </div>

  <div v-else>
    <div class="row">
      <q-space />
      <q-btn
        @click="
          storeTodos.options.showOptions = !storeTodos.options.showOptions
        "
        :icon="!storeTodos.options.showOptions ? 'mdi-cog' : 'mdi-check'"
        class="q-px-sm q-mr-md"
        color="primary"
        round
        no-caps
        dense
      />
    </div>

    <q-list v-if="storePages.currentPage" class="full-width q-pt-md">
      <Sortable
        @end="storePages.sortEnd"
        :list="storePages.currentPage.content"
        :options="{ handle: '.handle' }"
        item-key="id"
        tag="div"
      >
        <template #item="{ element, index }">
          <ContentItem :key="element.id" :item="element" :index="index" dense />
        </template>
      </Sortable>
    </q-list>

    <AddContentItem />
  </div>
</template>

<script setup>
import { Sortable } from 'sortablejs-vue3'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreTodos } from 'src/stores/storeTodos'
import { useStorePages } from 'src/stores/storePages'
import ContentItem from 'src/components/content-items/ContentItem.vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import AddContentItem from 'src/components/content-items/AddContentItem.vue'

const storeTodos = useStoreTodos()
const storePages = useStorePages()
const route = useRoute()

let pageTodos = ref([])

watch(
  [route, storeTodos.pageTodos],
  () => {
    pageTodos.value = storeTodos.pageTodos(route.params.pageId)
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
