var ___productCode = "";   // 设备类型码
var ___floorId = "";    // 楼层id
let  proportion;
let orgName="";
$(function() {
	function getUrlParam(paramname) {
		var reg = new RegExp("(^|&)" + paramname + "=([^&]*)(&|$)");
		// 查询匹配 substr(1)删除? match()匹配
		var s = window.location.search.substr(1).match(reg);
		if(s != null) {
			return unescape(s[2]); // unescape() 函数可对通过 escape() 编码的字符串进行解码。
		}
		return null;
	}
	//设备状态
	let z_orgId = getUrlParam("z_orgId")
	//企业信息
	//获得当前<ul>
	var $uList = $(".left-two ul");
	var timer = null;
	//触摸清空定时器
	$uList.hover(
		function() {
			clearInterval(timer);
		},
		function() { //离开启动定时器
			timer = setInterval(function() {
				scrollListV($uList);
			}, 2000);
		}).trigger("mouseleave"); //自动触发触摸事件
	//滚动动画
	function scrollListV(obj) {
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

	let code ="00047701";
	function reqDeviceList() {
		let url = deviceServiceUrl + "/devicemanger/list?token=" + $.getToken() + '&organizationId=' + z_orgId+ '&noproductCode=' + code;
		$.ajax({
			type: "GET", //提交方式
			url: encodeURI(url), //路径
			datatype: 'json',
			contentType: "application/json",
			success: function(res) { //返回数据根据结果进行相应的处理
				if(res.code === 0) {
					var eachDevice = template("eachDevice", res.data);
					var new_list_device = document.getElementById("new_list_device");
					new_list_device.innerHTML = eachDevice;
				} else {
					console.log('请求错误')
				}
			},
			error: function() {
				console.log('请求错误')
			}
		});
	}

	function reqModeList() {
		let url = deviceServiceUrl + "/mode/list?token=" + $.getToken() + '&organizationId=' + z_orgId;
		$.ajax({
			type: "GET", //提交方式
			url: encodeURI(url), //路径
			datatype: 'json',
			contentType: "application/json",
			success: function(res) { //返回数据根据结果进行相应的处理
				if(res.code === 0) {
					var eachMode = template("eachMode", res.data);
					var new_list_mode = document.getElementById("new_list_mode");
					new_list_mode.innerHTML = eachMode;
				} else {
					console.log('请求错误')
				}
			},
			error: function() {
				console.log('请求错误')
			}
		});
	}
	reqDeviceList()
	reqModeList()

	
	
	


	function getFloorList() {
		let enterpriseId = getQueryVariable('z_orgId');
		let parentId = getQueryVariable('parentId');
		$.ajax({
			type: "GET", //提交方式
			url: userServiceUrl + "/organizationFloorBooth/list?token=" + $.getToken() + '&enterpriseId=' + enterpriseId, //路径
			datatype: 'json',
			contentType: "application/json",
			success: function(res) { //返回数据根据结果进行相应的处理
				if(res.code === 0) {
					let data = res.data.list;
					if(data.length > 0) {
						let boothImage = data[0].boothImage,
							floorId = data[0].floorId,
							organizationName = data[0].organizationName;
						
						___floorId = data[0].floorId
						loadDataByDeviceTypeAndFloor(___productCode, ___floorId);
						$.ajax({
							cache: true,
							type: "get",
							url: userServiceUrl + "/organizationFloor/list?token=" + $.getToken() + '&enterpriseId=' + enterpriseId + '&id=' + floorId, //路径
							async: false,
							success: function(res) {
								if(res.code === 0) {
									dataList = res.data.list;
									if(dataList.length > 0) {
										let svgHtml = dataList[0].imgSvg;
//										let boxWidth = document.getElementById('floor-item').clientWidth,
//											boxHeight = document.getElementById('floor-item').clientHeight;
										let itemWidth = document.getElementById('floor-box').clientWidth;
										let itemHeight = document.getElementById('floor-box').clientHeight;
										
										widthScale = (dataList[0].width * 1) / (itemWidth * 1);
										heightScale = (dataList[0].height * 1) / (itemHeight * 1);
										
										if(widthScale > heightScale){
											scale = widthScale;
										}else{
											scale = heightScale;
										}
										console.info(scale)
										let	boxHeight = (dataList[0].height * 1)/scale;
										let boxWidth = (dataList[0].width * 1) / scale;
										
										$('#floor-item').append(svgHtml);
										$('#floor-item').find('svg').css({
											'width': boxWidth,
											'height': boxHeight
										});
										$('#floor-item .cls-1').eq(boothImage).css('fill', '#0061A3');
										$('#company_area_name').text(organizationName);
									}
								} else {
									console.log('请求错误')
								}
								
								proportion = scale
							},
							error: function(errorMsg) {
								console.info("请求错误!");
							}
							
							
						});
					}

				} else {
					console.log('请求错误')
				}
			},
			error: function() {
				console.log('请求错误')
			}
		});
	}

	var theRequest = new Object();

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for(var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			theRequest[vars[i].split("=")[0]] = decodeURI(vars[i].split("=")[1]);
			if(pair[0] == variable) {
				return pair[1];
			}
		}
		return(false);
	}

	getFloorList();
});

