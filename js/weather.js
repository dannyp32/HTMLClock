(function($) {
    var getUserLoc = function() {
        navigator.geolocation.getCurrentPosition(
            function(geo) { 
                if (geo) {
                    getWeather(geo);
                }
            });
    }
    
    var getWeather = function(geo) {
        $.ajax({
 url:"https://api.forecast.io/forecast/f6bf5ad03324ee03295b1ad3ad9feff1/" + geo.coords.latitude + "," + geo.coords.longitude,
            dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
            success: function (weatherData) {
                console.log(weatherData);
                displayWeather(weatherData);
            },
            error:function(){
                alert("Error");
            }     
        });
    }
    
    var displayWeather = function(weatherData) {
        if (weatherData) {
            dailyWeather = weatherData.daily.data;
            
            for (var i = 0; i < 5; i++) {
                $("#day" + i).html(
                    '<img class="weather-icon" src="images/' + dailyWeather[i].icon + '.png"></img>' + 
                    '<div class="degrees">' + (dailyWeather[i].TemperatureMax | 0) + '<span class="degrees-symbol">°</span></div>' + 
                    '<div class="weather-description">' + getWeatherDescription(dailyWeather[i].icon) + '</div>'
                );         
            }
        }
    }
    
    var getWeatherDescription = function (iconName) {
        switch (iconName) {
                case "clear-day": 
                    return "Sunny";
                case "clear-night": 
                    return "Clear";
                case "Cloudy": 
                    return "Cloudy";
                case "fog":
                    return "Foggy";
                case "partly-cloudy-day":
                    return "Partly Cloudy";
                case "partly-cloudy-night":
                    return "Partly Cloudy";
                case "rain":
                    return "Rain";
                case "sleet":
                    return "Sleet";
                case "snow":
                    return "Snow";
                case "wind":
                    return "Windy";
                default:
                    return "Clear";
        }
    }
    
    getUserLoc();
})(jQuery);
