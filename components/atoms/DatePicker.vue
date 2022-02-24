<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="localValue"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="localValue"
      @input="(val) => changePicker(val)"
      locale="ja-jp"
      :day-format="(date) => new Date(date).getDate()"
    ></v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    localValue: {
      get(): string {
        return this.value
      },
      set(newVal: string) {
        this.$emit('input', newVal)
      },
    },
  },
  methods: {
    changePicker(val: string) {
      this.menu = false
      this.$emit('input', val)
    },
  },
})
</script>
