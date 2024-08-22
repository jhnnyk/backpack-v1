<template>
  <q-slide-item>
    <template v-slot:right>
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
    </template>

    <q-item>
      <q-item-section class="text-grey-9">
        <q-item-label>
          <q-separator color="grey-6" />
          <q-separator color="grey-4" />
          <q-separator color="grey-2" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
