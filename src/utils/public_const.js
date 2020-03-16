export const baseModuleList = [
    {
        code:"1",
        icon:"/static/img/allIcon/shouye_1.png",
        name:"首页",
        isCheck:true,
        isReadonly:true,
        iframeUrl:"/static/htmls/ggHome.html",
        childModule:[],
    },
    {
        code:"2",
        icon:"/static/img/allIcon/xitongguanli_1.png",
        name:"系统管理",
        isCheck:true,
        isReadonly:true,
        iframeUrl:"/static/htmls/xitongguanli/header.html",
        childModule:[
            {
                code:"2_1",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"系统日志管理",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/office-ui/html/systemLog.html",
            },
            {
                code:"2_2",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"用户管理",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/office-ui/html/user.html",
            },
            {
                code:"2_3",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"展厅企业管理",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/office-ui/html/role.html",
            },
            {
                code:"2_4",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"菜单权限管理",
                isCheck:true,
                iframeUrl:"/static/office-ui/html/menu.html",
            },
            {
                code:"2_5",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"登录日志管理",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/office-ui/html/loginLog.html",
            },
            {
                code:"2_6",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"操作日志管理",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/office-ui/html/controlLog.html",
            },
        ],
    },
    {
        code:"3",
        icon:"/static/img/allIcon/shijianguanli_1.png",
        name:"事件管理",
        isCheck:true,
        isReadonly:true,
        iframeUrl:"/static/htmls/shebeishijian/header.html",
        childModule:[],
    },
    {
        code:"4",
        icon:"/static/img/allIcon/pingtaiguanli_1.png",
        name:"平台管理",
        isCheck:true,
        isReadonly:true,
        iframeUrl:"/static/htmls/pingtaiguanli/header.html",
        childModule:[],
    },
    {
        code:"5",
        icon:"/static/img/allIcon/3dguanli_1.png",
        name:" 管理3D",
        isCheck:true,
        isReadonly:true,
        iframeUrl:"/static/htmls/guanli3D/header.html",
        childModule:[],
    },
    {
        code:"103",
        icon:"/static/img/allIcon/shebeiguanli_1.png",
        name:" 设备管理",
        isCheck:true,
        isReadonly:true,
        iframeUrl:"/static/htmls/shebeiguanli/header.html"
    },
]

