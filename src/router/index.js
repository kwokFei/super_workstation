import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import('@/views/index/Index');
const Login = () => import('@/views/login/Login');
const Workstaion_center = () => import('@/views/workstaion_center/Index');
const Workstaion_center_apcos_workstation = () => import('@/views/workstaion_center/apcos_workstation/apcos_workstation');
const Workstaion_center_pubilish_center = ()=> import('@/views/workstaion_center/publish_center/publish_center');
const Workstaion_center_record_center = ()=> import('@/views/workstaion_center/record_center/record_center');
const Design_center = ()=>import('@/views/design_center/index')

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: "/index"
    },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/workstaion_center',
    name: 'Workstaion_center',
    component: Workstaion_center,
    children:[
      {
        path:"/",
        name:"Workstaion_center_index",
        redirect: "apcos_workstation",
      },
      {
        path:"apcos_workstation",
        name:"apcos_workstation",
        component: Workstaion_center_apcos_workstation,
      },
      {
        path:"pubilish_center",
        name:"publish_center",
        component: Workstaion_center_pubilish_center,
      },
      {
        path:"record_center",
        name:"record_center",
        component: Workstaion_center_record_center,
      }
    ]
  },
  {
    path: '/design_center',
    name: 'Design_center',
    component: Design_center,
    children:[
      {
        path:"apcos_workstation",
        name:"apcos_workstation",
        component: Workstaion_center_apcos_workstation,
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
