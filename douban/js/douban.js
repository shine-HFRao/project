(function (){
    $('#anony-nav .inp input').on('input', debounce(setAjax, 1000))
    $('html').on('click', function (e){
        var event = e || window.event;
        event.stopPropagation();
        $('.itemList').css('display', 'none');
    })

    function setAjax(e){
        var inputValue = $(this).val();
        if (inputValue != '') {
            console.log(inputValue);
            $.ajax({
                type: 'get',
                url: 'https://api.douban.com/v2/music/search',
                data: 'q=' + inputValue + '&count=7',
                success: getData,
                dataType: 'jsonp'
            })
        } else {
            $('.itemList').css('display', 'none');
        }
    }

    function getData(data){
        console.log(data);
        var data = data.musics;
        var str ='';
        if ($('.itemList').css('display') == 'none'){
            $('.itemList').css('display', 'block');
        }
        data.forEach(function (ele, index){
            str += '<li>\
                    <a href="https://music.douban.com/subject/'+ ele.id + '/">\
                        <img src="'+ ele.image + '" width="40">\
                        <div>\
                            <em>'+ ele.title + '</em>\
                            <p>'+ ele.author[0].name + '</p>\
                        </div>\
                    </a>\
                </li>';
        })
        $('.itemList ul').html(str);
        
    }

    function debounce(handle, delay) {
        var timer = null;
        return function () {
            var _self = this,
                _arg = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                handle.apply(_self, _arg)
            }, delay);
        }
    }
})()