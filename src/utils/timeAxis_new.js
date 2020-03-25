import jQuery from 'jquery'

;(function ($, window, document) {
    var defaults = {
        data: [], // 展示数据
        id: '', // 判定dom ID
        props: { // 参数反显字段名
            name: 'name',
            key: 'time',
        },
        index: 0, //默认当前选中
        width: '150px',
        then: function () {

        }
    };

    var TimeAxis = function (options) {
        this.options = Object.assign(defaults, options);
        this.props = this.options.props;
        this.id = this.options.id;
        this.width = this.options.width;
        this.init();
    };

    TimeAxis.prototype = {

        // 组件初始化
        init: function () {
            // 生成时间轴盒子html
            this.setTimeBox();
        },

        // 生成时间轴盒子html
        setTimeBox: function () {
            var id = "#" + this.id;
            var html = '<span><</span> <div class="cx-time-box"> <ul></ul></div><span>></span>';
            $(id).empty().append(html);
            // 生成时间轴html
            this.setTimeAxisHtml();

            var self = this;

            // 向左移动
            $(id + '>span:first').on('click', function () {
                self.timeAxisMove(-1);
            });

            //向右移动
            $(id + '>span:last').on('click', function () {
                self.timeAxisMove(1);
            })
        },

        // 生成时间轴html
        setTimeAxisHtml: function () {
            var list = this.options.data || [];
            var html = '';
            var self = this;
            $.each(list, function (index, item) {
                // console.log(item);
                //已经在进行中的
                if(item.info.isDo){
                    html += '<li class="cx-round-box cx-round-box'+index+'">';
                    html += '<div class="cx-time-top">'+item[self.props.name]+'</div>';
                    html += '<div class="cx-time-round" data-index="'+index+'"></div>';
                    html += '</li>';
                    html += '<div class="cx-time-bottom" data-index="'+index+'">'
                    html += '<div class="info-pop">'
                    html += '<div class="info-item">' +
                        '<span class="title">负  责  人：</span>\n' +
                        '<span class="title-info">'+item.info.projectLeader+'</span>\n' +
                        '</div>';
                    html += '<div class="info-item">\n' +
                        '<span class="title">任务状态：</span>\n' +
                        '<span class="title-info">'+item.info.status+'</span>\n' +
                        '</div>'
                    html += '<div class="info-item">\n' +
                        '<span class="title">开始时间：</span>\n' +
                        '<span class="title-info">'+item.info.startTime+'</span>\n' +
                        '</div>'
                    html += '<div class="info-item">\n' +
                        '<span class="title">结束时间：</span>\n' +
                        '<span class="title-info">'+item.info.endTime+'</span>\n' +
                        '</div>'
                    html += '<div class="info-item">\n' +
                        '<span class="title">当前进度：</span>\n' +
                        '<span class="title-info">'+item.info.progress+'</span>\n' +
                        '</div>'
                    html += '<div class="info-item info-item-info">\n' +
                        '<span class="title">备注：</span>\n' +
                        '<span class="title-info">'+item.info.remarks+'</span>\n' +
                        '</div>'
                    html += '</div>';
                    html += '</div>';
                }else {
                    html += '<li class="isnotDo cx-round-box cx-round-box'+index+'">';
                    html += '<div class="cx-time-top">'+item[self.props.name]+'</div>';
                    html += '<div class="cx-time-round" data-index="'+index+'"></div>';
                    html += '<div class="cx-time-bottom">'+item.info+'</div>';
                    html += '</li>';
                }

                if(index != list.length - 1){
                    if(item.info.isDo){
                        html += '<li class="cx-time-line" style="width: '+ self.width +'"></li>';
                    }else {
                        html += '<li class="isnotDo cx-time-line" style="width: '+ self.width +'"></li>';
                    }

                }
            });
            var cls = "#" + this.id + ' ul';
            $(cls).empty().append(html);
            $(cls + ' .cx-time-round').on('click', function () {
                self.options.index = $(this).data('index');
                self.timeAxisMove(0); //点击某一点
            })
            this.firstLoad = true;
            this.timeAxisMove(0);//初始选中
        },

        //点击连边移动选中时间节点
        timeAxisMove: function (num){
            var list = this.options.data || [];
            this.options.index += num;
            if(this.options.index < 0){
                this.options.index = list.length - 1;
            }
            if(this.options.index > list.length - 1){
                this.options.index = 0;
            }
            this.timeAxisRoll();
            this.timeAxisActive(this.options.index);
        },

        //选中节点左右滚动
        timeAxisRoll: function (){
            var list = this.options.data || [];

            var width = parseInt(this.width) + 12;
            var firstIndex = this.options.index - 1 < 0?0:this.options.index - 1;
            var roll = -(firstIndex* width);
            var widthBox = $('.cx-time-box').width();//时间轴宽度盒子总宽度
            var widthBox1 = Math.abs(list.length * width); //实际总宽度
            if(widthBox > widthBox1){
                return
            }
            var i = parseInt(widthBox/width);//显示时间轴条数

            if(this.options.index + i >= list.length){
                roll =  -((list.length - 1 - i) * width);
            }

            var cla = "#" + this.id + ' ul li';
            $(cla).animate({
                'left': roll + 'px'
            });
        },

        // 前后滑动点击事件
        timeAxisActive: function (num) {
            if(!this.firstLoad){
                var list = this.options.data || [];
                // var data = list[this.options.index];
                // this.options.then(this.options.index,data);
                this.options.then(this.options.index);
            } // 首次加载不执行回调
            $('.cx-round-box').removeClass('cx-time-active');
            $('.cx-round-box' + this.options.index).addClass('cx-time-active');
            this.firstLoad = false;
        }
    };
    window.oTimeAxios = TimeAxis;
})(jQuery, window, document);