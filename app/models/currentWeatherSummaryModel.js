function currentWeatherSummaryModel(date, dayNumber, season, weatherType, temperature, humidity, windStrength)
{
    this.date = date; 
    this.dayNumber = dayNumber;
    this.season = season; 
    this.weatherType = weatherType;
    this.temperature = temperature; 
    this.humidity = humidity;
    this.windStrength = windStrength;  
};

module.exports = currentWeatherSummaryModel; 