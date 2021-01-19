import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
import { sendRequest } from '@/api/commons'
import { METHOD, URL_CAMPAIGN, URL_FOLDER, URL_APPLICATION, URL_RECEIVER } from '@/api/config'
import { CAMPAIGNS, FOLDER } from '@/utils/constant'
import { getStatusNameAndTypeNameForCampaign } from '@/utils/common'
import { trimObject } from '@/utils'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium',
  applicationList: null,
  selectedCampaigns: [],
  campaignsTable: null,
  campDeleteDiagVisible: false,
  campaignQuery: CAMPAIGNS.DEFAULT_LIST_QUERY,
  campaignList: [],
  campaignListNumber: 0,
  campaignListLabel: null,
  folderList: [],
  folderQuery: FOLDER.DEFAULT_LIST_QUERY,
  loading: false,
  applicationId: null
}

const mutations = {
  SET_APPLICATION_ID: (state, id) => {
    state.applicationId = id
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_SELECTED_CAMPAIGNS: (state, value) => {
    state.selectedCampaigns = value
  },
  SET_CAMPAIGNS_TABLE: (state, value) => {
    state.campaignsTable = value
  },
  SET_CAMP_DEL_DIAG_VISIBLE: (state, value) => {
    state.campDeleteDiagVisible = value
  },
  SET_CAMPAIGN_QUERY: (state, value) => {
    state.campaignQuery = value
  },
  SET_CAMPAIGN_LIST: (state, value) => {
    state.campaignList = value
  },
  SET_CAMPAIGN_LIST_NUMBER: (state, value) => {
    state.campaignListNumber = value
  },
  SET_CAMPAIGN_LIST_LABEL: (state, value) => {
    state.campaignListLabel = value
  },
  SET_FOLDER_LIST: (state, value) => {
    state.folderList = value
  },
  SET_FOLDER_QUERY: (state, value) => {
    state.folderQuery = value
  },
  SET_LOADING: (state, value) => {
    state.loading = value
  },
  SET_APPLICATION_LIST: (state, value) => {
    state.applicationList = value
  },
  CHANGE_CAMPAIGN_STATUS_TO_DRAFT: (state, campaignId) => {
    const newCampaignList = state.campaignList.map(cp => {
      if (cp.campaignId === campaignId) {
        cp.status = CAMPAIGNS.DRAFT_CODE
        cp.statusName = CAMPAIGNS.DRAFT
      }
      return cp
    })
    state.campaignList = newCampaignList
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setSelectedCampaigns({ commit }, value) {
    commit('SET_SELECTED_CAMPAIGNS', value)
  },
  setCampaignsTable({ commit }, value) {
    commit('SET_CAMPAIGNS_TABLE', value)
  },
  setCampDelDiagVisible({ commit }, value) {
    commit('SET_CAMP_DEL_DIAG_VISIBLE', value)
  },
  setCampaignQuery({ commit }, value) {
    commit('SET_CAMPAIGN_QUERY', value)
  },
  setCampaignList({ commit }, value) {
    commit('SET_CAMPAIGN_LIST', value)
  },
  setCampaignListNumber({ commit }, value) {
    commit('SET_CAMPAIGN_LIST_NUMBER', value)
  },
  setLoading({ commit }, value) {
    commit('SET_LOADING', value)
  },
  fetchApplication({ commit }, body) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_APPLICATION.GET, trimObject(body)).then(({ data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchApplicationList({ commit }, body) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_APPLICATION.GET_ALL, trimObject(body)).then(({ data }) => {
        commit('SET_APPLICATION_LIST', data.items)
        resolve(data)
      }).catch(err =>
        reject(err)
      )
    })
  },
  fetchCampaignList({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      dispatch('app/setLoading', true, { root: true })
      sendRequest(METHOD.POST, URL_CAMPAIGN.GET_ALL, trimObject(state.campaignQuery)).then(({ data }) => {
        getStatusNameAndTypeNameForCampaign(data.items)
        commit('SET_CAMPAIGN_LIST', data.items)
        commit('SET_CAMPAIGN_LIST_NUMBER', data.total)
        dispatch('campaign/getAllCampaignLogInApplication', {}, { root: true })
        dispatch('campaign/getCampaignSendingStats', {}, { root: true })
        resolve()
      }).finally(() => {
        dispatch('app/setLoading', false, { root: true })
      })
    })
  },
  deleteCampaigns({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.DELETE, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateCampaign({ commit, dispatch }, campaign) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.UPDATE, trimObject(campaign)).then(response => {
        if (response.data !== null) {
          const receiverId = response.data.receiverId
          commit('receiver/SET_CURRENT_RECEIVER_ID', receiverId, { root: true })
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  createCampaign({ commit }, campaign) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.CREATE, trimObject(campaign)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCampaign({ commit }, campaign) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.GET, trimObject(campaign)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  moveCampaignsToFolder({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_FOLDER.MOVE_CAMPAIGN_TO_FOLDER, data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCampaignListLabel({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.CAMPAIGN_LIST_LABEL, data).then(response => {
        commit('SET_CAMPAIGN_LIST_LABEL', response.data.totalInfo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setFolderList({ commit }, value) {
    commit('SET_FOLDER_LIST', value)
  },
  setFolderQuery({ commit }, value) {
    commit('SET_FOLDER_QUERY', value)
  },
  fetchFolderList({ commit }) {
    commit('SET_FOLDER_LIST', [])
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_FOLDER.GET_ALL, state.folderQuery).then(({ data }) => {
        data.items.forEach(folder => {
          if (!folder.totalItems) {
            folder.totalItems = 0
          }
        })
        commit('SET_FOLDER_LIST', data.items)
        resolve()
      }).catch(error => {
        reject(error)
      }).finally(() => {
      })
    })
  },
  createFolder({ commit }, folder) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_FOLDER.CREATE, trimObject(folder)).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateFolder({ commit }, folder) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_FOLDER.CREATE, trimObject(folder)).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteFolder({ commit }, folderId) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.DELETE, URL_FOLDER.DELETE, folderId).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchCampaignReport({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.VIEW_REPORT, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // {campaignId: ..}
  getCampaignDetail({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.GET_DETAIL, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  sendNow({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.SEND_NOW, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchCampaignMessage({ commit }, campaignId) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.VIEW_MESSAGE, campaignId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setCampaignListLabel({ commit }, value) {
    commit('SET_CAMPAIGN_LIST_LABEL', value)
  },
  setApplicationList({ commit }, value) {
    commit('SET_APPLICATION_LIST', value)
  },
  getAppByAppId({ state }, appId) {
    const found = state.applicationList.find(app => app.applicationId.toString() === appId.toString())
    return found
  },
  updateCampaignReceiver({ commit }, data) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_RECEIVER.UPDATE, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setApplicationId({ commit }, id) {
    commit('SET_APPLICATION_ID', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
