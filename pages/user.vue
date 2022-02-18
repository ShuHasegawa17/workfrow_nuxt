v-text-field
<template>
  <section>
    <h2 class="subtitle">{{ subtitle }}</h2>
    <ZipInput isRequired @get-address="(val) => setData(val)" />
    <v-text-field v-model="zipAddress.address1" label="住所1"></v-text-field>
    <v-text-field v-model="zipAddress.address2" label="住所2"></v-text-field>
    <v-text-field v-model="zipAddress.address3" label="住所3"></v-text-field>
    <p>{{ zipCode }}</p>
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
import { Address, getAddress } from '~/api/rest/outer'
import ZipInput from '~/components/molecules/ZipInput.vue'

interface Data {
  title: string
  zipCode: string
  zipAddress: Partial<Address>
  rules: {
    zipCode: Array<Function>
    requires: Array<Function>
  }
}

export default Vue.extend({
  components: {
    test,
    AppArticle,
    ZipInput,
  },
  data(): Data {
    return {
      title: `ユーザ設定`,
      zipCode: '',
      zipAddress: {},
      rules: {
        zipCode: [
          (val: string) =>
            ((val || '').length === 7 && !Number.isNaN(val)) ||
            '数値7文字入力してください',
        ],
        requires: [(val: string) => (val || '').length > 0 || '必須入力です'],
      },
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
    async getAddress() {
      console.log(this.zipCode)
      const address = await getAddress(this.zipCode)
      address ? (this.zipAddress = address) : ''
    },

    setData(address: Partial<Address>) {
      address ? (this.zipAddress = address) : ''
    },
  },
  /**
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
  */
})
</script>
