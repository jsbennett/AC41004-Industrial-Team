<script type="text/javascript">
  google.charts.load('current', { 'packages': ['gauge'] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {

    var info = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Moisture', 0]
    ]);

    var options = {
      width: 400, height: 160,
      redColor: "#FF9900",
      yellowFrom: 0, yellowTo: 25,
      redFrom: 75, redTo: 100,
      greenFrom: 25, greenTo: 75,
      minorTicks: 5
    };

      var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

      //replace 5 with the moisture variable
      var min = 5 - 1;
      var max = 5 + 2;

      chart.draw(info, options);

      setInterval(function() {
        info.setValue(0, 1, Math.floor(Math.random() * (max - min) ) + min) ;
        chart.draw(info, options);
      }, 500);

    }

</script>