$(function() {
	let z_orgId = getUrlParam("z_orgId");
	//空气质量
	showPMByDeviceId('');
	setInterval(function() {
		showPMByDeviceId('');
	}, 1000 * 60 * 6);

	function showPMByDeviceId(deviceId) {
		$.ajax({
			type: "get",
			url: userServiceUrl + "/deviceAir/getPMListByDeviceId",
			data: {
				token: $.getToken(),
				deviceId: deviceId
			},
			success: function(res) {
				if(res.code == 0) {
					let resData = res.data;
					if(resData == null || resData.list.length == 0) {
						//						$('.item>span').removeClass('bac-red');

						document.getElementById("co2").innerHTML = "-";
						document.getElementById("formaldehyde").innerHTML = "-";
						document.getElementById("voc").innerHTML = "-";
						document.getElementById("temperature").innerHTML = "-";
						document.getElementById("humidity").innerHTML = "-";
						document.getElementById("pm25").innerHTML = "-";
					} else {
						$('.item>span').removeClass('bac-red');

						temperatureNum = parseInt(resData.list[0].temperatureNum) / 10;
						humidityNum = parseInt(resData.list[0].humidityNum) / 10;
						let pm25 = resData.list[0].pmTwoPointFive;
						document.getElementById("co2").innerHTML = resData.list[0].coTwo?resData.list[0].coTwo + " " + 'ppm':'-';
						document.getElementById("formaldehyde").innerHTML = resData.list[0].hcho?resData.list[0].hcho + " " + 'ppb':'-';
						document.getElementById("voc").innerHTML = resData.list[0].voc?resData.list[0].voc + " " + 'ppb':'-';
						document.getElementById("temperature").innerHTML = temperatureNum?temperatureNum + " " + '℃':'-';
						document.getElementById("humidity").innerHTML = humidityNum?humidityNum + " " + '%RH':'-';
						document.getElementById("pm25").innerHTML = pm25?pm25 + " " + 'μg/m³':'-';
						//						$.ajax({
						//							type: "get",
						//							url: deviceServiceUrl + "/airQuality/list",
						//							data: {
						//								token: $.getToken(),
						//								organizationId: organizationId
						//							},
						//							success: function(res) {
						//								if(res.data.list == null || res.data.list.length == 0) {
						//									return;
						//								}
						//								var standardData = res.data.list[0];
						//								if(standardData.coTwo && resData.list[0].coTwo * 1 > standardData.coTwo * 1) {
						//									$('#co2').parent().next().addClass('bac-red-linear');
						//								} else {
						//									$('#co2').parent().next().removeClass('bac-red-linear')
						//								}
						//
						//								if(standardData.hcho && resData.list[0].hcho * 1 > standardData.hcho * 1) {
						//									$('#formaldehyde').parent().next().addClass('bac-red');
						//								} else {
						//									$('#formaldehyde').parent().next().removeClass('bac-red');
						//								}
						//
						//								if(standardData.voc && resData.list[0].voc * 1 > standardData.voc * 1) {
						//									$('#voc').parent().next().addClass('bac-red');
						//								} else {
						//									$('#voc').parent().next().removeClass('bac-red');
						//								}
						//
						//								if(standardData.temperature && resData.list[0].temperatureNum / 10.0 > standardData.temperature * 1) {
						//									$('#temperature').parent().next().addClass('bac-red');
						//								} else {
						//									$('#temperature').parent().next().removeClass('bac-red');
						//								}
						//
						//								if(standardData.humidity && resData.list[0].humidityNum / 10.0 > standardData.humidity * 1) {
						//									$('#humidity').parent().next().addClass('bac-red');
						//								} else {
						//									$('#humidity').parent().next().removeClass('bac-red');
						//								}
						//
						//								if(standardData.pmTwoFive && resData.list[0].pmTwoPointFive * 1 > standardData.pmTwoFive * 1) {
						//									$('#pm25').parent().next().addClass('bac-red');
						//								} else {
						//									$('#pm25').parent().next().removeClass('bac-red');
						//								}
						//
						//								if(standardData.pmTem && resData.list[0].pmTen * 1 > standardData.pmTem * 1) {
						//									$('#pm10').parent().next().addClass('bac-red');
						//								} else {
						//									$('#pm10').parent().next().removeClass('bac-red');
						//								}
						//
						//								if(standardData.pmOnePointZero && resData.list[0].pmOnePointZero * 1 > standardData.pmOnePointZero * 1) {
						//									$('#pmOnePointZero').parent().next().addClass('bac-red');
						//								} else {
						//									$('#pmOnePointZero').parent().next().removeClass('bac-red');
						//								}
						//							}
						//						})

					}
				}
			}
		})
	}
	//	initPieCharts1('echarts1', '优', 99, 1, '#4AFEA3', '#175B57');
	//
	//	function initPieCharts1(id, text, count1, count2, color1, color2) {
	//		var myChart = echarts.init(document.getElementById(id));
	//		var option = {
	//			title: {
	//				text: count1 + '\n' + text,
	//				x: 'center',
	//				y: 'center',
	//				itemGap: 60,
	//				textStyle: {
	//					color: '#ffffff',
	//					fontSize: fontSize(0.16)
	//				}
	//			},
	//			series: [{
	//				type: 'pie',
	//				clockWise: false,
	//				radius: ['80%', '100%'],
	//				hoverAnimation: false,
	//				itemStyle: {
	//					normal: {
	//						label: {
	//							show: false
	//						},
	//						labelLine: {
	//							show: false
	//						}
	//					},
	//				},
	//				data: [{
	//						value: count1,
	//						name: '',
	//						itemStyle: {
	//							color: color1
	//						}
	//					},
	//					{
	//						value: count2,
	//						name: '',
	//						itemStyle: {
	//							color: color2
	//						}
	//					}
	//				]
	//			}]
	//		};
	//		myChart.setOption(option);
	//	}

	//实时能耗
	getComsumeTotal("day");
	let energySwitchStatus = true;
	setInterval(function() {
		if(energySwitchStatus) {
			getComsumeTotal("day");
		} else {
			getComsumeTotal("month");
		}
	}, 1000 * 60 * 20);

	function getComsumeTotal(ymd) {
		$.get(deviceServiceUrl + "/devicemanger/getConsumeTotal?token=" + $.getToken() + "&consumeTime=" + ymd + "&organizationId=" + z_orgId, function(totalRes) {
			if(totalRes.code == 0) {
				if(totalRes.data == null || totalRes.data.length == 0) {
					initBarCharts('echarts2', [], []);
					vm.consumeTotal = 0;
					return;
				}
				let dataXList = [];
				let echartDataList = [];
				let dateTime = new Date();
				if(ymd == "day") {
					for(let i = 1; i <= dateTime.getHours(); i++) {
						dataXList.push(i);
						echartDataList.push(0);
					}
				} else {
					for(let i = 1; i <= dateTime.getDate(); i++) {
						dataXList.push(i);
						echartDataList.push(0);
					}
				}
				let consumeTotal = 0; //所有设备总能耗
				for(let i = 0; i < totalRes.data.length; i++) {
					let index = dataXList.indexOf(parseInt(totalRes.data[i].consumeTime));
					let consumeFloat = parseFloat(totalRes.data[i].consumeNum / 1000);
					echartDataList[index] += consumeFloat;
					consumeTotal += consumeFloat;
				}

				vm.consumeTotal = consumeTotal;
				if(ymd == "day") {
					for(let i = 0; i < dataXList.length; i++) {
						dataXList[i] = dataXList[i] + ":00";
					}
				}
				initBarCharts('echarts2', echartDataList, dataXList);
			}
		});
	}

	layui.use('form', function() {
		var form = layui.form;
		form.render();

		//实时能耗
		form.on('switch(energySwitch)', function(data) {

			if(this.checked) {
				energySwitchStatus = false;
				getComsumeTotal("month");
			} else {
				energySwitchStatus = true;
				getComsumeTotal("day");
			}

		});
	});

	//	layui.use('form', function() {
	//		var form = layui.form;
	//		form.render();
	//
	//		//实时能耗
	//		form.on('switch(energySwitch)', function(data) {
	//
	//			if(this.checked) {
	//				let dataList = ['23', '34', '56', '76', '43', '21'];
	//				dataList = dataList = dataList.slice(0, hourDataSize);
	//				let dataX = ['04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
	//				initBarCharts('echarts2', dataList, dataX);
	//			} else {
	//				let dataList = ['1203', '1545', '1724', '1575', '1497', '1597', '1338', '1863', '1669', '1822', '1468', '1548'];
	//				dataList = dataList.slice(0, monDataSize);
	//				let dataX = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
	//				initBarCharts('echarts2', dataList, dataX);
	//			}
	//
	//		});
	//
	//	});

	//	let dataList = ['1203', '1545', '1724', '1575', '1497', '1597', '1338', '1863', '1669', '1822', '1468', '1548'];
	//	dataList = dataList.slice(0, monDataSize);
	//	let dataX = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
	//	initBarCharts('echarts2', dataList, dataX);

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
					fontSize: fontSize(0.12),
					textStyle: {
						color: '#fff', //坐标值得具体的颜色
					}
				}
			}],
			yAxis: [{
				type: 'value',
				splitNumber: '4',
				axisLabel: {
					fontSize: fontSize(0.12),
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
						barBorderRadius: [2, 2, 0, 0]
					}
				},
				data: dataList
			}]
		};
		myChart.setOption(option);
	}

	//设备状态
	function getUrlParam(paramname) {
		var reg = new RegExp("(^|&)" + paramname + "=([^&]*)(&|$)");
		// 查询匹配 substr(1)删除? match()匹配
		var s = window.location.search.substr(1).match(reg);
		if(s != null) {
			return unescape(s[2]); // unescape() 函数可对通过 escape() 编码的字符串进行解码。
		}
		return null;
	}
	//设备状态
	getTotalDevices();

	//查询设备状态分类统计
	function getTotalDevices() {
		$.get(deviceServiceUrl + "/devicemanger/getAllDeviceState?token=" + $.getToken() + '&organizationId=' + z_orgId, function(totalRes) {
			if(totalRes.code == 0) {
				if(totalRes.data == null || totalRes.data.length == 0) {
					initPieCharts('echarts3', 0, 0, 0, '#4AFEA3', '#165959');
					// initPieCharts('echarts4', 0, 0, 0, '#C8C8C8', '#3A4966');
					initPieCharts('echarts5', 0, 0, 0, '#4CA7FD', '#174178');
					initPieCharts('echarts6', 0, 0, 0, '#C70821', '#623940');
					initPieCharts('echarts7', 0, 0, 0, '#F1E600', '#49542B');
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
				for(let i = 0; i < deviceStateList.length; i++) {
					if(deviceStateList[i].deviceState == 1) {
						deviceTypeOne = deviceStateList[i].count;
					} else
						//     if (deviceStateList[i].deviceState == 2) {
						//     deviceTypeTwo = deviceStateList[i].count;
						// }else
						if(deviceStateList[i].deviceState == 3) {
							deviceTypeThree = deviceStateList[i].count;
						} else if(deviceStateList[i].deviceState == 4) {
						deviceTypeFour = deviceStateList[i].count;
					} else if(deviceStateList[i].deviceState == 5) {
						deviceTypeFive = deviceStateList[i].count;
					} else if(deviceStateList[i].deviceState == 6) {
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
				let errorN = (deviceTypeFour / deviceTotal).toFixed(2); //故障百分比
				let errorP = Math.round(errorN * 100); //故障百分比
				initPieCharts('echarts3', deviceTotal - deviceTypeTwo, deviceTypeTwo, onlineP, '#4AFEA3', '#165959');
				// initPieCharts('echarts4', deviceTypeTwo, deviceTotal - deviceTypeTwo, offLineP, '#C8C8C8', '#3A4966');
				initPieCharts('echarts5', deviceTypeOne, deviceTotal - deviceTypeOne, 100 - warningP - errorP, '#4CA7FD', '#174178');
				initPieCharts('echarts6', deviceTypeThree, deviceTotal - deviceTypeThree, warningP, '#C70821', '#623940');
				initPieCharts('echarts7', deviceTypeFour, deviceTotal - deviceTypeFour, errorP, '#F1E600', '#49542B');
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

	$(function() {
		$("#echarts1").contents().css("width", "0.8rem");
		$("#echarts1").contents().css("height", "0.8rem");
		$("#echarts1").contents().contents().css("width", "0.8rem");
		$("#echarts1").contents().contents().css("height", "0.8rem");

		$("#echarts2").contents().css("width", "3.8rem");
		$("#echarts2").contents().css("height", "1.8rem");
		$("#echarts2").contents().contents().css("width", "3.8rem");
		$("#echarts2").contents().contents().css("height", "1.8rem");

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
		$("#echarts6").contents().css("width", "0.59rem");
		$("#echarts6").contents().css("height", "0.59rem");
		$("#echarts6").contents().contents().css("width", "0.59rem");
		$("#echarts6").contents().contents().css("height", "0.59rem");
		$("#echarts7").contents().css("width", "0.59rem");
		$("#echarts7").contents().css("height", "0.59rem");
		$("#echarts7").contents().contents().css("width", "0.59rem");
		$("#echarts7").contents().contents().css("height", "0.59rem");
	});


	//设备下拉选项框
    $.ajax({
        cache: true,
        type: "get",
        url: addToUrlToken(deviceServiceUrl + "/deviceType/list"),
        async: false,
        data: {pageSize: 999999},
        success: function (data) {
            console.info(data);
            if (data.code === 0) {
                let list = data.data.list;
                for (let i = 0; i < list.length; i++) {
                    $("#cd-dropdown").append("<option value=" + list[i].productCode + " class='icon-small-sprite' data-bac-uri='background: url(" + list[i].typeIcon + ") no-repeat;background-position: center;' >" + list[i].typeName + "</option>");
                }
            }
        },
        error: function (errorMsg) {
            console.info("加载失败啦!");
        }
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
            ___productCode = this.dataset.value;
            var product = ".controlShowa" + ___productCode
			if(___productCode != 0){
				$(".controlNone").css("display","none")
				$(product).css("display","block")
			}else{
				loadDataByDeviceTypeAndFloor(___productCode, ___floorId);
			}
            
//          loadDataByDeviceTypeAndFloor(___productCode, ___floorId);
			if(value === "0") {
				if(this.flag) {
					this.flag = false
					console.log(value);
				} else {
					this.flag = true
					console.log(value);
				}
			} else if(value === "1") {
				console.log(value);
			} else if(value === "2") {
				console.log(value);
			} else if(value === "3") {
				console.log(value);
			} else if(value === "4") {
				console.log(value);
			} else if(value === "5") {
				console.log(value);
			} else {
				console.log(value);
			}
		}
	}

    var __dropdownFlag = true;
    $('.cd-dropdown > ul').hide();
    $('.cd-dropdown').click(function () {
        if (__dropdownFlag) {
            $('.cd-dropdown > ul').css("height", "350px");
            $('.cd-dropdown > ul').css("overflow", "auto");
            $('.cd-dropdown > ul').show();
            __dropdownFlag = false;
        } else {
            $('.cd-dropdown > ul').css("height", "0");
            $('.cd-dropdown > ul').css("overflow", "auto");
            $('.cd-dropdown > ul').hide();
            __dropdownFlag = true;
        }
    });

	$('#cd-dropdown2').dropdown({
		gutter: 2
	});
	const liNodes2 = document.querySelectorAll('.floor-select .cd-dropdown > ul > li')
	for(let z = 0; z < liNodes2.length; z++) {
		liNodes2[z].index = z
		liNodes2[0].flag = true
		liNodes2[z].onclick = function() {
			var value = this.dataset.value
			if(value === "0") {
				if(this.flag) {
					this.flag = false
					console.log(value);
				} else {
					this.flag = true
					console.log(value);
				}
			} else if(value === "1") {
				console.log(value);
			} else if(value === "2") {
				console.log(value);
			} else if(value === "3") {
				console.log(value);
			} else if(value === "4") {
				console.log(value);
			} else if(value === "5") {
				console.log(value);
			} else {
				console.log(value);
			}
		}
	}

	//	设备列表滚动
	$(function() {
		//获得当前<ul>
		var $uList1 = $(".device-list-box1 ul");

		$('.center-one .left-btn').on('click', function() {
			scrollListH($uList1, 'left');
		});

		$('.center-one .right-btn').on('click', function() {
			scrollListH($uList1, 'right');
		});

		var $uList2 = $(".device-list-box2 ul");
		$('.right-two .left-btn').on('click', function() {
			scrollListH($uList2, 'left');
		});

		$('.right-two .right-btn').on('click', function() {
			scrollListH($uList2, 'right');
		});
	});

	//摄像头图片轮播
	layui.use('carousel', function() {
		var carousel = layui.carousel;
		//建造实例
		carousel.render({
			elem: '#imgDiv',
			width: '100%' //设置容器宽度
				,
			arrow: 'none' //始终显示箭头
			//,anim: 'updown' //切换动画方式
		});
	});
})

$(function() {
	var orgId = getQueryVariable("z_orgId");
	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/organization/getEnterpriseInfoData?organizetionId=" + orgId + "&token=" + $.getToken(),
		async: false,
		success: function(data) {
			if(data.code == 0) {
				let original = data.data.list[0];
				orgName=original.organizationName;
				if(original.name == null) {
					original.name = '';
				}
				let content = "<div style='position: relative;'>" +
					"<span class='info-title'>展示区企业:</span>" +
					"<span style='font-size: 0.2rem;' title='" + original.organizationName + "'>" + original.organizationName + "</span>" +
					"<span><img src='" + original.logo + "' style='position: absolute;' alt=''></span>" +
					"</div>" +
					"<div>" +
					"<span class='info-title'>展示区面积:</span>" +
					"<span>" + original.area + "㎡</span>" +
					"</div>" +
					"<div>" +
					"<span class='info-title'>展示区编号:</span>" +
					"<span>" + original.name + "</span>" +
					"</div>" +
					"<div>" +
					"<span class='info-title'>设备概览:</span>" +
					"<span>" + original.deviceNum + "<span style='font-size: 0.12rem;'>(台)</span></span>" +
					"</div>" +
					"<div>" +
					"<span class='info-title'>展区管理员:</span>" +
					"<span>" + original.personCharge + "</span>" +
					"<span>" + original.personMobile + "</span>" +
					"</div>"
				$("#EnterpriseInfo").append(content);
				$("#showroomName").html(original.parentName);
				$("#showroomInfo").html(original.onum + "家展示企业，" + original.bnum + "个展示区域，" + original.dnum + "台智能设备");
			}
		},
		error: function(errorMsg) {
			console.info("企业信息数据加载失败啦!");
		}
	});
});

function scrollListH(obj, direction) {
	//获得当前<li>的高度
	var scrollWidth = $("ul li:first").width();
	//滚动出一个<li>的高度
	if(direction == 'left') {
		obj.stop().animate({
			marginLeft: scrollWidth
		}, 10, function() {
			//动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
			obj.css({
				marginLeft: 0
			}).find("li:first").appendTo(obj);
		});
	} else {
		obj.stop().animate({
			marginLeft: -scrollWidth
		}, 10, function() {
			//动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
			obj.css({
				marginLeft: 0
			}).find("li:last").prependTo(obj);
		});
	}
}

//全屏显示
var fullScreen = function fullScreen(e) {
	var ac = 'screen-full',
		ic = 'screen-restore';
	var $ti = $(e);
	var isFullscreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
	if(isFullscreen) {
		var efs = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
		if(efs) {
			efs.call(document);
		} else if(window.ActiveXObject) {
			var ws = new ActiveXObject('WScript.Shell');
			ws && ws.SendKeys('{F11}');
		}
		$ti.addClass(ac).removeClass(ic);
	} else {
		var el = document.documentElement;
		var rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
		if(rfs) {
			rfs.call(el);
		} else if(window.ActiveXObject) {
			var ws = new ActiveXObject('WScript.Shell');
			ws && ws.SendKeys('{F11}');
		}
		$ti.addClass(ic).removeClass(ac);
	}
}

//关闭设备、模式更多弹框
var closeMask = function closeMask(e) {
	$(e).parents().find('.mask').remove();
}

//设备、模式更多弹框
function deviceMode(activeType) {
	let z_orgId = getQueryVariable('z_orgId');
	let value = {};
	let html = template("company_info_tip", {
		title: ""
	});
	$('#main').append(html);
	$('.mask').show();
	$('#orgName').text("企业设备智控平台("+orgName+")");
	//智控平台

	$('.modeControl').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.mode-list-box').fadeIn();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.mode-list-box').fadeOut();
			
			let modeRqUrl = deviceServiceUrl + "/mode/getModeList?token=" + $.getToken() + '&states=0&id=' + z_orgId;
			getContent('mode', modeRqUrl);
//			getModeList();
		}
	});

	//	$('.mode-item').click(function(e) {
	//		e.stopPropagation();
	//		if($(this).hasClass('mode-off')) {
	//			$(this).removeClass('mode-off').addClass('mode-on');
	//			$(this).find('.mode-off').hide();
	//			$(this).find('.mode-on').show();
	//		} else if($(this).hasClass('mode-on')) {
	//			$(this).removeClass('mode-on').addClass('mode-off');
	//			$(this).find('.mode-on').hide();
	//			$(this).find('.mode-off').show();
	//		}
	//	});

	if(activeType == 'mode') {
		$('.modeControl').trigger('click');
	}

	$('.deviceControl').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.mode-list-box').fadeIn();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.mode-list-box').fadeOut();

			let deviceRqUrl = deviceServiceUrl + "/devicemanger/getDeviceByOrg?token=" + $.getToken() + '&organizationId=' + z_orgId;
			getContent('device', deviceRqUrl);

		}
	});

	if(activeType == 'device') {
		$('.deviceControl').trigger('click');
	}

	$('.infoPub').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.mode-list-box').fadeIn();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.mode-list-box').fadeOut();

			let infoReqUrl = deviceServiceUrl + "/ipushlog/getInformationAndLogOrg?token=" + $.getToken() + '&organizationId=' + z_orgId;
			getContent('info', infoReqUrl);
		}
	});

	$('.pcControl').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.mode-list-box').fadeIn();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.mode-list-box').fadeOut();

			let PCReqUrl = deviceServiceUrl + "/windowscontrol/getWindowsByOrg?token=" + $.getToken() + '&organizationId=' + z_orgId;
			getContent('PC', PCReqUrl);
		}
	});

	if(activeType == 'PC') {
		$('.pcControl').trigger('click');
	}
}

