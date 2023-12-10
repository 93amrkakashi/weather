const city_name = document.querySelector(".city_name")
const footerTextElement = document.getElementById('footerText');
const currentYear = new Date().getFullYear();
footerTextElement.textContent = `meteo-Tunisie.net © ! أفضل معلومات الطقس. ${currentYear}!`;
let selectElement = document.getElementById("languageSelect");
const searchResultsElement = document.getElementById("searchResults");
const mainContainer = document.querySelector("body");


let toggleBtn = document.querySelector("#navbar-toggle");
let collapse = document.querySelector("#navbar-collapse");

toggleBtn.onclick = () => {
  collapse.classList.toggle("hidden");
  collapse.classList.toggle("flex");
};
const daysOfWeekArabic = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const daysOfWeekFrench = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const daysOfWeek = daysOfWeekFrench; 

const today = new Date().getDay();

const daysList = [];
for (let i = 0; i < daysOfWeek.length; i++) {
  const dayIndex = (today + i) % daysOfWeek.length; 
  daysList.push(daysOfWeek[dayIndex]);
}


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
const currentURL = new URL(window.location.href);
const parameters = extractParametersFromURL(currentURL);

function extractParametersFromURL(url) {
  const urlSearchParams = new URLSearchParams(url.search);
  const lat = urlSearchParams.get('lat');
  const lng = urlSearchParams.get('lng');
  const city = urlSearchParams.get('city');
  return { lat, lng, city };
}

async function callWeatherAPI(lat, lng, lang) {
  try {
    lang = localStorage.getItem("lang");
    const days_cohosed = lang == "ar" ? daysOfWeekArabic : daysOfWeekFrench;
    const key = weather_key;
    const units = "metric";
    const url =
      lang == "ar"
        ? `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=ar`
        : `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=fr`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }
    const data = await response.json();
    const weatherContainer = document.querySelector(".tol");
    weatherContainer.innerHTML = "";
    days_cohosed.forEach((dayName, index) => {
      const day = data.daily[index];
      const dayElement = document.createElement("div");
      dayElement.classList.add("flex", `${lang == "ar" ? "." : "flex-row-reverse"}`, "justify-around", "items-center", "w-[300px]", "gap-2", "h-[55px]");
      dayElement.innerHTML = `
        <p class="text-xl text-black font-bold">${dayName}</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          class="w-[70px] h-[70ox] mx-4 " alt="${day.weather[0].description}"
        />
        <p dir="rtl" class=" text-black text-bold text-lg font-bold">${day.temp.max}&deg;</p>
        <p dir="rtl" class=" text-black text-bold text-md font-md">${day.temp.min}&deg;</p>
      `;
      weatherContainer.appendChild(dayElement);
    });
    const ariana_con = document.querySelector(".ariana_con");
    ariana_con.innerHTML = "";
    const firstDay = data.daily[0];
    const ariana_w = `
      <h3 class="font-bold text-4xl font-md">${firstDay.weather[0].description}</h3>
      <p dir="rtl" class="font-bold text-4xl font-md">${firstDay.temp.max}&deg;C</p>
      <p class="text-xl font-bold">${new Date(firstDay.dt * 1000).toLocaleDateString("fr-FR")}</p>
    `;
    ariana_con.innerHTML += ariana_w;
    document.querySelector(".img").src = `http://openweathermap.org/img/wn/${firstDay.weather[0].icon}@4x.png`;
  } catch (error) {
    console.error("err", error);
  }
}



async function handleCityClick(event) {
  event.preventDefault();
  const lat = event.currentTarget.getAttribute("data-lat");
  const lng = event.currentTarget.getAttribute("data-lng");
  const city = event.currentTarget.getAttribute("data-city");
  
  await callWeatherAPI(lat, lng);
  city_name.innerText = city;
}


function populateCities(lang) {
  console.log(lang)
  const citiesList = document.getElementById("citiesList");
  citiesList.innerHTML = "";
  if (lang === "ar") {
    arTun.forEach((city) => {
      const cityTemplate = `
            <a href="#" 
                class="bg-gray-50 m-auto flex justify-center items-center font-bold h-[50px] border-2 rounded-lg text-center text-md w-[150px] py-1 px-2 "
                data-lat="${city.lat}" 
                data-lng="${city.lng}"
                data-city="${city.city}"
                onclick="handleCityClick(event)"
            >
                <span class="w-full text-black ">
                    ${city.city}
                </span>
            </a>
        `;

      citiesList.innerHTML += cityTemplate;
    });
  }else{
    frTun.forEach((city) => {
      const cityTemplate = `
            <a href="#" 
                class="bg-gray-50 m-auto flex justify-center items-center font-bold border-2 rounded-lg text-center text-md w-[150px] h-[50px] py-1 px-2 "
                data-lat="${city.lat}" 
                data-lng="${city.lng}"
                data-city="${city.city}"
                onclick="handleCityClick(event)"
            >
                <span class="w-full text-black ">
                ${city.city}
                </span>
            </a>
        `;
  
      citiesList.innerHTML += cityTemplate;
    });
  }

}

