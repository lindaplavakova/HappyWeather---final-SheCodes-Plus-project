

// function that views current day of the week and time under the main photo


function showDayTime() {
  let now = new Date();
  let currentHour = now.getHours();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[day];
  let dateSection = document.querySelector("#current-date");
  let currentMinute = now.getMinutes();
  if (currentMinute > 9) {
    dateSection.innerHTML = `Last updated on: ${currentDay} ${currentHour}:${currentMinute}`;
  } else {
    dateSection.innerHTML = `Last updated on: ${currentDay} ${currentHour}:0${currentMinute}`;
  }
}


showDayTime();

//api key for Open Weather Map
let apiKey = "dc266af0719230920ce97e61b0255f6f";

//function that shows the user the selected city name and current temperature there
function changeCity(event) {
  event.preventDefault();
  let heading = document.querySelector("h1");
  let cityInput = document.querySelector("#example-input-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

//function for showing the current weather in the selected city
function showTemp(response) {
  console.log(response.data);
  let currentPlace = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentCondition = response.data.weather[0].description;
  let currentWind = Math.round((response.data.wind.speed)*3.6);
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let tempShown = document.querySelector("#current-temp");
  let iconElement = document.querySelector("#icon");
  let conditionElement = document.querySelector("#condition");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");

  tempShown.innerHTML = `${temperature}°C`;
  let heading = document.querySelector("h1");
  heading.innerHTML = `${currentPlace}, ${currentCountry}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  conditionElement.innerHTML = `${currentCondition} <br>`;
  windElement.innerHTML = `${currentWind} km/h<br>`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`

}

//run the function changeCity if the user submits a city in the searchbox
let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", changeCity);

//function that locates the user and shows the weather in the location
function locateMe() {
  
  function logWeatherHere(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  
}  

navigator.geolocation.getCurrentPosition(logWeatherHere);
}

//run the locateMe function if the user clicks on Locate me button
let locateButton = document.querySelector("#locate-btn");
locateButton.addEventListener("click", locateMe);

