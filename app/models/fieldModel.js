function fieldModel(farmFieldID, cropName, datePlanted, expectedHarvest, timeToMature, phLevel, moistureLevel, image)
{
    this.farmFieldID = farmFieldID; 
    this.cropName = cropName;
    this.datePlanted = datePlanted; 
    this.expectedHarvest = expectedHarvest; 
    this.timeToMature = timeToMature; 
    this.phLevel = phLevel; 
    this.moistureLevel = moistureLevel; 
    this.image = image; 
};

module.exports = fieldModel; 