let proportion;
let orgName="";
var ___productCode = ""; // 设备类型码
var ___floorId = ""; // 楼层id
$(function() {
	//获取url参数
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for(var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if(pair[0] == variable) {
				return pair[1];
			}
		}
		return(false);
	}

	//设备状态
	let z_orgId = getQueryVariable('z_orgId');

	let code = "00047701";

	function reqDeviceList() {
		let url = deviceServiceUrl + "/devicemanger/list?token=" + $.getToken() + '&organizationId=' + z_orgId + '&noproductCode=' + code;
		$.ajax({
			type: "GET", //提交方式
			url: encodeURI(url), //路径
			datatype: 'json',
			contentType: "application/json",
			success: function(res) { //返回数据根据结果进行相应的处理
				if(res.code === 0) {
					var eachDevice = template("eachDevice", res.data);
					var new_list_device2 = document.getElementById("new_list_device2");
					new_list_device2.innerHTML = eachDevice;
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
					var new_list_mode2 = document.getElementById("new_list_mode2");
					new_list_mode2.innerHTML = eachMode;
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

	//获取楼层图
	function getFloorList(floorId) {
		$.ajax({
			type: "GET", //提交方式
			url: userServiceUrl + "/organizationFloor/list?token=" + $.getToken() + '&organizationId=' + z_orgId + '&id=' + floorId, //路径
			datatype: 'json',
			contentType: "application/json",
			success: function(res) { //返回数据根据结果进行相应的处理
				var widthScale;
				var heightScale;
				var scale;
				if(res.code === 0) {
					let data = res.data;
					if(data.list.length > 0) {
						let svgHtml = data.list[0].imgSvg;
						let itemWidth = document.getElementById('floor-box').clientWidth;
						let itemHeight = document.getElementById('floor-box').clientHeight;

						widthScale = (data.list[0].width * 1) / (itemWidth * 1);
						heightScale = (data.list[0].height * 1) / (itemHeight * 1);

						if(widthScale > heightScale) {
							scale = widthScale;
						} else {
							scale = heightScale;
						}

						let boxHeight = (data.list[0].height * 1) / scale;
						let boxWidth = (data.list[0].width * 1) / scale;

						$.ajax({
							cache: true,
							type: "get",
							url: userServiceUrl + "/organizationFloorBooth/list?token=" + $.getToken() + '&floorId=' + floorId, //路径
							async: false,
							success: function(res) {
								if(res.code === 0) {
									//展位企业信息
									dataList = res.data.list;
									//渲染svg
									$('#floor-item').html('').append(svgHtml);
									$('#floor-item').find('svg').css({
										'width': boxWidth,
										'height': boxHeight
									});

									getDevice(floorId);
									loadDataByDeviceTypeAndFloor(___productCode, ___floorId);

									//鼠标移上展位高亮
									$('#floor-item').find('svg .cls-1').hover(function() {
										//										$(this).css('fill', '#0061A3');
										$(this).attr('class', 'cls-1 select-color');
									}, function() {
										//										$(this).css('fill', '#231815');
										$(this).attr('class', 'cls-1');
									});
									for(let i = 0, length = dataList.length; i < length; i++) {
										let areaIndex = dataList[i].boothImage;
										dataList[i].z_orgId = z_orgId;
										let dataValue = JSON.stringify(dataList[i]);
										$('#floor-item').find('.cls-1').eq(areaIndex).attr('data-value', dataValue);
									}
									$('#floor-item').find('svg .cls-1').click(function() {
										//										$(this).css('fill', '#0061A3');
										let value = $(this).attr('data-value');

										if(value) {
											value = JSON.parse(value);
											if(value.enterpriseId) {
												value.orgId = z_orgId;
												get_canvas(event);
												$('#tipPos').remove();
												let html = template("company_area_tip", value);
												$('#floor-item').append(html);
											} else {
												layer.msg("该展位暂未绑定企业", {
													icon: 5
												});
											}

											//											$('#tipPos').css({
											//												'top': offsetY,
											//												'left': offsetX
											//											})
										} else {
											layer.msg("该区域暂未创建展区", {
												icon: 5
											});
										}
										$(document).bind("click", function(e) {
											var con_one = $("#floor-item"); //设置目标区域
											if(!con_one.is(e.target) && con_one.has(e.target).length === 0) {
												$("#tipPos").hide(); //需要隐藏的元素
											}
										});
									});
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

	//当前点击位置坐标
	function get_canvas(ev) {

		offsetX = ev.offsetX;
		offsetY = ev.offsetY;

		console.log("当前坐标：X：" + offsetX + " ,Y：" + offsetY)
		return offsetX, offsetY;
	}

	//楼层下拉框
	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/organizationFloor/list?token=" + $.getToken() + '&organizationId=' + z_orgId,
		async: false,
		success: function(data) {
			if(data.code === 0) {
				let list = data.data.list;
				for(let i = 0; i < list.length; i++) {
					if(i == 0) {
						$("#cd-dropdown2").append("<option value=" + list[i].id + " selected='selected'>" + list[i].name + "</option>");
						loadDataByDeviceTypeAndFloor(___productCode, list[i].id);
					} else {
						$("#cd-dropdown2").append("<option value=" + list[i].id + ">" + list[i].name + "</option>");
					}
				}
			}
		},
		error: function(errorMsg) {
			console.info("楼层统计数据加载失败啦!");
		}
	});

	$('#cd-dropdown2').dropdown({
		gutter: 2
	});
	//  $(".floor-select .cd-dropdown > ul").css("max-height","400px")
	//	 $(".floor-select .cd-dropdown > ul").css("overflow","auto")
	const liNodes2 = document.querySelectorAll('.floor-select .cd-dropdown > ul > li');
	for(let z = 0; z < liNodes2.length; z++) {
		liNodes2[z].index = z;
		liNodes2[0].flag = true;
		liNodes2[z].onclick = function() {
			___floorId = this.dataset.value
			getFloorList(___floorId);
			// 通过楼层获取设备信息

		}
	}
	$('.floor-select .cd-dropdown > ul > li:first-child').trigger('click');

	function getDevice(floorId) { //查询设备并且初始化
		$.ajax({
			cache: true,
			type: "get",
			url: deviceServiceUrl + "/devicemanger/list",
			async: false,
			data: {
				token: $.getToken(),
				productCode: "0004ab01",
				deviceFloor: floorId
			},
			success: function(data) {
				if(data.code === 0) {
					let list = data.data.list;
					var UWB = [];
					var icon;
					for(let i = 0; i < list.length; i++) {
						icon = document.createElement("i");
						//$(icon).addClass("fa fa-map-marker");
						$(icon).addClass("fa fa-street-view");
						$(icon).attr("id", "uwb" + list[i].serialNum);
						$(icon).css("position", "absolute");
						$(icon).css("color", "red");
						$(icon).html(list[i].deviceAlias);
						$(icon).appendTo("#floor-item");
						$(icon).css("left", "0px");
						$(icon).css("top", "0px");
						UWB.push(list[i].serialNum);
					}
					UWBList = UWB;
				}
			},
			error: function(errorMsg) {
				console.info("楼层UWB设备数据加载失败啦!");
			}
		});
	}

});

$(function() {
	var orgId = getQueryVariable('z_orgId');

	//企业信息板块
	$.ajax({
		type: "get",
		url: userServiceUrl + "/organization/getShowroomInfoData?organizetionId=" + orgId + "&token=" + $.getToken(),
		datatype: 'json',
		contentType: "application/json",
		success: function(data) {
			let original = data.data.list[0];
			let list = original.dataList;
			orgName=original.organizationName;
			$(".exhibition-name").html(original.organizationName);
			$("#info").html(original.onum + "家展示企业，" + original.bnum + "个展示区域，" + original.dnum + "台智能设备");
			for(let i = 1; i <= list.length; i++) {
				let content = "<li>" +
					"<span class=''font-14-bold'>" + i + "</span>" +
					"<div class='company-sign'><img src='" + list[i - 1].logo + "' alt='' /></div>" +
					"<span title='" + list[i - 1].name + "'>" + list[i - 1].name + "</span>" +
					"<span title='" + list[i - 1].deviceNum + "设备（在线）'>" + list[i - 1].deviceNum + "设备（在线）</span>" +
					"<div class='detail-info'><a style='color:#ffffff;' href='enterpriseManagement.html?z_orgId=" + list[i - 1].id + "&parentId=" + orgId + "'>更多》</a></div>" +
					"</li>"
				$("#ulData").append(content);
			}

			//企业信息
			//获得当前<ul>
			//			var $uList = $(".left-two ul");
			//			var timer = null;
			//			if($uList.find('li').length > 4) {
			//				//触摸清空定时器
			//				$uList.hover(
			//					function() {
			//						clearInterval(timer);
			//					},
			//					function() { //离开启动定时器
			//						timer = setInterval(function() {
			//							scrollList($uList);
			//						}, 2000);
			//					}).trigger("mouseleave"); //自动触发触摸事件
			//				//滚动动画
			//				function scrollList(obj) {
			//					//获得当前<li>的高度
			//					var scrollHeight = $("ul li:first").height();
			//					//滚动出一个<li>的高度
			//					$uList.stop().animate({
			//						marginTop: -scrollHeight
			//					}, 600, function() {
			//						//动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
			//						$uList.css({
			//							marginTop: 0
			//						}).find("li:first").appendTo($uList);
			//					});
			//				}
			//			}
		},
		error: function(errorMsg) {
			console.info("展厅信息数据加载失败啦!");
		}
	});
});

function ope(id) {
	window.event ? window.event.cancelBubble = true : e.stopPropagation();
	var conlayer = layer.confirm("是否确认发送控制？", {
		btn: ['确定', '取消']
	}, function() {
		$.postJSON(deviceServiceUrl + "/mode/controlMode?id=" + id, {}, function(data) {
			$.hide_overall_loding();
			if(data.code == 0) {
				layer.close(conlayer);
				layer.msg("成功", {
					icon: 1
				});
				return true;
			}
			layer.msg("操作失败", {
				icon: 2
			});
		});

	}, function() {
		layer.close(conlayer);
	});
}

function openDevice(prm) {
	window.event ? window.event.cancelBubble = true : e.stopPropagation();
	console.info(prm)
	var prms = prm.split(',')
	var pdata = {
		"typeId": prms[0],
		"templateType": 2
	}
	var templateCode;
	var templateId;
	$.ajax({ //查询控制模板
		url: addToUrlToken(deviceServiceUrl + "/typeTemplate/getDefaultTemp"),
		type: "get",
		contentType: "application/json",
		dataType: "json",
		timeout: 10000,
		async: false,
		data: pdata,
		success: function(data) {
			if(data.code == 0) {
				templateCode = data.data.templateCode
				templateId = data.data.id
				var json = {
					"account": prms[1],
					"productId": prms[0],
					"serial_num": prms[2],
					"token": $.getToken(),
					"url": deviceServiceUrl + "/device/controlDervice_s",
					"operation": "",
					"controlParams": ""
				}
				var array = [];
				$.ajax({ //查询模板配置
					url: addToUrlToken(deviceServiceUrl + "/templateconfig/list"),
					type: "get",
					contentType: "application/json",
					dataType: "json",
					timeout: 10000,
					async: false,
					data: {
						templateId: templateId
					},
					success: function(data) {
						if(data.code == 0) {
							for(var i = 0; i < data.data.list.length; i++) {
								array.push(data.data.list[i].tcValue)
							}
						}

					},
					error: function() {}
				});

				var area1;
				if(data.data.typeId == "00046301") {
					area1 = ['600px', '600px']
				} else {
					area1 = ['1150px', '620px']
				}

				var lay = layer.open({
					title: "控制",
					type: 1,
					area: area1,
					fixed: false, //不固定
					maxmin: true,
					content: '<iframe id="Example1" style="width: 100%;height: 600px;" title="Example2"  frameborder="0" src=""></iframe>',
					success: function() {
						document.getElementById("Example1").srcdoc = templateCode
						$("#Example1").load(function() {
							$("#Example1")[0].contentWindow.getField("false", array, json);
						});

					}
				});
			} else {
				layer.msg("没有对应的控制模版，需要去分类管理去设置模版！", {
					icon: 2
				});
				return;
			}
		},
		error: function() {}
	});
}

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
						document.getElementById("co2").innerHTML = resData.list[0].coTwo ? resData.list[0].coTwo + " " + 'ppm' : '-';
						document.getElementById("formaldehyde").innerHTML = resData.list[0].hcho ? resData.list[0].hcho + " " + 'ppb' : '-';
						document.getElementById("voc").innerHTML = resData.list[0].voc ? resData.list[0].voc + " " + 'ppb' : '-';
						document.getElementById("temperature").innerHTML = temperatureNum ? temperatureNum + " " + '℃' : '-';
						document.getElementById("humidity").innerHTML = humidityNum ? humidityNum + " " + '%RH' : '-';
						document.getElementById("pm25").innerHTML = pm25 ? pm25 + " " + 'μg/m³' : '-';
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
	getComsumeTotal("month");
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
				getComsumeTotal("day");
			} else {
				energySwitchStatus = true;
				getComsumeTotal("month");
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
						// 	if(deviceStateList[i].deviceState == 2) {
						// 	deviceTypeTwo = deviceStateList[i].count;
						// } else
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

	function initPieCharts2(id, count1, count2, color1, color2) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			title: {
				text: count1,
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

	// initPieCharts3('echarts8', 90, 10, '#4AFEA3', '#165959');
	// initPieCharts3('echarts9', 10, 90, '#C8C8C8', '#3A4966');
	// initPieCharts3('echarts10', 90, 10, '#4CA7FD', '#174178');
	// initPieCharts3('echarts11', 8, 92, '#C70821', '#623940');
	// initPieCharts3('echarts12', 2, 98, '#F1E600', '#49542B');
	//
	// function initPieCharts3(id, count1, count2, color1, color2) {
	// 	var myChart = echarts.init(document.getElementById(id));
	// 	var option = {
	// 		title: {
	// 			text: count1+'%',
	// 			x: 'center',
	// 			y: 'center',
	// 			itemGap: 60,
	// 			textStyle: {
	// 				color: '#ffffff',
	// 				fontFamily: 'orbitronBold',
	// 				fontSize: fontSize(0.12)
	// 			}
	// 		},
	// 		series: [{
	// 			type: 'pie',
	// 			clockWise: false,
	// 			radius: ['80%', '100%'],
	// 			hoverAnimation: false,
	// 			itemStyle: {
	// 				normal: {
	// 					label: {
	// 						show: false
	// 					},
	// 					labelLine: {
	// 						show: false
	// 					}
	// 				},
	// 			},
	// 			data: [{
	// 					value: count1,
	// 					name: '',
	// 					itemStyle: {
	// 						color: color1
	// 					}
	// 				},
	// 				{
	// 					value: count2,
	// 					name: '',
	// 					itemStyle: {
	// 						color: color2
	// 					}
	// 				}
	// 			]
	// 		}]
	// 	};
	// 	myChart.setOption(option);
	// }

	$(function() {
		//		$("#echarts1").contents().css("width", "0.8rem");
		//		$("#echarts1").contents().css("height", "0.8rem");
		//		$("#echarts1").contents().contents().css("width", "0.8rem");
		//		$("#echarts1").contents().contents().css("height", "0.8rem");

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

		$("#echarts8").contents().css("width", "0.6rem");
		$("#echarts8").contents().css("height", "0.6rem");
		$("#echarts8").contents().contents().css("width", "0.6rem");
		$("#echarts8").contents().contents().css("height", "0.6rem");
		$("#echarts9").contents().css("width", "0.6rem");
		$("#echarts9").contents().css("height", "0.6rem");
		$("#echarts9").contents().contents().css("width", "0.6rem");
		$("#echarts9").contents().contents().css("height", "0.6rem");
		$("#echarts10").contents().css("width", "0.6rem");
		$("#echarts10").contents().css("height", "0.6rem");
		$("#echarts10").contents().contents().css("width", "0.6rem");
		$("#echarts10").contents().contents().css("height", "0.6rem");
		$("#echarts11").contents().css("width", "0.6rem");
		$("#echarts11").contents().css("height", "0.6rem");
		$("#echarts11").contents().contents().css("width", "0.6rem");
		$("#echarts11").contents().contents().css("height", "0.6rem");
		$("#echarts12").contents().css("width", "0.6rem");
		$("#echarts12").contents().css("height", "0.6rem");
		$("#echarts12").contents().contents().css("width", "0.6rem");
		$("#echarts12").contents().contents().css("height", "0.6rem");
	});

	//设备类型下拉框
	$.ajax({
		cache: true,
		type: "get",
		url: addToUrlToken(deviceServiceUrl + "/deviceType/list"),
		data: {
			pageSize: 999999
		},
		async: false,
		success: function(data) {
			console.info(data);
			if(data.code === 0) {
				let list = data.data.list;
				for(let i = 0; i < list.length; i++) {
					$("#cd-dropdown").append("<option value=" + list[i].productCode + " class='icon-small-sprite' data-bac-uri='background: url(" + list[i].typeIcon + ") no-repeat;background-position: center;' >" + list[i].typeName + "</option>");
				}

			}
		},
		error: function(errorMsg) {
			console.info("加载失败啦!");
		}
	});

	//设备下拉选项框
	$('#cd-dropdown').dropdown({
		gutter: 2
	});
	const liNodes = document.querySelectorAll('.select-bar .cd-dropdown > ul > li')
	for(let z = 0; z < liNodes.length; z++) {
		liNodes[z].index = z;
		liNodes[0].flag = true;
		liNodes[z].onclick = function() {
			___productCode = this.dataset.value;
			// 通过楼层获取设备信息
			var product = ".controlShowa" + ___productCode
			if(___productCode != 0) {
				$(".controlNone").css("display", "none")
				$(product).css("display", "block")
			} else {
				loadDataByDeviceTypeAndFloor(___productCode, ___floorId);
			}

		}
	}

	// 解决bootstrap下拉插件高度的问题
	var __dropdownFlag1 = true;
	var __dropdownFlag2 = true;
	$('.cd-dropdown > ul').hide();
	$($('.cd-dropdown')[0]).click(function() {
		if(__dropdownFlag1) {
			$($('.cd-dropdown > ul')[0]).css("height", "350px");
			$($('.cd-dropdown > ul')[0]).css("overflow", "auto");
			$($('.cd-dropdown > ul')[0]).show();
			__dropdownFlag1 = false;
		} else {
			$($('.cd-dropdown > ul')[0]).css("height", "0");
			$($('.cd-dropdown > ul')[0]).css("overflow", "auto");
			$($('.cd-dropdown > ul')[0]).hide();
			__dropdownFlag1 = true;
		}
	});
	$($('.cd-dropdown')[1]).click(function() {
		if(__dropdownFlag2) {
			$($('.cd-dropdown > ul')[1]).show();
			__dropdownFlag2 = false;
		} else {
			$($('.cd-dropdown > ul')[1]).hide();
			__dropdownFlag2 = true;
		}
	});

	//	设备列表滚动
	$(function() {
		//获得当前<ul>
		var $uList1 = $(".device-list-box1 ul");

		$('.center-one .left-btn').on('click', function() {
			scrollList($uList1, 'left');
		});

		$('.center-one .right-btn').on('click', function() {
			scrollList($uList1, 'right');
		});

		var $uList2 = $(".device-list-box2 ul");
		$('.right-two .left-btn').on('click', function() {
			scrollList($uList2, 'left');
		});

		$('.right-two .right-btn').on('click', function() {
			scrollList($uList2, 'right');
		});

		var $uList3 = $(".area-img-box ul");
		$('.area-img-box .left-btn').on('click', function() {
			scrollList($uList3, 'left');
		});

		$('.area-img-box .right-btn').on('click', function() {
			scrollList($uList3, 'right');
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

	//设备控制弹框相关操作

	//LED屏
	$('.tip-box-close').on('click', function() {
		$(this).parents().find('.mask').remove();
	});

})

function scrollList(obj, direction) {
	//获得当前<li>的高度
	var scrollWidth = $("ul li:first").width();
	//滚动出一个<li>的高度
	if(direction == 'right') {
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
	$('#orgName').text("展馆设备智控平台("+orgName+")");
    //智控平台

	$('.modeControl').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
			$('.company-control-item').fadeOut();
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(90deg)',
				'-ms-transform': 'rotate(90deg)',
				'-webkit-transform': 'rotate(90deg)'
			});
			$(this).find('.mode-list-box').fadeIn();
			$('.company-control-item').fadeOut();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).siblings().find('.mode-list-box').fadeOut();

			let modeReqUrl = deviceServiceUrl + "/mode/getModeList?token=" + $.getToken() + '&states=1&id=' + z_orgId;
			getContent('mode', modeReqUrl);

			getModeList($('#modeList'));
		}
	});

	if(activeType == 'mode') {
		$('.modeControl').trigger('click');
	}

	$('.deviceControl').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
			$('.company-control-item').fadeOut();
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(90deg)',
				'-ms-transform': 'rotate(90deg)',
				'-webkit-transform': 'rotate(90deg)'
			});
			$(this).find('.mode-list-box').fadeIn();
			$('.company-control-item').fadeOut();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).siblings().find('.mode-list-box').fadeOut();

			let deviceRqUrl = deviceServiceUrl + "/devicemanger/getDeviceAndEnterprise?token=" + $.getToken() + '&organizationId=' + z_orgId;
			getContent('device', deviceRqUrl);

			getDeviceList($('#deviceList'));

		}
	});

	if(activeType == 'device') {
		$('.deviceControl').trigger('click');
	}

	$('.infoPub').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
			$('.company-control-item').fadeOut();
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(90deg)',
				'-ms-transform': 'rotate(90deg)',
				'-webkit-transform': 'rotate(90deg)'
			});
			$(this).find('.mode-list-box').fadeIn();
			$('.company-control-item').fadeOut();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).siblings().find('.mode-list-box').fadeOut();

			let infoReqUrl = deviceServiceUrl + "/ipushlog/getInformationAndLog?token=" + $.getToken() + '&organizationId=' + z_orgId + "&productCode=00047701" + "&isOrg=123";
			getContent('info', infoReqUrl);

			getInfoList($('#infoList'));
		}
	});

	$('.pcControl').click(function() {
		if($(this).find('.operate-item-name').hasClass('list-on')) {
			$(this).find('.operate-item-name').removeClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).find('.mode-list-box').fadeOut();

			$('#content_list').html('');
			$('.company-control-item').fadeOut();
		} else {
			$(this).find('.operate-item-name').addClass('list-on');
			$(this).find('.operate-item-arrow').css({
				'transform': 'rotate(90deg)',
				'-ms-transform': 'rotate(90deg)',
				'-webkit-transform': 'rotate(90deg)'
			});
			$(this).find('.mode-list-box').fadeIn();
			$('.company-control-item').fadeOut();

			$(this).siblings().find('.operate-item-name').removeClass('list-on');
			$(this).siblings().find('.operate-item-arrow').css({
				'transform': 'rotate(0deg)',
				'-ms-transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			$(this).siblings().find('.mode-list-box').fadeOut();

			let PCReqUrl = deviceServiceUrl + "/windowscontrol/getWindowsAndEnterprise?token=" + $.getToken() + '&organizationId=' + z_orgId;
			getContent('PC', PCReqUrl);

			getpcList($('#pcList'));
		}
	});

	if(activeType == 'PC') {
		$('.pcControl').trigger('click');
	}
}

