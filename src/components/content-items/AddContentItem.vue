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
    class="q-mt-lg"
  >
    <div class="row">
      <q-input
        v-if="storePages.options.addItemType != 'text'"
        v-model="newItemTitle"
        :error="!!storePages.addItemError"
        class="q-mx-lg"
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
        class="q-mx-lg"
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
      >
      </q-editor>

      <p v-if="storePages.addItemError">{{ storePages.addItemError }}</p>
    </div>

    <div class="row q-mr-lg">
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
  const cleanTitle = sanitizeHtml(newItemTitle.value, sanitizeHtmlOptions)
  const cleanDesc = sanitizeHtml(newItemDescription.value, sanitizeHtmlOptions)

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

const sanitizeHtmlOptions = {
  allowedTags: [
    'a',
    'b',
    'blockquote',
    'br',
    'code',
    'dd',
    'div',
    'dl',
    'dt',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'i',
    'li',
    'ol',
    'p',
    'pre',
    'ul',
    'span',
    'strong',
    'sub',
    'sup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    'u',
  ],
  nonBooleanAttributes: [
    'alt',
    'class',
    'color',
    'height',
    'name',
    'size',
    'style',
    'target',
    'title',
    'width',
  ],
  allowedAttributes: {
    a: ['alt', 'href', 'name', 'target'],
    div: ['class', 'style'],
    p: ['class', 'style'],
  },
  allowedIframeHostnames: ['www.youtube.com'],
  selfClosing: ['br', 'hr'],
}
</script>
