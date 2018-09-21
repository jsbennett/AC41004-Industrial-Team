function analysisWeatherModel(
    month,
    avgTemp,
    avgWind,
    avgHumidity,
    daysRained
) {
    this.month = month;
    this.avgTemp = avgTemp;
    this.avgWind = avgWind;
    this.avgHumidity = avgHumidity;
    this.daysRained = daysRained;
}

module.exports = analysisWeatherModel;
