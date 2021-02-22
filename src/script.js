//days of the week
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

// some initial variables
let currentTemperature = null;
let currentLong = null;
let currentLat = null;

//locate the user right away when they load the page
locateMe();

//function to display local time and day
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

//function that selects a different city according to what user searched for in the searchbox
function changeCity(event) {
  event.preventDefault();
  let heading = document.querySelector("h1");
  let cityInput = document.querySelector("#input-city");



  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showTemp);

}

//function for showing the current weather in the selected city + forecast
function showTemp(response) {

  let currentPlace = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentCondition = response.data.weather[0].description;
  let currentWind = Math.round((response.data.wind.speed)*3.6);
  currentTemperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let tempShown = document.querySelector("#current-temp");
  let iconElement = document.querySelector("#icon");
  let conditionElement = document.querySelector("#condition");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");

  tempShown.innerHTML = `${currentTemperature}°C`;
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

 currentLat = response.data.coord.lat;
 currentLong = response.data.coord.lon;
 console.log(currentLat);
 console.log(currentLong);


 

 apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showForecast);
  


}

//run the function changeCity if the user submits a city in the searchbox
let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", changeCity);

//function that locates the user and shows the weather in the location
function locateMe() {
  
  function logWeatherHere(position) {
  currentLat = position.coords.latitude;
  currentLong = position.coords.longitude;
  
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

  }

navigator.geolocation.getCurrentPosition(logWeatherHere);
}
  

//run the locateMe function if the user clicks on Locate me button
let locateButton = document.querySelector("#locate-btn");
locateButton.addEventListener("click", locateMe);


//function to generate forecast for 5 days (today+4)
function showForecast(response) {
  

let forecastElement = document.querySelector("#forecast");
let forecast = (response.data.daily[0]);
let weekDay = days[new Date(forecast.dt* 1000).getDay()];
forecastElement.innerHTML = ``;
forecastElement.innerHTML = forecastElement.innerHTML +
`<div class="col">
            Today <br>
            ${Math.round(forecast.temp.max)}°C <br>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="small-icon" width=40px >
        </div>
`
forecast = (response.data.daily[1]);
weekDay = days[new Date(forecast.dt* 1000).getDay()];
forecastElement.innerHTML = forecastElement.innerHTML +
` <div class="col">
            Tomorrow <br>
            ${Math.round(forecast.temp.max)}°C <br>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="small-icon" width=40px >
        </div>`


for (let index = 2; index < 5; index++) 
{

forecast = (response.data.daily[index]);
weekDay = days[new Date(forecast.dt* 1000).getDay()];
forecastElement.innerHTML = forecastElement.innerHTML +
` <div class="col">
            ${weekDay} <br>
            ${Math.round(forecast.temp.max)}°C<br>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="small-icon" width=40px >
        </div>`   
      }
}




  
