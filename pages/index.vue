<template>
  <section class="container">
    <div>
      <h2 class="subtitle">{{ title }}</h2>
      <v-btn @click="login">ログイン</v-btn>
      <v-btn @click="logout">ログアウト</v-btn>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types/app'
import AppArticle from '~/components/AppArticle.vue'
import test from '~/components/NuxtLogo.vue'
import debounce from 'lodash/debounce'

export default Vue.extend({
  data() {
    return { title: 'ログイン' }
  },
  computed: {
    islogin() {
      return this.$store.state.islogin
    },
  },
  methods: {
    login() {
      this.$store.commit('login')
      this.$router.push('/user')
    },
    logout() {
      this.$store.commit('logout')
    },
  },
})
</script>
