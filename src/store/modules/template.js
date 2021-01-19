import { METHOD } from '@/api/config'
import { URL_API } from '@/utils/constant'
import { sendRequest } from '@/api/commons'
import { trimObject } from '@/utils'
const state = {
  currentTab: 'sms'
}
const mutations = {
  SET_CURRENT_TAB: (state, tab) => {
    state.currentTab = tab
  }
}
const actions = {
  getTemplates({ commit }, campaign) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_API.GET_TEMPLATE, trimObject(campaign)).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setCurrentTab({ commit }, tab) {
    commit('SET_CURRENT_TAB', tab)
  },
  resetCurrentTab({ commit }) {
    commit('SET_CURRENT_TAB', 'sms')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
