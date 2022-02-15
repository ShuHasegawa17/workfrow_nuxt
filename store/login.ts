interface State {
  islogin: boolean
}

type Getters<S> = {
  [k: string]: (state: S) => unknown
}

// dataと同じ感じ
export const state = (): State => ({
  islogin: false,
})

//セッター
export const mutations = {
  setLogin(state: State, islogin: boolean) {
    state.islogin = islogin
  },
}

// ゲッター
export const getters: Getters<State> = {
  getLogin(state) {
    return state.islogin
  },
}

//メソッド
export const actions = {
  async login({ commit }: any) {
    const islogin = await commit('setLogin', true)
  },
  logout({ commit }: any) {
    commit('setLogin', false)
  },
}
