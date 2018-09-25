google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawLineColors);

var fieldData;
var chartType = 'moisture';
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
	fieldData = $('#data').data().bind;
	for (var i = 0; i < fieldData.fields.length; i++) {
		for (var j = 0; j < fieldData.fields[i].months.length; j++) {
			$('#' + j).attr('disabled', fieldData.fields[i].months[j].noData);
		}
	}
});

function drawLineColors(m) {
	var fieldData = $('#data').data().bind;
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'X');
	for (var i = 0; i < fieldData.fields.length; i++) {
		data.addColumn(
			'number',
			'Field: ' + String(fieldData.fields[i].fieldID)
		);
	}
	if (m == undefined) {
		m = new Date().getMonth();
	}

	curMonth = m;

	var dates = [];
	for (var i = 0; i < fieldData.fields[0].months[m].days.length; i++) {
		dates.push(fieldData.fields[0].months[m].days[i].date);
	}

	var superRow = [];
	for (var k = 0; k < dates.length; k++) {
		var row = [];
		row.push(String(dates[k]).split('T')[0]);
		for (var j = 0; j < fieldData.fields[0].months[m].days.length; j++) {
			for (var i = 0; i < fieldData.fields.length; i++) {
				if (fieldData.fields[0].months[m].days[j].date == dates[k]) {
					if (chartType == 'ph') {
						row.push(fieldData.fields[i].months[m].days[j].ph);
					} else {
						row.push(
							fieldData.fields[i].months[m].days[j].moisture
						);
					}
				}
			}
		}
		superRow.push(row);
	}
	data.addRows(superRow);

	//data.addRows();
	var colors = [];
	for (var i = 0; i < fieldData.fields.length; i++) {
		colors.push(getRandomColor());
	}

	var title;
	if (chartType == 'ph') {
		title = 'PH Value';
	} else {
		title = 'Percent';
	}

	var options = {
		hAxis: {
			title: 'Date'
		},
		vAxis: {
			title: 'Value'
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

function ph() {
	$('#moisture').removeClass('btn-primary');
	$('#ph').addClass('btn-primary');
	chartType = 'ph';
	showVal(curMonth);
}

function moisture() {
	$('#ph').removeClass('btn-primary');
	$('#moisture').addClass('btn-primary');
	chartType = 'moisture';
	showVal(curMonth);
}
