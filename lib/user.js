const bindMethods = require('./bind-methods');
const history = [];

exports.User = class User {
	constructor(socket, global) {
		this.global = global;
		this.socket = socket;
		this.name = 'Unknown';
		bindMethods(User, this, socket);
		
		this.socket.emit('history', history);
	}

	onDisconnect() {
		console.log(`${this.name} disconnected.`);
	}

	onMessage(message) {
		const messageObject = {
            name: this.name,
            text: message
        };
		
		history.push(messageObject);
		this.global.emit('incoming', messageObject);
		console.log(`${this.name}: ${message}.`);
	}

	onName(name) {
		this.name = name;
		console.log(`${this.name} connected.`);
	}
};
