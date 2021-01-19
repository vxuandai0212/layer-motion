import { sendRequest } from '@/api/commons'
import { METHOD, URL_ORG, URL_CONTACT } from '@/api/config'
import { EMPLOYEE, CAMPAIGNS } from '@/utils/constant'
import { CAMPAIGN_TYPE } from '@/utils/constants/campaign'

const state = {
  org_ids: [],
  em_ids: [],
  ems: [],
  loading_em_page: false,
  loading_all_em: false,
  loading_filter: false,
  filter_ems: [],
  display_ems: [],
  current_page: 1,
  page_size: CAMPAIGNS.RECEIVER_DEFAULT_PAGE_SIZE,
  root_org: 148842
}

const mutations = {
  UPDATE_EM_PHONE: (state, newEm) => {
    const emId = newEm.id
    const phone = newEm.phone
    state.ems.map(em => {
      if (em.id === emId) {
        em.phone = phone
      }
      return em
    })
    state.filter_ems.map(em => {
      if (em.contact_id === emId) {
        em.phone = phone
      }
      return em
    })
    state.display_ems.map(em => {
      if (em.contact_id === emId) {
        em.phone = phone
      }
      return em
    })
  },
  UPDATE_EM_EMAIL: (state, newEm) => {
    const emId = newEm.id
    const email = newEm.email
    state.ems.map(em => {
      if (em.contact_id === emId) {
        em.email = email
      }
      return em
    })
    state.filter_ems.map(em => {
      if (em.contact_id === emId) {
        em.email = email
      }
      return em
    })
    state.display_ems.map(em => {
      if (em.contact_id === emId) {
        em.email = email
      }
      return em
    })
  },
  REMOVE_EM: (state, emId) => {
    state.ems.filter(em => em.contact_id !== emId)
    const em_ids = state.em_ids
    const index = em_ids.indexOf(emId)
    if (index > -1) {
      em_ids.splice(index, 1)
    }
  },
  SET_ALL_ORG_IDS: (state, value) => {
    state.org_ids = value
  },
  SET_ALL_EM_IDS: (state, value) => {
    state.em_ids = value
  },
  SET_ALL_EMS: (state, value) => {
    state.ems = value
  },
  SET_FILTERED_EMS: (state, value) => {
    state.filter_ems = value
  },
  SET_DISPLAY_EMS: (state, value) => {
    state.display_ems = value
  },
  SET_PAGE_SIZE: (state, value) => {
    state.page_size = value
  },
  SET_CURRENT_PAGE: (state, value) => {
    if (value === 0) {
      state.current_page = 1
    } else {
      state.current_page = value
    }
  },
  SET_LOADING_EMS_TABLE: (state, value) => {
    state.loading_em_page = true
  },
  SET_LOADED_EMS_TABLE: (state, value) => {
    state.loading_em_page = false
  },
  SET_LOADING_FILTER: (state, value) => {
    state.loading_filter = true
  },
  SET_LOADED_FILTER: (state, value) => {
    state.loading_filter = false
  },
  SET_ROOT_ORG: (state, value) => {
    state.root_org = value
  },
  LOADING_EM_PAGE: (state, value) => {
    state.loading_em_page = true
  },
  LOADING_ALL_EM: (state, value) => {
    state.loading_all_em = true
  },
  LOADED_EM_PAGE: (state, value) => {
    state.loading_em_page = false
  },
  LOADED_ALL_EM: (state, value) => {
    state.loading_all_em = false
  }
}

