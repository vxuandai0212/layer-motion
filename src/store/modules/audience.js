import { sendRequest } from '@/api/commons'
import { METHOD, URL_AUDIENCE, URL_CONTACT, URL_SEGMENT, URL_TAG, URL_LOG } from '@/api/config'
import { trimObject } from '@/utils'
import { reduce } from 'lodash'

const state = {
  audienceList: null,
  audienceQuery: null,
  audienceTotalItems: 0,
  audienceInfoListByIds: null,
  audienceContactList: null,
  audienceContactByIds: null,
  audienceLogByIds: null
}

const mutations = {
  SET_AUDIENCE_QUERY: (state, value) => {
    state.audienceQuery = value
  },
  SET_AUDIENCE_LIST: (state, value) => {
    state.audienceList = value
  },
  SET_AUDIENCE_LIST_BY_IDS: (state, value) => {
    state.audienceInfoListByIds = value
  },
  SET_TOTAL_ITEMS: (state, value) => {
    state.audienceTotalItems = value
  },
  SET_AUDIENCE_CONTACT_LIST: (state, value) => {
    state.audienceContactList = value
  },
  SET_AUDIENCE_CONTACT_BY_IDS: (state, value) => {
    state.audienceContactByIds = value
  },
  SET_AUDIENCE_LOG_BY_IDS: (state, value) => {
    state.audienceLogByIds = value
  }
}