//获取当前展厅模式列表
function getModeList() {
	let url = deviceServiceUrl + "/mode/getModeList?token=" + $.getToken() + '&id=' + z_orgId;
	$.ajax({
		type: "GET", //提交方式
		url: encodeURI(url), //路径
		datatype: 'json',
		contentType: "application/json",
		success: function(res) { //返回数据根据结果进行相应的处理
			if(res.code === 0) {
				
				//右侧内容样板
				let modeHtml = template("rightMode_template", res.data.list[0]);
				$('#content_list').html(modeHtml);

			} else {
				console.log('请求错误')
			}
		},
		error: function() {
			console.log('请求错误')
		}
	});
}

//获取右侧内容
function getContent(activeType, url) {
	let type = activeType;
	$.ajax({
		type: "GET", //提交方式
		url: encodeURI(url), //路径
		datatype: 'json',
		contentType: "application/json",
		success: function(res) { //返回数据根据结果进行相应的处理
			if(res.code === 0) {
				let data = res.data;
				if(!data) {
					$('#content_list').html('');
					return
				}
				if(type == 'mode') {
					if(res.data.list[0].modeList[0].modeList == null){
						$('#content_list').html("");
						return;
					}
					let modeHtml = template("rightMode_template", res.data.list[0].modeList[0]);
					$('#content_list').html(modeHtml);
				} else if(type == 'device') {
					let value={
						'deviceList':res.data
					}
					let deviceHtml = template("rightDevice_template", value);
					$('#content_list').html(deviceHtml);

				} else if(type == 'info') {
					let value={
						'infoList':res.data
					}
					let infoHtml = template("rightInfo_template", value);
					$('#content_list').html(infoHtml);

				} else if(type == 'PC') {
					let value={
						'pcList':res.data
					}
					let winHtml = template("rightWin_template", value);
					$('#content_list').html(winHtml);
				}
			} else {
				console.log('请求错误')
			}
		},
		error: function() {
			console.log('请求错误')
		}
	});
}

