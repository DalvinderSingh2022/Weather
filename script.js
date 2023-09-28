const aside = document.querySelector("aside");
const weatherDetail = document.querySelector(".weatherdetail .container");

const API = {
    url: 'https://api.openweathermap.org/data/2.5/',
    key: '5b06ceeda0838f40051088443b0d2c80',
    header: {
        headers: {
            Accept: "application/json",
        },
        method: "GET",
        mode: "cors",
    }
}

const currentWeather = async (place) => {
    try {
        const response = await fetch(API.url + `weather?q=${place}&unit=metric&appid=` + API.key, API.header)
        const result = await response.json();
        console.log(result);

        aside.innerHTML = `
        <div class="locationInfo">
            <div class="loaction"> ${result.sys.country} , ${result.name}</div>
            <div class="date">${new Date().toDateString()}</div>
        <div>
        <div class="weatherCard">
            <div class='tempInfo'>
                <div class="temp">${result.main.temp}</div>
                <div class="condition">${result.weather[0].description}</div>
            </div>
            <img src="./icons/${result.weather[0].icon}.png" alt="${result.weather[0].description}">
        </div>`;

        weatherDetail.innerHTML = `
                <div class="group">
                    <div class='header'>
                        <span class='title'>Humidity</span>
                        <span class="icon material-symbols-outlined">humidity_low</span>
                    </div>
                    <span class="value">${result.main.humidity}</span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Pressure</span>
                        <span class="icon material-symbols-outlined">airwave</span>
                    </div>
                    <span class="value">${result.main.pressure}</span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Wind</span>
                        <span class="icon material-symbols-outlined">air</span>
                    </div>
                    <span class="value">${result.wind.speed}</span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Feel Like</span>
                        <span class="icon material-symbols-outlined">device_thermostat</span>
                    </div>
                    <span class="value"> ${result.main.feels_like}</span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Max Temperature</span>
                        <span class="icon material-symbols-outlined">thermometer_gain</span>
                    </div>
                    <span class="value"> ${result.main.temp_max}</span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Min Temperature</span>
                        <span class="icon material-symbols-outlined">thermometer_loss</span>
                    </div>
                    <span class="value"> ${result.main.temp_min}</span>
                </div>`;

    } catch (e) {
        console.log(e)
    }
}


currentWeather("delhi");