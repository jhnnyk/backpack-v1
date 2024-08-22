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
        <div v-html="item.description"></div>
        <q-popup-edit
          @save="onTextItemUpdate"
          @hide="disablePopUp = true"
          :model-value="item.description"
          v-slot="scope"
          ref="popUp"
          :disable="disablePopUp"
          buttons
        >
          <q-editor
            v-model="scope.value"
            paragraph-tag="p"
            :toolbar="storePages.textEditorToolbar"
            autofocus
          />
        </q-popup-edit>
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

const onTextItemUpdate = (value) => {
  const cleanHtmlText = sanitizeHtml(value, storePages.sanitizeHtmlOptions)
  storePages.updateContentItem(props.item.id, { description: cleanHtmlText })
}

const showPopup = async () => {
  disablePopUp.value = false
  await nextTick()
  popUp.value.show()
}
</script>
