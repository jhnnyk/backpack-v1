<template>
  <q-item-section class="text-grey-9">
    <q-item-label>
      <h4 class="text-center q-my-sm">{{ item.title }}</h4>
    </q-item-label>
    <div v-html="item.description"></div>
  </q-item-section>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
