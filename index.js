function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let dayIndex = date.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthIndex = date.getMonth();
  let calendar = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = week[dayIndex];
  let month = calendar[monthIndex];
  let todayDate = date.getDate();

  return `${day} ${month} ${todayDate}, ${hours}:${min}`;
}

let currentTime = new Date();
let dayData = document.querySelector("#today");
dayData.innerHTML = formatDate(currentTime);

// Search City & Temperature Input

function displayWeather(response) {
  console.log(response.data);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();

  let city = document.querySelector("#searchCity").value;
  searchCity(city);

  //  let searchInput = document.querySelector("#searchCity");
  // let city = document.querySelector("#city");
  // city.innerHTML = searchInput.value;
  // searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "cab5b6ee74c93775e95f76838552f1ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

//Current Location

function showCurrentPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "cab5b6ee74c93775e95f76838552f1ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

// 2

let currentLocationButton = document.querySelector("#currentLocation-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");

// Bonus challenge3 - wk4

//function convertToFahrenheit(event) {
//event.preventDefault();
//let temp = document.querySelector("#temperature");
//temp.innerHTML = "64";
// }

//function convertToCelsius(event) {
//event.preventDefault();
//let temp = document.querySelector("#temperature");
//temp.innerHTML = "18";
// }

// let fahrenLink = document.querySelector("#fahrenheit");
// fahrenLink.addEventListener("click", convertToFahrenheit);

// let CelLink = document.querySelector("#celsius");
// CelLink.addEventListener("click", convertToCelsius);
