function fieldModel(farmFieldID, farmID, locationLong, locationLat, cropName, datePlanted, expectedHarvest, timeToMature, phLevel, moistureLevel)//consider using a dto instead
{
    this.farmFieldID = farmFieldID; 
    this.farmID = farmID; 
    this.locationLong = locationLong;
    this.locationLat = locationLat;
    this.cropName = cropName;
    this.datePlanted = datePlanted; 
    this.expectedHarvest = expectedHarvest; 
    this.timeToMature = timeToMature; 
    this.phLevel = phLevel; 
    this.moistureLevel = moistureLevel; 
};

module.exports = fieldModel; 