<template>
  <TodoItem v-if="item.type == 'todo'" :item="item" />
  <HeaderItem v-else-if="item.type == 'header'" :item="item" />
  <DividerItem v-else-if="item.type == 'divider'" :item="item" />
  <TextItem v-else :item="item" />
</template>

<script setup>
import TodoItem from './content-item-types/TodoItem.vue'
import TextItem from './content-item-types/TextItem.vue'
import HeaderItem from './content-item-types/HeaderItem.vue'
import DividerItem from './content-item-types/DividerItem.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
