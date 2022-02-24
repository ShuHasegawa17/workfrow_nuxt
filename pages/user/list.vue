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
          class="col-3"
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :loading="isLoading"
        loading-text="Loading..."
        @dblclick:row="(event, row) => transition(row)"
      >
        <template v-slot:[`item.bornDate`]="{ item }">
          {{ item.displayBornDate() }}
        </template>
        <template v-slot:[`item.postNumber`]="{ item }">
          {{ item.displayPostNumber() }}
        </template>
        <template v-slot:[`item.address`]="{ item }">
          {{ item.displayAddress() }}
        </template>
        <template v-slot:[`item.activeFlag`]="{ item }">
          {{ item.displayActiveFlag() }}
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">削除してよろしいですか?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { getUserList } from '~/api/rest/user'
import User from '~/domain/User'
export default Vue.extend({
  data() {
    return {
      search: '',
      headers: [
        { text: 'ユーザID', value: 'userId' },
        { text: '氏名', value: 'name' },
        { text: '生年月日', value: 'bornDate' },
        { text: '郵便番号', value: 'postNumber' },
        { text: '住所', value: 'address' },
        { text: '有効/無効', value: 'activeFlag' },
        { text: '', value: 'delete', sortable: false },
      ],
      users: [] as Array<User>,
      isLoading: false,
      deletedIndex: -1,
      dialogDelete: false,
    }
  },
  created() {
    console.log('created')
    this.getUsers()
  },
  methods: {
    async getUsers() {
      this.isLoading = true
      this.users = await getUserList()
      this.isLoading = false
    },

    deleteItemConfirm() {
      //TODO 本来はaxios呼び出し
      //const index = this.users.findIndex((user) => user.userId === item.userId)
      this.users.splice(this.deletedIndex, 1)
      this.closeDelete()
    },

    deleteItem(item: any) {
      this.deletedIndex = this.users.indexOf(item)
      this.dialogDelete = true
    },

    closeDelete() {
      this.dialogDelete = false
      //DOMが更新されたら実行される。=ダイアログが閉じたら
      this.$nextTick(() => {
        this.deletedIndex = -1
      })
    },

    transition(row: any) {
      console.log(row.item.userId)
      this.$router.push(`${row.item.userId}`)
    },
  },
})
</script>