export const allList = [
    {
        code:"7",
        icon:"/static/img/allIcon/huiyiguanli_1.png",
        name:"会议室管理",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/office-ui/html/officeRoom.html",
        childModule:[],
        type:"应用类",
        left_img:"/static/img/left_center_module_item/huiyiguanli.jpg",
    },
    {
        code:"8",
        icon:"/static/img/allIcon/kaoqinmokuai_1.png",
        name:"考勤管理",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/office-ui/html/attInfo.html",
        childModule:[],
        type:"应用类",
        left_img:"/static/img/left_center_module_item/kaoqinguanli.jpg",
    },
    {
        code:"9",
        icon:"/static/img/allIcon/baojingxitong_1.png",
        name:"报警系统",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/warningstystem/header.html",
        childModule:[
            {
                code:"9_1",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                isCheck:true,
                isReadonly:false,
                iframeUrl : "/static/htmls/warningstystem/GeneralSystem.html",
                name : "系统概览",
                left_img:"/static/img/left_center_module_item/son_module/xinxigaikuang.png",
            },
            {
                code:"9_2",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                isCheck:true,
                isReadonly:false,
                iframeUrl : "/static/htmls/warningstystem/DeviceManagement.html",
                name : "设备管理",
                left_img:"/static/img/left_center_module_item/son_module/shebeiguanli.png",
            },
            {
                code:"9_3",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                isCheck:true,
                isReadonly:false,
                iframeUrl : "/static/htmls/warningstystem/CommunicationModule.html",
                name : "通信模块管理",
                left_img:"/static/img/left_center_module_item/son_module/tongxinmokuaiguanli.png",
            },
            {
                code:"9_4",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                isCheck:true,
                isReadonly:false,
                iframeUrl : "/static/htmls/warningstystem/Sensor.html",
                name : "传感器管理",
                left_img:"/static/img/left_center_module_item/son_module/chuanganqimokuai.png",
            },
            {
                code:"9_5",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                isCheck:true,
                isReadonly:false,
                iframeUrl : "/static/htmls/warningstystem/AlarmEvent.html",
                name : "报警事件配置",
                left_img:"/static/img/left_center_module_item/son_module/baojingshijianpeizhi.png",
            },
            {
                code:"9_6",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                isCheck:true,
                isReadonly:false,
                iframeUrl : "/static/htmls/warningstystem/WarningMessage.html",
                name : "报警信息管理",
                left_img:"/static/img/left_center_module_item/son_module/baojingxinxiguanli.png",
            },
            {
                code:"9_7",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                isCheck:true,
                isReadonly:false,
                iframeUrl : "/static/htmls/warningstystem/LogManagement.html",
                name : "日志管理",
                left_img:"/static/img/left_center_module_item/son_module/rizhiguanli.png",
            }
        ],
        type:"传感类",
        left_img:"/static/img/left_center_module_item/baojing.jpg",
    },
    {
        code:"10",
        icon:"/static/img/allIcon/xinfengkongzhi_1.png",
        name:"新风系统",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/lfHome.html",
        childModule:[],
        type:"控制类",
        left_img:"/static/img/left_center_module_item/xinfengxitong.jpg",
    },
    {
        code:"11",
        icon:"/static/img/allIcon/nenghaoguanli_1.png",
        name:"能源概况",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/nygk.html",
        childModule:[],
        type:"传感类",
        left_img:"/static/img/left_center_module_item/nengyuangaikuang.jpg",

    },
    {
        code:"12",
        icon:"/static/img/allIcon/zhaomingguanli_1.png",
        name:"照明系统",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/zmHtml.html",
        childModule:[],
        type:"控制类",
        left_img:"/static/img/left_center_module_item/zhaomingxitong.jpg",
    },
    {
        code:"13",
        icon:"/static/img/allIcon/tingcheguanli_1.png",
        name:"停车系统",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/tcxt.html",
        childModule:[],
        type:"应用类",
        left_img:"/static/img/left_center_module_item/tingchexitong.jpg",
    },
    {
        code:"14",
        icon:"/static/img/allIcon/xinxifabu_1.png",
        name:"信息发布",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/xinxifabu.html",
        childModule:[],
        type:"其他",
        left_img:"/static/img/left_center_module_item/xinxifabu.jpg",

    },
    {
        code:"15",
        icon:"/static/img/allIcon/shipinjiankong_1.png",
        name:"视频监控",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/shipinjiankong.html",
        childModule:[],
        type:"控制类",
        left_img:"/static/img/left_center_module_item/shipinjiankong.jpg",

    },
    {
        code:"16",
        icon:"/static/img/allIcon/shipinfenxi_1.png",
        name:"视频分析",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/shipinfenxi.html",
        childModule:[],
        type:"应用类",
        left_img:"/static/img/left_center_module_item/shipinfenxi.jpg",

    },
    {
        code:"17",
        icon:"/static/img/allIcon/zhinengmenjin_1.png",
        name:"智慧门禁",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/zhihuimenjin.html",
        childModule:[],
        type:"传感类",
        left_img:"/static/img/left_center_module_item/zhihuimenjin.jpg",

    },
    {
        code:"18",
        icon:"/static/img/allIcon/keshiduijiang_1.png",
        name:"可视化对讲",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/keshihuaduijiang.html",
        childModule:[],
        type:"控制类",
        left_img:"/static/img/left_center_module_item/keshihuaduijiang.jpg",


    },
    {
        code:"19",
        icon:"/static/img/allIcon/zhoujieyujing_1.png",
        name:"周界预警",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/zhoujieyujing.html",
        childModule:[],
        type:"传感类",
        left_img:"/static/img/left_center_module_item/zhoujieyujing.jpg",

    },
    {
        code:"20",
        icon:"/static/img/allIcon/kongtiaokongzhi_1.png",
        name:"空调控制",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/kongtiaoguanli.html",
        childModule:[],
        type:"控制类",
        left_img:"/static/img/left_center_module_item/kongtiaoguanli.jpg",

    },
    {
        code:"21",
        icon:"/static/img/allIcon/beijingyinyue_1.png",
        name:"背景音乐",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/yinyuebeijing.html",
        childModule:[],
        type:"控制类",
        left_img:"/static/img/left_center_module_item/yinyuebeijing.jpg",

    },
    {
        code:"22",
        icon:"/static/img/allIcon/dianzixungeng_1.png",
        name:"电子巡更",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/dianzixungeng.html",
        childModule:[],
        type:"传感类",
        left_img:"/static/img/left_center_module_item/dianzixungeng.jpg",

    },
    {
        code:"23",
        icon:"/static/img/allIcon/tikongmokuai_1.png",
        name:"梯控模块",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/tikongmokuai.html",
        childModule:[],
        type:"控制类",
        left_img:"/static/img/left_center_module_item/tikongmokuai.jpg",

    },
    {
        code:"24",
        icon:"/static/img/allIcon/huanjingjiankong_1.png",
        name:"环境监控",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/huanjingjiance.html",
        childModule:[],
        type:"传感类",
        left_img:"/static/img/left_center_module_item/huanjingjiance.jpg",

    },
    {
        code:"25",
        icon:"/static/img/allIcon/xiaofangguanli_1.png",
        name:"消防管理",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/xiaofangguanli.html",
        childModule:[],
        type:"传感类",
        left_img:"/static/img/left_center_module_item/xiaofangguanli.jpg",

    },
    {
        code:"26",
        icon:"/static/img/allIcon/OAbanggong_1.png",
        name:"OA办公",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/oa.html",
        childModule:[],
        type:"应用类",
        left_img:"/static/img/left_center_module_item/oa.jpg",

    },
    {
        code:"27",
        icon:"/static/img/allIcon/fangkeguanli_1.png",
        name:"访客管理",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/fangkeguanli.html",
        childModule:[],
        type:"其他",
        left_img:"/static/img/left_center_module_item/fangkeguanli.jpg",

    },
    {
        code:"28",
        icon:"/static/img/allIcon/wuyeguanli_1.png",
        name:"物业管理",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/wuyeguanli.html",
        childModule:[],
        type:"应用类",
        left_img:"/static/img/left_center_module_item/wuyeguanli.jpg",

    },
    {
        code:"29",
        icon:"/static/img/allIcon/shangchengmokuai_1.png",
        name:"商城模块",
        isCheck:false,
        isReadonly:false,
        iframeUrl:"/static/htmls/shangchengmokuai.html",
        childModule:[],
        type:"其他",
        left_img:"/static/img/left_center_module_item/shangchengmokuai.jpg",

    }

]

