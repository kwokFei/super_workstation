// 3D执行计划相关
var plan_3D_url = "http://113.204.9.70:9080/3dwebgl";
var service_id = "10501";   // 平台参数配置BCCA参数的serviceId
var service_key = "3be8052d90f24b94afa383028a0254ba";   // 平台参数配置BCCA参数的serviceKey
var call_back_url = "http://222.182.202.100:7777/device/api/platformparam/callback_operation";   // 平台参数配置BCCA参数的serviceKey


//接口服务地址
var serviceUrl = "http://222.182.202.100:6621/";
// var serviceUrl = "http://127.0.0.1:7777/";
var userServiceUrl = serviceUrl + "user/api";
var logServiceUrl = serviceUrl + "log/api";
var deviceServiceUrl = serviceUrl + "device/api";

/*图片功能*/
var imgServiceUrl = "http://222.182.202.100:7788/api";
// var userServiceUrl = serviceUrl + "http://127.0.0.1:7701/api";
// var logServiceUrl =  serviceUrl+"http://127.0.0.1:7703/api";
// var deviceServiceUrl =  serviceUrl+"http://127.0.0.1:7702/api";

//禁用F12和鼠标右键功能（开发阶段暂时不开启，不利于开发）
/*$(function (){
	document.oncontextmenu = function () { return false; };
        document.onkeydown = function () {
            if (window.event && window.event.keyCode == 123) {
                event.keyCode = 0;
                event.returnValue = false;
                return false;
            }
        };
})*/

$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        $("#search").trigger("click");
    }
});

/**
 * 获取数据ajax-get请求
 * @author laixm
 */
$.sanjiGetJSON = function (url, data, callback) {
    $.ajax({
        url: url,
        //      url: url,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        timeout: 10000,
        data: data,
        success: function (data) {
            callback(data);
        }
    });
};

/**
 * 提交json数据的post请求
 * @author laixm
 */
$.postJSON = function (url, data, callback) {
    $.ajax({
        url: addToUrlToken(url),
        //      url: url,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        timeout: 60000,
        success: function (msg) {
            callback(msg);
        },
        error: function (xhr, textstatus, thrown) {

        }
    });
};

$.postJSONs = function (url, data, callback) {
    $.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        timeout: 60000,
        success: function (msg) {
            callback(msg);
        },
        error: function (xhr, textstatus, thrown) {

        }
    });
};

/**
 * 修改数据的ajax-put请求
 * @author laixm
 */
$.putJSON = function (url, data, callback) {
    $.ajax({
        url: addToUrlToken(url),
        //      url: url,
        type: "put",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        timeout: 20000,
        success: function (msg) {
            callback(msg);
        },
        error: function (xhr, textstatus, thrown) {

        }
    });
};
/**
 * 删除数据的ajax-delete请求
 * @author laixm
 */
$.deleteJSON = function (url, data, callback) {
    $.ajax({
        url: addToUrlToken(url),
        //      url: url,
        type: "delete",
        contentType: "application/json",
        dataType: "json",
        data: data,
        success: function (msg) {
            callback(msg);
        },
        error: function (xhr, textstatus, thrown) {

        }
    });
};

function addToUrlToken(url) {
    var token = $.getToken();
    if (url.indexOf("?") > 0) {
        url += "&token=" + token;
        return url;
    }
    url += "?token=" + token;
    return url;
}

$.setCookie = function (name, value, exp) {
    $.delCookie(name);
    document.cookie = name + "=" + escape(value) + (";expires=" + new Date(exp).toGMTString()) + ";path=/;";
};

$.getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};

$.delCookie = function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = $.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + (";expires=" + exp.toGMTString()) + ";path=/;";
}

$.getToken = function () {
    var token = $.getCookie("token");
    if (token == null || token == undefined || token == '') {
        top.location.href = "../html/Login/login.html";
    }
    return token;
}

/**
 * 将form里面的内容序列化成json
 * 相同的checkbox用分号拼接起来
 * @param {dom} 指定的选择器
 * @param {obj} 需要拼接在后面的json对象
 * @method serializeJson
 * */
$.fn.serializeJson = function (otherString) {
    var serializeObj = {},
        array = this.serializeArray();
    $(array).each(function () {
        if (serializeObj[this.name]) {
            serializeObj[this.name] += ';' + this.value;
        } else {
            serializeObj[this.name] = this.value;
        }
    });
    if (otherString != undefined) {
        var otherArray = otherString.split(';');
        $(otherArray).each(function () {
            var otherSplitArray = this.split(':');
            serializeObj[otherSplitArray[0]] = otherSplitArray[1];
        });
    }
    return serializeObj;
};
/**
 * 将josn对象赋值给form
 * @param {dom} 指定的选择器
 * @param {obj} 需要给form赋值的json对象
 * @method serializeJson
 * */
$.fn.setForm = function (jsonValue) {
    var obj = this;
    $.each(jsonValue, function (name, ival) {
        var $oinput = eval(obj.find("input[name=" + name + "]"));
        if ($oinput.attr("type") == "checkbox") {
            if (ival !== null) {
                var checkboxObj = $("[name=" + name + "]");
                var checkArray = ival.split(";");
                for (var i = 0; i < checkboxObj.length; i++) {
                    for (var j = 0; j < checkArray.length; j++) {
                        if (checkboxObj[i].value == checkArray[j]) {
                            checkboxObj[i].click();
                        }
                    }
                }
            }
        } else if ($oinput.attr("type") == "radio") {
            $oinput.each(function () {
                var radioObj = $("[name=" + name + "]");
                for (var i = 0; i < radioObj.length; i++) {
                    if (radioObj[i].value == ival) {
                        radioObj[i].click();
                    }
                }
            });
        } else if ($oinput.attr("type") == "textarea") {
            obj.find("[name=" + name + "]").html(ival);
        } else {
            obj.find("[name=" + name + "]").val(ival);
        }
    })
};

var loadHtml = '<div class="overall_loding" style="position: fixed;width: 100%;height: 100%; background: rgba(20,20,20,0.3);z-index: 99999999; display: none;top: 0;"><div style="width: 80px; height: 80px; top: 50%;left: 50%;position: absolute;margin-top: -40px;margin-left: -40px; background-image: url(../images/load.gif);background-size:80px 80px;background-repeat:no-repeat;"></div></div>';


$.show_overall_loding = function () {
    $(".overall_loding").show();
}

$.hide_overall_loding = function () {
    $(".overall_loding").hide();
}

