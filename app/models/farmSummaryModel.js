/*
*
*This model is used to package information for the crop and weather summary section on a farm
*
*/
function farmSummaryModel(crops, weather) {
    this.crops = crops;
    this.weather = weather;
}

module.exports = farmSummaryModel;
