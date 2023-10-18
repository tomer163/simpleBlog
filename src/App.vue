<template>
  <div class="flex">
    <div v-for="route in routes">
      <RouterLink :to="route.path" class="m-2">{{ route.name }}</RouterLink>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import routes from './assets/routes'

</script>

<style scoped>

</style>
