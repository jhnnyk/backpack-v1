<template>
  <q-item-section side>
    <q-checkbox
      :model-value="item.completed"
      @click="toggleTodoCompleted"
      :color="item.completed ? 'faded' : ''"
    />
  </q-item-section>
  <q-item-section
    :class="item.completed ? 'text-faded text-strike' : 'text-dark'"
  >
    <q-item-label>{{ item.title }}</q-item-label>
    <q-popup-edit
      @save="onTodoUpdate"
      @hide="disablePopUp = true"
      :model-value="item.title"
      v-slot="scope"
      ref="popUp"
      :disable="disablePopUp"
      buttons
    >
      <q-input v-model="scope.value" @keyup.enter="scope.set" autofocus />
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
import sanitizeHtml from 'sanitize-html'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const storePages = useStorePages()
const completed = ref(false)
const popUp = ref()
const disablePopUp = ref(true)

const onTodoUpdate = (value) => {
  const cleanHtmlTodo = sanitizeHtml(value, storePages.sanitizeHtmlOptions)
  storePages.updateContentItem(props.item.id, { title: cleanHtmlTodo })
}

const showPopup = async () => {
  disablePopUp.value = false
  await nextTick()
  popUp.value.show()
}

const toggleTodoCompleted = () => {
  storePages.updateContentItem(props.item.id, {
    completed: !props.item.completed,
  })
}
</script>
