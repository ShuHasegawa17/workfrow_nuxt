<template>
  <v-app light>
    <v-main>
      <v-container>
        <Header />
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
import Header from '~/components/Header.vue'

interface Data {
  author: string
  year: number
}
export default Vue.extend({
  components: {
    Header,
  },
  middleware: 'auth',
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
