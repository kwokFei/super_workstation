<template>
    <div class="maxBox">
        <div class="navBox">
            <div class="navItem" v-for="(item,index) in navData" :key="index">
                <img :src="item.imgUrl" alt="">
                <div>
                    <p :style="{color:item.color}">{{item.number}}</p>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="twoBox">
            <div class="leftBox">
                <div class="titleBox">
                    <span style="display: flex;align-items: center">
                        <img style="width: 0.28rem;height: 0.26rem;" src="../../../assets/img/project_center/msgImg.png" alt="">
                        <span class="titleName">消息提醒</span>
                    </span>
                    <span>更多 》</span>
                </div>
                <div class="msgListBox">
                    <div class="msgListItem" v-for="(item,index) in msgData" :key="index">
                        <div class="msgTitle">
                            <span>【{{item.msgTitle}}】</span>
                            <span>{{item.msgTime}}</span>
                        </div>
                        <div class="msgCi">
                            <i></i>
                            <span>{{item.msgTest}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightBox">
                <div class="titleBox">
                    <span style="display: flex;align-items: center">
                        <img style="width: 0.24rem;height: 0.28rem;" src="../../../assets/img/project_center/fileImg.png" alt="">
                        <span class="titleName">文件</span>
                    </span>
                    <span>更多 》</span>
                </div>
                <div class="fileListBox">
                    <div class="fileListItem" v-for="(item,index) in fileData" :key="index">
                        <div class="fileTitleBox" style="height: 50%">
                            <span>【{{item.fileTitle}}】</span>
                            <span>{{item.fileTime}}</span>
                        </div>
                        <div style="width: 100%;height: 50%;padding: 0 0.1rem;display: flex;align-items: center;justify-content: space-between">
                            <span style="width: 70%;display: flex;justify-content: left;align-items: center">
                                <i style="display: inline-block;width: 0.08rem;height: 0.08rem;border-radius: 50%;background-color: #999;margin: 0 0.03rem"></i>
                                <span class="fileName">{{item.fileTest}}</span>
                            </span>
                            <span style="width: 28%;display: flex;justify-content:space-between">
                                <span>{{item.fileAuthor}}</span>
                                <span style="color: #0C76FB;cursor: pointer">下载</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_my_node",
        data(){
        return{
          navData:[
            {
              imgUrl:require('../../../assets/img/project_center/jd_allImg.png'),
              number:120,
              title:'总项目',
              color:'#0068ff'
            },
            {
              imgUrl:require('../../../assets/img/project_center/jd_goImg.png'),
              number:64,
              title:'进行中的项目',
              color:'#edd14d'
            },
            {
              imgUrl:require('../../../assets/img/project_center/jd_sucImg.png'),
              number:48,
              title:'已完成的项目',
              color:'#56d7ab'
            },
            {
              imgUrl:require('../../../assets/img/project_center/jd_errImg.png'),
              number:8,
              title:'超时项目',
              color:'#e35d5d'
            },
            {
              imgUrl:require('../../../assets/img/project_center/dbImg.png'),
              number:3,
              title:'待办任务',
              color:'#3d7aae'
            },
          ],
          msgData:[
            {
              msgTitle:'申请反馈消息',
              msgTime:'2019-09-06  12:24:52',
              msgTest:'邹达海已同意并处理你的汶山养老项目原型设计节点延期申请'
            },
            {
              msgTitle:'任务安排消息',
              msgTime:'2019-09-07  14:54:52',
              msgTest:'邹达海安排你做中意智慧家居项目原型设计节点工作'
            },
            {
              msgTitle:'节点预警消息',
              msgTime:'2019-09-07  14:54:52',
              msgTest:'离中意智慧家居项目原型设计节点计划完成时间完成还有3天'
            },
            {
              msgTitle:'项目延期消息',
              msgTime:'2019-09-07  14:54:52',
              msgTest:'中意智慧家居项目计划完成时间从2019-11-11延期到2019-11-15'
            },
            {
              msgTitle:'项目延期消息',
              msgTime:'2019-09-07  14:54:52',
              msgTest:'智慧家居项目计划完成时间从2019-11-15延期到2019-11-18'
            },
            {
              msgTitle:'项目延期消息',
              msgTime:'2019-09-08  14:54:52',
              msgTest:'智慧家居项目计划完成时间从2019-11-10延期到2019-11-15'
            }
          ],
          fileData:[
            {
              fileTitle:'中意智慧家居',
              fileTime:"2019-09-06  12:24:52",
              fileTest:'中意智慧家居项目方案设计.ZIP',
              fileAuthor:'王进'
            },
            {
              fileTitle:'中意智慧家居',
              fileTime:"2019-09-06  12:24:52",
              fileTest:'中意智慧家居测试报告.ZIP',
              fileAuthor:'王进'
            },
            {
              fileTitle:'中意智慧家居测试报告2.ZIP',
              fileTime:"2019-09-06  12:24:52",
              fileTest:'中意智慧家居测试报告2.ZIP',
              fileAuthor:'王进'
            },
            {
              fileTitle:'汶山养老',
              fileTime:"2019-09-06  12:24:52",
              fileTest:'中意智慧家居项目测试报告.ZIP',
              fileAuthor:'王进'
            },
            {
              fileTitle:'汶山养老',
              fileTime:"2019-09-06  12:24:52",
              fileTest:'汶山养老应用开发代码包.ZIP',
              fileAuthor:'王进'
            },
            {
              fileTitle:'汶山养老',
              fileTime:"2019-09-06  12:24:52",
              fileTest:'汶山养老测试报告.ZIP',
              fileAuthor:'王进'
            }
          ]
        }
      }
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .navBox{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .navBox .navItem{
        width: 19%;
        height: 1rem;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        border-radius: 0.04rem;
        cursor: pointer;
        border: solid 0.01rem #ebebeb;
    }
    .navBox .navItem img{
        width: 30%;
        margin-right: 0.1rem;
    }
    .navItem p{
        font-family: MicrosoftYaHei-Bold;
        font-size: 0.3rem;
    }
    .navItem span{
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        color: #666666;
    }
    .twoBox{
        padding: 0.1rem 0;
        margin-top: 0.3rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 5.56rem;
        /*background: white;*/
        border-radius: 0.04rem;
    }
    .leftBox{
        width: 49%;
        height: 5.9rem;
        background-color: white;
    }
    .rightBox{
        width: 49%;
        height: 5.9rem;
        background-color: white;
    }
    .titleBox{
        height: 0.58rem;
        width: 100%;
        line-height: 0.58rem;
        padding: 0 0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #cccccc;
    }
    .titleBox span>img{
        margin-right: 0.1rem;
    }
    .titleBox .titleName{
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        font-weight: bold;
        color: #333333 !important;
    }
    .titleBox span:nth-child(2){
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0.004rem;
        color: #0068ff;
        cursor: pointer;
    }
    .msgListBox{
        width: 100%;
        padding: 0 0.1rem;
    }
    .msgListItem{
        width: 100%;
        height: 0.76rem;
        border-bottom: 1px solid #cccccc;
    }
    .msgListItem:last-child{
        border-bottom: none;
    }
    .msgTitle{
        width: 100%;
        height: 50%;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .msgTitle span:nth-child(1){
        font-family: MicrosoftYaHeiLight;
        font-size: 0.16rem;
        letter-spacing: 0.004rem;
        color: #e35d5d;
    }
    .msgTitle span:nth-child(2){
        font-family: MicrosoftYaHeiLight;
        font-size: 0.16rem;
        letter-spacing: 0.004rem;
        color: #999999;
    }
    .msgCi{
        width: 100%;
        height: 50%;
        overflow: hidden;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .msgCi i{
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        background-color: #999999;
        margin:0 0.05rem;
    }
    .msgCi span{
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        letter-spacing: 0.004rem;
        color: #666666;
        text-align: left;
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .fileListBox{
        width: 100%;
    }
    .fileListItem{
        padding: 0 0.1rem;
        width: 100%;
        height: 0.76rem;
        border-bottom: 1px solid #cccccc;
    }
    .fileListItem:last-child{
        border: none;
    }
    .fileTitleBox{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 0.36rem;
    }
    .fileTitleBox span:nth-child(1){
        font-family: MicrosoftYaHeiLight;
        font-size: 0.16rem;
        letter-spacing: 0.004rem;
        color: #e35d5d;
    }
    .fileTitleBox span:nth-child(2){
        font-family: MicrosoftYaHeiLight;
        font-size: 0.16rem;
        letter-spacing: 0.004rem;
        color: #999999;
    }
    .fileName{
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        letter-spacing: 0.004rem;
        color: #666666;
    }
</style>
