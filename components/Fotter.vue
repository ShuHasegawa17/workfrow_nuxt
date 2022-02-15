<template>
  <v-app>
    <v-footer color="deep-purple" dark app>
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
      author: 'shu hasegawa',
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
