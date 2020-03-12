$(function() {
	// reqNewsListB()
	//lyaui进度条
	layui.use('element', function() {
		var element = layui.element;
	});

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

	var odata = [];
	var wdata = []; //完成得数据
	var ndata = []; //建设中得数据
	let geoCoordMap = {};
	int_zhanti();

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
								if(data[k].states == 1) {
									wdata.push(obj);
								} else {
									ndata.push(obj);
								}
								//odata.push(obj);
								//zdata.push(obj);
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

	chart.on('click', function(params) {
		//createMapFrame();
		$('.map-frame').remove();
		if(params.componentSubType == 'scatter') {
			createMapFrame(params.data);
		}
	});

	function renderMap(map, typen) {
		var wdataSt = {
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

		var ndataSt = {
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
		if(typen == 1) {
			option.series.push(wdataSt)
			option.series.push(ndataSt);
		}
		if(typen == 2) {
			option.series.push(wdataSt);
		}
		if(typen == 3) {
			option.series.push(ndataSt)
		}

		//渲染地图
		chart.setOption(option);
	}

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
		if(show === "complete") {
			renderMap('china', 2);
		}
		if(show === "ncomplete") {
			renderMap('china', 3);
		}
		$(this).addClass("active");

		//      $(this).find("span:last").css({
		//          display : "none"
		//      });
	})

	//	var provinces = {
	//		//23个省
	//		"台湾": "taiwan",
	//		"河北": "hebei",
	//		"山西": "shanxi",
	//		"辽宁": "liaoning",
	//		"吉林": "jilin",
	//		"黑龙江": "heilongjiang",
	//		"江苏": "jiangsu",
	//		"浙江": "zhejiang",
	//		"安徽": "anhui",
	//		"福建": "fujian",
	//		"江西": "jiangxi",
	//		"山东": "shandong",
	//		"河南": "henan",
	//		"湖北": "hubei",
	//		"湖南": "hunan",
	//		"广东": "guangdong",
	//		"海南": "hainan",
	//		"四川": "sichuan",
	//		"贵州": "guizhou",
	//		"云南": "yunnan",
	//		"陕西": "shanxi1",
	//		"甘肃": "gansu",
	//		"青海": "qinghai",
	//		//5个自治区
	//		"新疆": "xinjiang",
	//		"广西": "guangxi",
	//		"内蒙古": "neimenggu",
	//		"宁夏": "ningxia",
	//		"西藏": "xizang",
	//		//4个直辖市
	//		"北京": "beijing",
	//		"天津": "tianjin",
	//		"上海": "shanghai",
	//		"重庆": "chongqing",
	//		//2个特别行政区
	//		"香港": "xianggang",
	//		"澳门": "aomen"
	//	};
	//	var special = ["香港", "澳门", "台湾"];
	//	chart.on('click', function(params) {
	//		console.log(params);
	//		if(special.indexOf( params.name ) >=0) {
	//			return
	//		}else if(params.name in provinces) {
	//			console.log(provinces[params.name])
	//			window.location.href='exhibitionArea.html?area='+provinces[params.name]+'&city='+params.name;
	//		}
	//	});

	//展厅统计
	let dataX = [];
	let dataList1 = [],
		dataList2 = [],
		dataList3 = [];
	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/organization/getStatisticsData?organizetionLvl=1&token=" + $.getToken(),
		async: false,
		success: function(data) {
			let original = data.data.list[0];
			let list = original.dataList;
			document.getElementById("cnum").innerText = original.cnum;
			document.getElementById("nnum").innerText = original.nnum;
			document.getElementById("ynum").innerText = original.ynum;
			for(let i = 0; i < list.length; i++) {
				dataX.push(list[i].month);
				dataList1.push(list[i].cnum);
				dataList2.push(list[i].nnum);
				dataList3.push(list[i].ynum);
			}
		},
		error: function(errorMsg) {
			console.info("展厅统计数据加载失败啦!");
		}
	});
	initLineCharts1('echarts1', dataList1, dataList2, dataList3, dataX)

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
			grid: { // 设置图形大小
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '20%',
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
					name: '总测试中心',
					type: 'line',
					color: "rgb(0,255,255)",
					smooth: true,
					stack: '总量',
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								// 0% 处的颜色   
								offset: 0,
								color: "rgba(0,255,255,1)" 
							},
							{
								// 100% 处的颜色
								offset: 1,
								color: 'rgba(255,255,255,0)'
							}
						], false)
					},
					data: dataList1
				},
				{
					name: '已完成',
					type: 'line',
					color: "rgb(51,204,0)",
					smooth: true,
					stack: '总量',
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								// 0% 处的颜色   
								offset: 0,
								color: "rgba(0,255,255,1)" 
							},
							{
								// 100% 处的颜色
								offset: 1,
								color: 'rgba(255,255,255,0)'
							}
						], false)
					},
					data: dataList3
				},
				{
					name: '建设中',
					type: 'line',
					color: "rgb(255,153,0)",
					smooth: true,
					stack: '总量',
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								// 0% 处的颜色   
								offset: 0,
								color: "rgba(0,255,255,1)" 
							},
							{
								// 100% 处的颜色
								offset: 1,
								color: 'rgba(255,255,255,0)'
							}
						], false)
					},
					data: dataList2
				},
			]
		};
		myChart.setOption(option);
	}

	$(function() {
		$("#echart1").contents().css("width", "3.6rem");
		$("#echart1").contents().css("height", "1.9rem");
		$("#echart1").contents().contents().css("width", "3.6rem");
		$("#echart1").contents().contents().css("height", "1.9rem");

		$("#ec_map").contents().css("width", "9.72rem");
		$("#ec_map").contents().css("height", "7rem");
		$("#ec_map").contents().contents().css("width", "9.72rem");
		$("#ec_map").contents().contents().css("height", "7rem");
	});
})

