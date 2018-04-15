const http = require('http');
const queryString = require('querystring');
const server = http.createServer(function (req,res) {
    //console.log(req);
    if(req.method === 'POST' && req.url === '/login'){
        var body = "";
        req.on('data',function (chunk) {
            body += chunk;
        });
        req.on('end',function () {
            body = queryString.parse(body);
            console.log(body);
            res.end('登录成功');
        });
    }
    //res.end('哈哈');
});

//Content-type, application/x-form-urlencoded

server.listen(8000);

