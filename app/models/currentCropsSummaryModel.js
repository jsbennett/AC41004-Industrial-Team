/*
*
*This model is used to package information for the crop summary section on a farm
*
*/
function currentCropsSummaryModel(cropName, expectedHarvestDate) {
    this.cropName = cropName;
    this.expectedHarvestDate = expectedHarvestDate;
}

module.exports = currentCropsSummaryModel;
