var express = require("express")
var bodyParser = require('body-parser');   //body解析
var app = express();
var path = require("path");

var allowCrossDomain = function (req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');  //允许任何方法
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Session-Token');   //允许任何类型
 next();
};

const map = new Map();
var arr = [];

app.use(allowCrossDomain);//运用跨域的中间件
//app.use(bodyParser.text());//运用中间件，对请求体的文本进行解析
app.use(bodyParser.json())   //// 创建 application/json 解析
app.use(bodyParser.urlencoded({extended: true})) // 创建 application/x-www-form-urlencoded 解析

app.get("/", function(req, res){
	res.send('index')
})
app.get("/data/query", function(req, res){
	res.send(JSON.stringify(arr));
})
app.post("/data/add", function(req, res){
	console.log(req.body, req.query, req.params);
	arr.push(req.body)
	res.send(JSON.stringify(arr));
})
app.post("/data/login", function(req, res){
	console.log(req.body, req.query, req.params);
	if(req.body.name=='admin' && req.body.password=='admin'){
		res.send(JSON.stringify({code:'200',msg:'登录成功'}));
	  } else{
		res.send(JSON.stringify({code:'200',msg:'账号密码输入错误！'}));
	  }
})

app.get('/get_message', function(req, res, next) {
	var o = {};
	for (let [k,v] of map){
			o[k]=v;
	};
	arr.push(o);
	var data = {
			"code": "200",
			"msg": "success",
			"result":arr
		}
	res.end(JSON.stringify(data));
	next();
})
app.post('/submit_message', function(req, res, next) {
	console.log(req.body, req.query, req.params);
	for(let k in req.body){   
        map.set(k,req.body[k])
	};
	var data = {
			"code": "200",
			"msg": "success",
		}
	res.end(JSON.stringify(data));
	next();
})
app.get('/get_tab', function(req, res, next) {
	var data = {
			"code": "200",
			"msg": "success",
			"result":[
				{"title":"关注","content":"记得关注哟"},
				{"title":"视频","content":"有什么新资讯"},
				{"title":"推荐","content":"这个不错哟"},
				{"title":"好友","content":"认识一下喽"},
				{"title":"小说","content":"别看了学习吧"},
				{"title":"游戏","content":"最后一把"}
			]
		}
	res.end(JSON.stringify(data));
	next();
})

app.listen(3000, function(){console.log("Server started on port 3000.")});