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
      users: [] as Array<any>,
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
      const users = await getUserList()
      for (const key in users) {
        const u: any = users[key]
        this.users.push(this.fomatData(u))
      }
      this.isLoading = false
    },
    fomatData(user: any) {
      user.bornDate = user.bornDate.replace('-', '年').replace('-', '月') + '日'
      user.postNumber =
        user.postNumber.slice(0, 3) + '-' + user.postNumber.slice(3)
      user.address =
        user.address1 +
        ' ' +
        user.address2 +
        ' ' +
        user.address3 +
        ' ' +
        user.address4
      user.activeFlag = user.activeFlag === 'true' ? '有効' : '無効'
      user.delete = 'del'
      return user
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
