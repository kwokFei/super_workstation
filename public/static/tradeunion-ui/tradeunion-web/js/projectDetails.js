// 项目详情页
$(function () {

    var canvas1,canvas2,canvas3, ctx1,ctx2,ctx3, width, height, bubbles1,bubbles2,bubbles3= true;
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
        var num = width * 3;//气泡数量
        for (var i = 0; i < num; i++) {
            var c = new Bubble('rgba(218,135,2,');
            bubbles1.push(c);
        }
        for (var i = 0; i < num; i++) {
            var c = new Bubble('rgba(106,215,220,');
            bubbles2.push(c);
        }
        for (var i = 0; i < num; i++) {
            var c = new Bubble('rgba(64,219,140,');
            bubbles3.push(c);
        }

        animate();
    }

    function animate() {
        if (true) {
            ctx1.clearRect(0, 0, width, height);
            for (var i in bubbles1) {
                // console.log(bubbles[i],bubbles.length);
                bubbles1[i].draw(ctx1);
            }
            ctx2.clearRect(0, 0, width, height);
            for (var i in bubbles2) {
                // console.log(bubbles[i],bubbles.length);
                bubbles2[i].draw(ctx2);
            }
            ctx3.clearRect(0, 0, width, height);
            for (var i in bubbles3) {
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
            _this.alpha = 0.1 + Math.random() * 0.9;//气泡透明度
            _this.alpha_change = 0.0002 + Math.random() * 0.0005;//气泡透明度变化速度
            _this.scale = 0.2;//气泡大小
            _this.scale_change =0;//气泡大小变化速度
            _this.speed = 0.1 + Math.random() * 0.6;//气泡上升速度
        }
        //气泡
        this.draw = function(ctx) {
            if (_this.alpha <= 0) {
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
        let rem = vW * 100/1920;

        width = panel.offsetWidth - parseFloat(rem) * 0.2;
        height = panel.offsetHeight -parseFloat(rem) * 0.2;

        canvas1.width = width;
        canvas1.height = height;

        canvas2.width = width;
        canvas2.height = height;

        canvas3.width = width;
        canvas3.height = height;

    }


    $(window).resize(function () {          //当浏览器大小变化时
        initHeader();
        // window_resize();
    });



    // 获取详情页中 行业请求参数
    let url = decodeURI(window.location.href);
    let argsIndex = url .split("?z_industry=");
    let arg = argsIndex[1];

    $(".back>a>span").text(arg);

});


//地图
$(function () {
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
       // renderMap('china', d);
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
 	    let url = decodeURI(window.location.href);
	    let argsIndex = url .split("?z_industry=");
	    let arg = argsIndex[1];
		$.ajax({
			type: "GET", //提交方式
			url: userServiceUrl + "/projectInfo/list",
			data: {
				token: $.getToken(),
				pageNum: 1,
				pageSize: 10000,
				type:arg
			},
			async: false,
			success: function(result) {
				var data = result.data.list;
				if(result.code === 0) {
					for(let k = 0; k < data.length; k++) {
						(function(k) {
							console.log(data[k])
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
								obj.type = 3;
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

	function renderMap(map,typen) {
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
							color: '#BF3EFF' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#9400D3' // 100% 处的颜色
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
							color: '#C0FF3E' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#CDCD00' // 100% 处的颜色
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
		console.log(	option.series);

		//渲染地图
		chart.setOption(option);
	}
	$("#ec_map").contents().css("width", "9.72rem");
	$("#ec_map").contents().css("height", "7rem");
	$("#ec_map").contents().contents().css("width", "9.72rem");
	$("#ec_map").contents().contents().css("height", "7rem");

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
					renderMap('china', 3);
		}
		if(show === "project") {
					renderMap('china', 2);
		}
		$(this).addClass("active");
	})
});

$(function () {
	let type = decodeURI(window.location.href).split("?z_industry=")[1];
    $.ajax({
    	cache: true,
    	type: "get",
    	url: userServiceUrl + "/projectInfo/getStatesCountList?token=" + $.getToken()+"&type=" + type,
    	async: false,
    	success: function(data) {
    		if(data.code == 0) {
    			let list = data.data.list;
    			for(let i = 0; i < list.length; i++) {
    				switch(list[i].name) {
    					case "总项目":
    						$("#header_span1").html(list[i].num + "</br>个");
    						break;
    					case "建设中":
    						$("#header_span2").html(list[i].num + "</br>个");
    						break;
    					case "已完成":
    						$("#header_span3").html(list[i].num + "</br>个");
    						break;
    				}
    			}
    		}
    	},
    	error: function(errorMsg) {
    		console.info("项目总览数据加载失败啦!");
    	}
    });
	
	$.ajax({
		cache: true,
		type: "get",
		url: userServiceUrl + "/projectInfo/list?type="+type,
		async: false,
		success: function(data) {
			if(data.code == 0) {
				let list = data.data.list;
				for(let i = 1; i <= list.length; i++) {
					let content = "<p class='testProjsctList' id=" + list[i - 1].name + ">" +
						"<span style='width: 18%; white-space: nowrap;overflow:hidden;'>" + list[i - 1].name + "</span>" ;
						if(list[i - 1].states == 0){
							content += "<span>"+"未完成"+"</span>";
						}else{
							content += "<span>"+"已完成"+"</span>";
						}
						content += "<span>" + list[i - 1].yratio + "%</span>"+
						"</p>";
					$(".enterpriseFB").append(content);
				}
			}
		},
		error: function(errorMsg) {
			console.info("项目列表数据加载失败啦!");
		}
	});
	
	// 测试中心企业跳转方法
	/* $('.testProjsctList').click(function() {
		var industry = $(this).attr("id");
		window.location.href = "projectDetails.html?z_industry=" + industry;
	}); */
});