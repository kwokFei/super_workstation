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
      },
      {
        path:"/project_center",
        name:'project_center',
        component:() => import('@/views/user/module/project_center'),
        // redirect: "/project_center/project_project_all",
        meta:{
          title:'项目中心'
        },
        children:[
            {   path:"/",
                component:() => import('@/views/user/module/project_project_all'),
            },
            {   path:"project_project_all",
                component:() => import('@/views/user/module/project_project_all'),
            },
            {   path:"project_my_project",
                component:() => import('@/views/user/module/project_my_project'),
            },
            {   path:"project_my_node",
                component:() => import('@/views/user/module/project_my_node'),
            },
            {   path:"project_create_project",
                component:() => import('@/views/user/module/project_create_project'),
            },
            {   path:"project_project_log",
                component:() => import('@/views/user/module/project_project_log'),
            },

        ]

      },
      {
        path:"/hardware_center",
        name:'hardware_center',
        component:() => import('@/views/super_yjzx/index'),
        meta:{
          title:'硬件中心'
        },
      },
      {
        path:"/release_center",
        name:'release_center',
        component:() => import('@/views/super_release_center/index'),
        meta:{
          title:'发布中心'
        },
        children:[
          {
            path:'/gk',
            name:'gk',
            component:() => import('@/views/super_release_center/module/gk'),
          },
          {
            path:'/list',
            name:'list',
            component:() => import('@/views/super_release_center/module/list'),
          }
        ]
      },
      {
        path:"/operations_center",
        name:'operations_center',
        component:() => import('@/views/super_operations_center/index'),
        meta:{
          title:'发布中心'
        },
        children:[
          {
            path:'/opGk',
            name:'opGk',
            component:() => import('@/views/super_operations_center/module/opGk'),
          },
          {
            path:'/opList',
            name:'opList',
            component:() => import('@/views/super_operations_center/module/opList'),
          }
        ]
      }
  ],
},
  {
    path:'/mercenary_library',
    name:'mercenary_library',
    component:() => import('@/views/mercenary_library/index'),
    meta:{
      title:'佣兵库'
    },
    children:[
      {
        path:'/ml_home',
        name:'ml_home',
        component:() => import('@/views/mercenary_library/module/home'),
      },
      {
        path:'/people_ku',
        name:'people_ku',
        component:() => import('@/views/mercenary_library/module/peopleKu'),
      },
      {
        path:'/my_zm',
        name:'my_zm',
        component:() => import('@/views/mercenary_library/module/my_zm'),
      },
      {
        path:'/my_yp',
        name:'my_yp',
        component:() => import('@/views/mercenary_library/module/my_yp'),
      },
      {
        path:'/dzht',
        name:'dzht',
        component:() => import('@/views/mercenary_library/module/dzht'),
      },
    ]
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
  },
  {
    path:"/cockpit",
    name:'cockpit',
    component:() => import('@/views/cockpit/index'),
    meta:{
      title:'驾驶舱'
    },
  },

  {
    path:"/service_training",
    name:'service_training',
    component:() => import('@/views/super_service_training/index'),
    meta:{
      title:'服务培训'
    },
  },
  {
    path:"/super_design_center",
    name:'super_design_center',
    component:() => import('@/views/super_design_center/index'),
    meta:{
      title:'设计中心'
    },
    children:[
      {
        path:'/app_system_setting',
        name:'app_system_setting',
        component:() => import('@/views/super_design_center/module/app_system_setting'),
      },
      {
        path:'/app_template_setting',
        name:'app_template_setting',
        component:() => import('@/views/super_design_center/module/app_template_setting'),
      },
      {
        path:'/ThreeD_setting',
        name:'ThreeD_setting',
        component:() => import('@/views/super_design_center/module/ThreeD_setting'),
      },
      {
        path:'/diy_setting',
        name:'diy_setting',
        component:() => import('@/views/super_design_center/module/diy_setting'),
      },
      {
        path:'/ui_setting',
        name:'ui_setting',
        component:() => import('@/views/super_design_center/module/ui_setting'),
      },
      {
        path:'/jsc_setting',
        name:'jsc_setting',
        component:() => import('@/views/super_design_center/module/jiashicang'),
      }
    ]
  },

  {
    path:'/jsc_setting_2',
    name:'jsc_setting_2',
    component:() => import('@/views/super_cockpit/index'),
  },
  {
    path:'/jsc_setting_3',
    name:'jsc_setting_3',
    component:() => import('@/views/super_cockpit/module/index'),
  },
  {
    path: '/super_app_system',
    name: 'super_app_system',
    component: () => import('@/views/super_app_system/index'),
    meta:{
      title:'应用系统'
    },
  },
  {
    path:'/sys_index',
    name:'sys_index',
    component: () => import('@/views/super_app_system/module/index'),
  },
  {
    path: '/super_app_template',
    name: 'super_app_template',
    component: () => import('@/views/super_app_template/index'),
    meta:{
      title:'应用模块'
    }
  },
  {
    path:'/tem_index',
    name:'tem_index',
    component: () => import('@/views/super_app_template/module/index'),
  },
  {
    path: '/super_3d',
    name: 'super_3d',
    component: () => import('@/views/super_3d/index'),
    meta:{
      title:'3d场景'
    }
  },
  {
    path: '/super_diy',
    name: 'super_diy',
    component: () => import('@/views/super_diy/index'),
    meta:{
      title:'diy编码'
    }
  },
  {
    path:'/diy_index',
    name:'diy_index',
    component: () => import('@/views/super_diy/module/index'),
  },
  {
    path:'/threeD_index',
    name:'threeD_index',
    component: () => import('@/views/super_3d/module/index'),
  },
  {
    path: '/super_ui',
    name: 'super_ui',
    component: () => import('@/views/super_ui/index'),
    meta:{
      title:'ui设计'
    }
  },
  {
    path:'/ui_index',
    name:'ui_index',
    component: () => import('@/views/super_ui/module/index'),
  },
  {
    path:'/iec_index',
    name:'iec_index',
    component: () => import('@/views/iec/index'),
    meta:{
      title:'生态链'
    }
  },
  {
    path:'/diy_three',
    name:'diy_three',
    component: () => import('@/views/super_diy3/index')
  }
];

const router = new VueRouter({
  mode: 'hash',
  // base: '/super_workstation/',
  base: process.env.BASE_URL,
  routes
});

export default router
