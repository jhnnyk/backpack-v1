<template>
  <q-list v-for="page in storePages.pages" :key="page.id">
    <q-item clickable>
      <q-item-section side>
        <q-icon name="mdi-shopping" />
      </q-item-section>
      <q-item-section class="text-grey-9">{{ page.name }}</q-item-section>
      <q-item-section side>22</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useStorePages } from 'src/stores/storePages'

const storePages = useStorePages()
</script>
