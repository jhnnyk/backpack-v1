<template>
  <div v-if="storePages.pagesAreLoading" class="text-center">
    <LoadingSpinner />
  </div>
  <div v-else>
    <q-list>
      <Sortable
        @end="sortPages"
        :list="storePages.pages"
        :options="{ handle: '.page-handle' }"
        item-key="id"
        tag="div"
      >
        <template #item="{ element, index }">
          <q-item
            clickable
            :to="`/page/${element.id}`"
            :key="element.id"
            :index="index"
          >
            <q-item-section side>
              <q-icon name="mdi-shopping" />
            </q-item-section>
            <q-item-section class="text-grey-9">
              <div>
                {{ element.name }}

                <q-badge class="q-ml-xs" color="accent" rounded>
                  {{
                    element.content.filter(
                      (item) => item.type == 'todo' && item.completed == false
                    ).length
                  }}
                </q-badge>
              </div>
            </q-item-section>

            <q-item-section v-if="storePages.options.showPageOptions" side>
              <div>
                <q-btn icon="mdi-square-edit-outline" size="sm" flat round />
                <q-btn
                  @click="storePages.deletePage(element.id)"
                  icon="mdi-delete"
                  color="negative"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  icon="mdi-reorder-horizontal"
                  class="page-handle"
                  size="sm"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </template>
      </Sortable>
    </q-list>
  </div>
</template>

<script setup>
import { Sortable } from 'sortablejs-vue3'
import { useStorePages } from 'src/stores/storePages'
import LoadingSpinner from '../LoadingSpinner.vue'

const storePages = useStorePages()

const sortPages = (evt) => {
  const movedEntry = storePages.pages[evt.oldIndex]
  storePages.pages.splice(evt.oldIndex, 1)
  storePages.pages.splice(evt.newIndex, 0, movedEntry)

  storePages.updatePageSort()
}
</script>
