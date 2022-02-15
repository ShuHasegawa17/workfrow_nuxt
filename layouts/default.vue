<template>
  <v-app>
    <v-app-bar color="deep-purple" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Fotter />
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
  group: number
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
      group: 1,
      menus: [
        { title: 'ユーザ設定', to: '/user', icon: 'mdi-user' },
        { title: 'ログアウト', to: '/', icon: '' },
      ],
    }
  },
  methods: {
    transition(title: string, to: string) {
      console.log(title)
      if (title === 'ログアウト') {
        this.$store.commit('login/setLogin', false)
      }
      this.$router.push(to)
    },
  },
})
</script>