//信息发布操作
//图片、视频管理
var picPage = 1,
	videoPage = 1;

//图片、视频管理弹框
function picVideoPub(e) {
	window.event? window.event.cancelBubble = true : e.stopPropagation();
	let data = JSON.parse($(e).attr('data-value'));
	let pushResolution = data.pushResolution;
	if(!pushResolution) {
		layer.msg("请先前往管理后台设置设备分辨率", {
			icon: 2
		});
		return;
	}

	let html = template("picVideoPub", {
		title: ""
	});

	var modeLayer = layer.open({
		skin: 'card', //自定义样式winning-class
		type: 1,
		title: '图片/视屏管理',
		area: ['930px', '600px'], //宽高
		resize: true, //是否拉升
		offset: 'auto', //居中
		content: html,
		btn: '',
		success: function(layero) {
			var deviceId = data.deviceId + "_" + data.deviceSubscriberNumber + "_" + data.productCode + "_" + data.serialNum;
			$('#deviceId').val(deviceId);
			$('#picVideoPubBox').attr({
				'data-pushResolution': data.pushResolution
			});
			getPicVideoList(1, '');
			$('#picVideoPubBox').on('click', '.manage-list-i', function(e) {
				e.stopPropagation();
				if($(this).hasClass('check-on')) {
					$(this).removeClass('check-on');
				} else {
					$(this).addClass('check-on');
				}
			});

			$('#picVideoPubBox').on('click', '.manage-i-delete', function(e) {
				e.stopPropagation();
				let _this = $(this);
				let id = _this.parent().attr('data-id');
				let conlayer = layer.confirm("确定删除吗？", {
					btn: ['确定', '取消']
				}, function() {
					$.deleteJSON(addToUrlToken(deviceServiceUrl + "/videoRe") + "&id=" + id, {}, function(res) {
						if(res.code == 0) {
							layer.msg("删除成功！", {
								icon: 1
							});
							$('#picVideoPubBox').find('.pic-item .manage-item-list').html('');
							$('#picVideoPubBox').find('.video-item .manage-item-list').html('');
							picPage = 1;
							videoPage = 1;
							getPicVideoList(1, '');
						} else {
							layer.msg("删除失败！", {
								icon: 2
							});
						}
						layer.close(conlayer);
					});
				}, function() {
					layer.close(conlayer);
				});
			});

			$('#picVideoPubBox').on('click', '.pic-item .more-btn', function() {
				picPage++;
				getPicVideoList(picPage, 1);
			});

			$('#picVideoPubBox').on('click', '.video-item .more-btn', function() {
				videoPage++;
				getPicVideoList(videoPage, 2);
			});
		}
	});
}

