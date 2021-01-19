import { METHOD, URL_CAMPAIGN, URL_LOG } from '@/api/config'
import { CAMPAIGN_TYPE, CAMPAIGN_LOG_TYPE } from '@/utils/constants/campaign'
import { sendRequest } from '@/api/commons'
import { reduce } from 'lodash'

const state = {
  campaignId: null,
  campaignType: null,
  campaignLogByCampaignIds: null,
  campaignSendingStatusByIds: null
}

const mutations = {
  SET_CAMPAIGN_TYPE: (state, type) => {
    state.campaignType = type
  },
  SET_CAMPAIGN_ID: (state, id) => {
    state.campaignId = id
  },
  SET_LOG_BY_CAMPAIGN_IDS: (state, data) => {
    state.campaignLogByCampaignIds = data
  },
  SET_SENDING_STATS_BY_CAMPAIGN_IDS: (state, data) => {
    state.campaignSendingStatusByIds = data
  }
}

const actions = {
  setCampaignTypeMail({ dispatch }) {
    dispatch('setCampaignType', CAMPAIGN_TYPE.EMAIL)
  },
  setCampaignTypeSms({ dispatch }) {
    dispatch('setCampaignType', CAMPAIGN_TYPE.SMS)
  },
  setCampaignType({ commit }, type) {
    commit('SET_CAMPAIGN_TYPE', type)
  },
  setCampaignId({ commit }, id) {
    commit('SET_CAMPAIGN_ID', id)
  },
  changeCampaignToDraftState({ commit, dispatch }, campaign) {
    const campaignId = campaign.campaignId
    commit('app/CHANGE_CAMPAIGN_STATUS_TO_DRAFT', campaignId, { root: true })
    dispatch('cancelCampaignSchedule', campaignId)
  },
  cancelCampaignSchedule({ commit }, campaignId) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CAMPAIGN.CANCEL_SCHEDULE, { campaignId }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllCampaignLogInApplication({ commit, state, rootState }) {
    const applicationId = rootState.app.applicationId
    if (applicationId) {
      return new Promise((resolve, reject) => {
        sendRequest(METHOD.POST, URL_LOG.CAMPAIGN.GET_ALL, { applicationId }).then(response => {
          const logs = response.data
          if (logs) {
            const campaignLogByCampaignIds = getCampaignLogByCampaignIds(logs)
            commit('SET_LOG_BY_CAMPAIGN_IDS', campaignLogByCampaignIds)
          }
        })
      })
    }
  },
  getCampaignSendingStats({ commit }) {
    sendRequest(METHOD.POST, URL_CAMPAIGN.GET_SENDING_STATS, {}).then(response => {
      const stats = response.data
      if (stats) {
        const campaignSendingStatusByIds = getCampaignSendingStatusByIds(stats)
        commit('SET_SENDING_STATS_BY_CAMPAIGN_IDS', campaignSendingStatusByIds)
      }
    })
  }
}

const getCampaignLogByCampaignIds = (logs) => {
  const campaignLogByCampaignIds = reduce(logs, function(r, log) {
    r[log.campaignId] = r[log.campaignId] || {}

    r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE] = r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE] || {}
    r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt = r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt || 0

    r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING] = r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING] || {}

    r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT] = r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT] || {}

    r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE] = r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE] || {}
    r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt = r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt || 0

    const message = log.message
    const createdAt = log.createdAt
    const logType = log.type

    if (logType === CAMPAIGN_LOG_TYPE.UPDATE) {
      const lastLog = r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt
      if (createdAt > lastLog) {
        r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].message = message
        r[log.campaignId][CAMPAIGN_LOG_TYPE.UPDATE].createdAt = createdAt
      }
    }

    if (logType === CAMPAIGN_LOG_TYPE.SENDING) {
      r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING].message = message
      r[log.campaignId][CAMPAIGN_LOG_TYPE.SENDING].createdAt = createdAt
    }

    if (logType === CAMPAIGN_LOG_TYPE.SENT) {
      r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT].message = message
      r[log.campaignId][CAMPAIGN_LOG_TYPE.SENT].createdAt = createdAt
    }

    if (logType === CAMPAIGN_LOG_TYPE.SCHEDULE) {
      const lastLog = r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt
      if (createdAt > lastLog) {
        r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].message = message
        r[log.campaignId][CAMPAIGN_LOG_TYPE.SCHEDULE].createdAt = createdAt
      }
    }

    return r
  }, {})
  return campaignLogByCampaignIds
}

const getCampaignSendingStatusByIds = (stats) => {
  const campaignSendingStatusByIds = reduce(stats, function(r, stat) {
    r[stat.campaignId] = r[stat.campaignId] || {}
    r[stat.campaignId]['sent'] = stat.sent
    r[stat.campaignId]['total'] = stat.total
    return r
  }, {})
  return campaignSendingStatusByIds
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
