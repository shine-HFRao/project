function ajaxFunc(method, url, callback, data, flag) {
    var ajaj = null;
    if (window.XMLHttpRequest) {
        ajaj = new XMLHttpRequest();
    } else {
        ajaj = new ActiveXObject('microsoft.XMLHttp');
    }
    ajaj.onreadystatechange = function () {
        if (ajaj.readyState == 4) {
            if (ajaj.status == 200) {
                callback(ajaj.responseText);
                console.log(ajaj.getResponseHeader('Date'));
            } else {
                callback('error');
            }
        }
    }
    method = method.toUpperCase();
    if (method == 'GET') {
        var date = new Date(),
            timer = date.getTime();//get请求因为浏览器会给它一个缓存所以这里我们给它一个时间戳，post不存在
        ajaj.open(method, url + '?' + data + '&timer=' + timer, flag);
        ajaj.send();
    } else if (method == 'POST') {
        ajaj.open(method, url, flag);
        ajaj.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajaj.send(data);
    } else if (method == 'PUT') {
        ajaj.open(method, url, true);
        ajaj.setRequestHeader('person', 'raohuifei');
        ajaj.send();
    }
}