function analysisCropModel(
    crop,
    plantDate,
    FarmFieldID,
    readyToHarvest,
    averagePH,
    averageSoilMoisture
) {
    this.crop = crop;
    this.plantDate = plantDate;
    this.FarmFieldID = FarmFieldID;
    this.readyToHarvest = readyToHarvest;
    this.averagePH = averagePH;
    this.averageSoilMoisture = averageSoilMoisture;
}

module.exports = analysisCropModel;
