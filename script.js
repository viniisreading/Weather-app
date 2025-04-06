const apiKey = '48fc71e613352f6c88e01611a696ed8c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('weather-icon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDesc = data.weather[0].description;
            const temp = Math.round(data.main.temp);

            locationElement.textContent = data.name;
            temperatureElement.textContent = `${temp}°C`;
            descriptionElement.textContent = weatherDesc;

            setWeatherTheme(weatherDesc);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function setWeatherTheme(description) {
    document.body.className = ""; // Clear all weather classes
    const desc = description.toLowerCase();

    if (desc.includes("cloud")) {
        document.body.classList.add("cloudy");
        iconElement.innerHTML = `<i class="fas fa-cloud"></i>`;
    } else if (desc.includes("rain")) {
        document.body.classList.add("rainy");
        iconElement.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
    } else if (desc.includes("snow")) {
        document.body.classList.add("snowy");
        iconElement.innerHTML = `<i class="fas fa-snowflake"></i>`;
    } else {
        document.body.classList.add("sunny");
        iconElement.innerHTML = `<i class="fas fa-sun"></i>`;
    }
}