// exampleAppData :
// appId : 0,         //项目ID号
// projectName:"应用系统1", //项目名称
// ischecked : false,//是否被选中
// business: '',    //行业
// companyName: '', //公司名称
// projectImg: '', //项目图片
// color: "",     //主色调
// desc: '',      //项目详情
// data:[]     //选中的模块
export const  exampleAppData = [
    {
        appId : 0,         //项目ID号
        projectName:"应用系统1", //项目名称
        ischecked : false,//是否被选中
        business: '',    //行业
        companyName: '', //公司名称
        projectImg: '', //项目图片
        color: "",     //主色调
        desc: '',      //项目详情
        data:[
            {
                code:"1",
                icon:"/static/img/allIcon/shouye_1.png",
                name:"首页",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/htmls/ggHome.html",
                childModule:[],
            },
            {
                code:"2",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"系统管理",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/htmls/xitongguanli/header.html",
                childModule:[
                    {
                        code:"2_1",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"系统日志管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/systemLog.html",
                    },
                    {
                        code:"2_2",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"用户管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/user.html",
                    },
                    {
                        code:"2_3",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"展厅企业管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/role.html",
                    },
                    {
                        code:"2_4",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"菜单权限管理",
                        isCheck:true,
                        iframeUrl:"/static/office-ui/html/menu.html",
                    },
                    {
                        code:"2_5",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"登录日志管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/loginLog.html",
                    },
                    {
                        code:"2_6",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"操作日志管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/controlLog.html",
                    },
                ],
            },
        ]     //选中的模块
    },
    {
        appId : 1,
        projectName:"应用系统2", //项目名称
        business: '',    //行业
        companyName: '', //公司名称
        projectImg: '', //项目图片
        color: "",     //主色调
        desc: '',      //项目详情
        ischecked : true,
        data:[
            {
                code:"1",
                icon:"/static/img/allIcon/shouye_1.png",
                name:"首页",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/htmls/ggHome.html",
                childModule:[],
            },
            {
                code:"2",
                icon:"/static/img/allIcon/xitongguanli_1.png",
                name:"系统管理",
                isCheck:true,
                isReadonly:true,
                iframeUrl:"/static/htmls/xitongguanli/header.html",
                childModule:[
                    {
                        code:"2_1",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"系统日志管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/systemLog.html",
                    },
                    {
                        code:"2_2",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"用户管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/user.html",
                    },
                    {
                        code:"2_3",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"展厅企业管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/role.html",
                    },
                    {
                        code:"2_4",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"菜单权限管理",
                        isCheck:true,
                        iframeUrl:"/static/office-ui/html/menu.html",
                    },
                    {
                        code:"2_5",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"登录日志管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/loginLog.html",
                    },
                    {
                        code:"2_6",
                        icon:"/static/img/allIcon/xitongguanli_1.png",
                        name:"操作日志管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"/static/office-ui/html/controlLog.html",
                    },
                ],
            },
            {
                code:"7",
                icon:"/static/img/allIcon/huiyiguanli_1.png",
                name:"会议室管理",
                isCheck:false,
                isReadonly:false,
                iframeUrl:"/static/office-ui/html/officeRoom.html",
                childModule:[],
                type:"应用类",
                left_img:"/static/img/left_center_module_item/huiyiguanli.jpg",
            },
            {
                code:"8",
                icon:"/static/img/allIcon/kaoqinmokuai_1.png",
                name:"考勤管理",
                isCheck:false,
                isReadonly:false,
                iframeUrl:"/static/office-ui/html/attInfo.html",
                childModule:[],
                type:"应用类",
                left_img:"/static/img/left_center_module_item/kaoqinguanli.jpg",
            },
        ]
    },

]


