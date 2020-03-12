//echarts

// 地图
$(function() {

	//地图弹框
	//  $('.map').click(function () {
	//    //  createMapFrame();
	//  });
	//  

	//地图部分
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
			zoom: 1.1
		}
	};
	// TODO 项目没加载
	var zdata = []; //展厅数据
	var xdata = []; //项目数据
	let geoCoordMap = {};
	int_zhanti()

	function int_zhanti() {
		$.ajax({
			type: "GET", //提交方式
			url: userServiceUrl + "/organization/list",
			data: {
				token: $.getToken(),
				pageNum: 1,
				organizetionLvl: 1,
				pageSize: 10000
			},
			async: false,
			success: function(result) {
				var data = result.data.list;
				if(result.code === 0) {
					for(let k = 0; k < data.length; k++) {
						(function(k) {
							let address;
							var geoc = new BMap.Geocoder(); //地址解析对象
							var point = new BMap.Point(data[k].longitude, data[k].latitude);
							geoc.getLocation(point, function(rs) {
								var addComp = rs.addressComponents;
								address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
								var obj = {};
								obj.title = data[k].organizationName;
								obj.context_1 = address;
								obj.context_2 = "负责人：" + data[k].personCharge + "(" + data[k].personMobile + ")";
								obj.id = data[k].id;
								obj.type = 1;
								zdata.push(obj);
								setTimeout(function() {
									if(k === data.length - 1) {
										//绘制地图
										renderMap('china', 1);
									}
								}, 300)
							});
							geoCoordMap[data[k].id] = [Number(data[k].longitude), Number(data[k].latitude)]

						})(k)
					}
				}
			}
		})
		$.ajax({
			type: "GET", //提交方式
			url: userServiceUrl + "/projectInfo/list",
			data: {
				token: $.getToken(),
				pageNum: 1,
				pageSize: 10000
			},
			async: false,
			success: function(result) {
				var data = result.data.list;
				if(result.code === 0) {
					for(let k = 0; k < data.length; k++) {
						(function(k) {
							let address;
							var geoc = new BMap.Geocoder(); //地址解析对象
							var point = new BMap.Point(data[k].longitude, data[k].latitude);
							geoc.getLocation(point, function(rs) {
								var addComp = rs.addressComponents;
								address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
								var obj = {};
								obj.title = data[k].name;
								obj.context_1 = address;
								obj.context_2 = "负责人：" + data[k].personCharge + "(" + data[k].personMobile + ")";
								obj.id = data[k].id;
								obj.type = 2;
								xdata.push(obj);
								setTimeout(function() {
									if(k === data.length - 1) {
										//绘制地图
										renderMap('china', 1);
									}
								}, 300)
							});
							geoCoordMap[data[k].id] = [Number(data[k].longitude), Number(data[k].latitude)]
		
						})(k)
					}
				}
			}
		})
	}

	chart.on('click', function(params) {
		//createMapFrame();
		$('.map-frame').remove();
		if(params.componentSubType == 'scatter') {
			createMapFrame(params.data);
		}
	});
	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].id];
			if(geoCoord) {
				res.push({
					title: data[i].title,
					context_1: data[i].context_1,
					context_2: data[i].context_2,
					type: data[i].type,
					value: geoCoord.concat(data[i].value),
					id: data[i].id
				});
			}
		}
		return res;
	};

	function renderMap(map, typen) {
		var zdataSt = {
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
			data: convertData(zdata)
		}

		var xdataSt = {
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
			data: convertData(xdata)
		}
		chart.clear();
		option.series = [];
		if(typen == 1) {
			option.series.push(xdataSt)
			option.series.push(zdataSt);
		}
		if(typen == 2) {
			option.series.push(zdataSt);
		}
		if(typen == 3) {
			option.series.push(xdataSt)
		}

		//渲染地图
		chart.setOption(option);
	}

	//地图顶部  项目 测试中心切换
	//	$(".changeDot").click(function() {
	//
	//		let show = $(this).attr("show");
	//		//全部变灰色
	//		$(".changeDot").each(function() {
	//			$(this).find("span:last").css({
	//				display: "block"
	//			})
	//		});
	//
	//		//点击全部
	//		if(show === "all") {
	//			$(".changeDot").each(function() {
	//				$(this).find("span:last").css({
	//					display: "none"
	//				})
	//			});
	//			renderMap('china', 1);
	//			return;
	//		}
	//		if(show === "room") {
	//			renderMap('china', 2);
	//		}
	//		if(show === "project") {
	//			renderMap('china', 3);
	//		}
	//
	//		$(this).find("span:last").css({
	//			display: "none"
	//		});
	//
	//	});

	$('.mark-box>div').click(function() {
		let show = $(this).attr("show");
		//全部变灰色
		$(".mark-box>div").each(function() {
			$(this).removeClass("active");
		});

		//点击全部
		if(show === "all") {
			$(".mark-box>div").each(function() {
				$(this).addClass("active");
			});
			renderMap('china', 1);
			return;
		}
		if(show === "room") {
			renderMap('china', 2);
		}
		if(show === "project") {
			renderMap('china', 3);
		}
		$(this).addClass("active");
	})

	$(function() {
		$("#ec_map").contents().css("width", "9.72rem");
		$("#ec_map").contents().css("height", "7rem");
		$("#ec_map").contents().contents().css("width", "9.72rem");
		$("#ec_map").contents().contents().css("height", "7rem");
	});

});

