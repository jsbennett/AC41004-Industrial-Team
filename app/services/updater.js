//https://stackoverflow.com/questions/23982592/continuous-tasks-in-nodejs
var events = require('events');

function Updater(time, msg) {
	this.time = time;
	this.array = [{ number: 1 }, { number: 2 }];
	var that;
	events.EventEmitter.call(this);

	this.init = function() {
		that = this;
		console.log(msg);
		//Start interval
		setInterval(that.run, that.time);
	};

	this.run = function() {
		that.array.forEach(function(item) {
			if (item.number === 2) {
				that.emit('Event');
			}
		});
	};
}

Updater.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = Updater;
