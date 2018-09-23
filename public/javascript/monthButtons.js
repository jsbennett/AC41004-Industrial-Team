function displayCropAnalysis(month) {
	for (var i = 0; i < 12; i++) {
		$('#display' + i).hide();
	}
	$('#display' + month).show();
}
