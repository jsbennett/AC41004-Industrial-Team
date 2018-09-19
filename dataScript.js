var updater = require('./app/services/updater');
var fakedata = new (require('./app/services/fakeDataCreation'))();

var tickTime = 1000 * 60 * 60;
var tickTime = 5000;

var u = new updater(tickTime, 'Starting fakedata event');
u.init();
fakedata.init(function() {
	fakedata.makeData();
});
u.on('Event', function() {
	fakedata.makeData();
});
