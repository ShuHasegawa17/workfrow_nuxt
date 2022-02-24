<template>
  <v-form ref="zipForm" v-model="valid">
    <v-row justify="start">
      <v-col sm="6" md="4" lg="3">
        <v-text-field
          v-model="zipCode"
          label="郵便番号"
          :rules="rules.zipCode.flat()"
          counter
          maxlength="7"
          :required="isRequired"
        ></v-text-field>
      </v-col>
      <v-col align-self="center">
        <v-btn
          :disabled="!valid"
          @click="debouncedClickWrap"
          small
          color="primary"
          >検索</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAddress } from '~/api/rest/outer'
import { Address } from '~/types/zipAddress'
import debounce from 'lodash/debounce'
interface Data {
  zipAddress: Partial<Address>
  debouncedClick: Function
  valid: boolean
  rules: {
    zipCode: Array<Function>
  }
}

export default Vue.extend({
  created() {
    this.debouncedClick = debounce(this.click, 1)
  },
  props: {
    isRequired: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data(): Data {
    return {
      zipAddress: {},
      debouncedClick: () => {},
      valid: true,
      rules: {
        zipCode: [
          (val: string) =>
            !this.isRequired || (val || '').length > 0 || '必須入力です',
          (val: string) =>
            !this.isRequired || /^-?\d+$/.test(val) || '数値を入力してください',
          (val: string) =>
            !this.isRequired ||
            (val || '').length === 7 ||
            '7文字入力してください',
        ],
      },
    }
  },
  computed: {
    zipCode: {
      get(): string {
        return this.value
      },
      set(newVal: string) {
        this.$emit('input', newVal)
      },
    },
  },
  methods: {
    async click() {
      await this.searchAddress()
      this.$emit('get-address', this.zipAddress)
    },
    debouncedClickWrap() {
      this.$store.dispatch('load/start')
      this.debouncedClick()
    },
    async searchAddress() {
      const address = await getAddress(this.zipCode)
      address ? (this.zipAddress = address) : ''
      this.$store.dispatch('load/end')
    },
    validate() {
      const form: any = this.$refs.zipForm
      return form.validate()
    },
  },
})
</script>
