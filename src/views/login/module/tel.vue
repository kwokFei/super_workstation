<template>
    <div class="telBox">
        <el-input placeholder="请输入手机号码" v-model="input1">
            <template slot="prepend">+86</template>
        </el-input>
        <div id="drag">
            <div class="drag_bg"></div>
            <div class="drag_text slidetounlock" onselectstart="return false;" unselectable="on">
                请按住滑块，拖动到最右边 </div>
            <div class="handler handler_bg"></div>
        </div>
        <div class="isShow" style="display: none">
            <input class="yzmClass" type="text" v-model="yzm" @blur="yzmBlur">
            <button class="Goyzm">发送验证码</button>
        </div>
        <button class="dlBtn" :style="dlClass" :disabled="disabled">
            <router-link to="/">登陆</router-link>
        </button>
        <p>
            <span>忘记密码？</span>
        </p>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        name: "tel",
        data(){
            return{
                dlClass:'',
                disabled:'true',
                yzm:'',
                isShow:false,
                input1:''
            }
        },
        created(){
            $('#drag').drag();
        },
        methods:{
            yzmBlur(){
                if(this.yzm != ''){
                    this.disabled = false;
                    this.dlClass = 'opacity:0.8';
                }else {
                    this.disabled = true;
                    this.dlClass = 'opacity:0.3';
                }
            }
        }
    }
    $(function () {
        $('#drag').drag();
    });
    $.fn.drag = function (options) {
        var x, drag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = drag.width() - handler.width();  //能滑动的最大间距

        //鼠标按下时候的x轴的位置
        handler.mousedown(function (e) {
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });

        //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function (e) {
            var _x = e.pageX - x;// _x = e.pageX - (e.pageX - parseInt(handler.css('left'), 10)) = x
            if (isMove) {
                if (_x > 0 && _x <= maxWidth) {
                    handler.css({ 'left': _x });
                    drag_bg.css({ 'width': _x });
                } else if (_x > maxWidth) {  //鼠标指针移动距离达到最大时清空事件
                    dragOk();
                }
            }
        }).mouseup(function (e) {
            isMove = false;
            var _x = e.pageX - x;
            if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({ 'left': 0 });
                drag_bg.css({ 'width': 0 });
            }
        });

        //清空事件
        function dragOk() {
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.removeClass('slidetounlock').text('验证通过').css({ 'color': '#fff' });       //modify
            // drag.css({'color': '#fff !important'});
            handler.css({ 'left': maxWidth });                   // add
            drag_bg.css({ 'width': maxWidth });                  // add
            // loginFlag =1;
            handler.unbind('mousedown');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            $(".isShow").css('display','block');
        }
    };
</script>

<style scoped>
    .telBox{
        padding: 0.2rem 0.15rem;
        text-align: center;
    }
    .isShow{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.4rem;
        overflow: hidden;
    }
    .yzmClass{
        width:1.5rem;
        height:0.36rem;
        background:rgba(247,247,247,1);
        border:1px solid rgba(229,229,229,1);
        border-radius:0.04rem;
        outline: none;
    }
    .Goyzm{
        width:1.22rem;
        height:3.6rem;
        background:rgba(76,149,251,1);
        border-radius:0.04rem;
        font-size:0.14rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.36rem;
        border: none;
        outline: none;
        margin-top: -0.02rem;
        margin-left: 0.25rem;
    }
    .dlBtn{
        margin-top: 0.12rem;
        width:3rem;
        height:0.48rem;
        background:rgba(0,104,250,1);
        opacity:0.3;
        border-radius:0.06rem;
        font-size:0.16rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(254,254,254,1);
        line-height:0.49rem;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .maxBox p {
        width: 100%;
        text-align: right;
    }
    .maxBox p span{
        font-size:0.12rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.49rem;
        cursor: pointer;
    }








    .slidetounlock {
        font-size: 0.12rem;
        background: -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-animation: slidetounlock 3s infinite;
        -webkit-text-size-adjust: none
    }
    @-webkit-keyframes slidetounlock {
        0% {
            background-position: -2rem 0
        }
        100% {
            background-position: 2rem 0
        }
    }
    #drag{
        position: relative;
        background-color: #e8e8e8;
        width: 3rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        margin-bottom:0.2rem;
        margin-top: 0.12rem;
    }
    #drag .handler{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 0.4rem;
        height: 0.4rem;
        border: 1px solid #ccc;
        cursor: move;
    }
    .handler_bg{
        background: #fff url("../../../assets/img/login/One.png") no-repeat center;
    }
    .handler_ok_bg{
        background: #fff url("../../../assets/img/login/OneActive.png") no-repeat center;
    }
    #drag .drag_bg {
        /*background-color: #7ac23c;*/
        background: #8dcefb;
        height: 0.4rem;
        width: 0px;
    }
    #drag .drag_text{
        position: absolute;
        top: 0px;
        width: 3rem;
        color:#9c9c9c;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select:none;
        -ms-user-select:none;
        font-size: 0.12rem;
    }
</style>
