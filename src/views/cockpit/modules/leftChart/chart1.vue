<template>
    <div class="leftOneBox">
        <div class="titleBox">
            <img src="@/assets/img/exhibition/icon.png" alt="">
            <span class="titleFonts">项目总览/<span>PROJECT OVERVIEW</span></span>
        </div>
        <div id="bar3" style="width: 100%;height: 3rem;"></div>
    </div>
</template>

<script>
// import echarts from 'echarts'
import resize from "../mixins/resize";
import {setFontRem} from '@/utils/setRem_api'
export default {
  name: "chart1",
  mixins: [resize],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.leftOneEchart();
  },
  methods: {
    leftOneEchart() {
      this.echart_show({
        dom: "bar3",
        width: setFontRem() * 3.62 + "px",
        height: setFontRem() * 3.3 + "px"
      });
      var myChart3 = this.$echarts.init(document.getElementById("bar3"));
      this.chart = myChart3;
      setInterval(function() {
        var chartoption3 = myChart3.getOption();
        myChart3.clear();
        myChart3.setOption(chartoption3);
      }, 5000);
      var option3 = {
        //animation: false,
        grid: {
          // show:false,
          top: 0,
          left: 50
        },
        xAxis: {
          show: false,
          min: -5, //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。不设置时会自动计算最小值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数
          max: 20
        },
        yAxis: {
          show: false,
          min: -1, //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。不设置时会自动计算最小值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数
          max: 10
        },
        label: {
          //饼图图形上的文本标签
          show: true,
          textStyle: {
            fontWeight: "bold",
            fontSize: 22
          },
          color: "#fff",
          distance: 20,
          align: "center"
        },
        series: [
          {
            name: "总项目",
            type: "scatter",
            symbolSize: function(data) {
              return data[2];
            },
            hoverAnimation: false,
            colorAlpha: false,
            opacity: 100,
            itemStyle: {
              //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                opacity: 1,
                color: '#0082FC',
                label: {
                  //饼图图形上的文本标签
                  formatter: function(res) {
                    return "总项目\n" + 113 + "个";
                  },
                  textStyle: {
                    fontWeight: "bold",
                    fontSize: 0.22 * setFontRem()
                  },
                  position: "inside"
                }
              }
            },
            data: [[8, 2, parseInt(1.6 * setFontRem()), "28%"]]
          },
          {
            name: "正常",
            type: "scatter",
            symbolSize: function(data) {
              return data[2];
            },
            hoverAnimation: false,
            colorAlpha: false,
            opacity: 100,
            itemStyle: {
              //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                opacity: 1,
                color: "#00FDF3",
                label: {
                  //饼图图形上的文本标签
                  textStyle: {
                    fontWeight: "bold",
                    fontSize: 0.18 * setFontRem()
                  },
                  formatter: function(res) {
                    return "正常\n" + 45 + "个";
                  },
                  position: "left"
                }
              }
            },
            data: [[5, 5, parseInt(0.65 * setFontRem()), "30%"]]
          },
          {
            name: "离线",
            type: "scatter",
            symbolSize: function(data) {
              return data[2];
            },
            hoverAnimation: false,
            colorAlpha: false,
            opacity: 100,
            itemStyle: {
              //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                opacity: 1,
                color:"#FE663F",
                label: {
                  //饼图图形上的文本标签
                  textStyle: {
                    fontWeight: "bold",
                    fontSize:0.18 * setFontRem()
                  },
                  formatter: function(res) {
                    return "离线\n" + 38 + "个";
                  },
                  position: "left"
                }
              }
            },
            data: [[3, 0, parseInt(0.55 * setFontRem()), "8%"]]
          },
          {
            name: "待发布",
            type: "scatter",
            symbolSize: function(data) {
              return data[2];
            },
            hoverAnimation: false,
            colorAlpha: false,
            opacity: 100,
            itemStyle: {
              //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: {
                opacity: 1,
                color: "#58ADFF",
                label: {
                  //饼图图形上的文本标签
                  textStyle: {
                    fontWeight: "bold",
                    fontSize: 0.18 * setFontRem()
                  },
                  formatter: function(res) {
                    return "待发布\n" + 28 + "个";
                  },
                  position: "right"
                }
              }
            },
            data: [[11.5, 0, parseInt(0.4 * setFontRem()), "5%"]]
          }
        ]
      };

      myChart3.setOption(option3);

      this.echart_show({
        dom: "bar3",
        width: "3.62rem",
        height: "3.3rem"
      });
    }
  }
};
</script>

<style scoped>
    .titleFonts{
        font-size: 0.2rem;
    }
    .titleFonts>span{
        font-size: 0.08rem;
    }
    .titleBox{
        display: flex;
        align-items: center;
    }
    .titleBox>img{
        margin-right: 0.12rem;
    }


</style>