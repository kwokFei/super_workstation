<template>
    <div class="">
        <div id="main" style="width: 100%;height: 3.6rem;background: white"></div>
        <div class="classify">
            <div class="classifyItem">
                <div>
                    <p style="color: #3d7aae;">5390</p>
                    <span>以发布</span>
                </div>
                <img src="../../../assets/img/fb_one.png" alt="">
            </div>
            <div class="classifyItem">
                <div>
                    <p style="color: #a462d6;">2390</p>
                    <span>待发布</span>
                </div>
                <img src="../../../assets/img/fb_two.png" alt="">
            </div>
            <div class="classifyItem">
                <div>
                    <p style="color: #4acbf0;">2947</p>
                    <span>草稿箱</span>
                </div>
                <img src="../../../assets/img/fb_three.png" alt="">
            </div>
        </div>
        <div id="mainOne" style="width: 100%;height: 4rem;background-color: white;margin-top: 0.2rem"></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  import { setFontRem } from '@/utils/setRem_api.js'
    export default {
      name: "gk",
      mounted() {
        this.drawLine();
        this.drawLine1();
      },
      methods:{
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('main'));
          // 绘制图表
          myChart.setOption({
            title: {
              text: '发布统计',
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
        drawLine1(){
          // 基于准备好的dom，初始化echarts实例
          let myChartOne = this.$echarts.init(document.getElementById('mainOne'));
          // 绘制图表
          myChartOne.setOption({
            title: {
              text: '部署平台统计',
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
              data: ['阿里云', '腾讯云', '自服务器']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: [30, 110],
                roseType: 'area',
                center: ['50%', '60%'],
                data: [
                  {value: 5800, name: '阿里云'},
                  {value: 4800, name: '腾讯云'},
                  {value: 4200, name: '自服务器'},

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
          window.onload = function (e) {
            setFontRem();
            myChartOne.resize;
          }
        }
      }
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
    }
    .classify{
        margin-top: 0.2rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .classifyItem{
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 3.89rem;
        height: 1.25rem;
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
</style>
