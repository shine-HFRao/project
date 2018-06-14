(function ($, root) {
    root.addAudio = function (data){
        $('<audio src = "' + data.audio + '"></audio>').appendTo('.wrapper');
    }

}(window.Zepto, window.player || (window.player = {})))