<template>
  <section>
    <h2 class="ma-5">申請画面</h2>
    <v-form ref="form">
      <v-row justify="start">
        <v-col sm="6" md="4" lg="2">
          <StationInput
            label="出発駅"
            :value="fromSelect"
            @changeValue="(val) => (fromSelect = val)"
          ></StationInput>
        </v-col>
        <v-col sm="6" md="4" lg="2">
          <StationInput
            label="行先駅"
            :value="toSelect"
            @changeValue="(val) => (toSelect = val)"
          ></StationInput>
        </v-col>
        <v-col sm="4" md="2" lg="1" align-self="center">
          <v-btn @click="jumpResult" :disabled="!validButton" color="info"
            >参照</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="6" md="4" lg="2">
          <v-text-field
            label="金額"
            suffix="円"
            @input="(val) => val.toLocaleString()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import StationInput from '~/components/molecules/StationInput.vue'
import { getURL } from '~/api/rest/station'

export default Vue.extend({
  components: {
    StationInput,
  },

  data() {
    return {
      fromSelect: '',
      toSelect: '',
    }
  },
  computed: {
    validButton(): boolean {
      return (
        (this.fromSelect || '').length > 0 && (this.toSelect || '').length > 0
      )
    },
  },
  methods: {
    async jumpResult() {
      const url = await getURL(this.fromSelect, this.toSelect)
      if (!url) {
        return
      }
      window.open(
        url,
        '',
        'left=100, top=100, width=900, height=600, scrollbars=yes'
      )
    },
  },
})
</script>
