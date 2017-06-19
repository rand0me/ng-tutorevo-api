module.exports = function (Ctor, context, socket) {
	Object.getOwnPropertyNames(Ctor.prototype).forEach(method => {
		if (method.substr(0, 2) === 'on') {
			const event = method.substr(2).toLowerCase();
			socket.on(event, context[method].bind(context));
		}
	});
};
