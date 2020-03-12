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
			//console.log(data);
			if(data.code == 0) {
				console.log(2);
				menuList = changeFormatMenu(data.data);
				$.setCookie("menuList",JSON.stringify(menuList),$.getCookie("expireTime"));
				initMenu(menuList);
				bindClickMenu();
				eachMenu();
				orthers()
			} else {
				top.location.href = "../html/Login/login.html";
			}

		});
	} else {
		initMenu(JSON.parse(menuList));
		bindClickMenu();
		eachMenu();
		orthers()
	}

}

getUserMenu();

function eachMenu(){
	var atariHandle = function (jA) {
        jA.parents('li').addClass('active open');
    };

    $('.nav li a').each(function () {
        var source = this;
        var jSource = jQuery(source);
        let attr = jSource.attr('href'); //index.html
        //判断是否是选中的a
        if (path.indexOf(attr) > -1) {
            atariHandle(jSource);
        }
    });
}

function orthers(){
	 $("body").on('click', '[data-stopPropagation]', function (e) {
        e.stopPropagation();
    });

    // 滚动条
    const ps = new PerfectScrollbar('.lyear-layout-sidebar-scroll', {
        swipeEasing: false,
        suppressScrollX: true
    });

    // 侧边栏
    $(".lyear-aside-toggler").bind('click', function () {
        $('.lyear-layout-sidebar').toggleClass('lyear-aside-open');
        $("body").toggleClass('lyear-layout-sidebar-close');

        if ($('.lyear-mask-modal').length == 0) {
            $('<div class="lyear-mask-modal"></div>').prependTo('body');
        } else {
            $('.lyear-mask-modal').remove();
        }
        $('.lyear-mask-modal').on('click', function () {
            $(this).remove();
            $('.lyear-layout-sidebar').toggleClass('lyear-aside-open');
            $('body').toggleClass('lyear-layout-sidebar-close');
        });
    });
}

// 侧边栏导航
function bindClickMenu(){ $('.nav-item-has-subnav > a').on('click', function () {
	console.log(1);
    $subnavToggle = jQuery(this);
    $navHasSubnav = $subnavToggle.parent();
    $topHasSubNav = $subnavToggle.parents('.nav-item-has-subnav').last();
    $subnav = $navHasSubnav.find('.nav-subnav').first();
    $viSubHeight = $navHasSubnav.siblings().find('.nav-subnav:visible').outerHeight();
    $scrollBox = $('.lyear-layout-sidebar-scroll');
    $navHasSubnav.siblings().find('.nav-subnav:visible').slideUp(500).parent().removeClass('open');
    $subnav.slideToggle(300, function () {
        $navHasSubnav.toggleClass('open');

        // 新增滚动条处理
        var scrollHeight = 0;
        pervTotal = $topHasSubNav.prevAll().length,
            boxHeight = $scrollBox.outerHeight(),
            innerHeight = $('.sidebar-main').outerHeight(),
            thisScroll = $scrollBox.scrollTop(),
            thisSubHeight = $(this).outerHeight(),
            footHeight = 121;

        if (footHeight + innerHeight - boxHeight >= (pervTotal * 48)) {
            scrollHeight = pervTotal * 48;
        }
        if ($subnavToggle.parents('.nav-item-has-subnav').length == 1) {
            $scrollBox.animate({scrollTop: scrollHeight}, 300);
        } else {
            // 子菜单操作
            if (typeof($viSubHeight) != 'undefined' && $viSubHeight != null) {
                scrollHeight = thisScroll + thisSubHeight - $viSubHeight;
                $scrollBox.animate({scrollTop: scrollHeight}, 300);
            } else {
                if ((thisScroll + boxHeight - $scrollBox[0].scrollHeight) == 0) {
                    scrollHeight = thisScroll - thisSubHeight;
                    $scrollBox.animate({scrollTop: scrollHeight}, 300);
                }
            }
        }
    });
});


}   

function initMenu(menuList){
	console.log(1);
	console.log(menuList);	
	var app;
	app = new Vue({
		el: "#menuApp",
		data: {
			list: menuList
		},
		methods: {
			change: function() {

			}
		},
		mounted: function() {

		},
		
	});

}

$(function(){
	setTimeout(function() {
		//添加Title
		$(".topbar span").each(function() {
			if($(this)[0].innerText !== "") {
				$(this).attr("title", $(this)[0].innerText);
				// $(this).css("overflow", "hidden");
				// $(this).css("text-overflow", "ellipsis");
				// $(this).css("white-space", "nowrap");
			}
		})
	}, 1000);
})

