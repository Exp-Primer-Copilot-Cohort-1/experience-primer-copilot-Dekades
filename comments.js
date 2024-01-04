//Create web server with nodejs

//import modules
var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var url = require("url");

//create server
http.createServer(function(req, res){
	//console.log(req.url);
	var path = url.parse(req.url).pathname;
	var query = url.parse(req.url).query;
	var queryObj = qs.parse(query);
	console.log(path);
	console.log(queryObj);
	
	if(path == "/"){
		fs.readFile("./index.html", function(err, data){
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(data);
		});
	}else if(path == "/comments"){
		//console.log("comments");
		if(req.method == "POST"){
			//console.log("POST");
			var body = "";
			req.on("data", function(data){
				body += data;
				console.log("body");
				console.log(body);
			});
			req.on("end", function(){
				//console.log("end");
				var post = qs.parse(body);
				console.log(post);
				console.log(post.comment);
				//console.log(post["comment"]);
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("comment: " + post.comment);
			});
		}else{
			//console.log("GET");
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("comments");
		}
	}else{
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end("404 Not Found");
	}
}).listen(8080, "


