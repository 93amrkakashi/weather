let lang = localStorage.getItem("lang") ;
console.log(lang)
if (lang != "fr") {
  localStorage.setItem("lang","ar")
}

let toggleBtn = document.querySelector("#navbar-toggle");
let collapse = document.querySelector("#navbar-collapse");

toggleBtn.onclick = () => {
  collapse.classList.toggle("hidden");
  collapse.classList.toggle("flex");
};


function getInitialLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        lang = localStorage.getItem("lang")
        callWeatherAPI(lat, lng, lang);
      },
      function (error) {
        console.error("err", error.message);
      }
    );
  } else {
    console.error("wrong");
  }
}

document.addEventListener("DOMContentLoaded", getInitialLocation);
lang = localStorage.getItem("lang")

function callWeatherAPI(lat, lng, city, lang) {
  lang = localStorage.getItem("lang")
  console.log(lang)
  console.log("first")
  if (!city) {
    document.getElementById("curr").innerText = `${city}`;
  }else{
    document.getElementById("curr").innerText = ``;
  }
  const key = "15860d66bb940233e9dd3c943f17139f";
  const units = "metric";
  // lang = lang
  const url = lang =="ar" ? `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=ar`: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=fr`; 
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.daily);
      const weatherContainer = document.getElementById("weather");
      weatherContainer.innerHTML = "";
      const dailyWeatherHTML = data.daily
        .map(
          (day) => `
            <div class="day-container pb-4 px-1 text-indigo-600 w-[200px] border rounded-xl text-center hover:bg-indigo-600 hover:text-white transition-all duration-700">
              <div class="w-full">
              <p class="text-xl font-bold">${new Date(day.dt * 1000).toLocaleDateString("fr-FR")}</p>
              <div class="photo" >
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
                class="w-[250px] h-[250ox] -mt-9 " alt="${day.weather[0].description}"
                />
              </div>
              </div>
                <h3 class="text-bold text-lg font-md">${day.weather[0].description}</h3>
                  <p dir="rtl" class="text-bold text-lg font-md">${lang =="ar" ? "العظمى ":"maximale: "}${day.temp.max}&deg;C</p>
                  <p dir="rtl" class="text-bold text-lg font-md">${lang =="ar" ? "الصغرى ":"minimale: "}${day.temp.min}&deg;C</p>
                  <p dir="rtl" class="text-bold text-lg font-md">${lang =="ar" ? "الرياح ":"Vent :"}${day.wind_speed}m/s</p>
              </div>
          `
        )
        .join(""); 
      weatherContainer.innerHTML += dailyWeatherHTML;
    })
    .catch((error) => {
      console.error("err", error);
    });
}


function handleCityClick(event) {
  event.preventDefault();
  const lat = event.currentTarget.getAttribute("data-lat");
  const lng = event.currentTarget.getAttribute("data-lng");
  const city = event.currentTarget.getAttribute("data-city");
  lang = localStorage.getItem("lang")
  callWeatherAPI(lat, lng,lang);
  document.getElementById("curr").innerText = `${city}`;
}


function populateCities(lang) {
  const citiesList = document.getElementById("citiesList");
  citiesList.innerHTML = "";
  if (lang === "ar") {
    arTun.forEach((city) => {
      const cityTemplate = `
            <a href="#" 
                class="border-2 rounded-lg text-center text-md w-[150px] py-1 px-2 hover:bg-indigo-600 hover:text-white transition-all duration-700"
                data-lat="${city.lat}" 
                data-lng="${city.lng}"
                data-city="${city.city}"
                onclick="handleCityClick(event)"
            >
                <span class="w-full">
                    ${city.city}
                </span>
            </a>
        `;

      citiesList.innerHTML += cityTemplate;
    });
  }
  frTun.forEach((city) => {
    const cityTemplate = `
          <a href="#" 
              class="border-2 rounded-lg text-center text-md w-[150px] py-1 px-2 hover:bg-indigo-600 hover:text-white transition-all duration-700"
              data-lat="${city.lat}" 
              data-lng="${city.lng}"
              data-city="${city.city}"
              onclick="handleCityClick(event)"
          >
              <span class="w-full">
              ${city.city}
              </span>
          </a>
      `;

    citiesList.innerHTML += cityTemplate;
  });
}

document.addEventListener("DOMContentLoaded", function () {

  lang = localStorage.getItem("lang")
  populateCities(lang);
});


function initMap() {
  const mapElement = document.getElementById("googleMap");
  const map = new google.maps.Map(mapElement, {
    center: { lat: 33.8869, lng: 9.5375 },
    zoom: 8,
  });

  google.maps.event.addListener(map, 'click', function (event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        const city = data.address.county;
        lang = localStorage.getItem("lang")
        callWeatherAPI(lat, lng, city,lang);
      })
      .catch(error => {
        console.error("error", error);
      });
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: `الطقس في ${lat}, ${lng}`,
    });
  });
}

let translations;

async function loadTranslations() {
  const response = await fetch('./locales/translations.json');
  translations = await response.json();
  lang = localStorage.getItem("lang")
  changeLanguage(lang || 'ar');
}

function changeLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang",lang)
  const elements = document.querySelectorAll('[data-translation]');
  elements.forEach(element => {
    const translationKey = element.dataset.translation;
    element.textContent = translations[lang][translationKey] || '';
  });
  console.log(lang)
  populateCities(lang)
  getInitialLocation()
}

document.addEventListener('DOMContentLoaded', loadTranslations);
