const currentDetail = document.querySelector("aside .currentdetail");
const weatherDetail = document.querySelector(".weatherdetail .container");
const hourlyDetail = document.querySelector(".hourlydetail .container");
const upcomingDaysDetail = document.querySelector(".upcomingdaysdetail .container");
const convertor = document.querySelector('.convertor');
const form = document.querySelector('form');
const geoLocation = document.querySelector('.geolocation');

var isFahrenheit = false;
var search = 'delhi';
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

const conversion = (kelvin) => isFahrenheit ? (((kelvin).toFixed(2) - 273.15) * 9 / 5 + 32).toFixed(2) + '<span class="unit">°F</span>' : ((kelvin).toFixed(2) - 273.15).toFixed(2) + '<span class="unit">°C</span>';

const currentWeather = async () => {
    try {
        const response = await fetch(API.url + `weather?q=${search}&unit=metric&appid=` + API.key, API.header)
        const result = await response.json();

        currentDetail.innerHTML = `
        <div class="location">${result.name}</div>
        <div class="date">${new Date().toDateString()}</div>
        <div class="condition">${result.weather[0].description}</div>
        <div class="temp">${conversion(result.main.temp)}</div>
         <img src="./icons/${result.weather[0].icon}.png" alt="${result.weather[0].description}">`;

        weatherDetail.innerHTML = `
                <div class="group">
                    <div class='header'>
                        <span class='title'>Humidity</span>
                        <span class="icon material-symbols-outlined">humidity_low</span>
                    </div>
                    <span class="value">${result.main.humidity}<span class="unit">%</span></span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Pressure</span>
                        <span class="icon material-symbols-outlined">airwave</span>
                    </div>
                    <span class="value">${result.main.pressure}<span class="unit">hPa</span></span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Wind</span>
                        <span class="icon material-symbols-outlined">air</span>
                    </div>
                    <span class="value">${result.wind.speed}<span class="unit">m/s</span></span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Feel Like</span>
                        <span class="icon material-symbols-outlined">device_thermostat</span>
                    </div>
                    <span class="value"> ${conversion(result.main.feels_like)}</span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Max Temperature</span>
                        <span class="icon material-symbols-outlined">thermometer_gain</span>
                    </div>
                    <span class="value"> ${conversion(result.main.temp_max)}</span>
                </div>
                <div class="group">
                    <div class='header'>
                        <span class='title'>Min Temperature</span>
                        <span class="icon material-symbols-outlined">thermometer_loss</span>
                    </div>
                    <span class="value"> ${conversion(result.main.temp_min)}</span>
                </div>`;
        hourlyData();
    } catch (e) {
        console.error(e);
        error();
    }
}


const hourlyData = async () => {
    try {
        const coordinates = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&unit=metric&appid=${API.key}`);
        const position = await coordinates.json();
        const response = await fetch(`${API.url}forecast/?lat=${position[0].lat}&lon=${position[0].lon}&unit=metric&appid=${API.key}`)
        const result = await response.json();
        hourlyDetail.innerHTML = '';
        upcomingDaysDetail.innerHTML = '';

        result.list.forEach(element => {
            if (!(new Date(element.dt_txt).getHours())) {
                upcomingDaysDetail.innerHTML += `
                <div class="group">
                    <div class='header'>
                        <span class='title'>${new Date(element.dt_txt).toDateString().slice(0, -5)}</span>
                        <span>${element.weather[0].description}</span>
                    </div>
                    <div class="info">
                       <img src="./icons/${element.weather[0].icon}.png" alt="${element.weather[0].description}">
                       <div class="column">
                            <div class="header">
                                <div class='title' title="Min temperature">${conversion(element.main.temp_min)}</div>
                                <span class="icon material-symbols-outlined">thermometer_loss</span>
                            </div>
                            <div class="header">
                                <div class='title' title="Max temperature">${conversion(element.main.temp_max)}</div>
                                <span class="icon material-symbols-outlined">thermometer_gain</span>
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            if (new Date(element.dt_txt).getTime() > new Date().getTime() && new Date(element.dt_txt).getTime() < (new Date().getTime() + 10800000 * 6)) {
                hourlyDetail.innerHTML += `
                <div class="group">
                    <div class='header'>
                        <span class='title'>${new Date(element.dt_txt).toLocaleTimeString()}</span>
                    </div>
                    <img src="./icons/${element.weather[0].icon}.png" alt="${element.weather[0].description}">
                    <div class='header'>
                        <span class="title">${conversion(element.main.temp)}</span>
                    </div>
                 </div>`;
            }
        });
    } catch (e) {
        console.error(e);
        error();
    }
}

const loading = () => {
    [currentDetail, weatherDetail, hourlyDetail, upcomingDaysDetail]
        .forEach(el => el.innerHTML = '<span class="loader material-symbols-outlined">clock_loader_20</span > ');
}

const error = () => {
    [currentDetail, weatherDetail, hourlyDetail, upcomingDaysDetail].forEach(el => el.innerHTML =
        `<div class="error"><span class="material-symbols-outlined">crisis_alert</span>No data available for ${search}</div>`);
    const backBtn = document.createElement('button');
    backBtn.addEventListener("click", () => {
        search = 'delhi';
        loading();
        currentWeather();
    });
    backBtn.innerText = 'Back'
    backBtn.className = 'back';
    currentDetail.append(backBtn);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value) {
        search = input.value;
        loading();
        currentWeather();
    };
});

convertor.addEventListener('change', (e) => {
    isFahrenheit = e.target.checked;
    currentWeather();
});

geoLocation.addEventListener("click", () => {
    const successCallback = async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=` + API.key);
        const place = await response.json();
        search = place[0].name;
        loading();
        currentWeather();
    };
    navigator.geolocation.getCurrentPosition(successCallback);
})

loading();
currentWeather();