//rem.js

function resize() {

	let designSize = 1920;
	let html = document.documentElement;
	let vW = html.clientWidth;
	if(vW < 1366) {
		document.documentElement.style.fontSize = 70 + "px";
	} else {
		let rem = vW * 100 / designSize;
		document.documentElement.style.fontSize = rem + "px";
	}
};

resize();

$(window).resize(function() { //当浏览器大小变化时
	resize();
	// window_resize();
});

//地图增加信息弹框
function createMapFrame(params) {
	console.log(1);
	// 创建弹框 大盒子
	let div = document.createElement("div");
	div.className = "map-frame";

	//弹框标题
	let title = document.createElement("div");
	title.className = "frame-title";
	div.appendChild(title);

	let span_1 = document.createElement("span");
	span_1.innerText = params.title;
	title.appendChild(span_1);

	let span_2 = document.createElement("span");
	title.appendChild(span_2);

	// 弹框内容
	let content = document.createElement("div");
	content.className = "frame-content";
	div.appendChild(content);

	// 内容中三个P元素
	let p_1 = document.createElement("p");
	p_1.innerText = params.context_1;
	content.appendChild(p_1);

	let p_2 = document.createElement("p");

	let p_2_span_1 = document.createElement("span");
	p_2_span_1.innerText = params.context_2;
	p_2.appendChild(p_2_span_1);

	let p_2_span_2 = document.createElement("span");
	p_2_span_2.innerText = "";
	p_2.appendChild(p_2_span_2);

	let p_2_span_3 = document.createElement("span");
	p_2_span_3.innerText = "";
	p_2.appendChild(p_2_span_3);
	content.appendChild(p_2);

	let p_3 = document.createElement("p");
	if(params.type == 1) {
		p_3.innerText = "进入展厅";
	}
	//  if(params.type==2){
	//	    p_3.innerText = "进入企业";
	//	}
	if(params.type == 3) {
		p_3.innerText = "";
	}
	content.appendChild(p_3);

	$(p_3).click(function() {
		if(params.type == 1) {
			//进入展厅
			window.location.href = "exhibitionManagement.html?z_orgId=" + params.id;
		}
		if(params.type == 2) {
			//进入展厅
			window.location.href = "enterpriseManagement.html?z_orgId=" + params.id;
		}
	});
	$(span_2).click(function() {
		if(params.type == 1) {
			//进入展厅
			window.location.href = "exhibitionManagement.html?z_orgId=" + params.id;
		}
		//  	if(params.type==2){
		//  		//进入展厅
		//  		window.location.href="enterpriseManagement.html?z_orgId="+params.id;
		//  	}
	});

	$(".map").append(div);

	$(document).bind("click", function(e) {
		var con_one = $(".map"); //设置目标区域
		if(!con_one.is(e.target) && con_one.has(e.target).length === 0) {
			$(".map-frame").hide(); //需要隐藏的元素
		}
	});

};

$(function() {

	//需要放在具体页面
	//  //地图顶部  项目 测试中心切换
	//  $(".changeDot").click(function () {
	//
	//      let show = $(this).attr("show");
	//      //全部变灰色
	//      $(".changeDot").each(function () {
	//          $(this).find("span:last").css({
	//              display : "block"
	//          })
	//      });
	//
	//      //点击全部
	//      if( show === "all"){
	//
	//          $(".changeDot").each(function () {
	//              $(this).find("span:last").css({
	//                  display : "none"
	//              })
	//          });
	//          return;
	//      }
	//
	//      $(this).find("span:last").css({
	//          display : "none"
	//      });
	//
	//  });

	// 地图底部按钮 项目管理 测试中心管理 企业管理 样式变换
	$(".changeBtns").click(function() {
		$(this).siblings().css({
			background: 'url("./img/public/btn.png")',
			backgroundSize: "contain",
		});
		$(this).css({
			background: 'url("./img/public/btn1.png")',
			backgroundSize: "contain",
		});
	});

});