<template>
  <q-fab color="primary" icon="mdi-plus" direction="left">
    <q-fab-action
      @click="showForm('todo')"
      icon="mdi-checkbox-marked-circle-outline"
    />
    <q-fab-action @click="showForm('text')" icon="mdi-note-text-outline" />
    <q-fab-action @click="showForm('header')" icon="mdi-format-header-1" />
    <q-fab-action @click="showForm('divider')" icon="mdi-line-scan" />
  </q-fab>
</template>

<script setup>
import { useStorePages } from 'src/stores/storePages'

const storePages = useStorePages()

const showForm = (contentType) => {
  storePages.options.addItemType = contentType
}
</script>
