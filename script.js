const apiKey = '271868c203b3584ca5b298b82f94b94b';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;

const output = document.getElementById('weather-output');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (!city) {
        output.innerHTML = `<p>Please, enter a location😊</p>`;
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const temperature = (data.main.temp - 273.15).toFixed(1);
            const description = data.weather[0].description;
            const location = data.name;

            output.innerHTML = `<h2>${location}</h2><p>🌡️Temperature in ${location}: ${temperature}°C</p>
                <p>☁️Weather: ${description}</p>`;
        })
        .catch(error => {
        console.error('Error:', error);
        });
});
