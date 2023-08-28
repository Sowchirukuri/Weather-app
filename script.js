const apiKey = 'c7332d3efada41f39b7f4cba5cad53a9';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherCard = document.getElementById('weatherCard');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (city !== '') {
    getWeather(city);
}
});

const searchHistory = document.getElementById('searchHistory');

// Initialize search history array
let historyArray = [];

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (city !== '') {
    getWeather(city);
  }
});

searchHistory.addEventListener('click', (event) => {
  if (event.target.classList.contains('history-item')) {
    const city = event.target.textContent;
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    displayWeather(data);
    updateSearchHistory(city);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(data) {

}

function updateSearchHistory(city) {
  if (!historyArray.includes(city)) {
    historyArray.push(city);
    renderSearchHistory();
  }
}

function renderSearchHistory() {
  searchHistory.innerHTML = '';
  historyArray.forEach(city => {
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.textContent = city;
    searchHistory.appendChild(historyItem);
  });
}

// Initial render of search history
renderSearchHistory();
