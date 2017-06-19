const bindMethods = require('./bind-methods');

exports.User = class User {
	constructor(socket, global) {
		this.global = global;
		this.socket = socket;
		this.name = 'Unknown';
		bindMethods(User, this, socket);
	}

	onDisconnect() {
		console.log(`${this.name} disconnected.`);
	}

	onMessage(message) {
		this.global.emit('incoming', {
			name: this.name,
			text: message
		});
		console.log(`${this.name}: ${message}.`);
	}

	onName(name) {
		this.name = name;
		console.log(`${this.name} connected.`);
	}
};
