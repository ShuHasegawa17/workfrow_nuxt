<template>
  <section>
    <h2 class="ma-5">ユーザ一覧</h2>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
      ></v-data-table>
    </v-card>
  </section>
</template>
<script lang="ts">
import { keys } from 'lodash'
import Vue from 'vue'
import { getUserList } from '~/api/rest/user'
export default Vue.extend({
  data() {
    return {
      search: '',
      headers: [
        { text: 'name', value: 'name' },
        { text: 'userId', value: 'userId' },
        { text: 'status', value: 'status' },
      ],
      users: [] as any,
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const users = await getUserList()
      for (const key in users) {
        const u: any = users[key]
        this.users.push(u)
      }
      for (const [key, value] of Object.entries(users)) {
        console.log(value)
      }
    },
  },
})
</script>