const actions = {
  findAllOrg({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_ORG.GET_ALL, data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  findAllOrgIntegrate({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_ORG.GET_ALL_INTEGRATE, data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  findOrgLevel({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_ORG.GET_ORG_LEVEL, data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  findAllOrgIds({ commit }) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_ORG.GET_ALL, { parentId: null })
        .then(({ code, data }) => {
          const { total, items } = data
          commit('SET_ALL_ORG_IDS', items)
          resolve(total)
        })
        .catch(error => reject(error))
    })
  },
  findEmsInOrgs({ commit }, { parentList, emFilter }) {
    let emStatus = ''
    if (emFilter && emFilter.length > 0) {
      emStatus = emFilter.map(e => {
        if (e === EMPLOYEE.WORKING_STATUS_LABEL) {
          return EMPLOYEE.WORKING_STATUS_CODE
        } else {
          return EMPLOYEE.QUIT_STATUS_CODE
        }
      }).join()
    }
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.GET_ALL_IN_ORG_LIST, { orgList: parentList.join(), emStatus })
        .then(response => {
          const ems = response.data.items
          const em_ids = ems.map(item => item.contact_id)
          commit('SET_ALL_EMS', ems)
          commit('SET_DISPLAY_EMS', ems)
          commit('SET_ALL_EM_IDS', em_ids)
          commit('LOADED_ALL_EM')
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },
  findAllChildOrgIds({ dispatch, commit }, { parentList, emFilter }) {
    commit('LOADING_ALL_EM')
    setTimeout(() => {
      dispatch('findEmsInOrgs', { parentList, emFilter })
    }, 50)
  },
  filterContactList({ commit, state }, input) {
    commit('SET_LOADING_FILTER')
    const keyword = input.toLowerCase()
    const filterList = state.ems.filter(item => {
      if (item.fullname && item.fullname.toLowerCase().includes(keyword)) {
        return item
      }
      if (item.employee_code && item.employee_code.toLowerCase().includes(keyword)) {
        return item
      }
      if (item.email && item.email.toLowerCase().includes(keyword)) {
        return item
      }
      if (item.phone && item.phone.toLowerCase().includes(keyword)) {
        return item
      }
    })
    commit('SET_FILTERED_EMS', filterList)
    commit('SET_DISPLAY_EMS', filterList)
    commit('SET_CURRENT_PAGE', 1)
    setTimeout(() => {
      commit('SET_LOADED_FILTER')
    }, 500)
  },
  showAllContactList({ commit, state }) {
    commit('SET_LOADING_FILTER')
    commit('SET_DISPLAY_EMS', state.ems)
    commit('SET_CURRENT_PAGE', 1)
    commit('SET_PAGE_SIZE', CAMPAIGNS.RECEIVER_DEFAULT_PAGE_SIZE)
    setTimeout(() => {
      commit('SET_LOADED_FILTER')
    }, 500)
  },
  clearContacts({ commit, state }) {
    commit('SET_ALL_EMS', [])
    commit('SET_DISPLAY_EMS', [])
    commit('SET_ALL_EM_IDS', [])
    commit('SET_FILTERED_EMS', [])
  },
  removeFromContactList({ commit, state }, contact_id) {
    commit('SET_LOADING_FILTER')
    const all_ems = state.ems.filter(item => item.contact_id !== contact_id)
    const display_ems = state.display_ems.filter(item => item.contact_id !== contact_id)
    const em_ids = state.em_ids.filter(item => item !== contact_id)
    const filter_ems = state.filter_ems.filter(item => item.contact_id !== contact_id)
    const current_page = Math.floor(state.display_ems.length / state.page_size)
    if (state.current_page > current_page) {
      commit('SET_CURRENT_PAGE', current_page)
    }
    commit('SET_ALL_EMS', all_ems)
    commit('SET_DISPLAY_EMS', display_ems)
    commit('SET_ALL_EM_IDS', em_ids)
    commit('SET_FILTERED_EMS', filter_ems)
    setTimeout(() => {
      commit('SET_LOADED_FILTER')
    }, 500)
  },
  receiverListSizeChange({ commit, state }, val) {
    commit('SET_LOADING_EMS_TABLE')
    setTimeout(() => {
      commit('SET_PAGE_SIZE', val)
      commit('SET_CURRENT_PAGE', 1)
      commit('SET_LOADED_EMS_TABLE')
    }, 500)
  },
  currentReceiverPageChange({ commit }, val) {
    commit('SET_LOADING_EMS_TABLE')
    setTimeout(() => {
      commit('SET_CURRENT_PAGE', val)
      commit('SET_LOADED_EMS_TABLE')
    }, 500)
  },
  updateEm({ commit }, newEm) {
    const campaignType = newEm.campaignType
    if (campaignType === CAMPAIGN_TYPE.SMS) {
      commit('UPDATE_EM_PHONE', newEm)
    } else if (campaignType === CAMPAIGN_TYPE.EMAIL) {
      commit('UPDATE_EM_EMAIL', newEm)
    }
  },
  removeEm({ commit }, id) {
    commit('REMOVE_EM', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
