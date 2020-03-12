$(function() {
	$('#cd-dropdown').dropdown({
		gutter: 2
	});
	const liNodes1 = document.querySelectorAll('.select-bar .cd-dropdown > ul > li')
	for(let z = 0; z < liNodes1.length; z++) {
		liNodes1[z].index = z
		liNodes1[0].flag = true
		liNodes1[z].onclick = function() {
			var value = this.dataset.value
			if(value == 0) {
				$(".controlNone").css("display", "block");
			} else {
				var controlShow = ".controlShow" + value

				$(".controlNone").css("display", "none");
				$(controlShow).css("display", "block");
			}
		}
	}

	$('#dropdown2').dropdown({
		gutter: 2
	});
	const liNodes2 = document.querySelectorAll('.floor-select .cd-dropdown > ul > li')
	for(let z = 0; z < liNodes2.length; z++) {
		liNodes2[z].index = z
		liNodes2[0].flag = true
		liNodes2[z].onclick = function() {

			var value = this.dataset.value
			arr = value.split("|");
			$('#floorPic').attr("src", arr[0])
			$("#floorDiv .controlNone").remove()

			$.ajax({
				type: "GET", //提交方式
				url: deviceServiceUrl + "/device/list",
				async: false,
				data: {
					token: $.getToken(),
					deviceFloor: arr[1]
				},
				success: function(result) {
					var data = result.data.list

					if(result.data.total > 0) {
						for(var k = 0; k < data.length; k++) {
							if(data[k].typeIcon == null) {
								data[k].typeIcon = "../images/front_page/branch/switch_on.png"
							}
							var typeClass = "controlShowa" + data[k].productCode
							let parm = data[k].deviceName + "|" + data[k].typeName + "|" + data[k].deviceState + "|" + data[k].deviceMac
							$('<img class="controlNone ' + typeClass + '"  style="width: 0.22rem;height: 0.22rem;position: absolute;color: red;left: ' + data[k].deviceX + 'px;top: ' + data[k].deviceY + 'px" src="' + data[k].typeIcon + '"' + "onclick='openTip(\"" + parm + "\")'/>").appendTo("#floorDiv");
						}

					}
				}

			})
		}
	}

	getTHDevice();
	setInterval(function () {
		getTHDevice();
	},1000*60*6)

	function getTHDevice() {
		$.get(deviceServiceUrl + "/device/getTHList?token=" + $.getToken() + "&organizationId=" + organizationId, function(resData) {
			if(resData.code == 0) {
				if(resData.data != null && resData.data.length != 0) {
					vm.airQualityDevice = resData.data;
					showPMByDeviceId(resData.data[0].id, resData.data[0].isLora);
				} else {
					initguageCharts('echarts3', 0, -50, 50);
					initguageCharts('echarts4', 0, 0, 100);
				}
			}
		});
	}

	$("#airDevice").change(function() {
		let deviceId = $("#airDevice").val();
		let deviceIds = deviceId.split(",");
		showPMByDeviceId(deviceIds[0], deviceIds[1]);
	})

	function showPMByDeviceId(deviceId, isLora) {
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
					if(resData == null || resData.length == 0) {
						$('.item>span').removeClass('bac-red').removeClass('bac-red-linear');
						document.getElementById("wendu").innerHTML = "";
						document.getElementById("shidu").innerHTML = "";
						initguageCharts('echarts3', 0, -50, 50);
						initguageCharts('echarts4', 0, 0, 100);

						document.getElementById("co2").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("pressure").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("formaldehyde").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("o2").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("co").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("voc").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("illumination").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("smoke").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("methane").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("temperature").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("noise").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("humidity").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("pm25").innerHTML = "-" + " " + '<span class="unit"></span>';
						document.getElementById("pm10").innerHTML = "-" + " " + '<span class="unit"></span>';
					} else {
						$('.item>span').removeClass('bac-red').removeClass('bac-red-linear');
						let temperatureNum = 0;
						let humidityNum = 0;
						if(isLora == 1) {
							temperatureNum = resData.list[0].temperatureNum / 100;
							humidityNum = resData.list[0].humidityNum / 100;
							document.getElementById("co2").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("pressure").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("formaldehyde").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("o2").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("co").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("voc").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("illumination").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("smoke").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("methane").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("temperature").innerHTML = temperatureNum + " " + '<span class="unit">℃</span>';
							document.getElementById("noise").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("humidity").innerHTML = humidityNum + " " + '<span class="unit">%RH</span>';
							document.getElementById("pm25").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("pm10").innerHTML = "-" + " " + '<span class="unit"></span>';
							document.getElementById("wendu").innerHTML = temperatureNum + "℃";
							document.getElementById("shidu").innerHTML = humidityNum + "%";
							initguageCharts('echarts3', temperatureNum, -50, 50);
							initguageCharts('echarts4', humidityNum, 0, 100);

							$.ajax({
								type: "get",
								url: deviceServiceUrl + "/airQuality/list",
								data: {
									token:$.getToken(),
									organizationId: organizationId
								},
								success: function(res) {
									var standardData=res.data.list[0];
									if(resData.list[0].temperatureNum*1>standardData.temperature*1){
										$('#temperature').parent().next().addClass('bac-red');
									}else{
										$('#temperature').parent().next().removeClass('bac-red');
									}

									if(resData.list[0].humidityNum*1>standardData.humidity*1){
										$('#humidity').parent().next().addClass('bac-red');
									}else{
										$('#humidity').parent().next().removeClass('bac-red');
									}
								}
							})
						} else {
							temperatureNum = parseInt(resData.list[0].temperatureNum) / 10;
							humidityNum = parseInt(resData.list[0].humidityNum) / 10;
							let pm25 = resData.list[0].pmTwoPointFive;
							let pm10 = resData.list[0].pmTen;
							document.getElementById("co2").innerHTML = resData.list[0].coTwo + " " + '<span class="unit">ppm</span>';
							document.getElementById("pressure").innerHTML = resData.list[0].pressure + " " + '<span class="unit">hpa</span>';
							document.getElementById("formaldehyde").innerHTML = resData.list[0].hcho + " " + '<span class="unit">mg/m³</span>';
							document.getElementById("o2").innerHTML = resData.list[0].otwo + " " + '<span class="unit">%vol</span>';
							document.getElementById("co").innerHTML = resData.list[0].coOne + " " + '<span class="unit">ppm</span>';
							document.getElementById("voc").innerHTML = resData.list[0].voc + " " + '<span class="unit">ppm</span>';
							document.getElementById("illumination").innerHTML = resData.list[0].beam + " " + '<span class="unit">lux</span>';
							document.getElementById("smoke").innerHTML = resData.list[0].smog + " " + '<span class="unit">ppm</span>';
							document.getElementById("methane").innerHTML = resData.list[0].chFour + " " + '<span class="unit">%LEL</span>';
							document.getElementById("temperature").innerHTML = temperatureNum + " " + '<span class="unit">℃</span>';
							document.getElementById("noise").innerHTML = resData.list[0].noise + " " + '<span class="unit">dB</span>';
							document.getElementById("humidity").innerHTML = humidityNum + " " + '<span class="unit">%RH</span>';
							document.getElementById("pm25").innerHTML = pm25 + " " + '<span class="unit">μg/m³</span>';
							document.getElementById("pm10").innerHTML = pm10 + " " + '<span class="unit">μg/m³</span>';
							document.getElementById("wendu").innerHTML = temperatureNum + "℃";
							document.getElementById("shidu").innerHTML = humidityNum + "%";
							initguageCharts('echarts3', temperatureNum, -50, 50);
							initguageCharts('echarts4', humidityNum, 0, 100);
							$.ajax({
								type: "get",
								url: deviceServiceUrl + "/airQuality/list",
								data: {
									token:$.getToken(),
									organizationId: organizationId
								},
								success: function(res) {
									var standardData=res.data.list[0];
									if(standardData.coTwo&&resData.list[0].coTwo*1>standardData.coTwo*1){
										$('#co2').parent().next().addClass('bac-red-linear');
									}else{
										$('#co2').parent().next().removeClass('bac-red-linear')
									}

									if(standardData.pressure&&resData.list[0].pressure*1>standardData.pressure*1){
										$('#pressure').parent().next().addClass('bac-red-linear');
									}else{
										$('#pressure').parent().next().removeClass('bac-red-linear');
									}

									if(standardData.hcho&&resData.list[0].hcho*1>standardData.hcho*1){
										$('#formaldehyde').parent().next().addClass('bac-red');
									}else{
										$('#formaldehyde').parent().next().removeClass('bac-red');
									}

									if(standardData.otwo&&resData.list[0].otwo*1>standardData.otwo*1){
										$('#o2').parent().next().addClass('bac-red');
									}else{
										$('#o2').parent().next().removeClass('bac-red');
									}

									if(standardData.coOne&&resData.list[0].coOne*1>standardData.coOne*1){
										$('#co').parent().next().addClass('bac-red');
									}else{
										$('#co').parent().next().removeClass('bac-red');
									}

									if(standardData.voc&&resData.list[0].voc*1>standardData.voc*1){
										$('#voc').parent().next().addClass('bac-red');
									}else{
										$('#voc').parent().next().removeClass('bac-red');
									}

									if(standardData.beam&&resData.list[0].beam*1>standardData.beam*1){
										$('#illumination').parent().next().addClass('bac-red');
									}else{
										$('#illumination').parent().next().removeClass('bac-red');
									}

									if(standardData.smog&&resData.list[0].smog*1>standardData.smog*1){
										$('#smoke').parent().next().addClass('bac-red');
									}else{
										$('#smoke').parent().next().removeClass('bac-red');
									}

									if(standardData.chFour&&resData.list[0].chFour*1>standardData.chFour*1){
										$('#methane').parent().next().addClass('bac-red');
									}else{
										$('#methane').parent().next().removeClass('bac-red');
									}

									if(standardData.temperature&&resData.list[0].temperatureNum*1>standardData.temperature*1){
										$('#temperature').parent().next().addClass('bac-red');
									}else{
										$('#temperature').parent().next().removeClass('bac-red');
									}

									if(standardData.noise&&resData.list[0].noise*1>standardData.noise*1){
										$('#noise').parent().next().addClass('bac-red');
									}else{
										$('#noise').parent().next().removeClass('bac-red');
									}

									if(standardData.humidity&&resData.list[0].humidityNum*1>standardData.humidity*1){
										$('#humidity').parent().next().addClass('bac-red');
									}else{
										$('#humidity').parent().next().removeClass('bac-red');
									}

									if(standardData.pmTwoFive&&resData.list[0].pmTwoPointFive*1>standardData.pmTwoFive*1){
										$('#pm25').parent().next().addClass('bac-red');
									}else{
										$('#pm25').parent().next().removeClass('bac-red');
									}

									if(standardData.pmTem&&resData.list[0].pmTen*1>standardData.pmTem*1){
										$('#pm10').parent().next().addClass('bac-red');
									}else{
										$('#pm10').parent().next().removeClass('bac-red');
									}
								}
							})
						}
					}
				}
			}
		})
	}

	//按天或月获取设备能耗统计
	getComsumeTotal("day");
	let energySwitchStatus = true;
	setInterval(function () {
		if (energySwitchStatus) {
			getComsumeTotal("day");
		}else {
			getComsumeTotal("month");
		}
	},1000*60*20)
	function getComsumeTotal(ymd) {
		$.get(deviceServiceUrl + "/device/getConsumeTotal?token=" + $.getToken() + "&consumeTime=" + ymd + "&organizationId=" + organizationId, function(totalRes) {
			if(totalRes.code == 0) {
				if(totalRes.data == null || totalRes.data.length == 0) {
					initBarCharts('echarts2', [], []);
					vm.consumeTotal = 0;
					vm.consumeByDevice = ["0%", "0%", "0%", "0%", "0%"];
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
				let consumeByDevice = [0, 0, 0, 0, 0]; //空调，照明，招牌，插座，其它
				for(let i = 0; i < totalRes.data.length; i++) {
					let index = dataXList.indexOf(parseInt(totalRes.data[i].consumeTime));
					let consumeFloat = parseFloat(totalRes.data[i].consumeNum / 1000);
					echartDataList[index] += consumeFloat;
					consumeTotal += consumeFloat;
					//获取分类设备耗能总数
					if(totalRes.data[i].devicePositionName == "空调") {
						consumeByDevice[0] += consumeFloat;
					} else if(totalRes.data[i].devicePositionName == "照明") {
						consumeByDevice[1] += consumeFloat;
					} else if(totalRes.data[i].devicePositionName == "招牌") {
						consumeByDevice[2] += consumeFloat;
					} else if(totalRes.data[i].devicePositionName == "插座") {
						consumeByDevice[3] += consumeFloat;
					} else if(totalRes.data[i].devicePositionName == "其它") {
						consumeByDevice[4] += consumeFloat;
					}
				}
				//获取各类设备耗能百分比
				if(consumeTotal == 0) {
					consumeByDevice = ["0%", "0%", "0%", "0%", "0%"];
				} else {
					for(let i = 0; i < consumeByDevice.length; i++) {
						consumeByDevice[i] = Math.round(consumeByDevice[i] / consumeTotal * 10000) / 100.00 + "%";
					}
				}

				vm.consumeTotal = consumeTotal;
				vm.consumeByDevice = consumeByDevice;
				if(ymd == "day") {
					for(let i = 0; i < dataXList.length; i++) {
						dataXList[i] = dataXList[i] + ":00";
					}
				}
				initBarCharts('echarts2', echartDataList, dataXList);
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
						barBorderRadius: [2, 2, 0, 0]
					}
				},
				data: dataList
			}]
		};
		myChart.setOption(option);
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

	function initguageCharts(id, data, min, max) {
		var myChart = echarts.init(document.getElementById(id));
		var option = {
			series: [{
				type: 'gauge',
				radius: '100%',
				min: min,
				max: max,
				axisLine: {
					show: true,
					lineStyle: {
						color: [
							[0.2, '#4AFEA3'],
							[0.8, '#00A2FF'],
							[1, '#CA0821']
						],
						width: 3
					}
				},
				axisLabel: {
					distance: 1,
					textStyle: {
						color: '#999FAA',
						fontSize: fontSize(0.1)
					}
				},
				splitLine: { //分割线样式（及10、20等长线样式）
					length: 10,
					lineStyle: { // 属性lineStyle控制线条样式
						color: 'auto',
						width: 2
					}
				},
				axisTick: {
					length: 6,
					lineStyle: {
						color: 'auto'
					}
				},
				itemStyle: {
					color: '#999FAA'
				},
				pointer: {
					width: 2,
					length: '50%'
				},
				detail: {
					show: false
				},
				data: [{
					value: data
				}]
			}]

		};
		myChart.setOption(option);
	}

	getCameraPic();
	//获取摄像头图片
	function getCameraPic() {
		$.get(deviceServiceUrl + "/camera/getCameraPic", function(resData) {});
	}

	getTotalDevices();

	function getTotalDevices() {
		$.get(deviceServiceUrl + "/device/getAllDeviceState?token=" + $.getToken() + "&organizationId=" + organizationId, function(totalRes) {
			if(totalRes.code == 0) {
				if(totalRes.data == null) {
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
					} else if(deviceStateList[i].deviceState == 2) {
						deviceTypeTwo = deviceStateList[i].count;
					} else if(deviceStateList[i].deviceState == 3) {
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
				initPieCharts2('echarts5', deviceTotal - deviceTypeTwo, deviceTypeTwo, '#4AFEA3', '#165959');
				initPieCharts2('echarts6', deviceTypeTwo, deviceTotal - deviceTypeTwo, '#C8C8C8', '#3A4966');
				initPieCharts2('echarts7', deviceTypeOne, deviceTotal - deviceTypeOne, '#4CA7FD', '#174178');
				initPieCharts2('echarts8', deviceTypeThree, deviceTotal - deviceTypeThree, '#C70821', '#623940');
				initPieCharts2('echarts9', deviceTypeFour, deviceTotal - deviceTypeFour, '#F1E600', '#49542B');
			} else {

			}
		});
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

	$(function() {

		$("#echarts2").contents().css("width", "2.6rem");
		$("#echarts2").contents().css("height", "1.8rem");
		$("#echarts2").contents().contents().css("width", "2.6rem");
		$("#echarts2").contents().contents().css("height", "1.8rem");

		$("#echarts3").contents().css("width", "1.5rem");
		$("#echarts3").contents().css("height", "1.5rem");
		$("#echarts3").contents().contents().css("width", "1.5rem");
		$("#echarts3").contents().contents().css("height", "1.5rem");
		$("#echarts4").contents().css("width", "1.5rem");
		$("#echarts4").contents().css("height", "1.5rem");
		$("#echarts4").contents().contents().css("width", "1.5rem");
		$("#echarts4").contents().contents().css("height", "1.5rem");

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
		$("#echarts8").contents().css("width", "0.59rem");
		$("#echarts8").contents().css("height", "0.59rem");
		$("#echarts8").contents().contents().css("width", "0.59rem");
		$("#echarts8").contents().contents().css("height", "0.59rem");
		$("#echarts9").contents().css("width", "0.59rem");
		$("#echarts9").contents().css("height", "0.59rem");
		$("#echarts9").contents().contents().css("width", "0.59rem");
		$("#echarts9").contents().contents().css("height", "0.59rem");
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

		function scrollList(obj, direction) {
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
	});
});
