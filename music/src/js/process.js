(function ($, root) {
    //渲染音乐总时间
    var curDuration;
    var frameId;
    var lastPercent = 0;
    var startTime;
    function randerAllTime(duration){
        // lastPercent = 0;
        curDuration = duration;
        update(0);
        
        var allTime = getStyleTime(duration);
        $('.all-time').html(allTime);
    }
    // 改变时间格式
    function getStyleTime(duration){
        duration = Math.round(duration);
        var minutes = Math.floor(duration / 60);
        var seconds = duration % 60;
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }

    //更新进度条和开始时间的变化
    function update(percent){
        
        var intervalTime = percent * curDuration;
        intervalTime = getStyleTime(intervalTime);
        $('.cur-time').html(intervalTime);
        var leftPercent = (percent - 1) * 100;
        var pointPercent = percent * 98;
        $('.top-line').css('left', leftPercent + '%');
        $('.point').css('left', pointPercent + '%');
        
    }
    //切换歌曲更新进度条信息
    function reload(){
        // update(0);
        root.process.lastPercent = 0;
        
    }
    //计算正常开始进度条、时间的百分比
    function start(){
        
        startTime = new Date().getTime();
        frameId = requestAnimationFrame(frame);

        function frame(){
            var curTime = new Date().getTime();
            var percent = root.process.lastPercent + (curTime - startTime) / (curDuration * 1000);

            if(percent <= 1){
                
                update(percent);
                frameId = requestAnimationFrame(frame);//requestAnimationFrame每16.7ms执行一次
                // console.log('s')
            }else{
                // cancelAnimationFrame(frameId);
                curIndex = controllCI.next();
                $scope.trigger('play:change', curIndex);
            }
        }
        // frame();
    }
    //暂停时的百分比
    function stop(){
        var curTime = new Date().getTime();
        root.process.lastPercent = root.process.lastPercent + (curTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    root.process = {
        randerAllTime: randerAllTime,
        start: start,
        stop: stop,
        reload: reload,
        update: update,
        lastPercent: lastPercent
    }

}(window.Zepto, window.player || (window.player = {})))