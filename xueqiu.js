var request = require('request').defaults({gzip:true});
var fs = require('fs');
var xq_a_token = require('./token.json').xq_a_token;

var j = request.jar();
var cookie = request.cookie(`xq_a_token=${xq_a_token}`);
var begin = (new Date('1990-01-01 00:00:00')).valueOf();
var now = Date.now();
var url = `https://xueqiu.com/stock/forchartk/stocklist.json?symbol=SH000001&period=1day&type=normal&begin=${begin}&end=${now}&_=${now}`;
j.setCookie(cookie, url);

// 雪球日线历史数据 从1990开始
request({url: url, jar: j}, function (error, response, body) {
  if (!error && response.statusCode == 200) {// 服务器股票接口有响应
    var obj = JSON.parse(body);
    if(!obj.success) return;



    fs.writeFile(`./test-${now}.json`, JSON.stringify(obj,null,4), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
  }
})
