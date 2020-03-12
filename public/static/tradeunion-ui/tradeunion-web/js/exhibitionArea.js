$(function() {
	var theRequest = new Object();  
	// 获取url参数
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for(var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			theRequest[vars[i].split("=")[0]]=decodeURI(vars[i].split("=")[1]);
			if(pair[0] == variable) {
				return pair[1];
			}
		}
		return(false);
	}
	//lyaui进度条
	layui.use('element', function() {
		var element = layui.element;
	});

	//地图部分
	//地图容器
	var chart = echarts.init(document.getElementById('ec_map'));

	var mapdata = [];
	var mapCity = getQueryVariable('area');
	//var mapCity2 = getQueryVariable('city');
//	console.log(mapCity2);
	var mapUrl = '../map/province/' + mapCity + '.json'
	$.getJSON(mapUrl, function(data) {
		d = [];
		for(var i = 0; i < data.features.length; i++) {
			d.push({
				name: data.features[i].properties.name
			})
		}
		mapdata = d;
		//注册地图
		echarts.registerMap(mapCity, data);
		//绘制地图
		renderMap(mapCity, d);
	});
	
	
	
	//初始化绘制全国地图配置
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: '{b}'
		},
		geo: {
			map: mapCity,
			roam: true,
			label: {
				emphasis: {
					show: true,
					color: '#fff'
				}
			},
			//			selectedMode:true,
			itemStyle: {
				normal: {
					areaColor: '#003364',
					borderColor: '#1EA086',
					shadowBlur: 10,
					shadowColor: '#00EEC7',
					shadowOffsetX: 5,
					shadowOffsetY: 5
				},
				emphasis: {
					areaColor: '#00A2FF'
				}
			},
			regions: [],
			zoom: 1
		}
	};

	var odata = [];
	var wdata=[];//完成得数据
	var ndata=[];//建设中得数据
	let geoCoordMap = {};
	int_zhanti();
	function int_zhanti(){
		$.ajax({
		  type: "GET", //提交方式
		  url: userServiceUrl + "/organization/list",
		  data: {
		  	token:$.getToken(),
		  	pageNum:1,
		  	province:decodeURIComponent(mapCity),
		  	organizetionLvl:1,
		  	pageSize:10000
		  },
		  async:false,
		  success: function (result) {
		  	var data = result.data.list;
		    if (result.code === 0 ) {
			    for(let k = 0; k < data.length; k++) {
						(function (k) {
							let address;
							console.log(data[k]);
							var geoc = new BMap.Geocoder();   //地址解析对象
							var point = new BMap.Point(data[k].longitude, data[k].latitude);
							geoc.getLocation(point, function (rs) {
								var addComp = rs.addressComponents;
								address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
								var obj = {};
								obj.title = data[k].organizationName;
								obj.context_1=address;
								obj.context_2="负责人："+data[k].personCharge+"("+data[k].personMobile+")";
								obj.id = data[k].id;
								obj.type=1;
								if(data[k].states==1){
									wdata.push(obj);
								}else{
									ndata.push(obj);
								}
								//odata.push(obj);
								//zdata.push(obj);
								setTimeout(function () {
									if(k === data.length-1){
										//绘制地图
										renderMap('china',1);
									}
								},300)
							});
							geoCoordMap[data[k].id] = [Number(data[k].longitude), Number(data[k].latitude)]
	
						})(k)
			    }
			  }
		   }
		})
	}




	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].id];
			if(geoCoord) {
				res.push({
					title: data[i].title,
                    context_1: data[i].context_1,
                    context_2: data[i].context_2,
                    type:data[i].type,
                    value: geoCoord.concat(data[i].value),
                    id: data[i].id
				});
			}
		}
		return res;
	};




  chart.on('click', function(params) {
  	//createMapFrame();
		$('.map-frame').remove();
		if(params.componentSubType == 'scatter') {
			console.log(params);
			createMapFrame(params.data);
		}
	});



	function renderMap(map,typen) {
		 var wdataSt={
            type: 'scatter',
            coordinateSystem: 'geo',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: '#53DF6F' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#3BD45A' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: convertData(wdata)
        }
    		
    	var ndataSt={
            type: 'scatter',
            coordinateSystem: 'geo',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: '#F5F208' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#E6A600' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: convertData(ndata)
        }
		chart.clear();
		option.series = [];
		if(typen==1){
			option.series.push(wdataSt)
			option.series.push(ndataSt);
		}
		if(typen==2){
			option.series.push(wdataSt);
		}
		if(typen==3){
			option.series.push(ndataSt)
		}
       	
       	console.log(option.series);
       	
        //渲染地图
        chart.setOption(option);
	}
	
	
    
	$('.mark-box>div').click(function() {
		let show = $(this).attr("show");
        //全部变灰色
        $(".mark-box>div").each(function () {
            $(this).removeClass("active");
        });

        //点击全部
        if( show === "all"){
            $(".mark-box>div").each(function () {
                 $(this).addClass("active");
            });
            renderMap('china',1);
            return;
        }
         if( show === "complete"){
      		renderMap('china',2);
	      }
	      if( show === "ncomplete"){
	      	renderMap('china',3);
	      }
	      $(this).addClass("active");

//      $(this).find("span:last").css({
//          display : "none"
//      });
	})

	//接入该地区品牌
	$.ajax({
	    cache: true,
	    type: "get",
	    url: userServiceUrl + "/organization/getEnterpriseList?province="+theRequest.area+"&token=" + $.getToken(),
	    async: false,
	    success: function (data) {
			let list = data.data.list;
			for(let i=0;i<list.length;i++){
				let li ="<li class='areaTestCenterLi' data='"+list[i].id+"'>"+
							"<div>"+
								"<img src='"+list[i].logo+"' alt='' />"+
							"</div>"+
							"<span class='font-16-bold'>"+list[i].name+"</span>"+
						"</li>"
				$(".company-list").append(li);
			}
            $('.areaTestCenterLi').css("cursor", "pointer");
            $('.areaTestCenterLi').click(function () {
                window.location.href = "enterpriseManagement.html?z_orgId=" + $(this).attr("data");
            })
		},
	    error: function (errorMsg) {console.info("企业列表数据加载失败啦!");}
	});
	//接入该地区展厅
	$.ajax({
	    cache: true,
	    type: "get",
	    url: userServiceUrl + "/organization/getDistributionInfoList?province="+theRequest.area+"&token=" + $.getToken(),
	    async: false,
	    success: function (data) {
			let original = data.data.list[0];
			let list = original.dataList;
			let cnum = original.cnum+""
			let content  = "";
			if(theRequest.area){
				content = "<p>"+theRequest.area+"展厅总计数量</p><div class='value-box'>";
			}else{
				content = "<p>展厅总计数量</p><div class='value-box'>";
			}
			for(let i=6;i>0;i--){
				if(i>cnum.length){
					content += "<span class='num-item'>0</span>";
				}else{
					content += "<span class='num-item'>"+cnum.substr(cnum.length-i,1)+"</span>";
				}
			}
			content +="<span>个</span></div>";
			$("#distributionDiv").append(content);
			for(let i=0;i<list.length;i++){
				let li = "<li class='areaListLi' data='" + list[i].id + "'>" +
						 "<div class='city-img-box'>"+
							"<img src='./img/index_left/areaDetail.png' />"+
						 "</div>"+
						 "<div class='exhibition-info'>"+
							"<div>"+
								"<span class='font-14-bold'>"+list[i].name+"</span>"+
								"<span class='font-16-bold'>1家</span>"+
							"</div>"+
							"<div>"+
								"<div class='layui-progress'>"+
									"<div class='layui-progress-bar layui-bg-orange' lay-percent='40%'>"+
									"</div>"+
								"</div>"+
								"<span>"+list[i].countDeviceNum+"个设备</span>"+
							"</div>"+
						 "</div>"+
						 "</li>"
				$("#distributionUl").append(li);
			}
            $(".areaListLi").css("cursor", "pointer");
            $(".areaListLi").click(function () {
                window.location.href = "exhibitionManagement.html?z_orgId=" + $(this).attr("data");
            });
		},
	    error: function (errorMsg) {console.info("展厅分布数据加载失败啦!");}
	});

    function getUrlParam(paramname) {
        var reg = new RegExp("(^|&)" + paramname + "=([^&]*)(&|$)");
        // 查询匹配 substr(1)删除? match()匹配
        var s = window.location.search.substr(1).match(reg);
        if (s != null) {
            return decodeURI(s[2]); // unescape() 函数可对通过 escape() 编码的字符串进行解码。
        }
        return null;
    }
    let area =getUrlParam("area")
     console.log("fenlei"+area);
    //设备统计
    let errorSwitchStatus = true;
    setInterval(function () {
        if (errorSwitchStatus) {
            getErrorToatal("day");
        }else {
            getErrorToatal("month");
        }
    },1000*60*20)
    getErrorToatal("day");
    function getErrorToatal(ymd){
        $.get(deviceServiceUrl + "/devicemanger/getDeviceType?token=" + $.getToken()+"&errorTime="+ymd+'&province='+area, function(totalRes) {
            if(totalRes.code == 0) {
                // let errorTotal = {name:"",total:0};
                if(ymd == "day"){
                    // errorTotal.name = "本日故障(次)";
                    let dataList1 = [0, 0, 0, 0, 0, 0];
                    let dataList2=[0, 0, 0, 0, 0, 0];
                    let dataList3=[0, 0, 0, 0, 0, 0];
                    for(let i=0; i<totalRes.data.length; i++){
                        let resTime = parseInt(totalRes.data[i].updateDate);
                        // errorTotal.total += totalRes.data[i].count;
                        if(resTime > 0 && resTime <= 4){
                            dataList1[0] += totalRes.data[i].deviceStateCount1;
                            dataList2[0] += totalRes.data[i].deviceStateCount2;
                            dataList3[0] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 4 && resTime <= 8){
                            dataList1[1] += totalRes.data[i].deviceStateCount1;
                            dataList2[1] += totalRes.data[i].deviceStateCount2;
                            dataList3[1] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 8 && resTime <= 12){
                            dataList1[2] += totalRes.data[i].deviceStateCount1;
                            dataList2[2] += totalRes.data[i].deviceStateCount2;
                            dataList3[2] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 12 && resTime <= 16){
                            dataList1[3] += totalRes.data[i].deviceStateCount1;
                            dataList2[3] += totalRes.data[i].deviceStateCount2;
                            dataList3[3] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 16 && resTime <= 20){
                            dataList1[4] += totalRes.data[i].deviceStateCount1;
                            dataList2[4] += totalRes.data[i].deviceStateCount2;
                            dataList3[4] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 20 && resTime <= 24){
                            dataList1[5] += totalRes.data[i].deviceStateCount1;
                            dataList2[5] += totalRes.data[i].deviceStateCount2;
                            dataList3[5] += totalRes.data[i].deviceStateCount4;
                        }
                    }
                    // vm.errorTotal = errorTotal;
                    // initBarCharts('echarts7', dataList7, dataX7);
                    let dataX = ['04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
                    initLineCharts1('echarts1', dataList1, dataList2, dataList3, dataX);
                }else {
                    // errorTotal.name = "本月故障(次)";
                    //let dataList7 = ['123', '154', '647', '435', '454', '245', '334', '568', '236', '785', '346', '533'];
                    //let dataX7 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                    let dataList1 =[0, 0, 0, 0];
                    let dataList2=[0, 0, 0, 0];
                    let dataList3=[0, 0, 0, 0];
                    for(let i=0; i<totalRes.data.length; i++){
                        let resTime = parseInt(totalRes.data[i].updateDate);
                        // errorTotal.total += totalRes.data[i].count;
                        if(resTime > 0 && resTime <= 7){
                            dataList1[0] += totalRes.data[i].deviceStateCount1;
                            dataList2[0] += totalRes.data[i].deviceStateCount2;
                            dataList3[0] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 7 && resTime <= 14){
                            dataList1[1] += totalRes.data[i].deviceStateCount1;
                            dataList2[1] += totalRes.data[i].deviceStateCount2;
                            dataList3[1] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 14 && resTime <= 21){
                            dataList1[2] += totalRes.data[i].deviceStateCount1;
                            dataList2[2] += totalRes.data[i].deviceStateCount2;
                            dataList3[2] += totalRes.data[i].deviceStateCount4;
                        }else if(resTime > 21 && resTime <= 31){
                            dataList1[3] += totalRes.data[i].deviceStateCount1;
                            dataList2[3] += totalRes.data[i].deviceStateCount2;
                            dataList3[3] += totalRes.data[i].deviceStateCount4;
                        }
                    }
                    // initBarCharts('echarts7', dataList7, dataX7);
                     let dataX = ['第一周', '第二周', '第三周', '第四周'];
                    initLineCharts1('echarts1', dataList1, dataList2, dataList3, dataX);
                }
            }
        });
    }

	//设备统计
	layui.use('form', function() {
		var form = layui.form;
		form.render();
		//实时能耗
		form.on('switch(deviceSwitch)', function(data) {
			if(this.checked) {
                errorSwitchStatus = false;
                getErrorToatal("month");
			} else {
                errorSwitchStatus = true;
                getErrorToatal("day");
			}
		});
	});
    //
	// let dataList1 = [20, 32, 34, 90, 30, 21],
	// 	dataList2 = [20, 82, 91, 34, 20, 30],
	// 	dataList3 = [50, 32, 20, 54, 19, 33];
	// dataList1 = dataList1.slice(0, hourDataSize);
	// dataList2 = dataList2.slice(0, hourDataSize);
	// dataList3 = dataList3.slice(0, hourDataSize);
	// let dataX = ['04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
    //
	// initLineCharts1('echarts1', dataList1, dataList2, dataList3, dataX)

	function initLineCharts1(id, dataList1, dataList2, dataList3, dataX) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				textStyle: {
					color: 'rgba(255, 255, 255, 0.8)',
					fontSize: fontSize(0.12)
				},
				data: ['今日在线', '今日离线', '今日故障']
			},
			grid: { // 设置图形大小
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '25%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: dataX,
				axisLabel: {
					fontSize: fontSize(0.12),
					textStyle: {
						color: 'rgba(255, 255, 255, 0.8)' //坐标值得具体的颜色
					}
				}
			}],
			yAxis: [{
				type: 'value',
				name: '单位:个',
				nameTextStyle: {
					color: 'rgba(255, 255, 255, 0.8)',
					fontSize: fontSize(0.12)
				},
				splitNumber: '4',
				axisLabel: {
					fontSize: fontSize(0.12),
					textStyle: {
						color: 'rgba(255, 255, 255, 0.8)'
					}
				},
				splitLine: {
					show: true,
					//  改变轴线颜色
					lineStyle: {
						type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
						// 使用深浅的间隔色
						color: ['#9ba2ac']
					}
				}
			}],
			series: [{
					name: '今日在线',
					type: 'line',
					color: "#4AFEA3",
					data: dataList1
				},
				{
					name: '今日离线',
					type: 'line',
					color: "#00FFFF",
					data: dataList2
				},
				{
					name: '今日故障',
					type: 'line',
					color: "#FD9D02",
					data: dataList3
				},
			]
		};
		myChart.setOption(option);
	}

	//访客数据
	layui.use('form', function() {
		var form = layui.form;
		form.render();

		//实时能耗
		form.on('switch(visitorSwitch)', function(data) {

			if(this.checked) {
				let dataList5 = [20, 32, 34, 90, 30, 21],
					dataList6 = [20, 82, 91, 34, 20, 30],
					dataList7 = [25, 52, 51, 74, 70, 10],
					dataList8 = [50, 32, 20, 54, 19, 33];
				dataList5 = dataList5.slice(0, hourDataSize);
				dataList6 = dataList6.slice(0, hourDataSize);
				dataList7 = dataList7.slice(0, hourDataSize);
				dataList8 = dataList8.slice(0, hourDataSize);
				let dataX2 = ['04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
				initLineCharts2('echarts2', dataList5, dataList6, dataList7, dataList8, dataX2);
			} else {
				let dataList5 = ['1203', '1545', '1724', '1575'],
					dataList6 = ['1669', '1822', '1468', '1548'],
					dataList7 = ['1597', '1338', '1863', '1669'],
					dataList8 = ['1237', '1334', '1653', '1239'];
				dataList5 = dataList5.slice(0, monDataSize);
				dataList6 = dataList6.slice(0, monDataSize);
				dataList7 = dataList7.slice(0, monDataSize);
				dataList8 = dataList8.slice(0, monDataSize);
				let dataX2 = ['第一周', '第二周', '第三周', '第四周'];
				initLineCharts2('echarts2', dataList5, dataList6, dataList7, dataList8, dataX2);
			}

		});

	});

	let dataList5 = ['1203', '1545', '1724', '1575'],
		dataList6 = ['1669', '1822', '1468', '1548'],
		dataList7 = ['1597', '1338', '1863', '1669'],
		dataList8 = ['1237', '1334', '1653', '1239'];
	dataList5 = dataList5.slice(0, monDataSize);
	dataList6 = dataList6.slice(0, monDataSize);
	dataList7 = dataList7.slice(0, monDataSize);
	dataList8 = dataList8.slice(0, monDataSize);
	let dataX2 = ['第一周', '第二周', '第三周', '第四周'];
	initLineCharts2('echarts2', dataList5, dataList6, dataList7, dataList8, dataX2);

	function initLineCharts2(id, dataList1, dataList2, dataList3, dataList4, dataX) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			grid: { // 设置图形大小
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '25%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: dataX,
				axisLabel: {
					fontSize: fontSize(0.12),
					textStyle: {
						color: 'rgba(255, 255, 255, 0.8)' //坐标值得具体的颜色
					}
				}
			}],
			yAxis: [{
				type: 'value',
				name: '单位:千人',
				nameTextStyle: {
					color: 'rgba(255, 255, 255, 0.8)',
					fontSize: fontSize(0.12)
				},
				splitNumber: '4',
				axisLabel: {
					fontSize: fontSize(0.12),
					textStyle: {
						color: 'rgba(255, 255, 255, 0.8)'
					}
				},
				splitLine: {
					show: true,
					//  改变轴线颜色
					lineStyle: {
						type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
						// 使用深浅的间隔色
						color: ['#9ba2ac']
					}
				}
			}],
			series: [{
					name: '001号展厅',
					type: 'line',
					color: "#FD9D02",
					data: dataList5
				},
				{
					name: '002号展厅',
					type: 'line',
					color: "#4AFEA3",
					data: dataList6
				},
				{
					name: '003号展厅',
					type: 'line',
					color: "#00FDF2",
					data: dataList7
				},
				{
					name: '004号展厅',
					type: 'line',
					color: "#00A2FF",
					data: dataList8
				}
			]
		};
		myChart.setOption(option);
	}

	$(function() {
		$("#echart1").contents().css("width", "3.56rem");
		$("#echart1").contents().css("height", "2.5rem");
		$("#echart1").contents().contents().css("width", "3.56rem");
		$("#echart1").contents().contents().css("height", "2.5rem");

		$("#echart1").contents().css("width", "3.56rem");
		$("#echart1").contents().css("height", "2.1rem");
		$("#echart1").contents().contents().css("width", "3.56rem");
		$("#echart1").contents().contents().css("height", "2.1rem");

		$("#ec_map").contents().css("width", "9.72rem");
		$("#ec_map").contents().css("height", "6.61rem");
		$("#ec_map").contents().contents().css("width", "9.72rem");
		$("#ec_map").contents().contents().css("height", "6.61rem");
	});
})