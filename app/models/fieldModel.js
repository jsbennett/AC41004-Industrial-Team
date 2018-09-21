function fieldModel(farmFieldID, cropName, harvestMonth, harvestDay, datePlanted, timeToMature, phLevel, moistureLevel, image)
{
    this.farmFieldID = farmFieldID; 
    this.cropName = cropName;
    this.datePlanted = datePlanted; 
    this.harvestMonth = harvestMonth;
    this.harvestDay = harvestDay; 
    this.timeToMature = timeToMature; 
    this.phLevel = phLevel; 
    this.moistureLevel = moistureLevel; 
    this.image = image; 
};

module.exports = fieldModel; 