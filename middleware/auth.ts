import { Context } from '@nuxt/types'
export default function ({ redirect, store }: Context) {
  if (!store.state.islogin) {
    return redirect('/')
  }
}
