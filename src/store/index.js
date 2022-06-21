import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 페이지 refresh 발생 시 세션 스토리지에서 정보 가져오기 (로그인 세션 유지 위함)
    id: sessionStorage.getItem('id'),
    snackbarText: '',
    snackbarColor: '',
    snackbar: ''
  },
  getters: {
    isAuth (state) {
      return !!state.id
    }
  },
  mutations: {
    LOGIN (state, id) {
      sessionStorage.setItem('id', id)
      state.id = id
    },
    LOGOUT (state) {
      delete sessionStorage.id
      state.id = null
    },
    SNACKBAR (state, { text, color = 'dark', timeout = 5000 }) {
      state.snackbarText = text
      state.snackbarColor = color
      state.snackbar = true
      // SNACKBAR 제거될 시간 정의
      setTimeout(() => {
        this.commit('SNACKBAR_TIMEOUT', state)
      }, timeout)
    },
    SNACKBAR_TIMEOUT (state) {
      state.snackbar = false
    }
  },
  actions: {
  },
  modules: {
  }
})
