import { NuxtAxiosInstance } from '@nuxtjs/axios'

type AxiosInstanceWrapper = {
  $axios: NuxtAxiosInstance
}
// TODO 調査中。。。
export default function ({ $axios }: AxiosInstanceWrapper) {
  $axios.onRequest((config) => {
    console.log('リクエストは-> ' + config.url)
  })

  $axios.onError((error) => {
    console.log('エラー発生-> ' + error)
  })
  $axios.setBaseURL(
    process.env.NODE_ENV === 'production'
      ? 'https://wf-rest.herokuapp.com'
      : 'http://localhost:8003'
  )
}
