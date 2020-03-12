var path = window.document.location.href;

function changeFormatMenu(data) {
	var rdata = {};
	for(var i = 0; i < data.length; i++) {
		var authorityName = data[i].authorityName;
		var node = eval('rdata.' + authorityName + '=[]');
		if(typeof data[i].childrens == "undefined" || data[i].childrens == null || data[i].childrens == "") {
			node.push(data[i].menuUrl);
            node.push(data[i].authorityIcon);
			// node.push("mdi mdi-desktop-classic");
		} else {
			// node.push("mdi mdi-desktop-classic");
            node.push(data[i].authorityIcon);
			node.push(changeFormatMenu(data[i].childrens));
		}
	}
	return rdata;
}

function getUserMenu() {
//	var menuLists = {
//		// "首页": ["mdi mdi-home"],
//		"系统管理": [
//			"mdi mdi-settings",
//			{
//				"系统用户管理": ["user", "md-contacts"],
//				"结构角色管理": ["role", "md-contact"],
//				"菜单权限管理": ["menu", "md-menu"],
//				"权限资源管理": ["resource", "md-folder"],
//				"操作日志管理": ["controlLog", "md-document"],
//				"系统日志管理": ["systemLog", "ios-document"],
//			}
//		]
//	};
//	console.log(1);
//	console.log(menuList)
//	return JSON.parse(JSON.stringify(menuLists));
	//return menuList;
	var menuList = $.getCookie("menuList");
	if(typeof menuList == "undefined" || menuList == null || menuList == "") {
		$.sanjiGetJSON(userServiceUrl + "/user/menuTree", {isMenu:"0"}, function(data) {
			console.log(data);
			if(data.code == 0) {
				menuList = changeFormatMenu(data.data);
				console.log(menuList);
				$.setCookie("menuList",JSON.stringify(menuList),$.getCookie("expireTime"));
				initMenu(menuList);
			} else {
				top.location.href = "../html/Login/login.html";
			}

		});
	} else {
		initMenu(JSON.parse(menuList));
	}

}

getUserMenu();

function initMenu(menuList){
	var app;
	app = new Vue({
		el: "#menuApp",
		data: {
			list: menuList,
			iframeSrc:'home.html',
			homeName:'home.html',
			currentIndex:-1,
			currentIndex1:-1
		},
		methods: {
			change: function() {

			},
			changeIframe:function(name,index1,index){
				if(name=='home.html'){
					this.iframeSrc=name;
					this.currentIndex=-1;
					this.currentIndex1=-1;
				}else{
					this.iframeSrc=name+'.html';
					this.currentIndex=index;
					this.currentIndex1=index1;
				}
			}
		},
		mounted: function() {

		},
	});
}
