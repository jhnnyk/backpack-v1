<template>
  <div v-if="storePages.pagesAreLoading" class="text-center">
    <LoadingSpinner />
  </div>
  <div v-else>
    <q-list v-for="page in storePages.pages" :key="page.id">
      <q-item clickable :to="`/page/${page.id}`">
        <q-item-section side>
          <q-icon name="mdi-shopping" />
        </q-item-section>
        <q-item-section class="text-grey-9">{{ page.name }}</q-item-section>
        <!-- <q-item-section side>{{
          storeTodos.pageTodos(page.id).length
        }}</q-item-section> -->
        <q-item-section v-if="storePages.options.showPageOptions" side>
          <q-btn
            icon="mdi-reorder-horizontal"
            class="page-handle"
            size="sm"
            flat
            round
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { useStorePages } from 'src/stores/storePages'
import LoadingSpinner from '../LoadingSpinner.vue'

const storePages = useStorePages()
</script>
