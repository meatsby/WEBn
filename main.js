var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request, response){
// http 라는 모듈(이면서 객체) 에 createServer 라는 함수(객체 안에 있을 때는 메소드)
// 웹브라우저에서 들어온 요청에 대한 정보를 담고 있는 request 를 parameter 로 주기로 약속
// 사용자에게 전송하고싶은 정보를 담고 있는 response 를 parameter 로 주기로 약속
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	if(pathname === '/'){ // 홈페이지
		if(queryData.id === undefined){
			fs.readdir('./data', function(error, filelist){
				var title = 'Welcome';
				var description = 'Hello, Node.js';
				var list = template.list(filelist);
				var html = template.html(title, list,
					`<h2>${title}</h2>${description}`,
					`<a href="/create">create</a>`
				);
				response.writeHead(200);
				response.end(html);
			});
		} else { // 쿼리스트링을 이용한 웹페이지
			fs.readdir('./data', function(error, filelist){
				var filteredId = path.parse(queryData.id).base;
				fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
					var title = queryData.id;
					var sanitizedTitle = sanitizeHtml(title);
					var sanitizedDescription = sanitizeHtml(description, {
						allowedTags:['h1']
					});
					var list = template.list(filelist);
					var html = template.html(sanitizedTitle, list, `
						<h2>${sanitizedTitle}</h2>${sanitizedDescription}`, `
						<a href="/create">create</a>
						<a href="/update?id=${sanitizedTitle}">update</a>
						<form action="delete_process" method="post">
							<input type="hidden" name="id" value="${sanitizedTitle}">
							<input type="submit" value="delete">
						</form>`
					);
					response.writeHead(200);
					response.end(html);
				});
			});
		}
	} else if(pathname === '/create'){ // 외부 인원이 웹페이지 생성
		fs.readdir('./data', function(error, filelist){
			var title = '605AHB - create';
			var list = template.list(filelist);
			var html = template.html(title, list, `
				<form action="/create_process" method="post">
					<p>
						<input type="text" name="title" placeholder="title">
					</p>
					<p>
						<textarea name="description" placeholder="description"></textarea>
					</p>
					<p>
						<input type="submit">
					</p>
				</form>
			`, '');
			response.writeHead(200); // 200 은 성공했다
			response.end(html);
		});
	} else if(pathname === '/create_process'){
		var body = '';
		request.on('data', function(data){
			body = body + data;
		});
		request.on('end', function(){
			var post = qs.parse(body);
			var title = post.title;
			var description = post.description;
			fs.writeFile(`data/${title}`, description, 'utf8', function(err){
				response.writeHead(302, {Location: `/?id=${title}`}); // 302 는 Redirection
				response.end();
			});
		});
	} else if(pathname === '/update'){
		fs.readdir('./data', function(error, filelist){
				var filteredId = path.parse(queryData.id).base;
				fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
					var title = queryData.id;
					var list = template.list(filelist);
					var html = template.html(title, list, `
						<form action="/update_process" method="post">
							<input type="hidden" name="id" value="${title}">
							<p>
								<input type="text" name="title" 
								placeholder="title" value="${title}">
							</p>
							<p>
								<textarea name="description" placeholder="description">
									${description}
								</textarea>
							</p>
							<p>
								<input type="submit">
							</p>
						</form>`, 
						`<a href="/create">create</a> 
						<a href="/update?id=${title}">update</a>`
					);
					response.writeHead(200);
					response.end(html);
				});
			});
	} else if(pathname === '/update_process'){
		var body = '';
		request.on('data', function(data){
			body = body + data;
		});
		request.on('end', function(){
			var post = qs.parse(body);
			var id = post.id;
			var title = post.title;
			var description = post.description;
			fs.rename(`data/${id}`, `data/${title}`, function(error){
				fs.writeFile(`data/${title}`, description, 'utf8', function(err){
					response.writeHead(302, {Location: `/?id=${title}`}); // 302 는 Redirection
					response.end();
				});
			});
		});
	} else if(pathname === '/delete_process'){
		var body = '';
		request.on('data', function(data){
			body = body + data;
		});
		request.on('end', function(){
			var post = qs.parse(body);
			var id = post.id;
			var filteredId = path.parse(id).base;
			fs.unlink(`data/${filteredId}`, function(error){
				response.writeHead(302, {Location: `/`}); // 302 는 Redirection
					response.end();
			});
		});
	} else { // 이도저도 아닌 것은 404
		response.writeHead(404);
		response.end('Not found');
	}
});
app.listen(3000); // 웹브라우저로부터 접속이 3000번 포트로 들어오면 이 앱이 응답해서 동작한다