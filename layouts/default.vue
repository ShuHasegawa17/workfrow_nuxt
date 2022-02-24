<template>
  <v-app>
    <v-app-bar color="deep-purple" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="deep-purple"
      dark
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menus"
          :key="i"
          @click="transition(item.title, item.to)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
      <v-overlay :value="this.$store.getters['load/loading']">
        <v-progress-circular :size="40" indeterminate color="primary">
          loading...
        </v-progress-circular></v-overlay
      >
    </v-main>
    <v-footer color="deep-purple" dark app>
      <span>&copy; {{ footerString }}</span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Fotter from '~/components/Fotter.vue'

interface Menu {
  title: string
  to: string
  icon: string
}
interface Data {
  drawer: boolean
  author: string
  year: number
  menus: Array<Menu>
}
export default Vue.extend({
  components: {
    Fotter,
  },
  middleware: 'auth',
  data(): Data {
    return {
      drawer: false,
      author: 'shu hasegawa',
      year: new Date().getFullYear(),
      menus: [
        { title: 'ユーザ一覧', to: '/user/list', icon: 'mdi-user' },
        { title: '申請', to: '/shinsei', icon: '' },
        { title: 'ログアウト', to: '/', icon: '' },
      ],
    }
  },
  computed: {
    footerString(): string {
      return `${this.year} ${this.author}`
    },
  },
  methods: {
    transition(title: string, to: string) {
      if (title === 'ログアウト') {
        this.$store.dispatch('login/logout')
      }
      this.$router.push(to)
    },
  },
})
</script>
