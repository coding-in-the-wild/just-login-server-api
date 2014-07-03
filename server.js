var url = require('url')
var send = require('send')
var Router = require('router')

var router = Router()

var requestListener = function requestListener(req, res) {
	send(req, url.parse(req.url).pathname, {root: "./static/"})
		.on('error', function (err) {
			console.log("err:", err.message)
		})
		.on('file', function (path, stat) {
			console.log("file req:",path)
		})
		.on('directory', function() {
			console.log("directory")
			res.statusCode = 301;
			res.setHeader('Location', req.url + '/');
			res.end('Redirecting to ' + req.url + '/');
		}).on('headers', function (res, path, stat) {
			console.log('headers')
			//res.setHeader('Content-Disposition', 'attachment'); //this made me download the file
		})
		.pipe(res)
}

router.all(".*", function(req, res) {
	console.log("routing lol")
})

module.exports = requestListener