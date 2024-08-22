<template>
  <q-slide-item>
    <template v-slot:right>
      <q-btn
        @click="showPopup"
        icon="mdi-square-edit-outline"
        size="sm"
        flat
        round
      />
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
          <h2 class="text-center q-ma-md">{{ item.title }}</h2>
          <q-popup-edit
            @save="onHeaderItemUpdate"
            @hide="disablePopUp = true"
            :model-value="item.title"
            v-slot="scope"
            ref="popUp"
            :disable="disablePopUp"
            buttons
          >
            <q-input v-model="scope.value" @keyup.enter="scope.set" autofocus />
          </q-popup-edit>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useStorePages } from 'src/stores/storePages'
import sanitizeHtml from 'sanitize-html'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const storePages = useStorePages()
const popUp = ref()
const disablePopUp = ref(true)

const onHeaderItemUpdate = (value) => {
  const cleanHtmlHeaderItem = sanitizeHtml(
    value,
    storePages.sanitizeHtmlOptions
  )
  storePages.updateContentItem(props.item.id, { title: cleanHtmlHeaderItem })
}

const showPopup = async () => {
  disablePopUp.value = false
  await nextTick()
  popUp.value.show()
}
</script>
