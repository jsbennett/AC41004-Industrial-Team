var updater = require('./app/services/updater');
var fakedata = new (require('./app/services/fakeDataCreation'))();
const delay = require('delay');

var tickTime = 1000 * 60 * 60;
var tickTime = 1000;

var u = new updater(tickTime, 'Starting fakedata event');
u.init();
fakedata.init(function() {
	//fakedata.makeData();
	var today = new Date();
	var days1 = 365;
	//startDate.setDate(startDate.getDate() - 6 * 30);
	u.on('Event', function() {
		var startDate1 = new Date();
		startDate1.setDate(today.getDate() - days1);
		fakedata.makeData(startDate1);
		days1--;
		console.log(startDate1);
		//console.log('Added data');
	});
});
