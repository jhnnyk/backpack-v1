<template>
  <q-slide-item>
    <TodoItem v-if="item.type == 'todo'" :item="item" />
    <HeaderItem v-else-if="item.type == 'header'" :item="item" />
    <DividerItem v-else-if="item.type == 'divider'" :item="item" />
    <TextItem v-else :item="item" />

    <template v-slot:right>
      <div>
        <q-btn
          @click="storePages.deleteContentItem(item.id)"
          icon="mdi-delete"
          color="negative"
          size="sm"
          flat
          round
        />
        <q-btn
          icon="mdi-reorder-horizontal"
          class="handle"
          size="sm"
          flat
          round
        />
      </div>
    </template>
  </q-slide-item>
</template>

<script setup>
import { useStorePages } from 'src/stores/storePages'
import TodoItem from './content-item-types/TodoItem.vue'
import TextItem from './content-item-types/TextItem.vue'
import HeaderItem from './content-item-types/HeaderItem.vue'
import DividerItem from './content-item-types/DividerItem.vue'

const storePages = useStorePages()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
