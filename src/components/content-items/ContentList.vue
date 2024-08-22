<template>
  <div v-if="storePages.pagesAreLoading" class="text-center">
    <LoadingSpinner />
  </div>

  <div v-else id="content-list">
    <div>
      <h5
        class="text-center text-grey-9 text-uppercase q-ma-sm"
        v-if="storePages.currentPage"
      >
        {{ storePages.currentPage.name }}
      </h5>
      <q-btn
        @click="
          storePages.options.showOptions = !storePages.options.showOptions
        "
        :icon="!storePages.options.showOptions ? 'mdi-cog' : 'mdi-check'"
        class="fixed-top-right z-top"
        style="top: 55px; right: 5px"
        color="blue-grey-4"
        round
        no-caps
        dense
      />
    </div>

    <q-list v-if="storePages.currentPage" class="full-width">
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
