s
<template>
  <v-card flat>
    <h2 class="ma-5">{{ title }}</h2>
    <v-form ref="form">
      <v-expansion-panels v-model="panel" multiple focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>基本情報</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="user.userId"
                    label="ユーザID"
                    dense
                    class="mt-5"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="user.name"
                    label="氏名"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <DatePicker
                    v-model="user.bornDate"
                    label="生年月日"
                  ></DatePicker>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="user.email"
                    label="メール"
                    dense
                    type="email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>住所情報</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <ZipInput
                    isRequired
                    v-model="user.postNumber"
                    @get-address="(val) => setData(val)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.address1"
                    label="住所1"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.address2"
                    label="住所2"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.address3"
                    label="住所3"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>その他情報</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-checkbox v-model="user.activeFlag" label="有効" dense>
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-textarea v-model="user.memo" label="メモ" dense>
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card-actions>
        <v-btn @click="goBack">戻る</v-btn>
        <v-btn
          :disabled="!formIsValid"
          color="success"
          @click="debouncedClickWrap"
        >
          設定
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ZipInput from '~/components/molecules/ZipInput.vue'
import { createUser, getUser, updateUser } from '~/api/rest/user'
import { Address } from '~/types/zipAddress'
import User from '~/domain/User'
import DatePicker from '~/components/atoms/DatePicker.vue'
import debounce from 'lodash/debounce'

interface Data {
  title: string
  user: User
  panel: Array<number>
  formIsValid: boolean
  debouncedClick: Function
  userId: string
  creatMode: boolean
}

export default Vue.extend({
  components: {
    ZipInput,
    DatePicker,
  },
  created() {
    this.debouncedClick = debounce(this.click, 500)

    this.userId = this.$route.params.userId
    this.creatMode = this.userId === 'new'
    // パラメータを受け取って、データを取得する
    this.setUser()
  },
  data(): Data {
    return {
      title: `ユーザ設定`,
      user: new User(),
      panel: [0, 1],
      formIsValid: true,
      debouncedClick: () => {},
      userId: '',
      creatMode: false,
    }
  },
  methods: {
    setData(address: Address) {
      address && this.user.setAddress ? this.user.setAddress(address) : ''
    },
    async setUser() {
      this.user = this.creatMode ? new User() : await getUser(this.userId)
    },
    click() {
      this.setting()
    },
    async setting() {
      this.$store.dispatch('load/end')
      //設定処理
      this.creatMode ? await createUser(this.user) : await updateUser(this.user)
      this.$router.push('list')
    },
    debouncedClickWrap() {
      this.$store.dispatch('load/start')
      this.debouncedClick()
    },
    goBack() {
      this.$router.back()
    },
  },
})
</script>
