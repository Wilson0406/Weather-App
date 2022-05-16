let weather = {
    "api-key" : "YOUR-API-KEY",
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            + city
            + '&appid='
            + this["api-key"]
            + "&units=metric"
            )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));        
    },
    displayWeather: function(data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like, pressure, temp_min, temp_max } = data.main;
        const { speed } = data.wind;
        
        console.log(name, icon, description, temp, humidity, speed);
        document.getElementById("city").innerHTML = name + ", " + country;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
        document.getElementById("description").innerHTML = description;
        document.getElementById("temp").innerHTML = temp + "°";
        document.getElementById("feels").innerHTML = "Feels like: " + feels_like + "°C";
        document.getElementById("pressure").innerHTML = "Pressure : " + pressure + " mb";
        document.getElementById("max").innerHTML = "Maximum: " + temp_max + "°C";
        document.getElementById("min").innerHTML = "Minimum: " +  temp_min + "°C";
        document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
        document.getElementById("wind").innerHTML = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name + "')";
    },
    search: function () {
        this.fetchWeather(document.getElementById('search-bar').value);        
    }
};

let geocode = {
    reverseGeocode: function (latitude, longitude) {
        var api_key = 'YOUR-GEOCODE-API';
      
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'
      
        var request_url = api_url
          + '?'
          + 'key=' + api_key
          + '&q=' + encodeURIComponent(latitude + ',' + longitude)
          + '&pretty=1'
          + '&no_annotations=1';
      
        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward
      
        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);
      
        request.onload = function() {
          // see full list of possible response codes:
          // https://opencagedata.com/api#codes
      
          if (request.status === 200){
            // Success!
            var data = JSON.parse(request.responseText);
            console.log(data.results[0].components.state); // print the location
            weather.fetchWeather(data.results[0].components.state);
      
          } else if (request.status <= 500){
            // We reached our target server, but it returned an error
      
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
          } else {
            console.log("server error");
          }
        };
      
        request.onerror = function() {
          // There was a connection error of some sort
          console.log("unable to connect to server");
        };
      
        request.send();  // make the request
      },
geolocation: function () {
    function success(data) {
        geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, console.error);
        
    } else {
        weather.fetchWeather('Delhi');
    }
}

    };

document.getElementById('search-btn').addEventListener('click', function () {
weather.search();
});

document.getElementById('search-bar').addEventListener('keyup', function(event) {
    if(event.key == "Enter"){
        weather.search();
    }
});

geocode.geolocation();
