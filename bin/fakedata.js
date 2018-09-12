function FakeData() {
	this.ph = Math.floor(Math.random() * 14);
	this.moisture = Math.floor(Math.random() * 100);
	this.phAlpha = 0.05;
	this.moistureAlpha = 0.1;

	this.makeFakeCrop = function() {
		console.log('Fake Crop');
		var crops = ['Potatoes', 'Wheat', 'Corn'];
		console.log(crops[Math.floor(Math.random() * crops.length)]);
	};

	this.makeFakeFieldData = function() {
		console.log('Fake Field Data');
		console.log(
			'PH Level ' +
				this.smoothRandom(this.phAlpha, this.ph) +
				' ' +
				'Moisture ' +
				this.smoothRandom(this.moistureAlpha, this.moisture) +
				'%'
		);
	};

	this.smoothRandom = function(factor, start) {
		if (start == 0) {
			start = 1;
		}
		var max = start + start * factor;
		var min = start - start * factor;
		return Math.floor(Math.random() * (max - min) + min);
	};
}

module.exports = FakeData;
