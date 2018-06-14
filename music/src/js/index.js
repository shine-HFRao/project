
var $ = window.Zepto;
var curIndex = 0;
var root = window.player;
var controllCI;
var myAudio = new root.audioControll();
var $scope = $(document.body);
function bindEvent(data) {
    function wp() {
        console.log('success');
        $('.song-list').css('bottom', '-310px');
        $('.mask').css('display', 'none');
        $('.mask').off('click', wp);
    }
    // var flagPlay = true;
    // var audio = document.getElementsByTagName('audio')[0];
    // var len = data.length;
    $scope.on('play:change', function (e, index) {
        myAudio.getAudio(data[index].audio);
        root.process.randerAllTime(data[index].duration);
        root.rander(data[index], data);
        if (myAudio.status == 'play') {
            myAudio.play();
            root.process.stop();
            root.process.reload();
            root.process.start();
            // root.process.reload();
        } else {
            root.process.reload();
        }

    })
    $('.icon-prev').on('click', function (e) {
        e.stopPropagation();
        curIndex = controllCI.pre();
        console.log(curIndex);
        $scope.trigger('play:change', curIndex);

        // root.rander(data[index]);
    })
    $('.icon-next').on('click', function (e) {
        e.stopPropagation();
        curIndex = controllCI.next();
        console.log(curIndex);
        $scope.trigger('play:change', curIndex);
        // root.rander(data[index]);
    })
    $('.icon-play').on('click', function (e) {
        e.stopPropagation();
        e.stopPropagation();
        if (myAudio.status == 'play') {
            myAudio.pause();
            root.process.stop();
        } else {
            myAudio.play();
            root.process.start();
        }
        $(this).toggleClass('icon-pause');
    })
    $('.icon-list').on('click', function (e) {
        e.stopPropagation();
        $('.song-list').css('bottom', '0');
        // $('.wrapper').on('click', wp);
        $('.mask').css('display', 'block');
        $('.mask').on('click', wp);
    })
    $('.list-close').on('click', function (e) {
        e.stopPropagation();
        $('.song-list').css('bottom', '-310px');
        $('.mask').css('display', 'none');
        $('.mask').off('click', wp);
    })
    $('.list-des').on('click', 'li', function (e) {
        e.stopPropagation();
        var index = $(this).index();
        console.log(index);
        if (index != curIndex) {
            curIndex = index;
            controllCI.index = index;
            if (myAudio.status == 'pause') {
                myAudio.play();
                // root.process.start();
                root.process.stop();
                $('.icon-play').toggleClass('icon-pause');
            }
            $scope.trigger('play:change', curIndex);
        }
    })

}

function touchEvent() {
    var offset = $('.bottom-line').offset(),
        lineLeft = offset.left,
        lineWidth = offset.width,
        x,
        per,
        startY,
        moveY,
        lastMoveD = 0,
        moveD = 0,
        combineD,
        ulListH = $('.list-des-ul').offset().height,
        listDes = $('.list-des').offset().height,
        maxD = listDes - ulListH;
        
    //移动歌曲列表的监听
    function moveEnd() {
        lastMoveD = combine;
        $('.list-des-ul').off('touchend', moveEnd);
    }
    $('.list-des-ul').on('touchstart', function (e) {
        startY = e.changedTouches[0].clientY;

    }).on('touchmove', function (e) {
        moveY = e.changedTouches[0].clientY;
        moveD = moveY - startY;
        combine = lastMoveD + moveD;
        if (combine > 0) {
            combine = 0;
        } else if (combine < maxD) {
            combine = maxD;
        }
        $('.list-des-ul').css('transform', 'translateY(' + combine + 'px)')
        $('.list-des-ul').on('touchend', moveEnd);
    })

    //移动进度条的监听
    $('.point').on('touchstart', function (e) {
        root.process.stop();
    }).on('touchmove', function (e) {
        x = e.changedTouches[0].clientX;

        per = (x - lineLeft) / lineWidth;

        if (per < 0) {
            per = 0;
        }
        if (per > 1) {
            per = 1;
        }
        root.process.update(per);

    }).on('touchend', function (e) {
        console.log(e.changedTouches)
        x = e.changedTouches[0].clientX;
        per = (x - lineLeft) / lineWidth;
        if (per < 0) {
            per = 0;
        }
        if (per > 1) {
            per = 1;
        }
        root.process.lastPercent = per;
        if (myAudio.status == 'play') {

            root.process.start();
        } else {
            myAudio.playTo(myAudio.audio.duration * per)
        }
        myAudio.playTo(myAudio.audio.duration * per)
    })
}
function getData(url) {

    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            controllCI = new root.controllCI(data.length);
            bindEvent(data);
            $scope.trigger('play:change', curIndex);
            touchEvent();
            // console.log(data[index].audio);
            // myAudio.getAudio(data[index].audio);
            // console.log(myAudio);
        },
        error: function () {
            console.log('error');
        }
    })
}

getData('../mock/data.json');

