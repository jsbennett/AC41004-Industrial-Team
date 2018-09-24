function analysisCropModel(
    crop,
    plantDate,
    FarmFieldID,
    harvestedNumber,
    notHarvestedNumber,
    averagePH,
    averageSoilMoisture
) {
    this.crop = crop;
    this.plantDate = plantDate;
    this.FarmFieldID = FarmFieldID;
    this.harvestedNumber = harvestedNumber;
    this.notHarvestedNumber = notHarvestedNumber;
    this.averagePH = averagePH;
    this.averageSoilMoisture = averageSoilMoisture;
}

module.exports = analysisCropModel;