function getRandomCity(lang) {
  if (lang === "ar") {
    const randomIndex = Math.floor(Math.random() * arTun.length);
    console.log(arTun[randomIndex])
    callWeatherAPI(arTun[randomIndex].lat,arTun[randomIndex].lng, lang)
    city_name.innerText= arTun[randomIndex].city
    return arTun[randomIndex];
    
  } else {
    const randomIndex = Math.floor(Math.random() * frTun.length);
    console.log(frTun[randomIndex])
    callWeatherAPI(frTun[randomIndex].lat,frTun[randomIndex].lng, lang)
    city_name.innerText= frTun[randomIndex].city
    return arTun[randomIndex];
    
  }
}



async function initMap() {
  const mapElement = document.getElementById("googleMap");
  const map = new google.maps.Map(mapElement, {
    center: { lat: 33.8869, lng: 9.5375 },
    zoom: 8,
  });

  google.maps.event.addListener(map, 'click', async function (event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(geocodingUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.status}`);
      }

      const data = await response.json();
      const city = data.address.county;

      let lang = localStorage.getItem("lang");
      await callWeatherAPI(lat, lng, lang);
      city_name.innerText = city;

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: `الطقس في ${lat}, ${lng}`,
      });
    } catch (error) {
      console.error("error", error);
    }
  });
}


let translations = {};


async function loadTranslations() {
  try {
    const response = await fetch('./locales/translations.json');
    if (!response.ok) {
      throw new Error(`Failed to load translations: ${response.status}`);
    }

    translations = await response.json();
    // lang = localStorage.getItem('lang') || 'ar';
    changeLanguage(lang);
    console.log(translations);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

function changeLanguage(selectElement) {
  const selectedValue = selectElement.value || localStorage.getItem('lang') || 'ar';

  console.log(selectedValue);

  document.documentElement.lang = selectedValue;
  localStorage.setItem('lang', selectedValue);

  const elements = document.querySelectorAll('[data-translation]');
  elements.forEach(element => {
    const translationKey = element.dataset.translation;
    element.textContent = translations[selectedValue][translationKey] || '';
  });

  populateCities(selectedValue);
  if (parameters != null) {
    getRandomCity(selectedValue)
  } else {
    getInitialLocation();
  }
}










function searchCities(text) {
  if (!text.length<= 0) {
    const results = filterCities(text);
    displayResults(results);
  } else{
    searchResultsElement.style.display = "none";
  }
}

function filterCities(text) {
  text = text.toLowerCase();
  return all.filter(city_name => city_name.city.toLowerCase().slice(4).includes(text));
}

function displayResults(results) {
console.log(results)
  searchResultsElement.innerHTML = "";

  results.forEach(result => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <a href="./index.html?lat=${result.lat}&lng=${result.lng}&city=${result.city}"
    class="inline-block w-full  result_item" >
    ${result.city}
    </a>`;
    searchResultsElement.appendChild(listItem);
  });
  searchResultsElement.style.display = results.length > 0 ? "flex" : "none";
}
// <a href="./index.html?lat=${city.lat}&lng=${city.lng}&city=${city.city}"

const themeToggleBtn = document.querySelector(".theme_toggler");
themeToggleBtn.addEventListener("click", changeTheme);

function changeTheme() {

  if (mainContainer.classList.contains("light")) {
    mainContainer.classList.add("dark");
    mainContainer.classList.remove("light");
    localStorage.setItem("theme", "dark")
  } else {
    mainContainer.classList.add("light");
    mainContainer.classList.remove("dark");
    localStorage.setItem("theme", "light")
  }
}



document.addEventListener("DOMContentLoaded", async function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  populateCities(lang);
  if (lang) {
    selectElement.value = lang;
  }

  await initMap();
  await loadTranslations();
  await getRandomCity(lang);
  await getInitialLocation();

  if (parameters.lat != null) {
    callWeatherAPI(parameters.lat, parameters.lng, lang);
    city_name.innerText = parameters.city;
  }
});






