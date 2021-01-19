
const BASE_API_URL = process.env.VUE_APP_BASE_API_URL
const VUE_APP_BYPASS_PERMISSION_SYSTEM = process.env.VUE_APP_BYPASS_PERMISSION_SYSTEM
const VUE_APP_DEFAULT_ADMIN_EMPLOYEE_CODES = process.env.VUE_APP_DEFAULT_ADMIN_EMPLOYEE_CODES

const METHOD = {
  POST: 'post',
  DELETE: 'delete',
  GET: 'get'
}

const URL_APPLICATION = {
  CREATE: '',
  UPDATE: '',
  GET_ALL: '/rest/v1/application-management/get-all',
  DELETE: '',
  GET: '/rest/v1/application-management/info'
}

const URL_ALIAS = {
  GET_ALL_BY_IDS: '/rest/v1/applications/alias/get-all-byIds'
}

const URL_APPLICATION_ACCOUNT = {
  CREATE: '',
  UPDATE: '',
  GET_ALL: '/rest/v1/account/get-all',
  DELETE: ''
}

const URL_APPLICATION_OWNER = {
  CREATE: '',
  UPDATE: '',
  GET_ALL: '',
  DELETE: ''
}

const URL_EMPLOYEE = {
  GET_ALL: '',
  GET_EMPLOYEE: ''
}

const URL_TEMPLATE_TYPE = {
  SMS: '1',
  Email: '2',
  FCM: '3'
}

const URL_CAMPAIGN = {
  SEND_NOW: '/rest/v1/campaigns/send-now',
  CREATE: '/rest/v1/campaigns',
  UPDATE: '/rest/v1/campaigns',
  GET_ALL: '/rest/v1/campaigns/get-all',
  GET: '/rest/v1/campaigns/get',
  GET_DETAIL: '/rest/v1/campaigns/get-detail',
  DELETE: '/rest/v1/campaigns/delete-multi',
  VIEW_REPORT: '/rest/v1/campaigns/report',
  VIEW_MESSAGE: '/rest/v1/template/get',
  SEND_CAMPAIGN: '/rest/v1/campaigns/send',
  CAMPAIGN_LIST_LABEL: '/rest/v1/campaigns/get-label',
  GET_RECEIVER: '/rest/v1/campaigns/get-receiver',
  CANCEL_SCHEDULE: '/rest/v1/campaigns/schedule/cancel',
  GET_SENDING_STATS: '/rest/v1/campaigns/stats/sending'
}

const URL_RECEIVER = {
  GET: '/rest/v1/receivers/get',
  UPDATE: '/rest/v1/receivers',
  GET_INVALID_CONTACT: '/rest/v1/receivers/get-invalid-contact',
  GET_AUDIENCE_INFO: '/rest/v1/receivers/audiences/get-info'
}

const URL_FOLDER = {
  CREATE: '/rest/v1/folders',
  UPDATE: '',
  GET_ALL: '/rest/v1/folders/get-all',
  GET: '/rest/v1/folders/get',
  DELETE: '/rest/v1/folders/',
  MOVE_CAMPAIGN_TO_FOLDER: '/rest/v1/folders/move',
  MOVE_TEMPLATE_TO_FOLDER: '/rest/v1/folders/move'
}

const URL_AUDIENCE = {
  GET_ALL: '/rest/v1/audiences/get-all',
  DELETE: '/rest/v1/audiences/delete-multi',
  CREATE: '/rest/v1/audiences',
  GET: '/rest/v1/audiences/get',
  GET_REPORT: '/rest/v1/audiences/report',
  GET_ALL_AUDIENCE_INFO: '/rest/v1/audiences/info/get-all',
  GET_ALL_CONTACT_IN_AUDIENCE: '/rest/v1/audiences/contacts/info/get-all'
}

const URL_CONTACT = {
  GET_ALL: 'rest/v1/contacts/get-all',
  CREATE_OR_UPDATE: 'rest/v1/contacts',
  MULTI_UPDATE: 'rest/v1/audiences/update-multi',
  IMPORT: '/rest/v1/audiences/import-contacts',
  SEARCH: 'rest/v1/contacts/search',
  DELETE: 'rest/v1/contacts/',
  UPDATE_MAIL_PHONE: 'rest/v1/contacts/update',
  GET: '/rest/v1/contacts/get',
  CREATE_NOTE: 'rest/v1/notes',
  DELETE_NOTE: 'rest/v1/notes/',
  GET_ALL_IN_ORG_LIST: 'rest/v1/contacts/get-all-in-orgs',
  GET_CONTACT_IN_RECEIVER: '/rest/v1/contacts/get-total-contact'
}

const URL_SEGMENT = {
  GET_SEGMENT: '/rest/v1/segments/get-all',
  GET_ALL: 'rest/v1/segments/get-all',
  DELETE_SEGMENT: '/rest/v1/segments/delete-multi'
}

const URL_TAG = {
  GET_ALL: '/rest/v1/tags/get-all',
  INSERT_TAG: '/rest/v1/tags',
  CHANGE_TAGS: '/rest/v1/audiences/change-tags',
  DELETE_TAG: '/rest/v1/tags/delete-multi',
  GET_CONTACTS: '/rest/v1/contacts/get-all'
}

const URL_ORG = {
  GET_ALL: '/rest/v1/orgs/get-all',
  GET_ALL_INTEGRATE: '/rest/v1/orgs/get-all-integrate',
  GET_ORG_LEVEL: '/rest/v1/orgs/get-level'
}

const URL_LOG = {
  AUDIENCE: {
    GET_ALL: '/rest/v1/logs/audiences/get-all'
  },
  CAMPAIGN: {
    GET_ALL: '/rest/v1/logs/campaigns/get-all'
  }
}

const CAMPAIGN_TYPE = {
  SMS: 1,
  MAIL: 2,
  FCM: 3
}

export {
  BASE_API_URL,
  METHOD,
  URL_APPLICATION,
  URL_APPLICATION_ACCOUNT,
  URL_APPLICATION_OWNER,
  URL_ALIAS,
  URL_EMPLOYEE,
  URL_TEMPLATE_TYPE,
  URL_CAMPAIGN,
  URL_RECEIVER,
  URL_FOLDER,
  URL_AUDIENCE,
  URL_SEGMENT,
  URL_TAG,
  URL_CONTACT,
  URL_ORG,
  URL_LOG,
  CAMPAIGN_TYPE,
  VUE_APP_BYPASS_PERMISSION_SYSTEM,
  VUE_APP_DEFAULT_ADMIN_EMPLOYEE_CODES
}
