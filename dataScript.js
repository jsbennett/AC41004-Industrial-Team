var updater = require('./app/services/updater');
var fakedata = new (require('./app/services/fakeDataCreation'))();

var u = new updater(1000 * 60 * 60, 'Starting fakedata event');
u.init();
fakedata.init(function() {
	fakedata.makeData();
});
u.on('Event', function() {
	fakedata.makeData();
});
