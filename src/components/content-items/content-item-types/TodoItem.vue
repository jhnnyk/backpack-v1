<template>
  <q-slide-item @right="onSlidingLeft" right-color="faded">
    <template v-slot:right>
      {{ item.title }}

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
      <q-btn @click="closeSlider" icon="mdi-close" size="sm" flat round />
    </template>

    <q-item>
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
const resetSlide = ref(null)

const onTodoUpdate = (value) => {
  const cleanHtmlTodo = sanitizeHtml(value, storePages.sanitizeHtmlOptions)
  storePages.updateContentItem(props.item.id, { title: cleanHtmlTodo })
}

const showPopup = async () => {
  disablePopUp.value = false
  await nextTick()
  popUp.value.show()
  closeSlider()
}

const toggleTodoCompleted = () => {
  storePages.updateContentItem(props.item.id, {
    completed: !props.item.completed,
  })
}

const onSlidingLeft = ({ reset }) => {
  resetSlide.value = reset
}

const closeSlider = () => {
  resetSlide.value()
}
</script>
