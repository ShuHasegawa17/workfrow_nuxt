<template>
  <section>
    <h2 class="ma-5">申請画面</h2>
    <v-form>
      <v-row justify="start">
        <v-col sm="6" md="4" lg="3">
          <StationInput
            label="出発駅"
            :value="fromSelect"
            @changeValue="(val) => (fromSelect = val)"
          ></StationInput>
        </v-col>
        <v-col sm="6" md="4" lg="3">
          <StationInput
            label="行先駅"
            :value="toSelect"
            @changeValue="(val) => (toSelect = val)"
          ></StationInput>
        </v-col>
        <v-col sm="3" md="2" lg="1" align-self="center">
          <v-btn>FROM {{ fromSelect }}</v-btn>
        </v-col>
        <v-col sm="3" md="2" lg="1" align-self="center">
          <v-btn>TO {{ toSelect }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import StationInput from '~/components/molecules/StationInput.vue'

interface Item {
  text: string | number | object
  value: string | number | object
  disabled?: boolean
  divider?: boolean
  header?: string
}
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
})
</script>
