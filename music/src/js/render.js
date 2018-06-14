(function ($,root){
    function randerInfo(sgData){
        console.log(sgData);
        var html = '<div class="song-name">' + sgData.song + '</div>' +
            '<div class="singer-name">' + sgData.singer + '</div>' +
            '<div class="ablum-name">' + sgData.album + '</div>'
        $('.song-des').html(html);
    }

    function randerImg(sgData){
        var img = new Image();
        img.src = sgData.image;
        img.onload = function (){
            root.blurImg(img, $(document.body));
        }
        $('.image-ablum').css('backgroundImage', 'url(' + sgData.image + ')');
        return img;
    }

    function renderIslike(sgData){
        if(sgData.isLike){
            $('.icon-like').addClass('liking');
        }else{
            $('.icon-like').removeClass('liking');
        }
        
    }
    function randerList(data){
        var len = data.length;
        var str = '';
        for(var i = 0; i < len; i++){
            str = str + '<li>' + data[i].song + ' - ' + data[i].singer + ' - ' + data[i].album + '</li>'; 
        }
        $('.list-des-ul').html(str);
    }
    // function addAudio(sgData){
    //     $('audio').attr('src', sgData.audio);
    // }
    root.rander = function (sgData, data) {
        randerInfo(sgData);
        randerImg(sgData);
        renderIslike(sgData);
        // addAudio(data);
        randerList(data);
    };
    // root.play = function (){
        
    // }
}(window.Zepto, window.player || (window.player = {})))


