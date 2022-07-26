let app = require('express')();
let server = require('http').Server(app);
let WebSocket = require('ws');

let wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('server: receive connection.');

  ws.on('message', function incoming(message) {
    console.log('server: received: %s', message);
  });

  ws.send('world');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000);