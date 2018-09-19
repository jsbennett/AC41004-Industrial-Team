function fieldModel(farmFieldID, locationLong, locationLat, cropName, datePlanted, expectedHarvest, timeToMature, phLevel, moistureLevel, image1Date, image2Date,image3Date, image4Date,  image5Date)
{
    this.farmFieldID = farmFieldID; 
    this.locationLong = locationLong;
    this.locationLat = locationLat;
    this.cropName = cropName;
    this.datePlanted = datePlanted; 
    this.expectedHarvest = expectedHarvest; 
    this.timeToMature = timeToMature; 
    this.phLevel = phLevel; 
    this.moistureLevel = moistureLevel; 
    this.image1Date = image1Date;
    this.image2Date = image2Date
    this.image3Date = image3Date;
    this.image4Date = image4Date;
    this.image5Date = image5Date; 
};

module.exports = fieldModel; 