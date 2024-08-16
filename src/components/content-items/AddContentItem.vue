<template>
  <ActionButton
    v-if="
      storePages.options.addItemType == '' &&
      storePages.options.showOptions == false
    "
    class="fixed-bottom-right q-ma-lg"
  />
  <q-form
    v-if="storePages.options.addItemType != ''"
    @submit="addNewItem"
    class="q-ma-lg"
  >
    <div class="row">
      <q-input
        v-if="storePages.options.addItemType != 'text'"
        v-model="newItemTitle"
        :error="!!storePages.addItemError"
        @focus="clearError"
        style="width: 100%"
        :placeholder="'new ' + storePages.options.addItemType + ' title'"
        rounded
        standout
        dense
      >
      </q-input>

      <q-editor
        v-if="storePages.options.addItemType == 'text'"
        v-model="newItemDescription"
        paragraph-tag="p"
        :toolbar="storePages.textEditorToolbar"
      />

      <p v-if="storePages.addItemError" class="text-negative">
        {{ storePages.addItemError }}
      </p>
    </div>

    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" icon="mdi-plus" size="md" round />
      <q-btn
        @click="closeForm"
        class="q-ml-sm"
        color="negative"
        icon="mdi-close"
        size="md"
        round
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { uid } from 'quasar'
import sanitizeHtml from 'sanitize-html'
import { useStorePages } from 'src/stores/storePages'
import ActionButton from 'src/components/ActionButton.vue'

const storePages = useStorePages()

const newItemTitle = ref('')
const newItemDescription = ref('')

const addNewItem = async () => {
  const cleanTitle = sanitizeHtml(
    newItemTitle.value,
    storePages.sanitizeHtmlOptions
  )
  const cleanDesc = sanitizeHtml(
    newItemDescription.value,
    storePages.sanitizeHtmlOptions
  )

  await storePages.addNewItem({
    id: uid(),
    title: cleanTitle,
    description: cleanDesc,
    completed: false,
    type: storePages.options.addItemType,
  })

  // if adding todo was successful, reset the form
  if (!storePages.addItemError) {
    newItemTitle.value = ''
    newItemDescription.value = ''
  }
}

const clearError = () => {
  storePages.addItemError = null
}

const closeForm = () => {
  storePages.options.addItemType = ''
  storePages.addItemError = null
}
</script>