//获取当前展厅模式列表
function getModeList(ele) {
	let url = deviceServiceUrl + "/mode/getModeList?token=" + $.getToken() + '&states=0&id=' + z_orgId;
	$.ajax({
		type: "GET", //提交方式
		url: encodeURI(url), //路径
		datatype: 'json',
		contentType: "application/json",
		success: function(res) { //返回数据根据结果进行相应的处理
			if(res.code === 0) {
				let modeHtml = template("mode_template", res.data.list[0].orgModeList);
				ele.html(modeHtml);

			} else {
				console.log('请求错误')
			}
		},
		error: function() {
			console.log('请求错误')
		}
	});
}

//获取当前展厅设备信息列表
function getDeviceList(ele) {
	let url = deviceServiceUrl + "/devicemanger/getDeviceByOrg?token=" + $.getToken() + '&organizationId=' + z_orgId;
	$.ajax({
		type: "GET", //提交方式
		url: encodeURI(url), //路径
		datatype: 'json',
		contentType: "application/json",
		success: function(res) { //返回数据根据结果进行相应的处理
			if(res.code === 0) {
				if(res.data.length > 0) {
					let value = {
						'deviceList': res.data
					}
					let modeHtml = template("device_list_template", value);
					ele.html(modeHtml);
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

//获取当前展厅设备信息发布列表
function getInfoList(ele) {
	let url = deviceServiceUrl + "/ipushlog/getInformationAndLogOrg?token=" + $.getToken() + '&organizationId=' + z_orgId + "&productCode=00047701" + "&isOrg=123";
	$.ajax({
		type: "GET", //提交方式
		url: encodeURI(url), //路径
		datatype: 'json',
		contentType: "application/json",
		success: function(res) { //返回数据根据结果进行相应的处理
			if(res.code === 0) {
				if(res.data.length > 0) {
					let value = {
						'infoList': res.data
					}
					let modeHtml = template("info_list_template", value);
					ele.html(modeHtml);
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

//获取当前展厅PC电脑列表
function getpcList(ele) {
	let url = deviceServiceUrl + "/windowscontrol/getWindowsByOrg?token=" + $.getToken() + '&organizationId=' + z_orgId;
	$.ajax({
		type: "GET", //提交方式
		url: encodeURI(url), //路径
		datatype: 'json',
		contentType: "application/json",
		success: function(res) { //返回数据根据结果进行相应的处理
			if(res.code === 0) {
				if(res.data.length > 0) {
					let value = {
						'pcList': res.data
					}
					let modeHtml = template("pc_list_template", value);
					ele.html(modeHtml);
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
					//					let modeArr = [];
					//					$.each(data, function(i, val) {
					//						let arrItem = {};
					//						arrItem.name = i;
					//						arrItem.device = [];
					//						for(let j = 0, len = val.length; j < len; j++) {
					//							arrItem.device.push(val[j]);
					//						}
					//						deviceArr.push(arrItem);
					//					});
					//					let deviceData = {
					//						'deviceArr': deviceArr,
					//					}

					//右侧内容样板
					let deviceHtml = template("rightMode_template", res.data.list[0]);
					$('#content_list').html(deviceHtml);

					$('.open-control-item').on('click', function() {
						$('.company-control-item').fadeIn();
						let modalValue = $(this).attr('data-value');
						let name = $(this).attr('data-name');
						let modalData = {
							'name': name,
							'modalValue': JSON.parse(modalValue).modeList
						}
						let modalHtml = template("modal_mode_template", modalData);
						$('.company-control-item').html(modalHtml);
						$('.control-item-exit').on('click', function() {
							$('.company-control-item').fadeOut();
						});
					});

					//					let deviceHtml = template("rightDevice_template", deviceData);
					//					$('#content_list').html(deviceHtml);
					//
					//					$('.open-control-item').on('click', function() {
					//						$('.company-control-item').fadeIn();
					//						let modalValue = $(this).attr('data-value');
					//						let modalHtml = template("modal_device_template", JSON.parse(modalValue));
					//						$('.company-control-item').html(modalHtml);
					//						$('.control-item-exit').on('click', function() {
					//							$('.company-control-item').fadeOut();
					//						});
					//					});
				} else if(type == 'device') {
					let deviceArr = [];
					$.each(data, function(i, val) {
						let arrItem = {};
						arrItem.name = i;
						arrItem.device = [];
						for(let j = 0, len = val.length; j < len; j++) {
							arrItem.device.push(val[j]);
						}
						deviceArr.push(arrItem);
					});
					let deviceData = {
						'deviceArr': deviceArr,
					}
					let deviceHtml = template("rightDevice_template", deviceData);
					$('#content_list').html(deviceHtml);

					$('.open-control-item').on('click', function() {
						$('.company-control-item').fadeIn();
						let modalValue = $(this).attr('data-value');
						let modalHtml = template("modal_device_template", JSON.parse(modalValue));
						$('.company-control-item').html(modalHtml);
						$('.control-item-exit').on('click', function() {
							$('.company-control-item').fadeOut();
						});
					});
				} else if(type == 'info') {
					let infoArr = [];
					$.each(data, function(i, val) {
						let arrItem = {};
						arrItem.name = i;
						arrItem.device = [];
						for(let j = 0, len = val.length; j < len; j++) {
							arrItem.device.push(val[j]);
						}
						infoArr.push(arrItem);
					});
					let iinfoData = {
						'infoArr': infoArr
					}
					let infoHtml = template("rightInfo_template", iinfoData);
					$('#content_list').html(infoHtml);

					$('.open-control-item').on('click', function() {
						$('.company-control-item').fadeIn();
						let modalValue = $(this).attr('data-value');
						let modalData = JSON.parse(modalValue);
						let modalHtml = template("modal_info_template", modalData);
						$('.company-control-item').html(modalHtml);
						$('.control-item-exit').on('click', function() {
							$('.company-control-item').fadeOut();
						});
					});
				} else if(type == 'PC') {
					let winArr = [];
					$.each(data, function(i, val) {
						let arrItem = {};
						arrItem.name = i;
						arrItem.device = [];
						for(let j = 0, len = val.length; j < len; j++) {
							arrItem.device.push(val[j]);
						}
						winArr.push(arrItem);
					});
					let winData = {
						'winArr': winArr,
					}
					let winHtml = template("rightWin_template", winData);
					$('#content_list').html(winHtml);

					$('.open-control-item').on('click', function() {
						$('.company-control-item').fadeIn();
						let winValue = $(this).attr('data-value');
						let modalHtml = template("win_info_template", JSON.parse(winValue));
						$('.company-control-item').html(modalHtml);
						$('.control-item-exit').on('click', function() {
							$('.company-control-item').fadeOut();
						});
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

//信息发布操作
//图片、视频管理
var picPage = 1,
	videoPage = 1;

//图片、视频管理弹框
function picVideoPub(e) {
	window.event ? window.event.cancelBubble = true : e.stopPropagation();
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
			if(type == 2) {
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
	if(e.lengthComputable) {
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
	if(imagePath == "") {
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
			xhr: function() { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数

				myXhr = $.ajaxSettings.xhr();
				if(myXhr.upload) { //检查upload属性是否存在
					//绑定progress事件的回调函数
					myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
				}
				return myXhr; //xhr对象返回给jQuery使用
			},
			success: function(res) {
				//						$.hide_overall_loding();
				if(res.code == 0) {
					let virePath = res.data.filePath;
					$(ele).parent().parent().find('.upfile-box img').attr('src', virePath);
				} else {
					layer.msg("操作失败", {
						icon: 2
					});
				}
			},
			fail: function() {
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
	if(imagePath == "") {
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
			xhr: function() { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数

				myXhr = $.ajaxSettings.xhr();
				if(myXhr.upload) { //检查upload属性是否存在
					//绑定progress事件的回调函数
					myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
				}
				return myXhr; //xhr对象返回给jQuery使用
			},
			success: function(res) {
				//						$.hide_overall_loding();
				if(res.code == 0) {
					let virePath = res.data.filePath;
					$(ele).parent().parent().find('.videolist').attr('ipath', virePath);
				} else {
					layer.msg("操作失败", {
						icon: 2
					});
				}
			},
			fail: function() {
				layer.msg("操作失败", {
					icon: 2
				});
			}
		})
	}
}

function upLoadFileAll(data, ele) {
	$.postJSON(deviceServiceUrl + "/videoRe", data, function(data) {
		$.hide_overall_loding();
		layer.close(ele);
		if(data.code == 0) {
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
			if(data.code == 401000) {
				parent.layer.msg(data.message, {
					icon: 5
				});
			} else if(data.messages != null) {
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