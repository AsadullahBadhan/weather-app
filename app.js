const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const placeName = document.getElementById("place-name");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather");
const weatherImg = document.getElementById("weather-img");
const form = document.getElementById("place-form");

let icon;
let url = "https://api.openweathermap.org/data/2.5/weather?appid=2c0784a6ac7fdd50f8df729001f67b8d&units=metric&q=";
let defaultUrl = url + 'dhaka';

window.addEventListener('DOMContentLoaded', callApi)

window.addEventListener('submit', function (e) {
    e.preventDefault();
    let searchBoxValue = searchBox.value;
    if (searchBoxValue.includes(" ")) {
        searchBoxValue = searchBoxValue.replace(" ", "%20");
        defaultUrl = url + searchBoxValue;
    } else {
        defaultUrl = url + searchBoxValue;
    }
    callApi();
    searchBox.value = '';
});

function callApi() {
    fetch(defaultUrl)
        .then((res) => res.json())
        .then((data) => getWeather(data));
}

function getWeather(data) {
    console.log(data)
    //showing city name
    placeName.innerText = data.name;
    // get temperature
    const mainData = data.main;
    const temp = Math.round(mainData.temp);
    temperature.innerText = temp;
    //getCondition
    const weather = data.weather[0];
    icon = weather.icon;
    weatherCondition.innerText = weather.description;
    //showing condition image
    let imageSrc = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    weatherImg.src = imageSrc;
}

