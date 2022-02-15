<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Fotter from '~/components/Fotter.vue'

export default Vue.extend({
  components: {
    Fotter,
  },
  middleware: 'auth',
})
</script>
