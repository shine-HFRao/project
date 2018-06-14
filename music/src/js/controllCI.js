
//此模块适合作为 上一页下一页模块的封装，利用的是构造函数
(function ($, root){
    function ControllCI(len){
        this.len = len;
        this.index = curIndex;
    }
    ControllCI.prototype = {
        pre: function (){
            return this.getIndex(-1);
        },
        next: function (){
            return this.getIndex(1);
        },
        //下面这个函数是利用一个巧妙的算法
        getIndex: function (val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controllCI = ControllCI;
}(window.Zepto, window.player || (window.player = {})))