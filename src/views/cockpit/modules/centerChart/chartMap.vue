<template>
    <div class="map">
        <div id="ec_map" style="width: 9.72rem;height: 7.61rem;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import '@/assets/js/china'
    import resize from '../mixins/resize'
    export default {
        name: "chartMap",
        mixins: [resize],
        data(){
            return{
                chart:null,
            }
        },
        mounted() {
            this.chartMap()
        },
        methods:{
            chartMap(){
                var chart = echarts.init(document.getElementById('ec_map'));
                this.chart = chart;
                var geoCoordMap = {
                    '新疆玛纳斯基地': [86.22, 44.30],
                    '九江': [116.00, 29.70],
                    '新乡': [116.402217, 35.311657],
                    ' ':[79.92,37.12],
                    '  ':[86.85,47.70],
                    '若羌县':[88.17,39.02],
                    '上海': [121.4648, 31.2891],
                    '东莞': [113.8953, 22.901],
                    '东营': [118.7073, 37.5513],
                    '中山': [113.4229, 22.478],
                    '临汾': [111.4783, 36.1615],
                    '临沂': [118.3118, 35.2936],
                    '丹东': [124.541, 40.4242],
                    '丽水': [119.5642, 28.1854],
                    '乌鲁木齐': [87.9236, 43.5883],
                    '佛山': [112.8955, 23.1097],
                    '保定': [115.0488, 39.0948],
                    '兰州': [103.5901, 36.3043],
                    '包头': [110.3467, 41.4899],
                    '北京': [116.4551, 40.2539],
                    '北海': [109.314, 21.6211],
                    '南京': [118.8062, 31.9208],
                    '南宁': [108.479, 23.1152],
                    '南昌': [116.0046, 28.6633],
                    '南通': [121.1023, 32.1625],
                    '厦门': [118.1689, 24.6478],
                    '台州': [121.1353, 28.6688],
                    '合肥': [117.29, 32.0581],
                    '呼和浩特': [111.4124, 40.4901],
                    '咸阳': [108.4131, 34.8706],
                    '哈尔滨': [127.9688, 45.368],
                    '唐山': [118.4766, 39.6826],
                    '嘉兴': [120.9155, 30.6354],
                    '大同': [113.7854, 39.8035],
                    '大连': [122.2229, 39.4409],
                    '天津': [117.4219, 39.4189],
                    '太原': [112.3352, 37.9413],
                    '威海': [121.9482, 37.1393],
                    '宁波': [121.5967, 29.6466],
                    '宝鸡': [107.1826, 34.3433],
                    '宿迁': [118.5535, 33.7775],
                    '常州': [119.4543, 31.5582],
                    '广州': [113.5107, 23.2196],
                    '廊坊': [116.521, 39.0509],
                    '延安': [109.1052, 36.4252],
                    '张家口': [115.1477, 40.8527],
                    '徐州': [117.5208, 34.3268],
                    '德州': [116.6858, 37.2107],
                    '惠州': [114.6204, 23.1647],
                    '成都': [103.9526, 30.7617],
                    '扬州': [119.4653, 32.8162],
                    '承德': [117.5757, 41.4075],
                    '拉萨': [91.1865, 30.1465],
                    '无锡': [120.3442, 31.5527],
                    '日照': [119.2786, 35.5023],
                    '昆明': [102.9199, 25.4663],
                    '杭州': [119.5313, 29.8773],
                    '枣庄': [117.323, 34.8926],
                    '柳州': [109.3799, 24.9774],
                    '株洲': [113.5327, 27.0319],
                    '武汉': [114.3896, 30.6628],
                    '汕头': [117.1692, 23.3405],
                    '江门': [112.6318, 22.1484],
                    '沈阳': [123.1238, 42.1216],
                    '沧州': [116.8286, 38.2104],
                    '河源': [114.917, 23.9722],
                    '泉州': [118.3228, 25.1147],
                    '泰安': [117.0264, 36.0516],
                    '泰州': [120.0586, 32.5525],
                    '济南': [117.1582, 36.8701],
                    '济宁': [116.8286, 35.3375],
                    '海口': [110.3893, 19.8516],
                    '淄博': [118.0371, 36.6064],
                    '淮安': [118.927, 33.4039],
                    '深圳': [114.5435, 22.5439],
                    '清远': [112.9175, 24.3292],
                    '温州': [120.498, 27.8119],
                    '渭南': [109.7864, 35.0299],
                    '湖州': [119.8608, 30.7782],
                    '湘潭': [112.5439, 27.7075],
                    '滨州': [117.8174, 37.4963],
                    '潍坊': [119.0918, 36.524],
                    '烟台': [120.7397, 37.5128],
                    '玉溪': [101.9312, 23.8898],
                    '珠海': [113.7305, 22.1155],
                    '盐城': [120.2234, 33.5577],
                    '盘锦': [121.9482, 41.0449],
                    '石家庄': [114.4995, 38.1006],
                    '福州': [119.4543, 25.9222],
                    '秦皇岛': [119.2126, 40.0232],
                    '绍兴': [120.564, 29.7565],
                    '聊城': [115.9167, 36.4032],
                    '肇庆': [112.1265, 23.5822],
                    '舟山': [122.2559, 30.2234],
                    '苏州': [120.6519, 31.3989],
                    '莱芜': [117.6526, 36.2714],
                    '菏泽': [115.6201, 35.2057],
                    '营口': [122.4316, 40.4297],
                    '葫芦岛': [120.1575, 40.578],
                    '衡水': [115.8838, 37.7161],
                    '衢州': [118.6853, 28.8666],
                    '西宁': [101.4038, 36.8207],
                    '西安': [109.1162, 34.2004],
                    '贵阳': [106.6992, 26.7682],
                    '连云港': [119.1248, 34.552],
                    '邢台': [114.8071, 37.2821],
                    '邯郸': [114.4775, 36.535],
                    '郑州': [113.4668, 34.6234],
                    '鄂尔多斯': [108.9734, 39.2487],
                    '万盛': [107.7539, 30.1904],
                    '金华': [120.0037, 29.1028],
                    '铜川': [109.0393, 35.1947],
                    '银川': [106.3586, 38.1775],
                    '镇江': [119.4763, 31.9702],
                    '长春': [125.8154, 44.2584],
                    '长沙': [113.0823, 28.2568],
                    '长治': [112.8625, 36.4746],
                    '阳泉': [113.4778, 38.0951],
                    '青岛': [120.4651, 36.3373],
                    '韶关': [113.7964, 24.7028]
                };

                var BJData = [
                    [{
                        name: '新乡'
                    }, {
                        name: '新乡',
                        value: 200
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '呼和浩特',
                        value: 90
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '哈尔滨',
                        value: 90
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '石家庄',
                        value: 90
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '昆明',
                        value: 30
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '北京',
                        value: 100
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '长春',
                        value: 40
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '万盛',
                        value: 40
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '贵阳',
                        value: 50
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '南宁',
                        value: 30
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '济南',
                        value: 10
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '太原',
                        value: 40
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '西安',
                        value: 60
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '武汉',
                        value: 50
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '合肥',
                        value: 40
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '南京',
                        value: 30
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '沈阳',
                        value: 20
                    }],
                    [{
                        name: '新乡'
                    }, {
                        name: '成都',
                        value: 10
                    }]
                ];

                var SHData = [
                    [{
                        name: '九江'
                    }, {
                        name: '九江',
                        value: 200
                    }],

                    [{
                        name: '九江'
                    }, {
                        name: '长沙',
                        value: 95
                    }],
                    [{
                        name: '九江'
                    }, {
                        name: '武汉',
                        value: 30
                    }],
                    [{
                        name: '九江'
                    }, {
                        name: '南昌',
                        value: 20
                    }],
                    [{
                        name: '九江'
                    }, {
                        name: '合肥',
                        value: 70
                    }],
                    [{
                        name: '九江'
                    }, {
                        name: '南京',
                        value: 60
                    }],
                    [{
                        name: '九江'
                    }, {
                        name: '福州',
                        value: 50
                    }],
                    [{
                        name: '九江'
                    }, {
                        name: '上海',
                        value: 100
                    }],
                    [{
                        name: '九江'
                    }, {
                        name: '深圳',
                        value: 100
                    }],

                ];

                var GZData = [
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '新疆玛纳斯基地',
                        value: 200
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '  ',
                        value: 90
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: ' ',
                        value: 40
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '呼和浩特',
                        value: 90
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '昆明',
                        value: 40
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '成都',
                        value: 10
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '兰州',
                        value: 95
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '银川',
                        value: 90
                    }],
                    [{
                        name: '新疆玛纳斯基地'
                    }, {
                        name: '西宁',
                        value: 80
                    }],

                ];

                var color = ['#4AFEA3', '#FD9D02', '#6AD7DC'];
                var series = [];
                [
                    ['新乡', BJData],
                    ['九江', SHData],
                    ['新疆', GZData]
                ].forEach(function(item, i) {
                    series.push({
                        name: item[0],
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        symbolSize: function(val) {
                            return 10;
                        },
                        itemStyle: {
                            normal: {
                                color: color[i]
                            }
                        },
                        data: item[1].map(function(dataItem) {
                            // console.log(dataItem);
                            return {
                                name: dataItem[1].name,
                                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                            };
                        })
                    });
                });

                // console.log(series);

                let option = {
                    // backgroundColor: '#080a20',
                    tooltip: {
                        trigger: 'item',
                        enterable:true,
                        formatter: function (params) {
                            // console.log(params);
                            var res=
                                '<div id="echartPop">\n' +
                                '        <div class="header">\n' +
                                '            <div class="text">'+params.name+'项目</div>\n' +
                                '            <div class="text_info">详情</div>\n' +
                                '        </div>\n' +
                                '        <div class="content">\n' +
                                '            <div class="left">\n' +
                                '\n' +
                                '                <div class="content_item">\n' +
                                '                    <p>项目内容</p>\n' +
                                '                    <span>该项目总投资2亿元，' +
                                '包含智慧园区、智慧路灯、智慧楼宇、' +
                                '智慧社区、智慧校园等方案</span>\n' +
                                '                </div>\n' +
                                '\n' +
                                '                <div class="content_item">\n' +
                                '                    <p>项目地址</p>\n' +
                                '                    <span>重庆市   万盛经开区</span>\n' +
                                '                </div>\n' +
                                '\n' +
                                '                <div class="content_item">\n' +
                                '                    <p>项目完成进度</p>\n' +
                                '                    <span>已完成 80%   测试环节</span>\n' +
                                '                </div>\n' +
                                '\n' +
                                '            </div>\n' +
                                '\n' +
                                '            <div class="right">\n' +
                                '\n' +
                                '                <div class="content_item">\n' +
                                '                    <p>项目开始时间</p>\n' +
                                '                    <span>2019.5.10</span>\n' +
                                '                </div>\n' +
                                '\n' +
                                '                <div class="content_item">\n' +
                                '                    <p>项目预计完成时间</p>\n' +
                                '                    <span>2019.10.10</span>\n' +
                                '                </div>\n' +
                                '\n' +
                                '\n' +
                                '                <div class="content_item">\n' +
                                '                    <p>项目供应商</p>\n' +
                                '                    <span>海尔集团、大华科技、道尔智控、中控智慧、爱牵挂科技等10余家供应商提供相应胡智慧产品</span>\n' +
                                '                </div>\n' +
                                '    \n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '      \n' +
                                '\n' +
                                '\n' +
                                '    </div>' ;
                            return res;
                        },
                    },
                    geo: {
                        map: 'china',
                        label: {
                            position : "inside",
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#132937',
                                borderColor: '#0692a4'
                            },
                            emphasis: {
                                areaColor: '#0b1c2d'
                            }
                        }
                    },
                    series: series
                };

                chart.setOption(option);

                document.getElementById('ec_map').style.width = "100%";
                document.getElementById('ec_map').style.height = "7.61rem";
                setTimeout(function () {
                    chart.resize();
                },100)
            }
        }
    }
