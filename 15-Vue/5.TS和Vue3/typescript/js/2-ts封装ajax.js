function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('success');
        }
    };
}
ajax({
    type: 'get',
    data: 'lht',
    url: 'http://www.baidu.com',
    dataType: 'JSON'
});
