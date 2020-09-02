var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('Socket.io connected');
});


app.get('/', function(req, res) {
  res.sendfile('index.html'); //horizon.html
});

var spawn = require('child_process').spawn,
    ls    = spawn('python',['imu.py']);

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
        io.emit('data', data);

});

http.listen(8090, function(){
  console.log('listening');
});
