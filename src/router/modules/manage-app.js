import HelloWorld from '@/components/HelloWorld'

const manageAppRouter = {
  path: '/',
  component: HelloWorld,
  redirect: '/manage-application/list',
  name: 'ManageApplication',
  meta: {
    title: 'Quản lí ứng dụng',
    icon: 'tree'
  }
}
export default manageAppRouter
