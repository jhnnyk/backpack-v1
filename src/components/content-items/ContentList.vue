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
          storePages.options.showOptions = !storePages.options.showOptions
        "
        :icon="!storePages.options.showOptions ? 'mdi-cog' : 'mdi-check'"
        class="q-px-sm q-mr-md"
        color="primary"
        round
        no-caps
        dense
      />
    </div>

    <q-list v-if="storePages.currentPage" class="full-width q-pt-md">
      <Sortable
        @end="storePages.sortItemsEnd"
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
import { useStorePages } from 'src/stores/storePages'
import ContentItem from 'src/components/content-items/ContentItem.vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import AddContentItem from 'src/components/content-items/AddContentItem.vue'

const storePages = useStorePages()
</script>
