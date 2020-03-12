/*ctrl+回车键清空刷新*/
$(document).keyup(function (event) {
    if (event.keyCode==13 && event.ctrlKey) {
        $("#clean").trigger("click");
        $("#clean1").trigger("click");
        $("#clean2").trigger("click");
        $("#clean3").trigger("click");
    }
});