/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
import { checkRouterPermission, checkRouterMakeChangePermission } from '@/utils/permission'
import store from '@/store'

const manageAppRouter = {
  path: '/manage-application',
  component: Layout,
  redirect: '/manage-application/list',
  name: 'ManageApplication',
  meta: {
    title: 'Quản lí ứng dụng',
    icon: 'tree'
  },
  children: [
    {
      path: ':applicationId(\\d+)/sms/:campaignId',
      component: () => import('@/views/manage-app/components/manage-campaigns/SMS'),
      name: 'SMS',
      meta: { title: 'SMS' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/vtf/:campaignId',
      component: () => import('@/views/manage-app/components/manage-campaigns/vtf'),
      name: 'VTF',
      meta: { title: 'Viettel Family' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/fcm/:campaignId',
      component: () => import('@/views/manage-app/components/manage-campaigns/FCM'),
      name: 'FCM',
      meta: { title: 'FCM' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/mail/:campaignId',
      component: () => import('@/views/manage-app/components/manage-campaigns/Mail'),
      name: 'Mail',
      meta: { title: 'Email' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: 'list',
      component: () => import('@/views/manage-app/list'),
      name: 'ApplicationList',
      meta: { title: 'Danh sách ứng dụng', noCache: true },
      beforeEnter: (to, from, next) => {
        if (store.getters.isUserRole) {
          next({ path: '/403' })
        } else {
          next()
        }
      }
    },
    {
      path: 'create',
      component: () => import('@/views/manage-app/create'),
      name: 'ApplicationCreate',
      meta: { title: 'Thêm mới ứng dụng' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAdminRole) {
          next()
        } else {
          next({ path: '/404' })
        }
      }
    },
    {
      path: 'edit/:applicationId(\\d+)',
      component: () => import('@/views/manage-app/edit'),
      name: 'ApplicationEdit',
      meta: {
        title: 'Thay đổi thông tin ứng dụng',
        noCache: true,
        activeMenu: '/manage-application/list'
      },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/template/sms/create',
      component: () => import('@/views/manage-app/components/manage-template/sms/create'),
      name: 'SMSTemplateCreate',
      meta: { title: 'Thêm mới mẫu sms' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result1 => {
          if (result1) {
            checkRouterMakeChangePermission(to).then(result2 => {
              if (result2) {
                next()
              } else {
                next({ path: '/404' })
              }
            })
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/template/sms/edit/:templateId(\\d+)',
      component: () => import('@/views/manage-app/components/manage-template/sms/edit'),
      name: 'SMSTemplateEdit',
      meta: { title: 'Thay đổi biểu mẫu sms', noCache: true },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/template/vtf/create',
      component: () => import('@/views/manage-app/components/manage-template/vtf/create'),
      name: 'VTFTemplateCreate',
      meta: { title: 'Thêm mới mẫu Viettel Family' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result1 => {
          if (result1) {
            checkRouterMakeChangePermission(to).then(result2 => {
              if (result2) {
                next()
              } else {
                next({ path: '/404' })
              }
            })
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/template/vtf/edit/:templateId(\\d+)',
      component: () => import('@/views/manage-app/components/manage-template/vtf/edit'),
      name: 'VTFTemplateEdit',
      meta: { title: 'Thay đổi biểu mẫu Viettel Family', noCache: true },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/template/:channelType(\\d+)/unlayer/create',
      component: () => import('@/views/manage-app/components/manage-template/unlayer/create'),
      name: 'UnlayerTemplateCreate',
      meta: { title: 'Tạo mẫu unlayer' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result1 => {
          if (result1) {
            checkRouterMakeChangePermission(to).then(result2 => {
              if (result2) {
                next()
              } else {
                next({ path: '/404' })
              }
            })
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/template/:channelType(\\d+)/tinymce/create',
      component: () => import('@/views/manage-app/components/manage-template/tinymce/create'),
      name: 'TinymceTemplateCreate',
      meta: { title: 'Tạo mẫu tinymce' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result1 => {
          if (result1) {
            checkRouterMakeChangePermission(to).then(result2 => {
              if (result2) {
                next()
              } else {
                next({ path: '/404' })
              }
            })
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/template/tinymce/:templateId(\\d+)',
      component: () => import('@/views/manage-app/components/manage-template/tinymce/edit'),
      name: 'MailTemplateTinyEdit',
      meta: { title: 'Thay đổi biểu mẫu email tinymce', noCache: true },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }

    },
    {
      path: ':applicationId(\\d+)/template/unlayer/:templateId(\\d+)',
      component: () => import('@/views/manage-app/components/manage-template/unlayer/edit'),
      name: 'MailTemplateUnlayerEdit',
      meta: { title: 'Thay đổi biểu mẫu email unlayer', noCache: true },
      hidden: true
    },
    {
      path: ':applicationId(\\d+)/campaign/:campaignId(\\d+)/viewTemplate',
      component: () => import('@/views/manage-app/components/manage-campaigns/ViewTemplate'),
      name: 'AnnounceDetail',
      meta: { title: 'Xem tin' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/campaign/:campaignId(\\d+)/report',
      component: () => import('@/views/manage-app/components/manage-report/CampaignReport'),
      name: 'CampaignReport',
      meta: { title: 'Xem báo cáo campaign' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/audience/:audienceId(\\d+)/contact/:contactId(\\d+)',
      component: () => import('@/views/manage-app/components/manage-audience/contact/contact-detail/ContactDetail'),
      name: 'ContactInfo',
      meta: { title: 'Hồ sơ thuê bao' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/audience/:audienceId(\\d+)/stats',
      component: () => import('@/views/manage-app/components/manage-audience/contact/AllContactList'),
      name: 'AudienceStats',
      meta: { title: ' ' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/audience/:audienceId(\\d+)/contact-search',
      component: () => import('@/views/manage-app/components/manage-audience/contact/search/SearchContact'),
      name: 'ContactSearch',
      meta: { title: 'Tìm kiếm thuê bao' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result => {
          if (result) {
            next()
          } else {
            next({ path: '/404' })
          }
        })
      }
    },
    {
      path: ':applicationId(\\d+)/audience/:audienceId(\\d+)/contact-import',
      component: () => import('@/views/manage-app/components/manage-audience/contact/import/ContactImportTab'),
      name: 'ContactImport',
      meta: { title: 'Import thuê bao' },
      hidden: true,
      beforeEnter: (to, from, next) => {
        checkRouterPermission(to).then(result1 => {
          if (result1) {
            checkRouterMakeChangePermission(to).then(result2 => {
              if (result2) {
                next()
              } else {
                next({ path: '/404' })
              }
            })
          } else {
            next({ path: '/404' })
          }
        })
      }
    }
  ]
}
export default manageAppRouter
