const path = require('path');
const {Server} = require('http');
const express = require('express');
const socket = require('socket.io');

const app = express();
const http = new Server(app);
const io = socket(http);

const User = require('./lib/user').User;
const Meeting = require('./lib/meeting').Meeting;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

io.on('connection', socket => new User(socket, io));

io.on('connection', socket => new Meeting(socket, io));

http.listen(3000, () => console.log('listening on *:3000'));