</script>

<style>
    /*#ec_map{*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*}*/

    #echartPop{
        width: 4.02rem;
        /* height: 2.8rem; */
        background-color: #04152D;
    }
    #echartPop .header{
        width: 4.02rem;
        height: 0.42rem;
        line-height: 0.42rem;
        opacity: 0.5;
        background-color: #042142;
        position: relative;
        border: 0.02rem solid #03356B;
    }
    #echartPop .text{
        width: 1.22rem;
        height: 0.41rem;
        color: #017efc;
        margin: 0 auto;
        text-align: center;
    }
    #echartPop .text_info{
        font-size: 0.12rem;
        color: #00ffff;
        position: absolute;
        right: 0.2rem;
        top:0;
        cursor: pointer;
    }

    #echartPop .content{
        display: flex;
        align-items: center;
    }


    #echartPop .content > div{
        width: 50%;
        text-align: left;
        margin: 0 0 0.2rem 0;
        padding: 0 0.2rem;
    }

    #echartPop .left{
        border-right: 0.02rem solid #1C2B41
    }

    #echartPop .content_item>p{
        font-size: 0.12rem;
        color: #017efc;
        margin-top: 0.15rem;
        margin-bottom: 0.08rem;
        white-space:pre-wrap
    }

    #echartPop .content_item>span{
        font-size: 0.12rem;
        color: #ffffff;
        white-space:pre-wrap
    }
</style>