import { Getters, Mutations, Actions } from './types/types'
import { State, IGetters, IMutations, IActions } from './types/loadType'

export const state = (): State => ({
  isLoading: false,
})

export const getters: Getters<State, IGetters> = {
  loading(state) {
    return state.isLoading
  },
}

export const mutations: Mutations<State, IMutations> = {
  setLoad(state, payload) {
    state.isLoading = payload
  },
}

export const actions: Actions<State, IActions, IGetters, IMutations> = {
  start(ctx) {
    ctx.commit('setLoad', true)
  },
  end(ctx) {
    ctx.commit('setLoad', false)
  },
}
