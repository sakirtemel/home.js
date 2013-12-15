var express = require('express'), app = express();
http = require('http');
server = http.createServer(app);

var jade = require('jade');
var io = require('socket.io').listen(server);
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

app.get('/tablet', function (req, res)
{
    res.render('tablet.html');
});
app.get('/phone', function (req, res)
{
    res.render('phone.html');
});



//app.set('view engine', 'jade');
//app.set("view options", { layout: false });
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res){
  res.render('home.jade');
});



global.engine = require('home-engine'), engine.init();
global.phone = require('home-engine-phone');

global.phone_socket = null;
global.tablet_socket = null;

var port = process.env.OPENSHIFT_INTERNAL_PORT || 3000
    , ip = process.env.OPENSHIFT_INTERNAL_IP || "192.168.1.177";
    console.log('Listening on ' + port);


server.listen(port, ip);
io.sockets.on('connection', function (socket) {
	socket.on('setPseudo', function (data) {
		socket.set('pseudo', data);
		if ( data == 'tablet' ){
			global.tablet_socket = socket;
			//id = Math.floor((Math.random()*100)+1);
			id = 0;
			socket.set('id', id);
			console.log('id : ' + id);
		}else{
			global.phone_socket = socket;
			socket.set('id', -1);
		}
	});
	socket.on('setId', function (data) {
			socket.set('id', data);
			console.log('connect to id : ' + id);
	});
	
	socket.on('message', function (message) {
		socket.get('id', function(error, id){
			socket.get('pseudo', function (error, name) {
				if ( name == 'phone' ){
					tablet_socket = socket;
					phone.process(message);
				}
				else if ( name == 'tablet' ){
					phone_socket = socket;
					engine.virtual_home.getMessage(message);
				}
				console.log("user " + name + '-' + id + " send this : " + message);
			});
		})
	});
});



