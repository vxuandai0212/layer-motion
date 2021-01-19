import { sendRequest } from '@/api/commons'
import { METHOD, URL_CAMPAIGN, URL_CONTACT, URL_RECEIVER } from '@/api/config'
import { CAMPAIGNS } from '@/utils/constant'
import { CAMPAIGN_TYPE } from '@/utils/constants/campaign'
import { CRITERIA_CODE } from '@/utils/constants/receiver'
import { RESPONSE_CODE } from '@/utils/constants/response'

const state = {
  currentReceiverId: null,
  receiverList: [],
  invalidReceiverList: [],
  receiverErrorByIds: null,
  criteria: {
    [CAMPAIGNS.SMS]: {
      [CRITERIA_CODE.PHONE_REQUIRED]: true,
      [CRITERIA_CODE.PHONE_MAXLENGTH]: true,
      [CRITERIA_CODE.PHONE_PREFIX]: false,
      [CRITERIA_CODE.PHONE_FORMAT]: true
    },
    [CAMPAIGNS.EMAIL]: {
      [CRITERIA_CODE.EMAIL_REQUIRED]: true,
      [CRITERIA_CODE.EMAIL_MAXLENGTH]: false,
      [CRITERIA_CODE.EMAIL_FORMAT]: true
    }
  },
  currentEditInvalidContactId: null,
  currentInvalidReceiverPage: 1,
  invalidReceiverPageSize: 1,
  currentAudienceId: null,
  loadingInvalidReceiverTable: false,
  loadingInvalidReceiver: false
}

const mutations = {
  SET_CURRENT_RECEIVER_ID: (state, id) => {
    state.currentReceiverId = id
  },
  SET_RECEIVER: (state, receiverList) => {
    state.receiverList = receiverList
  },
  SET_INVALID_RECEIVER: (state, { invalidReceiverList, receiverErrorByIds }) => {
    state.invalidReceiverList = invalidReceiverList
    state.receiverErrorByIds = receiverErrorByIds
  },
  SET_CURRENT_EDIT_INVALID_CONTACT_ID: (state, id) => {
    state.currentEditInvalidContactId = id
  },
  SET_INVALID_RECEIVER_PAGE_SIZE: (state, size) => {
    state.invalidReceiverPageSize = size
  },
  SET_CURRENT_INVALID_RECEIVER_PAGE: (state, page) => {
    state.currentInvalidReceiverPage = page
  },
  REMOVE_CONTACT_FROM_RECEIVER_LIST: (state, id) => {
    state.receiverList = state.receiverList.filter(contact => contact.id !== id)
  },
  REMOVE_CONTACT_FROM_INVALID_RECEIVER_LIST: (state, id) => {
    state.invalidReceiverList = state.invalidReceiverList.filter(contact => contact.id !== id)
  },
  UPDATE_CONTACT_IN_RECEIVER_LIST: (state, { id, data, campaignType }) => {
    const { phone, email } = data
    if (campaignType === CAMPAIGN_TYPE.SMS) {
      state.receiverList = state.receiverList.map(contact => contact.id === id ? { ...contact, phone } : contact)
    } else if (campaignType === CAMPAIGN_TYPE.EMAIL) {
      state.receiverList = state.receiverList.map(contact => contact.id === id ? { ...contact, email } : contact)
    }
  },
  UPDATE_CURRENT_INVALID_RECEIVER_PAGE: (state) => {
    const current_page = Math.ceil(state.invalidReceiverList.length / state.invalidReceiverPageSize)
    if (state.currentInvalidReceiverPage > current_page) {
      state.currentInvalidReceiverPage = current_page
    }
  },
  SET_AUDIENCE_ID: (state, id) => {
    state.currentAudienceId = id
  },
  LOADING_INVALID_RECEIVER_TABLE: (state) => {
    state.loadingInvalidReceiverTable = true
  },
  LOADING_INVALID_RECEIVER: (state) => {
    state.loadingInvalidReceiver = true
  },
  LOADED_INVALID_RECEIVER_TABLE: (state) => {
    state.loadingInvalidReceiverTable = false
  },
  LOADED_INVALID_RECEIVER: (state) => {
    state.loadingInvalidReceiver = false
  }
}