//项目统计
$(function() {

	// 统计总数
	var myChart1 = echarts.init(document.getElementById('project'));

	// 指定图表的配置项和数据
	var option1 = {
		grid: {
			left: '15%',
			right: '4%',
			bottom: '20%',
			top: '20%',
		},
		title: {
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
			trigger: 'axis'
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLabel: {
				fontSize: fontSize(0.12),
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
				}
			},
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value',
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
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
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

		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart1.setOption(option1);

	$("#project").contents().css("width", "3.42rem");
	$("#project").contents().css("height", "1.56rem");
	$("#project").contents().contents().css("width", "3.42rem");
	$("#project").contents().contents().css("height", "1.56rem");
});

$(function() {

	//创建元素 添加Dom 测试中心名称 展商数量 设备个数 进度条
	/*function createExhibotor(name, number, deviceNum, progress, obj) {

		//创建元素
		let ul = document.createElement("ul");
		ul.className = "show";

		let li = document.createElement('li');

		// 测试中心图片部分
		let span1 = document.createElement('span');
		li.appendChild(span1);

		// 图片角标
		for(let i = 0; i < 8; i++) {
			let span = document.createElement("span");
			span1.appendChild(span)
		}
		// 测试中心图片
		let img = document.createElement('img');
		img.src = "./img/index_left/beijing.png";
		span1.appendChild(img);

		//展商 设备信息
		let span2 = document.createElement('span');
		li.appendChild(span2);

		let span2_1 = document.createElement('span');
		span2.appendChild(span2_1);

		//测试中心名称
		let span2_1_name = document.createElement('span');
		span2_1_name.innerText = name;

		span2_1.appendChild(span2_1_name);

		//展商数量
		let span2_1_num = document.createElement('span');
		span2_1_num.innerText = number + "家展商";

		span2_1.appendChild(span2_1_num);

		//进度条 设备数量
		let span2_2 = document.createElement('span');
		span2.appendChild(span2_2);

		//进度条
		let span2_2_1 = document.createElement('span');
		let span2_2_1_1 = document.createElement('span');
		span2_2_1_1.style.width = progress + "%";
		span2_2_1.appendChild(span2_2_1_1);
		span2_2.appendChild(span2_2_1);

		//设备台数
		let span2_2_2 = document.createElement('span');
		span2_2_2.innerText = deviceNum + "台设备";
		span2_2.appendChild(span2_2_2)

		ul.appendChild(li);

		$(obj).after(ul);

	}*/

	//右侧测试中心统计 城市展示 测试中心
	/*$(".cityList>ul>li").click(function() {

		$(this).siblings("ul").hide(500);
		//查看后一个兄弟元素
		//如果已经添加 就隐藏或显示
		//如果没有添加 则请求数据 渲染显示
		if(!$(this).next()[0] || $(this).next()[0].tagName === "LI") {
			//请求数据渲染
			createExhibotor("bei", "3", "12345", 3, this);

		} else {
			// 显示或者隐藏
			$(this).next().toggle();
		}
	});*/

});

$(function() {
	$.ajax({
		type: "get",
		url: userServiceUrl + "/brand/list",
		datatype: 'json',
		contentType: "application/json",
		success: function(data) {
			let list = data.data.list;
			for(let i = 0; i < list.length; i++) {
				let li = "<li>" +
					"<img src='" + list[i].brandIcon + "' alt='' />" +
					"<span>" + list[i].brandName + "</span>" +
					"</li>"
				$("#dataUl").append(li);
			}
			//企业信息
			//获得当前<ul>
			var $uList = $(".brandBox ul");
			var timer = null;

			if($uList.find('li').length > 5) {
				//触摸清空定时器
				$uList.hover(
					function() {
						clearInterval(timer);
					},
					function() { //离开启动定时器
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
						marginTop: -scrollHeight - 10
					}, 600, function() {
						//动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
						$uList.css({
							marginTop: 0
						}).find("li:first").appendTo($uList);
					});
				}
			}
		},
		error: function(errorMsg) {
			console.info("品牌列表数据加载失败啦!");
		}
	});

	/*$.ajax({
		type: "get",
		url: userServiceUrl + "/organization/getDistributionInfoList",
		datatype: 'json',
		contentType: "application/json",
		success: function(data) {
			// console.info(data);
			let original = data.data.list[0];
			let list = original.dataList;
			let cnum = original.cnum + ""
			let content = "<div>";
			for(let i = 6; i > 0; i--) {
				if(i > cnum.length) {
					content += "<div class='numberTetxt'>0</div>";
				} else {
					content += "<div class='numberTetxt'>" + cnum.substr(cnum.length - i, 1) + "</div>";
				}
			}
			content += "</div><p>个</p>";
			$(".roomNumber").append(content);
			for(let i = 0; i < list.length; i++) {
				let li = "<li value='" + list[i].name + "' class='testCenterAreaList'>" +
					"<span>" +
					"<span></span><span></span><span></span><span></span>" +
					"<span></span><span></span><span></span><span></span>" +
					"<img src='./img/index_left/beijing.png' alt=''>" +
					"</span>" +
					"<span>" +
					"<span>" +
					"<span>" + list[i].name + "</span>" +
					"<span>" + list[i].num + "个测试中心</span>" +
					"</span>" +
					"<span>" +
					"<span>" +
					"<span></span>" +
					"</span>" +
					"<span>" + list[i].deviceNum + "台设备</span>" +
					"</span>" +
					"</span>" +
					"</li>";
				$("#distributionUl").append(li);
			}
		},
		error: function(errorMsg) {
			console.info("展厅分布数据加载失败啦!");
		}
	});*/

	$.ajax({
		type: "get",
		url: userServiceUrl + "/policySupport/getCountList",
		datatype: 'json',
		contentType: "application/json",
		success: function(data) {
			let list = data.data.list;

			for(let i = 0; i < list.length; i++) {
				let div = "<div class='contentText' style='cursor:pointer' " + 'onclick=op(' + list[i].type + ')' + ">" +
					"<span >" + list[i].typeName + "</span><br>" +
					"<span>" +
					"<span class='numberTetxt'>" + list[i].num + "</span><span>个</span>" +
					"</span>" +
					"</div>"

				$("#policySupport").append(div);
			}
		},
		error: function(errorMsg) {
			console.info("政策支持数据加载失败啦!");
		}
	});

	var _app;
	_app = new Vue({
		el: ".cityList",
		data: {
			list: []
		},
		methods: {
			loadData: function() {
				var _this = this;
				// console.info(this.list);
				//展厅分布
				$.ajax({
					cache: true,
					type: "get",
					url: userServiceUrl + "/organization/getDistributionInfoList",
					async: false,
					success: function(data) {
						if(data.code == 0) {
							console.info("=====");
							console.info(data.data.list[0].dataList);
							let original = data.data.list[0];
							let list = original.dataList;
							let cnum = original.cnum + "";
							let content = "<div>";
							for(let i = 6; i > 0; i--) {
								if(i > cnum.length) {
									content += "<div class='numberTetxt'>0</div>";
								} else {
									content += "<div class='numberTetxt'>" + cnum.substr(cnum.length - i, 1) + "</div>";
								}
							}
							content += "</div><p>个</p>";
							$(".roomNumber").append(content);
							_this.list = original.dataList;
						}
						setTimeout(function() {
							//右侧测试中心统计 城市展示 测试中心
							$(".cityListLi").click(function() {
								var __this = this;
								console.info($(this));
								var province = $(this).attr("data");
								$(this).siblings("ul").hide(500);
								//查看后一个兄弟元素
								//如果已经添加 就隐藏或显示
								//如果没有添加 则请求数据 渲染显示
								if(!$(this).next()[0] || $(this).next()[0].tagName === "LI") {
									//请求数据渲染
									$.ajax({
										cache: true,
										type: "get",
										url: userServiceUrl + "/organization/getDistributionInfoList",
										data: {
											province: province
										},
										async: false,
										success: function(data) {
											if(data.code == 0) {
												console.info("=====");
												let list = data.data.list[0].dataList;
												console.info(list);
												//创建元素
												let ul = document.createElement("ul");
												ul.className = "";
												for(var i in list) {
													_this.createExhibotor(ul,list[i].name, 1, list[i].countDeviceNum, 3, __this, list[i].id);
												}
												$(__this).after(ul);
											}
										}
									});
								} else {
									// 显示或者隐藏
//									$(this).siblings("ul").toggle();
									$(this).next("ul").toggle();
								}
							});
						}, 100);
					},
					error: function(errorMsg) {
						console.info("展厅分布数据加载失败啦!");
					}
				});
			},
			createExhibotor: function(ul,name, number, deviceNum, progress, obj, orgId) {
				/* //创建元素
				let ul = document.createElement("ul");
				ul.className = ""; */

				let li = document.createElement('li');

				// 测试中心图片部分
				let span1 = document.createElement('span');
				$(li).attr("data", orgId);
				$(li).attr("class", "cityDetailLi");
				li.appendChild(span1);

				// 图片角标
				for(let i = 0; i < 8; i++) {
					let span = document.createElement("span");
					span1.appendChild(span)
				}
				// 测试中心图片
				let img = document.createElement('img');
				img.src = "./img/index_left/areaDetail.png";
				span1.appendChild(img);

				//展商 设备信息
				let span2 = document.createElement('span');
				li.appendChild(span2);

				let span2_1 = document.createElement('span');
				span2.appendChild(span2_1);

				//测试中心名称
				let span2_1_name = document.createElement('span');
				span2_1_name.innerText = name;

				span2_1.appendChild(span2_1_name);

				//展商数量
				let span2_1_num = document.createElement('span');
				span2_1_num.innerText = number + "家展商";

				span2_1.appendChild(span2_1_num);

				//进度条 设备数量
				let span2_2 = document.createElement('span');
				span2.appendChild(span2_2);

				//进度条
				let span2_2_1 = document.createElement('span');
				let span2_2_1_1 = document.createElement('span');
				span2_2_1_1.style.width = progress + "%";
				span2_2_1.appendChild(span2_2_1_1);
				span2_2.appendChild(span2_2_1);

				//设备台数
				let span2_2_2 = document.createElement('span');
				span2_2_2.innerText = deviceNum + "台设备";
				span2_2.appendChild(span2_2_2)

				ul.appendChild(li);
				//$(obj).after(ul);

				// 添加点击事件
				setTimeout(function() {
					//右侧测试中心统计 城市展示 测试中心
					$(".cityDetailLi").click(function() {
						var __this = this;
						var orgId = $(this).attr("data");
						window.location.href = "exhibitionManagement.html?z_orgId=" + orgId;
					});
				}, 100);
			},
			showNode: function(e) {
				console.info($(e));
				$(this).siblings("ul").hide(500);
				//查看后一个兄弟元素
				//如果已经添加 就隐藏或显示
				//如果没有添加 则请求数据 渲染显示
				if(!$(this).next()[0] || $(this).next()[0].tagName === "LI") {
					//请求数据渲染
					_app.createExhibotor("bei", "3", "12345", 3, this);
				} else {
					// 显示或者隐藏
					$(this).next().toggle();
				}
			}
		},
		mounted: function() {
			var _this = this;
			this.loadData();
			setTimeout(function() {

			}, 1000);
		}
	});
});

