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
    class="row q-mt-lg"
  >
    <div class="col-8">
      <q-input
        v-model="newItemTitle"
        :error="!!storePages.addItemError"
        class="q-mx-lg"
        :placeholder="'new ' + storePages.options.addItemType + ' title'"
        bottom-slots
        rounded
        standout
        dense
      >
        <template v-slot:error>
          {{ storePages.addItemError }}
        </template>
      </q-input>

      <q-editor
        v-if="storePages.options.addItemType == 'text'"
        v-model="newItemDescription"
        paragraph-tag="p"
        :toolbar="[
          ['left', 'center', 'right', 'justify'],
          ['bold', 'italic', 'strike', 'underline'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
          ],
          ['link', 'quote', 'unordered', 'ordered'],
          ['undo', 'redo'],
          ['viewsource'],
        ]"
      />
    </div>

    <div class="col-3">
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
  const cleanTitle = sanitizeHtml(newItemTitle.value)
  const cleanDesc = sanitizeHtml(newItemDescription.value)

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

const closeForm = () => {
  storePages.options.addItemType = ''
}
</script>