//气泡
$(function() {

	var canvas, ctx, width, height, bubbles1, bubbles2, bubbles3, bubbles4 = true;
	initHeader();

	//气泡
	function initHeader() {

		canvas1 = document.getElementById('header_canvas1');
		canvas2 = document.getElementById('header_canvas2');
		canvas3 = document.getElementById('header_canvas3');
		window_resize();
		ctx1 = canvas1.getContext('2d');
		ctx2 = canvas2.getContext('2d');
		ctx3 = canvas3.getContext('2d');

		//建立泡泡
		bubbles1 = [];
		bubbles2 = [];
		bubbles3 = [];

		var num = width * 3; //气泡数量
		for(var i = 0; i < num; i++) {
			var c = new Bubble('rgba(106,215,220,');
			bubbles1.push(c);
		}
		for(var i = 0; i < num; i++) {
			var c = new Bubble('rgba(64,219,140,');
			bubbles2.push(c);
		}
		for(var i = 0; i < num; i++) {
			var c = new Bubble('rgba(218,135,2,');
			bubbles3.push(c);
		}

		animate();
	}

	function animate() {
		if(true) {
			ctx1.clearRect(0, 0, width, height);
			for(var i in bubbles1) {
				// console.log(bubbles[i],bubbles.length);
				bubbles1[i].draw(ctx1);
			}
			ctx2.clearRect(0, 0, width, height);
			for(var i in bubbles2) {
				// console.log(bubbles[i],bubbles.length);
				bubbles2[i].draw(ctx2);
			}
			ctx3.clearRect(0, 0, width, height);
			for(var i in bubbles3) {
				// console.log(bubbles[i],bubbles.length);
				bubbles3[i].draw(ctx3);
			}

		}
		requestAnimationFrame(animate);
	}
	// 气泡
	function Bubble(color) {
		var _this = this;
		(function() {
			_this.pos = {};
			init();
		})();

		function init() {
			_this.pos.x = Math.random() * width;
			_this.pos.y = height + Math.random() * 100;
			_this.alpha = 0.1 + Math.random() * 0.9; //气泡透明度
			_this.alpha_change = 0.0002 + Math.random() * 0.0005; //气泡透明度变化速度
			_this.scale = 0.2; //气泡大小
			_this.scale_change = 0; //气泡大小变化速度
			_this.speed = 0.1 + Math.random() * 0.6; //气泡上升速度
		}
		//气泡
		this.draw = function(ctx) {
			if(_this.alpha <= 0) {
				init();
			}
			_this.pos.y -= _this.speed;
			_this.alpha -= _this.alpha_change;
			_this.scale += _this.scale_change;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
			// ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
			ctx.fillStyle = color + _this.alpha + ')';
			ctx.fill();
		};
	}

	// 气泡铺满容器
	function window_resize() {
		//canvas铺满窗口
		//width = window.innerWidth;
		//height = window.innerHeight;

		//如果需要铺满内容可以换下面这个
		var panel = document.getElementById('thumbnail_canvas');

		let html = document.documentElement;
		let vW = html.clientWidth;
		let rem = vW * 100 / 1920;

		width = panel.offsetWidth - parseFloat(rem) * 0.2;
		height = panel.offsetHeight - parseFloat(rem) * 0.2;

		canvas1.width = width;
		canvas1.height = height;

		canvas2.width = width;
		canvas2.height = height;

		canvas3.width = width;
		canvas3.height = height;

	}

	$(window).resize(function() { //当浏览器大小变化时
		initHeader();
		// window_resize();
	});

	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/organization/getStatesCountList?token=" + $.getToken(),
		async: false,
		success: function(data) {
			if(data.code == 0) {
				let list = data.data.list;
				for(let i = 0; i < list.length; i++) {
					switch(list[i].name) {
						case "全部展厅":
							$("#header_canvas1").parent().html("<canvas id='header_canvas1' style='position:absolute;bottom:0;left: 0.1rem;'></canvas>" +
								list[i].num + "</br>个");
							break;
						case "已完成":
							$("#header_canvas2").parent().html("<canvas id='header_canvas2' style='position:absolute;bottom:0;left: 0.1rem;'></canvas>" +
								list[i].num + "</br>个");
							break;
						case "建设中":
							$("#header_canvas3").parent().html("<canvas id='header_canvas3' style='position:absolute;bottom:0;left: 0.1rem;'></canvas>" +
								list[i].num + "</br>个");
							break;
					}
				}
				initHeader();
			}
		},
		error: function(errorMsg) {
			console.info("展厅总览数据加载失败啦!");
		}
	});

	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/organization/getDistributionInfoList?token=" + $.getToken(),
		async: false,
		success: function(data) {
			if(data.code == 0) {
				console.log(data);
				let original = data.data.list[0];
				let list = original.dataList;
				let cnum = original.cnum + ""
				let content = "<p>全球展厅总计数量</p><div class='value-box'>";
				for(let i = 6; i > 0; i--) {
					if(i > cnum.length) {
						content += "<span class='num-item'>0</span>";
					} else {
						content += "<span class='num-item'>" + cnum.substr(cnum.length - i, 1) + "</span>";
					}
				}
				content += "<span>个</span></div>";
				$("#distributionDiv").append(content);
				for(let i = 0; i < list.length; i++) {
					let li = "<li value='" + list[i].name + "' class='testCenterAreaLi'>" +
						"<div class='city-img-box'>" +
						"<img src='img/exhibition/city.png' />" +
						"</div>" +
						"<div class='exhibition-info'>" +
						"<div>" +
						"<span class='font-14-bold'>" + list[i].name + "</span>" +
						"<span class='font-16-bold'>" + list[i].num + "家</span>" +
						"</div>" +
						"<div>" +
						"<div class='layui-progress'>" +
						"<div class='layui-progress-bar layui-bg-orange' lay-percent='40%'>" +
						"</div>" +
						"</div>" +
						"<span>" + list[i].countDeviceNum + "个设备</span>" +
						"</div>" +
						"</div>" +
						"</li>";
					$("#distributionUl").append(li);
					$("#distributionUl").css("cursor", "pointer");
				}
			}

            $(".testCenterAreaLi").click(function () {
                window.location.href = "exhibitionArea.html?area=" + $(this).attr("value");
            });
		},
		error: function(errorMsg) {
			console.info("展厅分布数据加载失败啦!");
		}
	});

	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/organization/getEnterpriseList?token=" + $.getToken(),
		async: false,
		success: function(data) {
			let list = data.data.list;
			for(let i = 0; i < list.length; i++) {
				let li = "<li value='" + list[i].id + "' class='testCenterList'>" +
					"<div>" +
					"<img src='" + list[i].logo + "' alt='' />" +
					"</div>" +
					"<span class='font-16-bold'>" + list[i].name + "</span>" +
					"</li>"
				$(".company-list ul").append(li);
			}
			$('.testCenterList').css("cursor", "pointer");

			//获得当前<ul>
			var $uList = $(".right-two ul");
			var timer = null;
			if($uList.find('li').length > 7) {
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
						marginTop: -scrollHeight
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
			console.info("企业列表数据加载失败啦!");
		}
	});

	// 测试中心企业跳转方法
	$('.testCenterList').click(function() {
		var orgId = $(this).attr("value");
		window.location.href = "enterpriseManagement.html?z_orgId=" + orgId;
	});

})