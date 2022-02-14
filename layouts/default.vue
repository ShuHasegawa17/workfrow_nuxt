<template>
  <v-app light>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <span>&copy; {{ footerString }}</span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'

interface Data {
  author: string
  year: number
}
export default Vue.extend({
  data(): Data {
    return {
      author: `shu hasegawa`,
      year: new Date().getFullYear(),
    }
  },
  computed: {
    footerString(): string {
      return `${this.year} ${this.author}`
    },
  },
})
</script>
