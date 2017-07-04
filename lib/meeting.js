const bindMethods = require('./bind-methods');
const history = [];

exports.User = class User {
	constructor(socket, global) {
		this.global = global;
		this.socket = socket;
		this.name = 'Unknown';
		bindMethods(User, this, socket);
	}

	onDisconnect() {
		console.log(`${this.name} disconnected.`);
    this.global.emit('disconnected', this.name)
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
		this.global.emit('connected', this.name)
	}
	
	onRequestHistory() {
		console.log('history requested');
		this.emitHistory();
	}
	
	onRequestName() {
	  this.emitName();
  }
	
	emitHistory() {
    this.socket.emit('history', history);
  }

  emitName() {
	  this.socket.emit('name', this.name);
  }
	
};