//图片、视频管理发布
function pubMethod(ele, type) {
	let list = [];
	let vireUrl = '';
	let deviceId = [];
	deviceId.push($(ele).parents('#picVideoPubBox').find('#deviceId').val());
	let pushResolution = $(ele).parents('#picVideoPubBox').attr('data-pushResolution');
	if(!pushResolution) {
		layer.msg("请先设置设备分辨率", {
			icon: 2
		});
		return;
	}
	if(type == 1) {
		list = $(ele).parents('.pic-item').find('li.check-on');
		if(list.length == 1) {
			vireUrl = $(ele).parents('.pic-item').find('li.check-on img').attr('src');
			let data = {
				"deviceId": deviceId,
				"repeatType": 'one',
				"url": vireUrl,
				"switchTime": '',
				"filetype": 'img'
			}
			pubRequest(data, '');
		} else if(list.length == 0) {
			layer.msg("请先选择要发布的图片", {
				icon: 2
			});
			return;
		} else {
			let html = template("picTimeTip", {
				title: ""
			});
			var myLayer = layer.open({
				skin: 'card', //自定义样式winning-class
				type: 1,
				title: '间隔时间设置',
				area: ['450px', '200px'], //宽高
				resize: true, //是否拉升
				offset: 'auto', //居中
				content: html,
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					let r = /^\+?[1-9][0-9]*$/;
					if($("#picTimeForm #switchTime2").val() == "") {
						layer.msg("时间间隔不能为空", {
							icon: 2
						});
						return;
					} else if(!r.test($("#picTimeForm #switchTime2").val())) {
						layer.msg("时间间隔必须为正整数", {
							icon: 2
						});
						return;
					}
					let data = $("#picTimeForm").serializeJson();
					let imgList = $(ele).parents('.pic-item').find('li.check-on img');
					let imgUrl = '';
					for(let i = 0, len = imgList.length; i < len; i++) {
						let src = imgList[i].src;
						if(i == (len - 1)) {
							imgUrl += src;
						} else {
							imgUrl += src + ',';
						}
					}
					data.deviceId = deviceId;
					data.repeatType = 'repeat';
					data.filetype = 'img';
					data.url = imgUrl;
					pubRequest(data, myLayer);
				},
				success: function(layero) {

				}
			});
		}
	} else {
		list = $(ele).parents('.video-item').find('li.check-on');
		if(list.length == 1) {
			vireUrl = $(ele).parents('.video-item').find('li.check-on .videolist').attr('ipath');
			let data = {
				"deviceId": deviceId,
				"repeatType": 'one',
				"url": vireUrl,
				"switchTime": '',
				"filetype": 'video'
			}
			pubRequest(data, '');
		} else if(list.length == 0) {
			layer.msg("请先选择要发布的视频", {
				icon: 2
			});
			return;
		} else {
			let data = {
				"deviceId": deviceId,
				"repeatType": 'repeat',
				"switchTime": '',
				"filetype": 'video'
			}
			let videoList = $(ele).parents('.video-item').find('li.check-on .videolist');
			console.log(videoList)
			let videoUrl = '';
			for(let i = 0, len = videoList.length; i < len; i++) {
				let src = videoList[i].attributes[2].value;
				if(i == (len - 1)) {
					videoUrl += src;
				} else {
					videoUrl += src + ',';
				}
			}
			data.url = videoUrl;
			pubRequest(data, '');
		}
	}
}

