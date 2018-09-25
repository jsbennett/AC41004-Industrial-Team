google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawLineColors);

var fieldData = [];

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
	var months = $('#months').data().bind;
	for (var i = 0; i < 12; i++) {
		$('#' + i).attr('disabled', months[i].noData);
	}
});

function drawLineColors() {
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'X');
	data.addColumn('number', 'Dogs');
	data.addColumn('number', 'Cats');
	data.addColumn('number', 'Other');

	data.addRows([[0, 0, 0, 0], [10, 10, 5, 25], [20, 10, 5, 36]]);

	var options = {
		hAxis: {
			title: 'Date'
		},
		vAxis: {
			title: 'Value'
		},
		legend: { position: 'top' },
		colors: ['#a52714', '#097138', '#aa4466']
	};

	var chart = new google.visualization.LineChart(
		document.getElementById('chart_div')
	);
	chart.draw(data, options);
}

function showVal(val) {
	for (var i = 0; i < 12; i++) {
		$('#' + i).removeClass('btn-primary');
	}
	$('#' + val).addClass('btn-primary');
}
