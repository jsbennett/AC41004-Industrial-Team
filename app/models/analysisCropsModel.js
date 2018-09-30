/*
*
*This model is used to package information for the crop analysis section on a farm
*
*/

function analysisCropModel(
    crop,
    harvestedNumber,
    notHarvestedNumber,
    averagePH,
    averageSoilMoisture,
    noData
) {
    this.crop = crop;
    this.harvestedNumber = harvestedNumber;
    this.notHarvestedNumber = notHarvestedNumber;
    this.averagePH = averagePH;
    this.averageSoilMoisture = averageSoilMoisture;
    this.noData = noData;
}

module.exports = analysisCropModel;
