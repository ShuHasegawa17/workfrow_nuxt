<template>
  <section>
    <h2 class="ma-5">申請画面</h2>
    <v-form>
      <v-row justify="start">
        <v-col sm="6" md="4" lg="3">
          <v-autocomplete
            v-model="select"
            :loading="this.$store.getters['load/loading']"
            :items="items"
            :item-text="items.text"
            :item-value="items.value"
            :search-input.sync="search"
            cache-items
            label="最寄り駅"
          >
          </v-autocomplete>
        </v-col>
        <v-col sm="6" md="4" lg="3"> {{ select }} </v-col>
        <v-col sm="3" md="2" lg="1" align-self="center">
          <v-btn>検索</v-btn>
        </v-col>
        <v-col sm="3" md="2" lg="1" align-self="center">
          <v-btn>参照</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { getStationByName, getStationByCode, Station } from '~/api/rest/station'

interface Item {
  text: string | number | object
  value: string | number | object
  disabled?: boolean
  divider?: boolean
  header?: string
}
export default Vue.extend({
  async mounted() {
    if (this.select) {
      const items = await getStationByCode(this.select)
      console.log()
      if (!items) return
      for (let s of items) {
        this.items.push({
          text: s.Name,
          value: s.code,
        })
      }
    }
  },
  data() {
    return {
      loading: false,
      items: [] as Array<Item>, //リストの中身
      search: null, // 変更の検知。一旦watchでやるが、computedに移せるか
      select: null, // 選択値。v-model
      satations: [] as Array<Station> | undefined, // イランかも
    }
  },
  watch: {
    search(val: string) {
      //val → valが選択値と異なる場合 → 検索という流れ。
      val && val !== this.select && this.querySelections(val)
    },
  },
  methods: {
    async querySelections(word: string) {
      console.log('fire')
      this.items.splice(0, this.items.length)
      if (!word || word === '') return
      this.satations = await getStationByName(word)
      console.log(this.satations)

      if (!this.satations) return
      for (let s of this.satations) {
        this.items.push({
          text: s.Name,
          value: s.code,
        })
      }
    },
  },
})
</script>