const actions = {
  setAudienceQuery({ commit }, value) {
    commit('SET_AUDIENCE_QUERY', value)
  },
  setAudienceList({ commit }, value) {
    commit('SET_AUDIENCE_LIST', value)
  },
  fetchAudienceList({ commit, dispatch, rootState }) {
    const applicationId = rootState.app.applicationId
    dispatch('app/setLoading', true, { root: true })
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_AUDIENCE.GET_ALL_AUDIENCE_INFO, { applicationId: applicationId }).then(({ data }) => {
        commit('SET_AUDIENCE_LIST', data.audienceInfoList)
        commit('SET_AUDIENCE_LIST_BY_IDS', data.audienceInfoListByIds)
        commit('SET_TOTAL_ITEMS', data.audienceInfoList.length)
        setTimeout(() => {
          dispatch('getAllContactInAudience')
          dispatch('getAllAudienceLogInApplication')
        }, 500)
        resolve(data.audienceInfoList)
      }).catch(error => {
        reject(error)
      }).finally(() => {
        dispatch('app/setLoading', false, { root: true })
      })
    })
  },
  fetchAudience({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_AUDIENCE.GET, request).then(({ data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  createAudience({ commit }, audience) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_AUDIENCE.CREATE, trimObject(audience)).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteAudiences({ commit, rootState }, data) {
    return new Promise((resolve, reject) => {
      data.applicationId = rootState.app.applicationId
      sendRequest(METHOD.POST, URL_AUDIENCE.DELETE, trimObject(data)).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllAudience({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_AUDIENCE.GET_ALL, request).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchContactList({ dispatch }, request) {
    dispatch('app/setLoading', true, { root: true })
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.GET_ALL, request).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      }).finally(() => {
        dispatch('app/setLoading', false, { root: true })
      })
    })
  },
  fetchContact({ commit }, body) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.GET, body)
        .then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    })
  },
  createOrUpdateContact({ commit, rootState }, request) {
    const applicationId = rootState.app.applicationId
    if (applicationId !== null) {
      request.applicationId = applicationId
    }
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.CREATE_OR_UPDATE, trimObject(request)).then(({ data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteContact({ commit }, contactId) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.DELETE, URL_CONTACT.DELETE, contactId).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  importContactList({ dispatch }, request) {
    dispatch('app/setLoading', true, { root: true })
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.IMPORT, trimObject(request)).then(({ data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      }).finally(() => {
        dispatch('app/setLoading', false, { root: true })
      })
    })
  },
  searchContact({ dispatch }, request) {
    dispatch('app/setLoading', true, { root: true })
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.SEARCH, trimObject(request)).then(({ data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      }).finally(() => {
        dispatch('app/setLoading', false, { root: true })
      })
    })
  },
  createTag({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_TAG.INSERT_TAG, trimObject(request)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteTags({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_TAG.DELETE_TAG, trimObject(request)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteTag({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.DELETE, URL_TAG.INSERT_TAG + '/', request.tagId).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllTag({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_TAG.GET_ALL, trimObject(request)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeTag2Contacts({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_TAG.CHANGE_TAGS, trimObject(request)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllSegment({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_SEGMENT.GET_ALL, trimObject(request)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteSegments({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_SEGMENT.DELETE_SEGMENT, trimObject(request)).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  multiUpdateContact({ dispatch }, requestBody) {
    dispatch('app/setLoading', true, { root: true })
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.MULTI_UPDATE, trimObject(requestBody)).then((res) => {
        resolve()
      }).catch(error => {
        reject(error)
      }).finally(() => {
        dispatch('app/setLoading', false, { root: true })
      })
    })
  },
  createUpdateContactNote({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_CONTACT.CREATE_NOTE, trimObject(request)).then(({ data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteContactNote({ commit }, noteId) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.DELETE, URL_CONTACT.DELETE_NOTE, noteId).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchAudienceReport({ commit }, request) {
    return new Promise((resolve, reject) => {
      sendRequest(METHOD.POST, URL_AUDIENCE.GET_REPORT, request).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllContactInAudience({ commit, state }) {
    const audienceList = state.audienceList
    if (audienceList !== null) {
      const audienceIds = audienceList.map(audience => audience.id)
      if (audienceIds !== null && audienceIds.length !== 0) {
        return new Promise((resolve, reject) => {
          sendRequest(METHOD.POST, URL_AUDIENCE.GET_ALL_CONTACT_IN_AUDIENCE, { audienceIdList: audienceIds }).then(response => {
            const contacts = response.data
            if (contacts !== null && contacts.length !== 0) {
              commit('SET_AUDIENCE_CONTACT_LIST', contacts)
              const audienceContactByIds = getAudienceContactByIds(contacts)
              commit('SET_AUDIENCE_CONTACT_BY_IDS', audienceContactByIds)
            }
            resolve(contacts)
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  },
  getAllAudienceLogInApplication({ commit, state, rootState }) {
    const applicationId = rootState.app.applicationId
    if (applicationId) {
      return new Promise((resolve, reject) => {
        sendRequest(METHOD.POST, URL_LOG.AUDIENCE.GET_ALL, { applicationId }).then(response => {
          const logs = response.data
          if (logs) {
            const audienceLogByIds = getAudienceLogByIds(logs)
            commit('SET_AUDIENCE_LOG_BY_IDS', audienceLogByIds)
          }
        })
      })
    }
  }
}

const getAudienceContactByIds = (contacts) => {
  const audienceContactByIds = reduce(contacts, function(r, contact) {
    r[contact.audienceId] = r[contact.audienceId] || {}
    r[contact.audienceId]['totalContacts'] = r[contact.audienceId]['totalContacts'] || 0
    r[contact.audienceId]['totalSubscribers'] = r[contact.audienceId]['totalSubscribers'] || 0
    r[contact.audienceId]['totalUnsubscribers'] = r[contact.audienceId]['totalUnsubscribers'] || 0
    r[contact.audienceId]['totalNonSubscribers'] = r[contact.audienceId]['totalNonSubscribers'] || 0
    const status = contact.status
    if (status === 1) {
      r[contact.audienceId]['totalContacts'] += 1
      r[contact.audienceId]['totalSubscribers'] += 1
    }
    if (status === 2) {
      r[contact.audienceId]['totalContacts'] += 1
      r[contact.audienceId]['totalUnsubscribers'] += 1
    }
    if (status === 3) {
      r[contact.audienceId]['totalContacts'] += 1
      r[contact.audienceId]['totalNonSubscribers'] += 1
    }
    return r
  }, {})
  return audienceContactByIds
}

const getAudienceLogByIds = (logs) => {
  const audienceLogByIds = reduce(logs, function(r, log) {
    const audienceId = log.audienceId
    const type = log.type
    const message = log.message
    // init
    r[audienceId] = r[audienceId] || {}
    r[audienceId][type] = r[audienceId][type] || ''
    // set value
    r[audienceId][type] = message
    return r
  }, {})
  return audienceLogByIds
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
