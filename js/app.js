/*
    Written By: Arnold C. Sinko
    Updated: 5/27/2018
*/


/*
    Weather Class: Defines a weather object.
    
*/
class Weather {
    constructor(country, city, tempK, tempC, tempF, condition, icon) {
        this._country = country;
        this._city = city;
        this._tempK = tempK;
        this._tempF = tempF;
        this._tempC = tempC;
        this._condition = condition;
        this._icon = icon;
    }

    get country() {
        return this._country;
    }

    get city() {
        return this._city;
    }

    get tempK() {
        return this._tempK;
    }

    get tempC() {
        return this._tempC;
    }
    get tempF() {
        return this._tempF;
    }

    get condition() {
        return this._condition;
    }

    get icon() {
        return this._icon;
    }

}

/*
    Helper functions
*/

// Displays weather information to user from given weather object
function displayWeather({ country, city, tempC, tempF, condition, icon }) {
    $('#location').html(country + ', ' + city);
    $('#tempF').html(tempF + '<span class="tempDeg"> ' + String.fromCharCode(176) + 'F</span>');
    $('#tempC').html(tempC + '<span class="tempDeg"> ' + String.fromCharCode(176) + 'C</span>');
    $('#condition').html(condition.charAt(0).toUpperCase() + condition.slice(1) + '<span class="imageSpan"><img class="weatherImg" alt="Weather Iamge" /></span>');
    $('.weatherImg').attr('src', icon);
}

// Create a Weather object from JSON data
function makeWeatherObject(data) {
    let iconURL = 'http://api.openweathermap.org/img/w/';
    const { description: condition, icon } = data.weather[0];
    iconURL += icon;
    const city = data.name;
    const country = data.sys.country;
    const tempK = parseInt(data.main.temp);
    const { tempF, tempC } = convertFromKelvin(tempK);
    return new Weather(country, city, tempK, tempC, tempF, condition, iconURL);
}

// Make AJAX request for JSON weather data
// Then pass the weather object to the function displayWeather(WeatherObject).
function getWeather(location) {
    const appID = "&appid=82779f2d14e57a0b79d137998db504ca";
    let apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
    apiURL += location + appID;
    $.getJSON(apiURL, function (data) {
        const localWeather = makeWeatherObject(data);
        displayWeather(localWeather);
    });
}

// Return object containing temperature data converted from Kelvin
function convertFromKelvin(tempK) {
    return {
        tempF: Math.round(tempK * (9 / 5) - 459.67),
        tempC: Math.round(tempK - 273.15)
    }
}

/*  
    Main
*/
$(function () {
    //Make AJAX request for JSON data of user location
    var locationAPIURL = "https://ipinfo.io/json";
    $.getJSON(locationAPIURL, function (location) {
        const { city, country } = location;
        const locString = city + ',' + country;
        //append apiURL String with users location and appID.
        getWeather(locString);
    });

    // toggle between fahrenheit and celsius
    $('.temp').on('click', function () {
        $('.temp').toggleClass('hidden');
    });

});