function pubRequest(data, ele) {
	$.postJSON(deviceServiceUrl + "/ipushlog/batch_up_push", data, function(data) {
		if(data.code == 0) {
			layer.msg("成功", {
				icon: 1
			});
			layer.close(ele);
			$('#picVideoPubBox').find('.pic-item .manage-item-list').html('');
			$('#picVideoPubBox').find('.video-item .manage-item-list').html('');
			picPage = 1;
			videoPage = 1;
			getPicVideoList(1, '');
			return true;
		} else {
			layer.msg("操作失败" + data.message, {
				icon: 2
			});
		}
	});
}

//图片、视频管理上传
function upMethod(type, title) {
	let html;
	if(type == 1) {
		html = template("picTip", {
			title: ""
		});
	} else if(type == 2) {
		html = template("videoTip", {
			title: ""
		});
	} else {
		layer.msg("出错了", {
			icon: 2
		});
		return;
	}
	var myLayer = layer.open({
		skin: 'card', //自定义样式winning-class
		type: 1,
		title: [title, ""],
		area: ['550px', '400px'], //宽高
		resize: true, //是否拉升
		offset: 'auto', //居中
		content: html,
		btn: ['提交', '取消'],
		yes: function(index, layero) {
			var data = $("#picVideoForm").serializeJson();
			if(type == 1) {
				data.virePath = $("#picVideoForm").find('.upfile-box img').attr('src');
				if(data.vireName == '') {
					layer.msg("文件名称不能为空", {
						icon: 2
					});
					return;
				} else if(data.virePath == '') {
					layer.msg("文件不能为空", {
						icon: 2
					});
					return;
				}
				upLoadFileAll(data, myLayer);
			} else if(type == 2) {
				data.virePath = $("#picVideoForm").find('.videolist').attr('ipath');
				if(data.vireName == '') {
					layer.msg("文件名称不能为空", {
						icon: 2
					});
					return;
				} else if(data.virePath == '') {
					layer.msg("文件不能为空", {
						icon: 2
					});
					return;
				}
				upLoadFileAll(data, myLayer);
			}
		},
		success: function(layero) {
			if(type == 1) {
				$('#upPic').show();
			} else if(type == 2) {
				$('#upVideo').show();
				$('#picVideoForm .videolist').click(function(e) { //这个视频被点击后执行
					e.stopPropagation();
					var img = $(this).attr('vpath'); //获取视频预览图
					var video = $(this).attr('ipath'); //获取视频路径
					$('.videos').html("<video id=\"video\" poster='" + img + "' style='width: 640px' src='" + video + "' preload=\"auto\" controls=\"controls\" autoplay=\"autoplay\"></video><img onClick=\"close1()\" class=\"vclose\" src=\"../images/gb.png\" width=\"25\" height=\"25\">");
					$('.videos').show();
				});
			}
		}
	});

}

