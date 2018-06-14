(function ($, root) {
    function audioControll(len) {
        this.audio = new Audio();
        this.status = 'pause';

    }

    audioControll.prototype = {
        play: function (){
            this.audio.play();
            this.status = 'play';
        },
        pause: function (){
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src){
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (curTime){
            this.audio.currentTime = curTime;
        }
    }
    root.audioControll = audioControll;
}(window.Zepto, window.player || (window.player = {})))