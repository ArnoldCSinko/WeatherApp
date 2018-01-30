/*
    Written By: Arnold C. Sinko
    Updated: 4/20/17
*/
var appID = /* Omitted */;
var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";

function Weather(country, city, tempK, tempF, tempC, condition, icon) {
    this.country = country;
    this.city = city;
    this.tempK = tempK;
    this.tempF = tempF;
    this.tempC = tempC;
    this.condition = condition;
    this.icon = icon;
}

// function displays weather information to user from given weather object
function displayWeather(weather) {

    $('#location').html(weather.country + ', ' + weather.city);
    $('#tempF').html(weather.tempF + '<span class="tempDeg"> ' + String.fromCharCode(176) + 'F</span>');
    $('#tempC').html(weather.tempC + '<span class="tempDeg"> ' + String.fromCharCode(176) + 'C</span>');
    $('#condition').html(weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1) + '<span class="imageSpan"><img class="weatherImg" alt="Weather Iamge" /></span>');
    $('.weatherImg').attr('src', weather.icon);
}

$(function () {
    //Make AJAX request for JSON data of user location
    var locationAPIURL = "https://ipinfo.io/json";
    $.getJSON(locationAPIURL, function(location) {
        var city = location.city;
        var country = location.country;
        var latLonArray = location.loc.split(',');
        var locString = city + ',' + country;
        //append apiURL String with users location and appID.
        apiURL += locString + appID;
        getWeather();

    });
    // toggle between fahrenheit and celsius
    $('.temp').on('click', function () {
        $('.temp').toggleClass('hidden');
    });


});


//Make AJAX request for JSON weather data and create a new weather object with the data.
//Then pass the weather object to the function displayWeather(WeatherObject).
function getWeather() {
    var iconURL = 'http://api.openweathermap.org/img/w/';
    $.getJSON(apiURL, function (data) {

        var localWeather = new Weather();
        localWeather.condition = data.weather[0].description;
        iconURL += data.weather[0].icon;
        localWeather.icon = iconURL;
        localWeather.city = data.name;
        localWeather.country = data.sys.country;
        var tempK = parseInt(data.main.temp);
        localWeather.tempK = tempK;
        var tempF = Math.round(tempK * (9 / 5) - 459.67);
        var tempC = Math.round(tempK - 273.15);
        localWeather.tempF = tempF;
        localWeather.tempC = tempC;
        displayWeather(localWeather);

    });

}
