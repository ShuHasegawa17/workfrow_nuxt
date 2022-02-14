<template>
  <section class="container">
    <div>
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
      <v-text-field v-model="zipCode" label="入力"></v-text-field>
      <v-btn @click="debouncedClickWrap">住所</v-btn>
      <v-text-field v-model="zipAddress.address1" label="住所1"></v-text-field>
      <v-text-field v-model="zipAddress.address2" label="住所2"></v-text-field>
      <v-text-field v-model="zipAddress.address3" label="住所3"></v-text-field>
      <p>{{ zipCode }}</p>
      <div v-if="isLoading">
        <v-progress-circular :size="40" indeterminate color="primary"
          >loading...</v-progress-circular
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types/app'
import AppArticle from '~/components/AppArticle.vue'
import test from '~/components/NuxtLogo.vue'
import ArticleData from '~/types/article'
import ZipAddressData from '~/types/zipAddress'
import debounce from 'lodash/debounce'

interface Data {
  title: string
  zipCode: string
  zipAddress: ZipAddress
  debouncedClick: Function
  isLoading: boolean
}

interface ZipAddress {
  address1?: string
  address2?: string
  address3?: string
  kana1?: string
  kana2?: string
  kana3?: string
  prefcode?: string
  zipcode?: string
}
interface AsyncData {
  zipAddress: ZipAddress
}

export default Vue.extend({
  components: {
    test,
    AppArticle,
  },
  created() {
    this.debouncedClick = debounce(this.click, 1000)
  },
  data(): Data {
    return {
      title: `ユーザ設定`,
      zipCode: '2720023',
      zipAddress: {},
      debouncedClick: () => {},
      isLoading: false,
    }
  },
  computed: {
    subtitle(): string {
      return `${this.title} 登録`
    },
  },
  methods: {
    click() {
      this.getAddress()
    },
    debouncedClickWrap() {
      this.isLoading = true
      console.log(this.isLoading)
      this.debouncedClick()
    },
    async getAddress() {
      console.log(this.zipCode)
      const data = await this.$axios.$get(
        `https://zipcloud.ibsnet.co.jp/api/search`,
        {
          params: {
            zipcode: this.zipCode,
          },
        }
      )
      console.log(data)
      if (data.status === 200 && data.results) {
        this.zipAddress = data.results[0]
      } else {
        this.zipAddress = {}
      }
      this.isLoading = false
      console.log(this.isLoading)
    },
  },
  async asyncData({ query, $axios }: Context): Promise<AsyncData> {
    console.log(`queryは?${query.page}`)
    const data = await $axios.$get(`https://zipcloud.ibsnet.co.jp/api/search`, {
      params: {
        zipcode: '2720023',
      },
    })
    console.log(data)
    return { zipAddress: data.results[0] }
  },
})
//以降消す
type IsString<T> = T extends string ? true : false
type X = IsString<'test'>
type y = IsString<10>
</script>
