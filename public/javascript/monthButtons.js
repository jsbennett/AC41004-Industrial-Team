function displayAnalysis(month) {
	for (var i = 0; i < 12; i++) {
		$('#display' + i).hide();
		$('#' + i).removeClass('btn-primary');
	}
	$('#display' + month).show();
	$('#' + month).addClass('btn-primary');
}

$(document).ready(function() {
	var d = new Date();
	var n = d.getMonth();
	$('#display' + n).show();
	$('#' + n).removeClass('btn-secondary');
	$('#' + n).addClass('btn-primary');
});
