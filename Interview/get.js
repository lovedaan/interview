var http = require('http');
var url = require('url');
var qs = require('querystring');
http.createServer((req, res) => {
    //console.log(req);
    var urlParams = url.parse(req.url);
    //console.log(urlParams);
    res.writeHeader(200, { 'Content-type': 'text/html; charset=utf8'});
    if (req.method === 'GET' && urlParams.pathname === '/list'){
        
        console.log(qs.parse(urlParams.query));
        res.end('{"name": "李四"}');
    }
}).listen(8000, () => {
    console.log('服务器监听8000');
});