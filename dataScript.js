var updater = require('./app/services/updater');
var fakedata = new (require('./app/services/fakeDataCreation'))();
const delay = require('delay');

var tickTime = 1000 * 60 * 60;
var tickTime = 5000;

var u = new updater(tickTime, 'Starting fakedata event');
u.init();
fakedata.init(function() {
	//fakedata.makeData();
});
var today = new Date();
var days = 6 * 300;
//startDate.setDate(startDate.getDate() - 6 * 30);
u.on('Event', function() {
	var startDate = new Date();
	startDate.setDate(today.getDate() - days);
	console.log(startDate);
	if (startDate <= today) {
		fakedata.makeData(startDate);
		days--;
	}
});
