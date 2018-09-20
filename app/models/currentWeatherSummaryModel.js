function currentWeatherSummaryModel(season, weatherType, temperature, humidity, windStrength)
{
    this.season = season; 
    this.weatherType = weatherType;
    this.temperature = temperature; 
    this.humidity = humidity;
    this.windStrength = windStrength;  
};

module.exports = currentWeatherSummaryModel; 