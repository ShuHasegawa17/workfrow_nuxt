import { Context } from '@nuxt/types'
export default function ({ redirect, store }: Context) {
  if (!store.getters['login/login']) {
    return redirect('/')
  }
}
