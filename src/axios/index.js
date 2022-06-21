import axios from 'axios'
import store from '@/store/index'
import Vue from 'vue'

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 API
  timeout: 30000
})

instance.interceptors.request.use(
  function (config) {
    Vue.prototype.$loading(true) // api 요청 시 로딩 표시
    console.log('AXIOS REQ:', config) // Request 로깅
    return config
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function ({ data, headers }) {
    Vue.prototype.$loading(false) // 성공 시 로딩 제거
    console.log('AXIOS RES:', data, headers) // 리턴 바디 값, 헤더 로깅
    return data
  },

  function (error) {
    Vue.prototype.$loading(false) // 에러 발생 시 로딩 제거
    store.commit('SNACKBAR', { text: error.response && error.response.data || 'API call Error!!', color: 'red' }) // 에러 메세지 SNACKBAR로 표시
    console.log('AXIOS RES:', error.response.data || error) // 에러 로깅
    return Promise.reject(error)
  }
)

// riot api 호출 시 공통으로 사용할 함수
function riotApi (region = 'kr', path = '', params = '', methodType = 'GET') {
  return instance.post('/v2/riot/api', { region: region, path: path, methodType: methodType, params: params })
}

export default {
  // 일반 백엔드 API
  login (params) {
    return instance.post('/login', params)
  },
  calendar () {
    return instance.post('/calendar')
  },
  // 백엔드를 통한 라이엇 API 호출
  rotationApi () {
    return riotApi('kr', '/platform/v3/champion-rotations')
  },
  searchSummoner (summonerId) {
    return riotApi('kr', '/summoner/v4/summoners/by-name/' + summonerId)
  },
  searchMatches (puuid, start, count) {
    return riotApi('asia', '/match/v5/matches/by-puuid/' + puuid + '/ids?start=' + start + '&count=' + count)
  },
  getMatchData (matchId) {
    return riotApi('asia', '/match/v5/matches/' + matchId)
  }
}
