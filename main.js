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
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.getElementById("city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.getElementById("description").innerHTML = description;
        document.getElementById("temp").innerHTML = temp + "°C";
        document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
        document.getElementById("wind").innerHTML = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name + "')";
    },
    search: function () {
        this.fetchWeather(document.getElementById('search-bar').value);        
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

weather.fetchWeather('Delhi');
