$(function() {
	//地图容器
	var chart = echarts.init(document.getElementById('ec_map'));

	var mapdata = [];
	//绘制全国地图
	$.getJSON('../map/china.json', function(data) {
		d = [];
		for(var i = 0; i < data.features.length; i++) {
			d.push({
				name: data.features[i].properties.name
			})
		}
		mapdata = d;
		//注册地图
		echarts.registerMap('china', data);
		//绘制地图
		renderMap('china', d);
	});

	//初始化绘制全国地图配置
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: '{b}'
		},
		geo: {
			map: 'china',
			roam:true,
			label: {
				emphasis: {
					show: true,
					color:'#fff'
				}
			},
			//			selectedMode:true,
			itemStyle: {
				normal: {
					areaColor: '#003364',
					borderColor: '#01FDFE',
					shadowBlur: 10,
					shadowColor: '#000A37',
					shadowOffsetX: 10,
					shadowOffsetY: 10
				},
				emphasis: {
					areaColor: '#00A2FF'
				}
			},
			regions:[],
			zoom: 1.1
		}
	};

	//获取所有支行信息
	var odata = [];
	let geoCoordMap = {};
	showOrganization()
	function showOrganization(){
		$.ajax({
		  type: "GET", //提交方式
		  url: userServiceUrl + "/organization/childList",
		  data: {
		  	token:$.getToken(),
		  	pageNum:1,
		  	pageSize:10000
		  },
		  async:false,
		  success: function (result) {
		  	var data = result.data.list;
		    if (result.code === 0 ) {
			    for(let k = 0; k < data.length; k++) {
						(function (k) {
							let address;
							var geoc = new BMap.Geocoder();   //地址解析对象
							var point = new BMap.Point(data[k].organizationLongitude, data[k].organizationLatitude);
							geoc.getLocation(point, function (rs) {
								var addComp = rs.addressComponents;
								address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
								var obj = {};
								obj.name = data[k].organizationName;
								obj.duty = data[k].organizationDuty;
								obj.organizationId = data[k].id;
								obj.value = [{
									'地址': address
								}, {
									'电话': data[k].organizationDutycell
								}];
								odata.push(obj)
								setTimeout(function () {
									if(k === data.length-1){
										//绘制地图
										renderMap('china');
									}
								},300)
							});
							geoCoordMap[data[k].organizationName] = [Number(data[k].organizationLongitude), Number(data[k].organizationLatitude)]

						})(k)
			    }
			  }
		   }
		})
	}


	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if(geoCoord) {
				res.push({
					name: data[i].name,
					duty: data[i].duty,
					value: geoCoord.concat(data[i].value),
					organizationId: data[i].organizationId
				});
			}
		}
		return res;
	};

	function renderMap(map) {
		option.series = [
			{
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
				data: convertData(odata)
			}
		];
		//渲染地图
		chart.setOption(option);
	}

	chart.on('click', function(params) {
		$('#ec_map .nodediv').remove();
		if(params.componentSubType == 'scatter') {
			var localhostPath = window.document.location.href;
		    var localhost = localhostPath.split("head")

			var name = params.name,
				organizationId = params.data.organizationId,
				addr = params.value[2]['地址'],
				duty = params.data.duty,
				tel = params.value[3]['电话'];
			var data = {
				'name': name,
				'duty':duty,
				'organizationId': organizationId,
				'addr': addr,
				'tel': tel,
				'localhost': localhost[0]
			};
			var nodediv = $("<div class='nodediv' style='top: 50%;left: 50%; position: absolute;margin-left:-1.29rem;margin-top:-0.8rem;'><div>").appendTo($("#ec_map"));
			nodediv.append(template("tip_box", data));
		}
	});

	$(function() {
		$("#ec_map").contents().css("width", "9.2rem");
		$("#ec_map").contents().css("height", "8.5rem");
		$("#ec_map").contents().contents().css("width", "9.2rem");
		$("#ec_map").contents().contents().css("height", "8.5rem");
	});

	$('#cd-dropdown').dropdown({
		gutter: 2
	});
	const liNodes = document.querySelectorAll('.select-bar .cd-dropdown > ul > li')
	for(let z = 0; z < liNodes.length; z++) {
		liNodes[z].index = z
		liNodes[0].flag = true
		liNodes[z].onclick = function() {
			var value = this.dataset.value;
			var ecMapData = mapdata;
			for(var i = 0; i < ecMapData.length; i++) {
				ecMapData[i].selected = false;
			}
			if(value === "0") {
				if(this.flag) {
					this.flag = false;
				} else {
					this.flag = true;
				}
				ecMapData = mapdata;
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else if(value === "1") {
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '上海' || ecMapData[i].name == '江苏' || ecMapData[i].name == '浙江' || ecMapData[i].name == '山东' || ecMapData[i].name == '安徽') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else if(value === "2") {
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '广东' || ecMapData[i].name == '广西' || ecMapData[i].name == '海南' || ecMapData[i].name == '福建') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else if(value === "3") {
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '湖北' || ecMapData[i].name == '湖南' || ecMapData[i].name == '河南' || ecMapData[i].name == '江西') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else if(value === "4") {
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '北京' || ecMapData[i].name == '天津' || ecMapData[i].name == '河北' || ecMapData[i].name == '山西' || ecMapData[i].name == '内蒙古') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else if(value === "5") {
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '四川' || ecMapData[i].name == '重庆' || ecMapData[i].name == '贵州' || ecMapData[i].name == '云南' || ecMapData[i].name == '西藏') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			}else if(value === "6"){
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '辽宁' || ecMapData[i].name == '吉林' || ecMapData[i].name == '黑龙江') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else if(value === "7") {
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '陕西' || ecMapData[i].name == '甘肃' || ecMapData[i].name == '新疆' || ecMapData[i].name == '青海' || ecMapData[i].name == '宁夏') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else if(value === "8") {
				for(var i = 0; i < ecMapData.length; i++) {
					if(ecMapData[i].name == '香港' || ecMapData[i].name == '澳门' || ecMapData[i].name == '台湾') {
						ecMapData[i].selected = true;
					}
				}
				option.geo.regions=ecMapData;
				chart.setOption(option);
			} else {
				ecMapData = mapdata;
				option.geo.regions=ecMapData;
				chart.setOption(option);
			}
		}
	}

	getTotalDevices();
	//查询设备状态分类统计
	function getTotalDevices() {
		$.get(deviceServiceUrl + "/device/getAllDeviceState?token=" + $.getToken(), function(totalRes) {
			if(totalRes.code == 0) {
				if(totalRes.data == null || totalRes.data.length == 0){
					initPieCharts('echarts1', 0, 0,0, '#4AFEA3', '#165959');
					initPieCharts('echarts2', 0, 0, 0, '#C8C8C8', '#3A4966');
					initPieCharts('echarts3', 0, 0, 0, '#4CA7FD', '#174178');
					initPieCharts('echarts4', 0, 0, 0, '#C70821', '#623940');
					initPieCharts('echarts5', 0, 0, 0, '#F1E600', '#49542B');
					return;
				}
				let deviceStateList = totalRes.data;
				let deviceTypeOne = 0;
				let deviceTypeTwo = 0;
				let deviceTypeThree = 0;
				let deviceTypeFour = 0;
				let deviceTypeFive = 0;
				let deviceTypeSix = 0;
				let deviceTotal = 0;
				for (let i = 0; i < deviceStateList.length; i++) {
					if(deviceStateList[i].deviceState == 1){
						deviceTypeOne = deviceStateList[i].count;
					}else if (deviceStateList[i].deviceState == 2) {
						deviceTypeTwo = deviceStateList[i].count;
					}else if (deviceStateList[i].deviceState == 3) {
						deviceTypeThree = deviceStateList[i].count;
					}else if (deviceStateList[i].deviceState == 4) {
						deviceTypeFour = deviceStateList[i].count;
					}else if (deviceStateList[i].deviceState == 5) {
						deviceTypeFive = deviceStateList[i].count;
					}else if (deviceStateList[i].deviceState == 6) {
						deviceTypeSix = deviceStateList[i].count;
					}
					deviceTotal += deviceStateList[i].count;
				}
				/*let offLineN = (totalRes.data.deviceTypeTwo / totalRes.data.total).toFixed(2); //离线百分比
				let offLineP = Math.round(offLineN * 100); //离线百分比
				let onlineP = 100 - offLineP; //在线百分比
				let normalN = (totalRes.data.deviceTypeOne / totalRes.data.total).toFixed(2); //正常百分比
				let normalP = Math.round(normalN * 100); //正常百分比
				let warningN = (totalRes.data.deviceTypeThree / totalRes.data.total).toFixed(2); //报警百分比
				let warningP = Math.round(warningN * 100); //报警百分比
				let errorN = (totalRes.data.deviceTypeFour / totalRes.data.total).toFixed(2) * 100; //故障百分比
				let errorP = Math.round(errorN * 100);  //故障百分比*/
				let offLineN = (deviceTypeTwo / deviceTotal).toFixed(2); //离线百分比
				let offLineP = Math.round(offLineN * 100); //离线百分比
				let onlineP = 100 - offLineP; //在线百分比
				let normalN = (deviceTypeOne / deviceTotal).toFixed(2); //正常百分比
				let normalP = Math.round(normalN * 100); //正常百分比
				let warningN = (deviceTypeThree / deviceTotal).toFixed(2); //报警百分比
				let warningP = Math.round(warningN * 100); //报警百分比
				let errorN = (deviceTypeFour / deviceTotal).toFixed(2) * 100; //故障百分比
				let errorP = Math.round(errorN * 100);  //故障百分比
				initPieCharts('echarts1', deviceTotal - deviceTypeTwo, deviceTypeTwo, onlineP, '#4AFEA3', '#165959');
				initPieCharts('echarts2', deviceTypeTwo, deviceTotal - deviceTypeTwo, offLineP, '#C8C8C8', '#3A4966');
				initPieCharts('echarts3', deviceTypeOne, deviceTotal - deviceTypeOne, normalP, '#4CA7FD', '#174178');
				initPieCharts('echarts4', deviceTypeThree, deviceTotal - deviceTypeThree, warningP, '#C70821', '#623940');
				initPieCharts('echarts5', deviceTypeFour, deviceTotal - deviceTypeFour, errorP, '#F1E600', '#49542B');
			} else {

			}
		});
	}

	function initPieCharts(id, count1, count2, count3, color1, color2) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			title: {
				text: count3 + '%',
				x: 'center',
				y: 'center',
				itemGap: 60,
				textStyle: {
					color: '#ffffff',
					fontFamily: 'orbitronBold',
					fontSize: fontSize(0.12)
				}
			},
			series: [{
				type: 'pie',
				clockWise: false,
				radius: ['80%', '100%'],
				hoverAnimation: false,
				itemStyle: {
					normal: {
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					},
				},
				data: [{
						value: count1,
						name: '',
						itemStyle: {
							color: color1
						}
					},
					{
						value: count2,
						name: '',
						itemStyle: {
							color: color2
						}
					}
				]
			}]
		};
		myChart.setOption(option);
	}
	//获取报警统计数据
	//let productCodes = ['00000597','00000677','00001000'];
	let productCodes = [];
	let alertSwitchStatus = true;
	setInterval(function () {
		if (alertSwitchStatus) {
			getTotalByProductCode(3,3,productCodes);
		}else {
			getTotalByProductCode(3,2,productCodes);
		}
	},1000*60*2)
	getTotalByProductCode(3,3,productCodes);
	function getTotalByProductCode(deviceType,ymd,productCodes){
		$.get(deviceServiceUrl + "/deviceEvent/getTotalByProductCode?token=" + $.getToken()+"&deviceType="+deviceType+"&ymd="+ymd+"&productCodes="+productCodes, function(totalRes) {
			if(totalRes.code == 0) {
				let echartDataList = [];
				let total = 0;
				if(totalRes.data.length == 0){
					let echartData = {value: 0, name: '暂无报警', itemStyle: {color: ''}};
					echartDataList.push(echartData);
				}
				for(let i=0; i<totalRes.data.length; i ++){
					let echartData = {value: 0, name: '', itemStyle: {color: ''}};
					echartData.value = totalRes.data[i].count;
					total += totalRes.data[i].count;
					echartData.name = totalRes.data[i].typeName;
					if(i == 0){
						echartData.itemStyle.color = '#00FFFF';
					}else if(i == 1){
						echartData.itemStyle.color = '#FD9D02';
					}else if( i == 2){
						echartData.itemStyle.color = '#4CA7FD';
					}else{
						echartData.itemStyle.color = '#4CA7FD';
					}
					echartDataList.push(echartData);
				}
				initPieCharts2('echarts6', total, echartDataList);
			}
		});
	}

	function initPieCharts2(id, total, echartDataList) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			title: {
				text: '总报警\n' + total + '\n次',
				x: 'center',
				y: 'center',
				itemGap: 60,
				textStyle: {
					color: '#ffffff',
					fontFamily: 'orbitronBold',
					fontSize: fontSize(0.12)
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: "{b} : {c} ({d}%)"
			},
			calculable: true,
			series: [{
				type: 'pie',
				radius: ['50%', '80%'],
				roseType: 'radius',
				width: '40%', // for funnel
				max: 40, // for funnel
				startAngle: 180,
				itemStyle: {
					normal: {
						label: {
							show: true,
							fontSize: fontSize(0.12)
						},
						labelLine: {
							show: true,
							length: fontSize(0.1),
							length2: fontSize(0.15),
							lineStyle: {
								width: fontSize(0.01)
							}
						}
					}
				},
				data: echartDataList
			}]
		};
		myChart.setOption(option);
	}


	//var dataList7 = ['123', '154', '647', '435', '454', '245', '334'];
	//dataList7 = dataList7.slice(0, hourDataSize);
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
		$.get(deviceServiceUrl + "/deviceEvent/getErrorTotal?token=" + $.getToken()+"&errorTime="+ymd, function(totalRes) {
			if(totalRes.code == 0) {
				let errorTotal = {name:"",total:0};
				if(ymd == "day"){
					errorTotal.name = "本日故障(次)";
					let dataList7 = [0, 0, 0, 0, 0, 0];
					let dataX7 = ['04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
					for(let i=0; i<totalRes.data.length; i++){
						let resTime = parseInt(totalRes.data[i].errorTime);
						errorTotal.total += totalRes.data[i].count;
						if(resTime > 0 && resTime <= 4){
							dataList7[0] += totalRes.data[i].count;
						}else if(resTime > 4 && resTime <= 8){
							dataList7[1] += totalRes.data[i].count;
						}else if(resTime > 8 && resTime <= 12){
							dataList7[2] += totalRes.data[i].count;
						}else if(resTime > 12 && resTime <= 16){
							dataList7[3] += totalRes.data[i].count;
						}else if(resTime > 16 && resTime <= 20){
							dataList7[4] += totalRes.data[i].count;
						}else if(resTime > 20 && resTime <= 24){
							dataList7[5] += totalRes.data[i].count;
						}
					}
					vm.errorTotal = errorTotal;
					initBarCharts('echarts7', dataList7, dataX7);
				}else {
					errorTotal.name = "本月故障(次)";
					//let dataList7 = ['123', '154', '647', '435', '454', '245', '334', '568', '236', '785', '346', '533'];
					//let dataX7 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
					let dataList7 = [];
					let dataX7 = [];
					let dateTime = new Date();
					for(let i=1; i<=dateTime.getDate(); i++){
						dataX7.push(i);
						dataList7.push(0);
					}
					for(let i=0; i<totalRes.data.length; i++){
						let resTime = parseInt(totalRes.data[i].errorTime);
						dataList7[resTime-1] = totalRes.data[i].count;
						errorTotal.total += totalRes.data[i].count;
					}
					vm.errorTotal = errorTotal;
					initBarCharts('echarts7', dataList7, dataX7);
				}
			}
		});
	}


	function initBarCharts(id, dataList, dataX) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			grid: { // 设置图形大小
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '20%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis'
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				data: dataX,
				axisLabel: {
					fontSize: fontSize(0.1),
					textStyle: {
						color: '#fff', //坐标值得具体的颜色
					}
				}
			}],
			yAxis: [{
				type: 'value',
				minInterval: 1,
				/*min:0,
				max:10,
				interval:2,*/
				splitNumber: '4',
				axisLabel: {
					fontSize: fontSize(0.1),
					textStyle: {
						color: '#fff'
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
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#0068C7'
								},
								{
									offset: 0.8,
									color: '#003F83'
								},
								{
									offset: 1,
									color: '#001842'
								}
							]
						),
						barBorderRadius: [3, 3, 0, 0]
					}
				},
				data: dataList
			}]
		};
		myChart.setOption(option);
	}

	let energySwitchStatus = true;
	setInterval(function () {
		if (energySwitchStatus) {
			getDeviceConsume("day");
		}else {
			getDeviceConsume("month");
		}
	},1000*60*5)
	getDeviceConsume("day");
	function getDeviceConsume(consumeTime){
		$.get(deviceServiceUrl + "/device/getDeviceConsume?token=" + $.getToken()+"&consumeTime="+consumeTime, function(totalRes) {
			if(totalRes.code == 0) {
				let consumeDataList = [];
				let total = 0;
				if(totalRes.data == null || totalRes.data.length == 0){
					initPieCharts3('echarts8', total,[{value: 0, name: '暂无数据', itemStyle: {color: '#0082FD'}}]);
					return;
				}
				for(let i=0; i<totalRes.data.length; i++){
					let consumeData = {value: 0, name: '', itemStyle: {color: ''}};
					consumeData.value = (totalRes.data[i].consumeNum/1000).toFixed(2);//后台返回的能耗数据需要除以1000来表示kw/h
					consumeData.name = totalRes.data[i].devicePositionName;
					total += totalRes.data[i].consumeNum/1000;//后台返回的能耗数据需要除以1000来表示kw/h
					if(i == 0){
						consumeData.itemStyle.color = "#0082FD";
					}else if(i == 1){
						consumeData.itemStyle.color = "#4CA7FD";
					}else if(i == 2){
						consumeData.itemStyle.color = "#00FFFF";
					}else if(i == 3){
						consumeData.itemStyle.color = "#E6A600";
					}else if(i == 4){
						consumeData.itemStyle.color = "#4AFEA3";
					}else {
						consumeData.itemStyle.color = "#4AFEA3";
					}
					consumeDataList.push(consumeData);
				}
				initPieCharts3('echarts8', total.toFixed(2),consumeDataList);
			}
		});
	}
	//initPieCharts3('echarts8', 197, 83, 41, 52, 15, 16, '#0082FD', '#4CA7FD', '#00FFFF', '#E6A600', '#4AFEA3');

	function initPieCharts3(id, total,consumeDataList) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			title: {
				text: '总能耗\n' + total + '\n(kW·h)',
				x: 'center',
				y: 'center',
				itemGap: 60,
				textStyle: {
					color: '#ffffff',
					fontFamily: 'orbitronBold',
					fontSize: fontSize(0.12)
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: "{b} : <br/>{c}kW·h ({d}%)"
			},
			calculable: true,
			series: [{
				type: 'pie',
				radius: ['50%', '80%'],
				itemStyle: {
					normal: {
						label: {
							show: true,
							fontSize: fontSize(0.12)
						},
						labelLine: {
							show: true,
							length: fontSize(0.15),
							length2: fontSize(0.2)
						}
					}
				},
				data: consumeDataList
			}]
		};
		myChart.setOption(option);
	}

	layui.use('form', function() {
		var form = layui.form;
		form.render();

		//报警统计
		form.on('switch(alertSwitch)', function(data) {
			if(this.checked) {
				//initPieCharts2('echarts6', 80, 56, 16, 8, '#00FFFF', '#FD9D02', '#4CA7FD');
				alertSwitchStatus = false;
				getTotalByProductCode(3,2,productCodes);
			} else {
				alertSwitchStatus = true;
				//initPieCharts2('echarts6', 10, 5, 4, 1, '#00FFFF', '#FD9D02', '#4CA7FD');
				getTotalByProductCode(3,3,productCodes);
			}

		});

		//故障统计
		form.on('switch(errorSwitch)', function(data) {

			if(this.checked) {
				/*var dataList7 = ['123', '154', '647', '435', '454', '245', '334', '568', '236', '785', '346', '533'];
				var dataX7 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
				dataList7 = dataList7.slice(0, monDataSize);
				initBarCharts('echarts7', dataList7, dataX7);*/
				errorSwitchStatus = false;
				getErrorToatal("month");
			} else {
				/*var dataList7 = ['123', '154', '647', '435', '454', '245', '334'];
				var dataX7 = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
				dataList7 = dataList7.slice(0, hourDataSize);
				initBarCharts('echarts7', dataList7, dataX7);*/
				errorSwitchStatus = true;
				getErrorToatal("day");
			}

		});

		//能耗统计
		form.on('switch(energySwitch)', function(data) {

			if(this.checked) {
				//initPieCharts3('echarts8', 5971, 2412, 1243, 1507, 335, 474, '#0082FD', '#4CA7FD', '#00FFFF', '#E6A600', '#4AFEA3');
				energySwitchStatus = false;
				getDeviceConsume("month");
			} else {
				//initPieCharts3('echarts8', 197, 83, 41, 52, 15, 16, '#0082FD', '#4CA7FD', '#00FFFF', '#E6A600', '#4AFEA3');
				energySwitchStatus = true;
				getDeviceConsume("day");
			}

		});
	});

	$(function() {
		$("#echarts1").contents().css("width", "0.59rem");
		$("#echarts1").contents().css("height", "0.59rem");
		$("#echarts1").contents().contents().css("width", "0.59rem");
		$("#echarts1").contents().contents().css("height", "0.59rem");
		$("#echarts2").contents().css("width", "0.59rem");
		$("#echarts2").contents().css("height", "0.59rem");
		$("#echarts2").contents().contents().css("width", "0.59rem");
		$("#echarts2").contents().contents().css("height", "0.59rem");
		$("#echarts3").contents().css("width", "0.59rem");
		$("#echarts3").contents().css("height", "0.59rem");
		$("#echarts3").contents().contents().css("width", "0.59rem");
		$("#echarts3").contents().contents().css("height", "0.59rem");
		$("#echarts4").contents().css("width", "0.59rem");
		$("#echarts4").contents().css("height", "0.59rem");
		$("#echarts4").contents().contents().css("width", "0.59rem");
		$("#echarts4").contents().contents().css("height", "0.59rem");
		$("#echarts5").contents().css("width", "0.59rem");
		$("#echarts5").contents().css("height", "0.59rem");
		$("#echarts5").contents().contents().css("width", "0.59rem");
		$("#echarts5").contents().contents().css("height", "0.59rem");

		$("#echarts6").contents().css("width", "4rem");
		$("#echarts6").contents().css("height", "1.53rem");
		$("#echarts6").contents().contents().css("width", "4rem");
		$("#echarts6").contents().contents().css("height", "1.53rem");

		$("#echarts7").contents().css("width", "3.5rem");
		$("#echarts7").contents().css("height", "1.4rem");
		$("#echarts7").contents().contents().css("width", "3.5rem");
		$("#echarts7").contents().contents().css("height", "1.4rem");

		$("#echarts8").contents().css("width", "4rem");
		$("#echarts8").contents().css("height", "2rem");
		$("#echarts8").contents().contents().css("width", "4rem");
		$("#echarts8").contents().contents().css("height", "2rem");
	});

	//	新闻滚动消息
	$(function() {
		//获得当前<ul>
		var $uList = $(".text-title ul");
		var timer = null;
		//触摸清空定时器
		$uList.hover(function() {
			clearInterval(timer);
		}, function() { //离开启动定时器
			timer = setInterval(function() {
				scrollList($uList);
			}, 2000);
		}).trigger("mouseleave"); //自动触发触摸事件
		//滚动动画
		function scrollList(obj) {
			//获得当前<li>的高度
			var scrollHeight = $("ul li:first").height();
			//滚动出一个<li>的高度
			$uList.stop().animate({
				marginTop: -scrollHeight
			}, 600, function() {
				//动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
				$uList.css({
					marginTop: 0
				}).find("li:first").appendTo($uList);
			});
		}
	});

});
