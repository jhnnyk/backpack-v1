<template>
  <q-page class="q-pb-xl">
    <div v-if="user">
      <!-- <p class="q-ma-md">Hello {{ user.displayName }}!</p> -->
      <ContentList />
    </div>

    <div v-else-if="userIsLoading" class="text-center q-pa-lg">
      <LoadingSpinner />
    </div>

    <div v-else class="text-center q-pa-lg">
      Please <RouterLink to="/login">Login</RouterLink>
    </div>
  </q-page>
</template>

<script setup>
import LoadingSpinner from 'src/components/LoadingSpinner.vue'
import ContentList from 'src/components/content-items/ContentList.vue'

const props = defineProps({
  user: { type: Object },
  userIsLoading: { type: Boolean },
})
</script>
