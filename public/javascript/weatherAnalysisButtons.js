google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawLineColors);

var weatherData;
var chartType = 'Temperature';
var curMonth;

function displayAnalysis(month) {
	$('#slider').val(month);
	showVal(month);
}

$(document).ready(function() {
	var d = new Date();
	var n = d.getMonth();
	$('#display' + n).show();
	$('#' + n).removeClass('btn-secondary');
	$('#' + n).addClass('btn-primary');
	weatherData = $('#data').data().bind;
	for (var i = 0; i < weatherData.weatherMonths.length; i++) {
		if (weatherData.weatherMonths[i].days == 'No Data') {
			$('#' + i).attr('disabled', true);
		} else {
			$('#' + i).attr('disabled', false);
		}
	}
});

function drawLineColors(m) {
	var weatherData = $('#data').data().bind;
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'X');
	data.addColumn('number', chartType);

	if (m == undefined) {
		m = new Date().getMonth();
	}

	curMonth = m;

	var superRow = [];
	for (var j = 0; j < weatherData.weatherMonths[m].days.length; j++) {
		var row = [];
		row.push(
			String(weatherData.weatherMonths[m].days[j].date).split('T')[0]
		);
		if (chartType == 'Temperature') {
			row.push(weatherData.weatherMonths[m].days[j].temp);
		} else if (chartType == 'Humidity') {
			row.push(weatherData.weatherMonths[m].days[j].humidity);
		} else {
			row.push(weatherData.weatherMonths[m].days[j].wind);
		}
		superRow.push(row);
	}
	data.addRows(superRow);

	//data.addRows();
	var colors = [];
	colors.push(getRandomColor());

	var title;
	if (chartType == 'Temperature') {
		title = 'Temperature (Celsius)';
	} else if (chartType == 'Humidity') {
		title = 'Humidity (Percentage)';
	} else {
		title = 'Wind Speed(mph)';
	}

	var options = {
		hAxis: {
			title: 'Date'
		},
		vAxis: {
			title: title
		},
		legend: { position: 'top' },
		colors: colors
	};

	var chart = new google.visualization.LineChart(
		document.getElementById('chart_div')
	);
	chart.draw(data, options);
}

//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function showVal(val) {
	for (var i = 0; i < 12; i++) {
		$('#' + i).removeClass('btn-primary');
	}
	$('#' + val).addClass('btn-primary');
	drawLineColors(val);
}

function temperature() {
	$('#humiditybtn').removeClass('btn-primary');
	$('#windbtn').removeClass('btn-primary');
	$('#temperaturebtn').addClass('btn-primary');
	chartType = 'Temperature';
	showVal(curMonth);
}

function humidity() {
	$('#temperaturebtn').removeClass('btn-primary');
	$('#windbtn').removeClass('btn-primary');
	$('#humiditybtn').addClass('btn-primary');
	chartType = 'Humidity';
	showVal(curMonth);
}

function wind() {
	$('#humiditybtn').removeClass('btn-primary');
	$('#temperaturebtn').removeClass('btn-primary');
	$('#windbtn').addClass('btn-primary');
	chartType = 'Wind Speed';
	showVal(curMonth);
}
