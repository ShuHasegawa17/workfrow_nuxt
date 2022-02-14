export const state = () => ({
  islogin: false as boolean,
})

export const mutations = {
  login(state: any) {
    state.islogin = true
  },
  logout(state: any) {
    state.islogin = false
  },
}
