<template>
  <v-app>
    <v-card class="mt-10 mx-auto" width="400px">
      <v-card-title>
        <h1 class="display-1">{{ title }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="ユーザ名"
            prepend-icon="mdi-account-circle"
            v-model="name"
            :rules="[rules.name[0], rules.name[1]]"
            required
          />
          <v-text-field
            label="パスワード"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-account-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="password"
            @click:append="showPassword = !showPassword"
            :rules="rules.password"
            maxlength="20"
            required
          />
          <v-card-actions>
            <v-btn :disabled="!valid" @click="submit" color="primary"
              >ログイン</v-btn
            >
            <v-btn @click="logout" color="error">ログアウト</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types/app'
import AppArticle from '~/components/AppArticle.vue'
import test from '~/components/NuxtLogo.vue'
import debounce from 'lodash/debounce'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

interface Data {
  title: string
  showPassword: boolean
  name: string
  password: string
  rules: object
  valid: boolean
}

export default Vue.extend({
  data(): Data {
    return {
      title: 'ログイン',
      showPassword: false,
      name: '',
      password: '',
      rules: {
        name: [
          (val: string) =>
            (val || '').length > 0 || 'ユーザ名を入力してください',
          (val: string) => (val || '').length <= 20 || '20字以内です',
        ],
        password: [
          (val: string) =>
            (val || '').length > 0 || 'パスワードを入力してください',
        ],
      },
      valid: true,
    }
  },
  computed: {
    getLogin() {
      return this.$store.getters['login/login']
    },
  },
  methods: {
    submit() {
      console.log(`${this.name}, ${this.password}`)

      if (!this.validate()) {
        return
      }
      this.$store.dispatch('login/login')
      this.$router.push('/user')
    },
    logout(): void {
      this.$store.commit('login/setLogin', false)
    },
    validate() {
      const form: any = this.$refs.form
      return form.validate()
    },
  },
  layout: 'login',
})
</script>
