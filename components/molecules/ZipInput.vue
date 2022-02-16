<template>
  <v-row justify="start">
    <v-col sm="6" md="4" lg="3">
      <v-text-field
        v-model="zipCode"
        label="郵便番号"
        :rules="rules.zipCode"
        counter
        maxlength="7"
        :required="isRequired"
        small
      ></v-text-field>
    </v-col>
    <v-col>
      <v-btn @click="debouncedClickWrap">検索</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import { Address, getAddress } from '~/api/rest/outer'
import debounce from 'lodash/debounce'
interface Data {
  zipCode: string
  zipAddress: Partial<Address>
  debouncedClick: Function
  isLoading: boolean
  rules: {
    zipCode: Array<Function>
  }
}

export default Vue.extend({
  created() {
    this.debouncedClick = debounce(this.click, 1000)
  },
  props: {
    isRequired: {
      type: Boolean,
      default: true,
    },
  },
  data(): Data {
    return {
      zipCode: '',
      zipAddress: {},
      debouncedClick: () => {},
      isLoading: false,
      rules: {
        zipCode: [
          (val: string) =>
            !this.isRequired || !Number.isNaN(val) || '数値を入力してください',
          (val: string) =>
            !this.isRequired ||
            (val || '').length === 7 ||
            '7文字入力してください',
          (val: string) =>
            !this.isRequired || (val || '').length > 0 || '必須入力です',
        ],
      },
    }
  },
  methods: {
    async click() {
      await this.searchAddress()
      this.$emit('get-address', this.zipAddress)
    },
    debouncedClickWrap() {
      this.isLoading = true
      console.log(this.isLoading)
      this.debouncedClick()
    },
    async searchAddress() {
      console.log(this.zipCode)
      const address = await getAddress(this.zipCode)
      address ? (this.zipAddress = address) : ''
      this.isLoading = false
      console.log(this.isLoading)
    },
  },
})
</script>
