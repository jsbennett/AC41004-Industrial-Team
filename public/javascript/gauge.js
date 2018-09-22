var moisture;
var info;
var chart;
var options;

google.charts.load('current', { packages: ['gauge'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
	moisture = $('#moisture').data().bind;
	info = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['Moisture', 0]
	]);

	options = {
		width: 400,
		height: 160,
		redColor: '#FF9900',
		yellowFrom: 0,
		yellowTo: 25,
		redFrom: 75,
		redTo: 100,
		greenFrom: 25,
		greenTo: 75,
		minorTicks: 5
	};

	chart = new google.visualization.Gauge(
		document.getElementById('chart_div')
	);

	chart.draw(info, options);
}

setInterval(function() {
	var min = moisture - moisture / 10;
	var max = moisture + moisture / 10;

	var fluxValue = Math.floor(Math.random() * (max - min)) + min;
	if (fluxValue < 0) {
		fluxValue = 0;
	}
	info.setValue(0, 1, fluxValue);
	chart.draw(info, options);
}, 500);
