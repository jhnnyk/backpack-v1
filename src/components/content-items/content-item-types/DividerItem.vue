<template>
  <q-item-section class="text-grey-9">
    <q-item-label>
      <hr />
    </q-item-label>
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