function upFile(type) {
	if(type == 1) {
		$('#picUp').click();
	} else if(type == 2) {
		$('#videoUp').click();
	}
}

//上传进度回调函数：  
function progressHandlingFunction(e) {
    $('.progress-container').show();
    if (e.lengthComputable) {
        $('#progress').attr({
            value: e.loaded,
            max: e.total
        }); //更新数据到进度条
        var percent = e.loaded / e.total * 100;
//		$('#progress').html(e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
        $('#progress').html(percent.toFixed(2) + "%");
        $('#progress').css('width', percent.toFixed(2) + "%");
    }
}

function upLoadImgFile(ele) {
    let imagePath = $(ele).val();
    let idName = $(ele).attr('id');
    if (imagePath == "") {
        layer.msg("请选择要上传的文件", {
            icon: 2
        });
        return;
    } else {
        let formData = new FormData();
        formData.append("file", $(ele)[0].files[0]);
        //				$.show_overall_loding();
        $.ajax({
            type: "post",
            url: "http://39.98.137.198:7788/api/file/upload?appId=168254",
            data: formData,
            contentType: false,
            processData: false,
            xhr: function () { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数

                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { //检查upload属性是否存在
                    //绑定progress事件的回调函数
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                }
                return myXhr; //xhr对象返回给jQuery使用
            },
            success: function (res) {
                //						$.hide_overall_loding();
                if (res.code == 0) {
                    let virePath = res.data.filePath;
                    $(ele).parent().parent().find('.upfile-box img').attr('src', virePath);
                } else {
                    layer.msg("操作失败", {
                        icon: 2
                    });
                }
            },
            fail: function () {
                layer.msg("操作失败", {
                    icon: 2
                });
            }
        })
    }
}

function upLoadVideoFile(ele) {
    let imagePath = $(ele).val();
    let idName = $(ele).attr('id');
    if (imagePath == "") {
        layer.msg("请选择要上传的文件", {
            icon: 2
        });
        return;
    } else {
        let formData = new FormData();
        formData.append("file", $(ele)[0].files[0]);
        //				$.show_overall_loding();
        $.ajax({
            type: "post",
            url: "http://39.98.137.198:7788/api/file/upload?appId=168254",
            data: formData,
            contentType: false,
            processData: false,
            xhr: function () { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数

                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { //检查upload属性是否存在
                    //绑定progress事件的回调函数
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
                }
                return myXhr; //xhr对象返回给jQuery使用
            },
            success: function (res) {
                //						$.hide_overall_loding();
                if (res.code == 0) {
                    let virePath = res.data.filePath;
                    $(ele).parent().parent().find('.videolist').attr('ipath', virePath);
                } else {
                    layer.msg("操作失败", {
                        icon: 2
                    });
                }
            },
            fail: function () {
                layer.msg("操作失败", {
                    icon: 2
                });
            }
        })
    }
}

function upLoadFileAll(data, ele) {
    $.postJSON(deviceServiceUrl + "/videoRe", data, function (data) {
        $.hide_overall_loding();
        layer.close(ele);
        if (data.code == 0) {
            layer.msg("成功", {
                icon: 1
            });
            $('#picVideoPubBox').find('.pic-item .manage-item-list').html('');
            $('#picVideoPubBox').find('.video-item .manage-item-list').html('');
            $('#picVideoPubBox').find('.pic-item .more-btn').hide();
            $('#picVideoPubBox').find('.video-item .more-btn').hide();
            picPage = 1;
            videoPage = 1;
            getPicVideoList(1, '');
            return true;
        } else {
            if (data.code == 401000) {
                parent.layer.msg(data.message, {
                    icon: 5
                });
            } else if (data.messages != null) {
                parent.layer.msg(data.messages[0].error, {
                    icon: 5
                });
            } else {
                parent.layer.msg(data.message, {
                    icon: 5
                });
            }
        }
    });
}

