import { Getters, Mutations, Actions } from './types/types'
import { State, IGetters, IMutations, IActions } from './types/loginType'

export const state = (): State => ({
  isLogin: false,
})

export const getters: Getters<State, IGetters> = {
  login(state) {
    return state.isLogin
  },
}

export const mutations: Mutations<State, IMutations> = {
  setLogin(state, payload) {
    state.isLogin = payload
  },
}

export const actions: Actions<State, IActions, IGetters, IMutations> = {
  login(ctx) {
    ctx.commit('setLogin', true)
  },
  logout(ctx) {
    ctx.commit('setLogin', false)
  },
}
