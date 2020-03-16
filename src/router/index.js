import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import('@/views/index/Index');
const Login = () => import('@/views/login/login');
const Home = () => import('@/views/home/home');
const User = () => import('@/views/user/user');
const SuperWork = () => import('@/views/user/super_work');
const Workstaion_center = () => import('@/views/workstaion_center/Index');
const Workstaion_center_apcos_workstation = () => import('@/views/workstaion_center/apcos_workstation/apcos_workstation');
const Workstaion_center_pubilish_center = ()=> import('@/views/workstaion_center/publish_center/publish_center');
const Workstaion_center_record_center = ()=> import('@/views/workstaion_center/record_center/record_center');
const Design_center = ()=>import('@/views/design_center/index')
const View_center = ()=>import('@/views/design_center/module/centerHtml')
const My_app_system = ()=>import('@/views/my_app_system/index')
const Login_account = () => import('@/views/login/module/account')
const Login_tel = () => import('@/views/login/module/tel')
// const User_all = () => import('@/views/user/module/all')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect: "/my_app_system",
    meta:{
      title:'首页'
    }
    },
  {
    path: '/index',
    name: 'Index',
    component: Index,
  },
  {
    path:'/super_home',
    name:"超级工作站",
    component: SuperWork,
    children:[
      {
        path: '/user',
        name: 'User',
        component: User,
        meta:{
          title:'个人中心'
        },
        children:[
      {
        path:'/all',
        name:'总览',
        component:() => import('@/views/user/module/all')
      },
      {
        path:'/my_ui',
        name:'我的UI设计',
        component:() => import('@/views/user/module/my_ui')
      },
      {
        path:'/my_app_template',
        name:'我的应用模块',
        component:() => import('@/views/user/module/my_app_template')
      },
      {
        path:'/my_app_sys',
        name:'我的应用系统',
        component:() => import('@/views/user/module/my_app_sys')
      },
      {
        path:'/my_3D',
        name:'我的3D场景',
        component:() => import('@/views/user/module/my_3D')
      },
      {
        path:'/my_diy',
        name:'我的diy代码',
        component:() => import('@/views/user/module/my_diy')
      },
      {
        path:'/my_yw',
        name:'运维',
        component:() => import('@/views/user/module/my_yw')
      },
      {
        path:'/my_cw',
        name:'财务',
        component:() => import('@/views/user/module/my_cw')
      },
      {
        path:'/my_pj',
        name:'评价',
        component:() => import('@/views/user/module/my_pj')
      },
      {
        path:'/my_mp',
        name:'名片设置',
        component:() => import('@/views/user/module/my_mp')
      }
    ]
      },
      {
        path: '/super_home',
        name: 'super_home',
        component:() => import('@/views/user/module/super_home'),
        meta:{
          title:'首页'
        },
      }
  ],
},
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children:[
      {
        path:'/account',
        name:'account',
        component:Login_account,
      },
      {
        path:'/tel',
        name:'tel',
        component:Login_tel,
      }
    ],
    meta:{title:'登陆'}
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
  {
    path: '/view_center',
    name: 'view_center',
    component:View_center,
  },
  {
    path: '/my_app_system',
    name: 'my_app_system',
    component:My_app_system,
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: '/super_workstation/',
  routes
})

export default router
