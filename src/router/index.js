import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
import manageAppRouter from './modules/manage-app'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/manage-application/list'
  },
  {
    path: '/manage-application/list',
    component: () => import('@/components/HelloWorld'),
    name: 'Home'
  },
  {
    path: '/layer-motion-slideshow',
    component: () => import('@/views/layer-motion-slideshow'),
    name: 'Layer Motion Slideshow'
  },
  {
    path: '/motion-reveal-slideshow',
    component: () => import('@/components/motion-reveal-slideshow'),
    name: 'Motion Reveal Slideshow'
  },
  {
    path: '/typography-motion',
    component: () => import('@/components/typography-motion'),
    name: 'Typography Motion'
  },
  {
    path: '/animate-number',
    component: () => import('@/views/animate-number'),
    name: 'Animate Number'
  },
  {
    path: '/animate-color',
    component: () => import('@/views/animate-color'),
    name: 'Animate Color'
  },
  {
    path: '/animate-radius',
    component: () => import('@/views/animate-radius'),
    name: 'Animate Radius'
  },
  {
    path: '/animate-calculus',
    component: () => import('@/views/animate-calculus'),
    name: 'Animate Calculus'
  },
  {
    path: '/wall-e',
    component: () => import('@/views/wall-e'),
    name: 'Wall-e'
  },
  {
    path: '/menu/1',
    component: () => import('@/views/circle-menu/menu-1'),
    name: 'Menu 1'
  },
  {
    path: '/editor',
    component: () => import('@/views/editor/tinymce'),
    name: 'Tinymce Editor'
  },
  {
    path: '/editor/sms',
    component: () => import('@/views/editor/sms'),
    name: 'Tinymce Editor SMS'
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  manageAppRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    base: process.env.VUE_APP_PUBLIC_PATH,
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