function op(type) {
	var typeName;
	if(type == 1) {
		typeName = "国务院"
	} else if(type == 2) {
		typeName = "多部委"
	} else if(type == 3) {
		typeName = "各省公开"
	}
	$(".template").show();
	$("#planList").find('li').remove();
	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/policySupport/list",
		async: false,
		data: {
			token: $.getToken(),
			type: type
		},
		success: function(data) {
			let list = data.data.list;

			for(let i = 0; i < list.length; i++) {
				//				let parm = list[i].title + "|" + list[i].subtitle + "|" + list[i].name + "|" + list[i].type+ "|" + list[i].filePath+ "|" + list[i].createDate+ "|" + list[i].content;
				let li = '<li style="margin-top: 3%;">' +
					'<span class="list-item-title" title="' + list[i].title + '">' + list[i].title + '</span>' +
					'<span>' + typeName + '</span>' +
					'<span>' + list[i].createDate + '</span>' +
					'<span style="cursor:pointer;" class="detail" onClick="policyInfo(\'' + list[i].id + '\')">详情</span>' +
					'</li>'
				$(li).appendTo("#planList");
			}

		},
		error: function(errorMsg) {
			console.info("政策支持数据加载失败啦!");
		}
	});

}

function policyInfo(id) {
	var policyData;
	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/policySupport/list",
		async: false,
		data: {
			token: $.getToken(),
			id: id
		},
		success: function(data) {
			if(data.code == 0) {
				policyData = data.data.list[0];
			} else {
				layer.msg("请求出错", {
					icon: 5
				});
			}
		},
		error: function(errorMsg) {
			console.info("政策支持数据加载失败啦!");
		}
	});
	console.info(policyData.title)
	var data = {
		title: policyData.title,
		subtitle: policyData.subtitle,
		type: policyData.type,
		filePath: policyData.filePath,
		createDate: policyData.createDate,
		name: policyData.name
	}
	html = template("newEventWindow", data);
	var infoLayer = layer.open({
		type: 1,
		title: '详情',
		area: ['9.5rem', '5.5rem'],
		resize: false,
		offset: 'top',
		content: html,
		success: function(layero) {
			$("#i_content").html(policyData.content)
			$("#i_content").find("p").css({
				"color": "white",
				"text-align": "justify"
			})
		}
	});
}

// 测试中心统计跳转方法
$('.testCenterAreaList').click(function() {
	var areaName = $(this).attr("value");
	window.location.href = "exhibitionArea.html?areaName=" + areaName;
});