//图片、视频管理数据渲染
function getPicVideoList(pageNum, type) {
	$.get(deviceServiceUrl + "/videoRe/lists?token=" + $.getToken() + "&pageSize=5&pageNum=" + pageNum, function(res) {
		if(res.code == 0) {
			console.log(res);
			let imgList = res.data.image;
			let imgHtml = '';
			for(let i = 0, length = imgList.length; i < length; i++) {
				if(imgList[i].checktype == '1') {
					imgHtml += '<li class="manage-list-i check-on" data-id="' + imgList[i].id + '">' +
						'<p title="' + imgList[i].vireName + '">' + imgList[i].vireName + '</p>' +
						'<div class="manage-i-img">' +
						'<span class="check-state"></span>' +
						'<img src="' + imgList[i].virePath + '" />' +
						'</div>' +
						'<div class="manage-i-delete">' +
						'<span class="icon-delete"></span>' +
						'</div>' +
						'</li>';
				} else {
					imgHtml += '<li class="manage-list-i" data-id="' + imgList[i].id + '">' +
						'<p title="' + imgList[i].vireName + '">' + imgList[i].vireName + '</p>' +
						'<div class="manage-i-img">' +
						'<span class="check-state"></span>' +
						'<img src="' + imgList[i].virePath + '" />' +
						'</div>' +
						'<div class="manage-i-delete">' +
						'<span class="icon-delete"></span>' +
						'</div>' +
						'</li>';
				}
			}

			let videoList = res.data.video;
			let videoHtml = '';
			for(let i = 0, length = videoList.length; i < length; i++) {
				if(videoList[i].checktype == '1') {
					videoHtml += '<li class="manage-list-i check-on" data-id="' + videoList[i].id + '">' +
						'<p title="' + videoList[i].vireName + '">' + videoList[i].vireName + '</p>' +
						'<div class="manage-i-img">' +
						'<span class="check-state"></span>' +
						'<div class="videolist" vpath="" ipath="' + videoList[i].virePath + '">' +
						'<span class="video-play" onClick="videoPlay(this)"></span>' +
						'</div>' +
						'</div>' +
						'<div class="manage-i-delete">' +
						'<span class="icon-delete"></span>' +
						'</div>' +
						'</li>';
				} else {
					videoHtml += '<li class="manage-list-i" data-id="' + videoList[i].id + '">' +
						'<p title="' + videoList[i].vireName + '">' + videoList[i].vireName + '</p>' +
						'<div class="manage-i-img">' +
						'<span class="check-state"></span>' +
						'<div class="videolist" vpath="" ipath="' + videoList[i].virePath + '">' +
						'<span class="video-play" onClick="videoPlay(this)"></span>' +
						'</div>' +
						'</div>' +
						'<div class="manage-i-delete">' +
						'<span class="icon-delete"></span>' +
						'</div>' +
						'</li>';
				}
			}

			if(type == 1) {
				$('#picVideoPubBox').find('.pic-item .manage-item-list').append(imgHtml);
				if(imgList.length == 5) {
					$('#picVideoPubBox').find('.pic-item .more-btn').show();
				} else {
					$('#picVideoPubBox').find('.pic-item .more-btn').hide();
				}
			} else if(type == 2) {
				$('#picVideoPubBox').find('.video-item .manage-item-list').append(videoHtml);
				if(videoList.length == 5) {
					$('#picVideoPubBox').find('.video-item .more-btn').show();
				} else {
					$('#picVideoPubBox').find('.video-item .more-btn').hide();
				}
			} else {
				$('#picVideoPubBox').find('.pic-item .manage-item-list').append(imgHtml);
				if(imgList.length == 5) {
					$('#picVideoPubBox').find('.pic-item .more-btn').show();
				} else {
					$('#picVideoPubBox').find('.pic-item .more-btn').hide();
				}
				$('#picVideoPubBox').find('.video-item .manage-item-list').append(videoHtml);
				if(videoList.length == 5) {
					$('#picVideoPubBox').find('.video-item .more-btn').show();
				} else {
					$('#picVideoPubBox').find('.video-item .more-btn').hide();
				}
			}

			if(imgList.length == 0 && type == 1) {
				layer.msg("暂无更多数据", {
					icon: 2
				});
				$('#picVideoPubBox').find('.pic-item .more-btn').hide();
			} else if(videoList.length == 0 && type == 2) {
				layer.msg("暂无更多数据", {
					icon: 2
				});
				$('#picVideoPubBox').find('.video-item .more-btn').hide();
			}
		}
	});
}

//视频相关
function close1() {
	var v = document.getElementById('video'); //获取视频节点
	$('.videos').hide(); //点击关闭按钮关闭暂停视频
	v.pause();
	$('.videos').html();
}

function videoPlay(ele) {
	window.event ? window.event.cancelBubble = true : e.stopPropagation();
	var img = $(ele).parent().attr('vpath'); //获取视频预览图
	var video = $(ele).parent().attr('ipath'); //获取视频路径
	$('.videos').html("<video id=\"video\" poster='" + img + "' style='width: 640px' src='" + video + "' preload=\"auto\" controls=\"controls\" autoplay=\"autoplay\"></video><img onClick=\"close1()\" class=\"vclose\" src=\"../images/gb.png\" width=\"25\" height=\"25\">");
	$('.videos').show();
}




// 选择设备类型事件（下拉事件）
function loadDataByDeviceTypeAndFloor(productCode, floorId) {
    var _data = {
        deviceFloor: floorId,
        productCode: productCode,
        pageSize: 9999999
    };
    $.sanjiGetJSON(deviceServiceUrl + "/devicemanger/list", _data, function (res) {
        console.info(res);
        appendToFloor(res.data.list);
    });
}

function appendToFloor(data){
    	var proportion1 = 1/proportion
    	console.info(proportion1)
		if(data.length > 0) {
			for(var k = 0; k < data.length; k++) {
				if(data[k].typeIcon == null) {
					data[k].typeIcon = "img/exhibition/device_eg.png"
				}
				var typeClass = "controlShowa" + data[k].productCode
				let parm = data[k].deviceAlias + "|" + data[k].typeName + "|" + data[k].deviceState + "|" + data[k].deviceMac
				$('<img class="controlNone ' + typeClass + '"  style="width: 0.22rem;height: 0.22rem;position: absolute;left: ' + (data[k].devicex)*proportion1 + 'px;top: ' + (data[k].devicey)*proportion1 + 'px" src="' + data[k].typeIcon + '"' + "onclick='openTip(\"" + parm + "\")'/>").appendTo("#floor-item");
			}

		}
	}
    
    function openTip(parm) {
		var data1 = parm.split("|")
		var infoData = {
			deviceAlias: data1[0],
			typeName: data1[1],
			deviceState: data1[2],
			deviceMac: data1[3]
		};

		var infoHtml = template("deviceInfo", infoData);
		var infoLayer = layer.open({
			type: 1,
			title: '详情',
			area: ['6.5rem', 'auto'],
			resize: false,
			offset: 'auto',
			content: infoHtml
		});
	}