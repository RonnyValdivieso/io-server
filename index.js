var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var array = [];

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log(socket.id);
	console.log('a user connected');
	socket.emit('status', "Connected");

	array.push(socket.id);
	console.log(array);

	socket.on('chat message', (msg) => {
		io.emit('chat message', `${socket.id}: ${msg}`);
	})

	socket.on('disconnect', () => {
		let filtered = array.filter((x) => x != socket.id);
		array = filtered;
		console.log('user disconnected');
	});
});

http.listen(9000, () => {
	console.log('listening on *:9000');
});