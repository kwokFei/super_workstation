$(function() {

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
				organizetionLvl: 2,
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
								obj.type = 2;
								if(data[k].states == 1) {
									wdata.push(obj);
								} else {
									ndata.push(obj);
								}
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

	//地图顶部  项目 测试中心切换
	$(".changeDot").click(function() {

		let show = $(this).attr("show");
		//全部变灰色
		$(".changeDot").each(function() {
			$(this).find("span:last").css({
				display: "block"
			})
		});

		//点击全部
		if(show === "all") {
			$(".changeDot").each(function() {
				$(this).find("span:last").css({
					display: "none"
				})
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

		$(this).find("span:last").css({
			display: "none"
		});

	});

	$(function() {
		$.ajax({
			cache: true,
			type: "get",
			url: userServiceUrl + "/connegy/getCountList?token=" + $.getToken(),
			async: false,
			success: function(data) {
				let list = data.data.list;
				for(let i = 0; i < list.length; i++) {
					let content = "<div class='xxItem'>" +
						"<p>" + list[i].connegyName + "</p>" +
						"<span><span class='sz'>" + list[i].value + "</span>%</span>" +
						"</div>"
					switch(list[i].typeConnegy) {
						case 0:
							$(".type0").append(content);
							break;
						case 1:
							$(".type1").append(content);
							break;
						case 2:
							$(".type2").append(content);
							break;
						case 3:
							$(".type3").append(content);
							break;
					}
				}
			},
			error: function(errorMsg) {
				console.info("互联赋能数据加载失败啦!");
			}
		});
	});

});