const actions = {
  setCurrentAudienceId({ commit }, id) {
    commit('SET_AUDIENCE_ID', id)
  },
  getReceiverInfo({ commit, rootState }) {
    const campaignId = rootState.campaign.campaignId
    commit('LOADING_INVALID_RECEIVER')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.GET_RECEIVER, { campaignId }).then(response => {
        if (response.data !== null) {
          const { receiverList, receiverId, campaignType, invalidReceiverList, receiverErrorByIds } = response.data
          commit('SET_RECEIVER', receiverList)
          commit('SET_INVALID_RECEIVER', { invalidReceiverList, receiverErrorByIds })
          commit('SET_CURRENT_RECEIVER_ID', receiverId)
          commit('campaign/SET_CAMPAIGN_TYPE', campaignType, { root: true })
        }
        setTimeout(() => {
          commit('LOADED_INVALID_RECEIVER')
        }, 500)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchReceiver({ dispatch, commit }, { receiverId, validateType }) {
    commit('SET_CURRENT_RECEIVER_ID', receiverId)
    setTimeout(() => {
      dispatch('fetchAllContact')
      dispatch('fetchInvalidContact')
    }, 500)
  },
  fetchAllContact({ commit, state }) {
    const receiverId = state.currentReceiverId
    commit('LOADING_INVALID_RECEIVER')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_RECEIVER.GET, { receiverId }).then(response => {
        if (response.data && response.data.items !== null) {
          const receiverList = response.data.items
          commit('SET_RECEIVER', receiverList)
        }
        setTimeout(() => {
          commit('LOADED_INVALID_RECEIVER')
        }, 500)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchInvalidContact({ commit, state, rootState }) {
    const receiverId = state.currentReceiverId
    const campaignType = rootState.campaign.campaignType
    commit('LOADING_INVALID_RECEIVER')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_RECEIVER.GET_INVALID_CONTACT, { receiverId, campaignType }).then(response => {
        if (response.data !== null) {
          const { invalidReceiverList, receiverErrorByIds } = response.data
          commit('SET_INVALID_RECEIVER', { invalidReceiverList, receiverErrorByIds })
        }
        setTimeout(() => {
          commit('LOADED_INVALID_RECEIVER')
        }, 500)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteContact({ dispatch, commit }, contactId) {
    return new Promise((resolve, reject) => {
      commit('LOADING_INVALID_RECEIVER')
      sendRequest(METHOD.DELETE, URL_CONTACT.DELETE, contactId).then(response => {
        if (response.code === RESPONSE_CODE.SUCCESS) {
          commit('REMOVE_CONTACT_FROM_RECEIVER_LIST', contactId)
          commit('REMOVE_CONTACT_FROM_INVALID_RECEIVER_LIST', contactId)
          commit('UPDATE_CURRENT_INVALID_RECEIVER_PAGE')
          dispatch('organization/removeEm', contactId, { root: true })
        }
        setTimeout(() => {
          commit('LOADED_INVALID_RECEIVER')
        }, 300)
        resolve()
      }).catch(error => {
        commit('LOADED_INVALID_RECEIVER')
        reject(error)
      })
    })
  },
  updateContact({ dispatch, commit, state, rootState }, { id, data }) {
    const campaignType = rootState.campaign.campaignType
    let payload
    if (campaignType === CAMPAIGN_TYPE.SMS) {
      payload = { contactId: id, phone: data.phone }
    }
    if (campaignType === CAMPAIGN_TYPE.EMAIL) {
      payload = { contactId: id, email: data.email }
    }
    commit('LOADING_INVALID_RECEIVER')
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.UPDATE_MAIL_PHONE, payload).then(response => {
        if (response.code === RESPONSE_CODE.SUCCESS) {
          commit('UPDATE_CONTACT_IN_RECEIVER_LIST', { id, data, campaignType })
          commit('REMOVE_CONTACT_FROM_INVALID_RECEIVER_LIST', id)
          commit('UPDATE_CURRENT_INVALID_RECEIVER_PAGE')
          dispatch('organization/updateEm', { id, campaignType, phone: data.phone, email: data.email }, { root: true })
        }
        setTimeout(() => {
          commit('LOADED_INVALID_RECEIVER')
        }, 300)
        resolve(response)
      }).catch(error => {
        commit('LOADED_INVALID_RECEIVER')
        reject(error)
      })
    })
  },
  setCurrentEditInvalidContactId({ commit }, contactId) {
    commit('SET_CURRENT_EDIT_INVALID_CONTACT_ID', contactId)
  },
  setInvalidReceiverPageSize({ commit }, size) {
    commit('LOADING_INVALID_RECEIVER_TABLE')
    setTimeout(() => {
      commit('SET_INVALID_RECEIVER_PAGE_SIZE', size)
      commit('LOADED_INVALID_RECEIVER_TABLE')
    }, 300)
  },
  setCurrentInvalidReceiverPage({ commit }, page) {
    commit('LOADING_INVALID_RECEIVER_TABLE')
    setTimeout(() => {
      commit('SET_CURRENT_INVALID_RECEIVER_PAGE', page)
      commit('LOADED_INVALID_RECEIVER_TABLE')
    }, 300)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
