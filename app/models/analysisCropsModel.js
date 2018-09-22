function analysisCropModel(
    crop,
    FarmFieldID,
    readyToHarvest,
    averagePH,
    averageSoilMoisture
) {
    this.crop = crop;
    this.FarmFieldID = FarmFieldID;
    this.readyToHarvest = readyToHarvest;
    this.averagePH = averagePH;
    this.averageSoilMoisture = averageSoilMoisture;
}

module.exports = analysisCropModel;
