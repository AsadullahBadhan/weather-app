const searchBox = document.getElementById("search-box");
const form = document.getElementById("search-form");

navigator.geolocation.getCurrentPosition((position) => {
    defaulWeather(position.coords.latitude, position.coords.longitude)
})

function defaulWeather(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2c0784a6ac7fdd50f8df729001f67b8d&units=metric`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => getWeather(data));
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=2c0784a6ac7fdd50f8df729001f67b8d&units=metric&q=${searchBox.value}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => getWeather(data));
    searchBox.value = '';
});

function getWeather(data) {
    const weatherBody = document.getElementById('weather-body');

    //showing city name
    let placeName = data.name;
    // get temperature
    const mainData = data.main;
    const temp = Math.round(mainData.temp);
    //getCondition
    const weather = data.weather[0];
    const icon = weather.icon;
    let weatherCondition = weather.description;
    //showing condition image
    let imageSrc = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    console.log(data)

    weatherBody.innerHTML = `
                <img src=${imageSrc} alt="weather" />
				<h1>${placeName}</h1>
				<h3>${temp}&deg;C</h3>
				<h1 class="lead" id="weather">${weatherCondition}</h1>
    `
}