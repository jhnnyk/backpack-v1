<template>
  <q-fab
    @click="scrollToBottom"
    color="primary"
    icon="mdi-plus"
    direction="left"
  >
    <q-fab-action
      @click="showForm('todo')"
      color="secondary"
      icon="mdi-checkbox-marked-circle-outline"
    />
    <q-fab-action
      @click="showForm('text')"
      color="secondary"
      icon="mdi-note-text-outline"
    />
    <q-fab-action
      @click="showForm('header')"
      color="secondary"
      icon="mdi-format-header-1"
    />
    <q-fab-action @click="addDivider" color="secondary" icon="mdi-line-scan" />
  </q-fab>
</template>

<script setup>
import { uid, scroll } from 'quasar'
import { useStorePages } from 'src/stores/storePages'

const { getScrollTarget, setVerticalScrollPosition } = scroll
const storePages = useStorePages()

const showForm = (contentType) => {
  storePages.options.addItemType = contentType
}

const addDivider = async () => {
  await storePages.addNewItem({
    id: uid(),
    title: 'divider',
    description: 'lorem ipsum',
    completed: false,
    type: 'divider',
  })
}

const scrollToBottom = () => {
  const el = document.getElementById('content-list')
  const target = getScrollTarget(el)
  const offset = el.offsetHeight
  const duration = 500
  setVerticalScrollPosition(target, offset, duration)
}
</script>
