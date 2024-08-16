<template>
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

  <q-item-section v-if="storePages.options.showOptions" side top>
    <q-btn
      @click="showPopup"
      icon="mdi-square-edit-outline"
      size="sm"
      flat
      round
    />
  </q-item-section>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useStorePages } from 'src/stores/storePages'

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
  storePages.updateContentItem(props.item.id, { description: value })
}

const showPopup = async () => {
  disablePopUp.value = false
  await nextTick()
  popUp.value.show()
}
</script>
