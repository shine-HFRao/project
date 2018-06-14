(function () {
    var page = 1;
    var oLi = document.getElementsByTagName('li');
    var imgW = 168;
    var flag = true;
    var wrapper = document.getElementsByClassName('wrapper')[0];
    getData();
    function getData() {
        if (flag) {
            flag = false;
            ajaxFunc('get', 'getPics.php', waterFall, 'cpage=' + page, true);
            page++;
        }

    }
    function waterFall(data) {
        var dataList = JSON.parse(data);
        console.log(dataList);
        if(dataList.length == 0){
            wrapper.className = 'wrapper loaded';
        }else{
            dataList.forEach(function (ele, index) {
                var oImg = new Image(),
                    oDiv = document.createElement('div'),
                    oP = document.createElement('p'),
                    minIndex;
                minIndex = minLi();
                oP.innerText = ele.title;
                oImg.src = ele.preview;
                oImg.width = 168;
                imgFactW = ele.width;
                imgFactH = ele.height;
                oImg.height = imgW * imgFactH / imgFactW;
                oDiv.appendChild(oImg);
                oDiv.appendChild(oP);

                oLi[minIndex].appendChild(oDiv);
                flag = true;
            })
        }
    }

    function minLi() {
        var minH = parseInt(getStyle(oLi[0], 'height')),
            index = 0,
            len = oLi.length;
        for (var i = 1; i < len; i++) {
            if (minH > parseInt(getStyle(oLi[i], 'height'))) {
                minH = parseInt(getStyle(oLi[i], 'height'));
                index = i;
            }
        }
        return index;

    }

    function getStyle(elem, prop) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(elem, null)[prop];
        } else {
            return elem.currentStyle[prop];
        }
    }
    window.onscroll = function () {
        console.log(flag);
        var minH = parseInt(getStyle(oLi[minLi()], 'height'));
        var scrollT = getScrollOffset().y,
            clientH = getViewportOffset().h,
            combineH = scrollT + clientH;
        if (minH < combineH) {
            console.log(1)
            getData();
        }
    }
    function getViewportOffset() {
        if (window.innerWidth) {
            return {
                w: window.innerWidth,
                h: window.innerHeight
            }
        } else {
            if (document.compatMode === 'BackCompat') {
                return {
                    w: document.body.clientWidth,
                    h: document.body.clientHeight

                }
            } else {
                return {
                    w: document.documentElement.clientWidth,
                    h: document.documentElement.clientHeight
                }
            }
        }
    }
    function getScrollOffset() {
        if (window.pageXOffset) {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            }
        } else {
            return {
                x: document.body.scrollLeft + document.documentElement.scrollLeft,
                y: document.body.scrollTop + document.documentElement.scrollTop
            }
        }
    }
})()