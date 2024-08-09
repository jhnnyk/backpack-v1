<template>
  <q-list v-for="page in storePages.pages" :key="page.id">
    <q-item clickable :to="`/page/${page.id}`">
      <q-item-section side>
        <q-icon name="mdi-shopping" />
      </q-item-section>
      <q-item-section class="text-grey-9">{{ page.name }}</q-item-section>
      <q-item-section side>{{
        storeTodos.pageTodos(page.id).length
      }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useStorePages } from 'src/stores/storePages'
import { useStoreTodos } from 'src/stores/storeTodos'

const storePages = useStorePages()
const storeTodos = useStoreTodos()
</script>
