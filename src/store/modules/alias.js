import { sendRequest } from '@/api/commons'
import { METHOD, URL_ALIAS } from '@/api/config'

const state = {
  byIds: null
}

const mutations = {
  SET_ALL_ALIAS_BY_IDS: (state, value) => {
    state.byIds = value
  }
}

const actions = {
  fetchAllAliasByIds({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_ALIAS.GET_ALL_BY_IDS, {}).then(({ data }) => {
        if (data !== null) {
          commit('SET_ALL_ALIAS_BY_IDS', data)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
