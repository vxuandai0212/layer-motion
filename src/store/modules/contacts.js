import { sendRequest } from '@/api/commons'
import { METHOD, URL_CONTACT, URL_RECEIVER } from '@/api/config'

const state = {
  totalReceivers: 0
}

const mutations = {
  SET_TOTAL_RECEIVERS: (state, value) => {
    state.totalReceivers = value
  }
}

const actions = {
  findAllContactInCampaign({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_RECEIVER.GET, data)
        .then(response => {
          const ems = response.data.items
          const em_ids = ems.map(item => item.contact_id)
          commit('organization/SET_ALL_EMS', ems, { root: true })
          commit('organization/SET_DISPLAY_EMS', ems, { root: true })
          commit('organization/SET_ALL_EM_IDS', em_ids, { root: true })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },
  updateTotalReceivers({ commit }, receiver_id) {
    sendRequest(METHOD.POST, URL_CONTACT.GET_CONTACT_IN_RECEIVER, { receiverId: receiver_id })
      .then(response => {
        const totalReceivers = response.data
        commit('SET_TOTAL_RECEIVERS', totalReceivers)
      })
      .catch(error => console.log(error))
  },
  setTotalReceivers({ commit }, number) {
    commit('SET_TOTAL_RECEIVERS', number)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
