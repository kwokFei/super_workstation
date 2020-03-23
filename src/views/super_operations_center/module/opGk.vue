<template>
    <div class="">
        <div style="display: flex;justify-content: space-between;align-items: center">
            <div id="main" style="width: 60%;height: 4rem;background: white"></div>
            <div class="rightBox">
                <div class="headerBox">
                    <span>点击量排行榜</span>
                    <span>2020-02-20</span>
                </div>
                <div class="mmListBox">
                    <div class="mmHeader yyyy">
                        <span>序号</span>
                        <span>项目名称</span>
                        <span>点击量</span>
                    </div>
                    <div class="mmHeader nnnn" v-for="(item,index) in proList" :key="index" v-if="index < 7">
                        <span>{{index + 1}}</span>
                        <span>{{item.name}}</span>
                        <span>{{item.number}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="mainOne" style="width: 100%;height: 4rem;background-color: white;margin-top: 0.2rem"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "gk",
    data(){
      return{
        proList:[
          {
            name:'项目A',
            number:18000
          },
          {
            name:'项目B',
            number:16000
          },
          {
            name:'项目C',
            number:14000
          },
          {
            name:'项目D',
            number:10000
          },
          {
            name:'项目E',
            number:8600
          },
          {
            name:'项目F',
            number:7600
          },
          {
            name:'项目G',
            number:6564
          },
          {
            name:'项目H',
            number:4800
          }
        ]
      }
    },
    mounted() {
      this.drawLine();
      this.drawLine1();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '点击量统计',
            subtext: '2020-03-24',
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [1020, 2000, 1600, 4560, 6820, 5462, 7268],
            type: 'line',
            smooth: true
          }]
        });
        window.onresize = myChart.resize;
      },
      drawLine1() {
        // 基于准备好的dom，初始化echarts实例
        let myChartOne = this.$echarts.init(document.getElementById('mainOne'));
        // 绘制图表
        myChartOne.setOption({
          title: {
            text: '运行状态统计',
            subtext: '2020-03-24',
            left: 'left'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: ['运行', '故障', '停运']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: [70, 110],
              center: ['50%', '60%'],
              data: [
                {value: 9800, name: '运行'+" "+9800},
                {value: 2000, name: '故障'+" "+2000},
                {value: 3000, name: '停运'+" "+3000},
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        window.onresize = myChartOne.resize;
      }
    }
  }
</script>

<style scoped>
    .rightBox{
        width: 36%;
        height: 4rem;
        padding: 0 0.2rem;
        background-color: white;
    }
    .classifyItem p{
        font-family: MicrosoftYaHei-Bold;
        font-size: 0.3rem;
    }
    .classifyItem span{
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        letter-spacing: 0.002rem;
        color: #666666;
    }
    .headerBox{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .headerBox span:nth-child(1){
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        font-weight: bold;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0.005rem;
        color: #333333;
    }
    .headerBox span:nth-child(2){
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0.004rem;
        color: #999999;
    }
    .mmListBox{
        width: 100%;
    }
    .mmHeader{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
    }
    .mmHeader span{
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.4rem;
        letter-spacing: 0.004rem;
        color: #666666;
        display: inline-block;
        white-space: nowrap;
        text-align: center;
    }
    .yyyy {
        background-color: rgba(208, 227, 255, 1);
    }
    .mmHeader span:nth-child(1){
        width: 14%;
    }
    .mmHeader span:nth-child(2){
        width: 43%;
    }
    .mmHeader span:nth-child(3){
        width: 43%;
    }
    .nnnn:nth-child(2n + 1){
        background: rgba(207,228,255,0.4);
    }
</style>
