<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :item-text="items.text"
    :item-value="items.value"
    :search-input.sync="search"
    no-filter
    :label="label"
    clearable
  >
  </v-autocomplete>
</template>
<script lang="ts">
import Vue from 'vue'
import debounce from 'lodash/debounce'
import { getStationByName, getStationByCode, Station } from '~/api/rest/station'

interface Item {
  text: string | number | object
  value: string | number | object
  disabled?: boolean
  divider?: boolean
  header?: string
}
export default Vue.extend({
  created() {
    this.debounced = debounce(this.querySelections, 500)
  },
  mounted() {
    this.querySelectionsByCode()
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      items: [] as Array<Item>, //リストの中身
      search: null, // 変更の検知。
      satations: [] as Array<Station> | undefined, // イランかも
      debounced: null as any,
      tempValue: '',
      tempText: '',
    }
  },
  watch: {
    search(val: string) {
      if (val && val !== '' && val !== this.tempText) {
        this.loading = true
        this.debounced(val)
      }
    },
  },
  computed: {
    select: {
      get(): string {
        return this.value
      },
      set(newVal: string) {
        this.tempValue = newVal
        this.$emit('changeValue', newVal)
      },
    },
  },
  methods: {
    async querySelectionsByCode() {
      if (!this.value || this.value === '') {
        return
      }
      const items = await getStationByCode(this.value)
      if (!items) return
      for (let s of items) {
        this.items.push({
          text: s.Name,
          value: s.code,
        })
      }
    },

    async querySelections(word: string) {
      try {
        this.items.splice(0, this.items.length)
        this.satations = await getStationByName(word)
        if (!this.satations) return
        for (let s of this.satations) {
          this.items.push({
            text: s.Name,
            value: s.code,
          })
        }
        this.tempText = word
        console.log(this.items)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
