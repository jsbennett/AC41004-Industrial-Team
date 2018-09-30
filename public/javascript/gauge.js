var moisture;
var info;
var chart;
var options;

//Google Charts gauge that updates based on current soil moisture levels
google.charts.load('current', { packages: ['gauge'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
	moisture = $('#moisture').data().bind;
	info = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['Moisture', 0]
	]);


	options = {
		width: 160,
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
// Updates gauge every .5 seconds
setInterval(function() {
  var formatter = new google.visualization.NumberFormat(
    {suffix: '%', pattern:info}
  );
	var min = moisture - 5;
	var max = moisture + 5;
	//sets the wiggle amount for the gauge needle
	var fluxValue = Math.floor(Math.random() * (max - min)) + min;
	if (fluxValue < 0) {
		fluxValue = 0;
	}
	info.setValue(0, 1, fluxValue);
  formatter.format(info, 1);
	chart.draw(info, options);
}, 500);
