$.ajax({
  url: '/api/getField/1',
  success: function(data) {
    var today = new Date();
    var growthStage1 = data['field'].image1Date;
    var growthStage2 = data['field'].image2Date;
    var growthStage3 = data['field'].image3Date;
    var growthStage4 = data['field'].image4Date;
    var growthStage5 = data['field'].image5Date;
    console.log(data['field'].image1Date);
    if ((Date.parse(today) - Date.parse(growthStage1))>0) {
      console.log("success");
      document.getElementById('plantImg').src ='/images/plant1.png';
    }
  }
})
