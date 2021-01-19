import { ROLE_CONST } from '@/utils/constant'
import { RECEIVER_STATUS } from '@/utils/constants/receiver'
import { CAMPAIGN_TYPE } from '@/utils/constants/campaign'
import { CAMPAIGN_LOG_MAP } from '@/utils/constants/campaign'

const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  // roles
  roles: state => state.user.roles,
  applicationTypeRoles: state => state.user.roles.filter(item => item.field === ROLE_CONST.APP),
  isAdminRole: state => state.user.roles.some(role => role.field === ROLE_CONST.ADMIN),
  isUserRole: state => state.user.roles && state.user.roles.length === 0,
  permission_routes: state => state.permission.routes,

  errorLogs: state => state.errorLog.logs,
  selectedCampaigns: state => state.app.selectedCampaigns,
  campaignsTable: state => state.app.campaignsTable,
  campDeleteDiagVisible: state => state.app.campDeleteDiagVisible,
  campaignQuery: state => state.app.campaignQuery,
  campaignList: state => state.app.campaignList,
  campaignListNumber: state => state.app.campaignListNumber,
  campaignListLabel: state => state.app.campaignListLabel,
  folderList: state => state.app.folderList,
  folderQuery: state => state.app.folderQuery,
  loading: state => state.app.loading,
  audienceQuery: state => state.audience.audienceQuery,
  audienceList: state => state.audience.audienceList,
  audienceInfoListByIds: state => state.audience.audienceInfoListByIds,
  audienceTotalItems: state => state.audience.audienceTotalItems,
  segmentList: state => state.audience.segmentList,
  applicationList: state => state.app.applicationList,

  allOrgIds: state => state.organization.org_ids,
  allChildOrgIds: state => state.organization.org_child_ids,
  loadingEmPage: state => state.organization.loading_em_page,
  loadingAllEm: state => state.organization.loading_all_em,
  loadingFilter: state => state.organization.loading_filter,
  ems: state => state.organization.ems,
  emIds: state => state.organization.em_ids,
  displayEms: state => state.organization.display_ems,
  currentReceiverPage: state => state.organization.current_page,
  receiverPageSize: state => state.organization.page_size,
  rootOrg: state => state.organization.root_org,

  currentTemplateTab: state => state.template.currentTab,

  // receiver
  receiverList: state => state.receiver.receiverList,
  invalidReceiverList: state => state.receiver.invalidReceiverList,
  totalReceivers: (state, getters) => state.receiver.currentReceiverId && getters.receiverList ? getters.receiverList.length : 0, // state.contacts.totalReceivers,
  totalReceiversInfo: (state, getters) => `Tổng số người nhận: ${getters.totalReceivers}`,
  totalValidReceivers: (state, getters) => getters.totalReceivers - getters.totalInvalidReceivers,
  totalValidReceiversInfo: (state, getters) => `Tổng số người nhận hợp lệ: ${getters.totalValidReceivers}`,
  totalInvalidReceivers: (state, getters) => state.receiver.currentReceiverId && getters.invalidReceiverList ? getters.invalidReceiverList.length : 0,
  totalInvalidReceiversInfo: (state, getters) => `Tổng số người nhận không hợp lệ: ${getters.totalInvalidReceivers}`,
  displayInvalidReceiverList: (state, getters) => getters.invalidReceiverList.slice((getters.currentInvalidReceiverPage - 1) * getters.invalidReceiverPageSize, getters.currentInvalidReceiverPage * getters.invalidReceiverPageSize),
  currentInvalidReceiverPage: state => state.receiver.currentInvalidReceiverPage,
  invalidReceiverPageSize: state => state.receiver.invalidReceiverPageSize,
  currentEditInvalidContactId: state => state.receiver.currentEditInvalidContactId,
  currentCampaignType: state => state.campaign.campaignType,
  currentReceiverType: state => state.receiver.currentReceiverType,
  isEditInvalidReceiver: state => (id) => state.receiver.currentEditInvalidContactId === id,
  isEditInvalidEmail: state => (id) => {
    return state.receiver.currentEditInvalidContactId === id && state.campaign.campaignType === CAMPAIGN_TYPE.EMAIL
  },
  isEditInvalidPhone: state => (id) => {
    return state.receiver.currentEditInvalidContactId === id && state.campaign.campaignType === CAMPAIGN_TYPE.SMS
  },
  hasEmptyEmail: state => id => state.receiver.receiverErrorByIds[id].emptyEmail,
  hasInvalidLengthEmail: state => id => state.receiver.receiverErrorByIds[id].invalidLengthEmail,
  hasInvalidFormatEmail: state => id => state.receiver.receiverErrorByIds[id].invalidFormatEmail,
  hasEmptyPhone: state => id => state.receiver.receiverErrorByIds[id].emptyPhone,
  hasInvalidLengthPhone: state => id => state.receiver.receiverErrorByIds[id].invalidLengthPhone,
  hasInvalidFormatPhone: state => id => state.receiver.receiverErrorByIds[id].invalidFormatPhone,
  loadingInvalidReceiverTable: state => state.receiver.loadingInvalidReceiverTable,
  loadingInvalidReceiver: state => state.receiver.loadingInvalidReceiver,
  currentReceiverId: state => state.receiver.currentReceiverId,
  receiverSectionStatus: (state, getters) => {
    const receiverId = getters.currentReceiverId
    const totalInvalid = getters.totalInvalidReceivers
    if (receiverId !== null && receiverId > 0) {
      if (totalInvalid === 0) {
        return RECEIVER_STATUS.VALID
      } else {
        return RECEIVER_STATUS.INVALID
      }
    } else {
      return RECEIVER_STATUS.EMPTY
    }
  },
  isShowInvalidReceiverSection: (state, getters) => {
    return getters.receiverSectionStatus === RECEIVER_STATUS.INVALID
  },
  isValidReceiverSection: (state, getters) => {
    return getters.receiverSectionStatus === RECEIVER_STATUS.VALID
  },
  campaignType: (state) => {
    return state.campaign.campaignType
  },
  criteriaLabel: (state, getters) => {
    const campaignType = getters.campaignType
    if (campaignType === CAMPAIGN_TYPE.EMAIL) {
      return 'Tiêu chí đánh giá email hợp lệ'
    } else if (campaignType === CAMPAIGN_TYPE.SMS) {
      return 'Tiêu chí đánh giá số điện thoại hợp lệ'
    } else {
      return 'Tiêu chí đánh giá người nhận hợp lệ'
    }
  },
  currentApplicationId: (state) => {
    return state.app.applicationId
  },
  currentAudienceId: (state) => {
    return state.receiver.currentAudienceId
  },
  currentAudienceInfo: (state, getters) => {
    let audienceInfo = null
    const currentAudienceId = getters.currentAudienceId
    const audienceInfoListByIds = getters.audienceInfoListByIds
    if (currentAudienceId !== null && audienceInfoListByIds !== null) {
      audienceInfo = audienceInfoListByIds[currentAudienceId]
    }
    return audienceInfo
  },
  currentAudienceName: (state, getters) => {
    const audienceInfo = getters.currentAudienceInfo
    if (audienceInfo !== null) {
      return audienceInfo.name
    } else {
      return ''
    }
  },
  allAlias: (state) => {
    return state.alias.byIds
  },
  currentAliasSms: (state, getters) => {
    const currentApplicationId = getters.currentApplicationId
    const allAlias = getters.allAlias
    if (currentApplicationId !== null && allAlias !== null) {
      const currentAlias = allAlias[currentApplicationId]
      if (currentAlias !== null) {
        return currentAlias.aliasSms
      }
    }
    return 'currentAliasSms'
  },
  currentAliasEmailName: (state, getters) => {
    const currentApplicationId = getters.currentApplicationId
    const allAlias = getters.allAlias
    if (currentApplicationId !== null && allAlias !== null) {
      const currentAlias = allAlias[currentApplicationId]
      if (currentAlias !== null) {
        return currentAlias.aliasEmailName
      }
    }
    return 'currentAliasEmailName'
  },
  currentAliasEmailAddress: (state, getters) => {
    const currentApplicationId = getters.currentApplicationId
    const allAlias = getters.allAlias
    if (currentApplicationId !== null && allAlias !== null) {
      const currentAlias = allAlias[currentApplicationId]
      if (currentAlias !== null) {
        return currentAlias.aliasEmailAddress
      }
    }
    return 'currentAliasEmailAddress'
  },
  getTotalContactByAudienceId: (state) => (audienceId) => {
    const audienceContactByIds = state.audience.audienceContactByIds
    if (audienceContactByIds !== null && audienceId !== null) {
      const audience = audienceContactByIds[audienceId]
      if (audience) {
        return audience.totalContacts
      }
    }
    return 0
  },
  getTotalSubscriberByAudienceId: (state) => (audienceId) => {
    const audienceContactByIds = state.audience.audienceContactByIds
    if (audienceContactByIds !== null && audienceId !== null) {
      const audience = audienceContactByIds[audienceId]
      if (audience) {
        return audience.totalSubscribers
      }
    }
    return 0
  },
  getAudienceLogByAudienceIdAndLogType: (state) => (audienceId, type) => {
    const logs = state.audience.audienceLogByIds
    if (audienceId && type && logs) {
      const audienceLog = logs[audienceId]
      if (audienceLog) {
        const log = audienceLog[type]
        return log
      }
    }
    return 'Loading audience log'
  },
  getCampaignLog: (state) => (campaign) => {
    const campaignId = campaign.campaignId
    const campaignStatus = campaign.status
    const campaignLogByCampaignIds = state.campaign.campaignLogByCampaignIds
    if (campaignId && campaignStatus && campaignLogByCampaignIds) {
      const logType = CAMPAIGN_LOG_MAP.get(campaignStatus) || CAMPAIGN_LOG_MAP.get('default')
      if (campaignLogByCampaignIds[campaignId] && campaignLogByCampaignIds[campaignId][logType]) {
        return campaignLogByCampaignIds[campaignId][logType].message
      }
    }
    return 'Loading campaign log'
  },
  getCampaignProgressPercentage: (state) => (campaign) => {
    const campaignId = campaign.campaignId
    const campaignSendingStatusByIds = state.campaign.campaignSendingStatusByIds
    if (campaignId && campaignSendingStatusByIds && campaignSendingStatusByIds[campaignId]) {
      const sent = campaignSendingStatusByIds[campaignId].sent
      const total = campaignSendingStatusByIds[campaignId].total
      const percent = (sent * 100) / total
      if (percent) {
        return percent
      }
      return 0
    }
    return 0
  },
  getCampaignSentMessage: (state) => (campaign) => {
    const campaignId = campaign.campaignId
    const campaignSendingStatusByIds = state.campaign.campaignSendingStatusByIds
    if (campaignId && campaignSendingStatusByIds) {
      if (campaignSendingStatusByIds[campaignId]) {
        const sent = campaignSendingStatusByIds[campaignId].sent
        if (sent) {
          return sent
        }
        return 0
      }
      return 0
    }
    return 0
  }
}

export default getters
