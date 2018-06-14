(function ($, root) {
    function randerAllTime(duration){
        var allTime = getStyleTime(duration);
        $('.all-time').html(allTime);
    }
    function getStyleTime(duration){
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
    root.randerAllTime = randerAllTime;

}(window.Zepto, window.player || (window.player = {})))