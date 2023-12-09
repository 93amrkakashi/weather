let lang = localStorage.getItem("lang") ;
console.log(lang)
if (lang != "fr") {
  localStorage.setItem("lang","ar")
}
const footerTextElement = document.getElementById('footerText');
const currentYear = new Date().getFullYear();
footerTextElement.textContent = `meteo-Tunisie.net © ! أفضل معلومات الطقس. ${currentYear}!`;

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


// function getInitialLocation() {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         console.log("Latitude:", lat);
//         console.log("Longitude:", lng);
//         lang = localStorage.getItem("lang")
//         callWeatherAPI(lat, lng, lang);
//       },
//       function (error) {
//         console.error("err", error.message);
//       }
//     );
//   } else {
//     console.error("wrong");
//   }
// }


function callWeatherAPI(lat, lng, lang) {
  lang = localStorage.getItem("lang")
  const key = "15860d66bb940233e9dd3c943f17139f";
  const units = "metric";
  // lang = lang
  const url = lang =="ar" ? `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=ar`: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=fr`; 
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.daily);
      const weatherContainer = document.querySelector(".tol");

weatherContainer.innerHTML = "";

daysOfWeekArabic.forEach((dayName, index) => {
  const day = data.daily[index];

  const dayElement = document.createElement("div");
  dayElement.classList.add("flex","justify-around","items-center" ,"w-[300px]","gap-2", "h-[55px]" );
  
  dayElement.innerHTML = `
      <p class="text-xl font-bold">${dayName}</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          class="w-[70px] h-[70ox] mx-4 " alt="${day.weather[0].description}"
        />
    <p dir="rtl" class="text-bold text-lg font-bold">${day.temp.max}&deg;</p>
    <p dir="rtl" class="text-bold text-md font-md">${day.temp.min}&deg;</p>
  `;

  weatherContainer.appendChild(dayElement);
});


      const ariana_con = document.querySelector(".ariana_con");
      ariana_con.innerHTML = "";
      const firstDay = data.daily[0]
      const ariana_w = `
        <h3 class="font-bold text-4xl font-md">${firstDay.weather[0].description}</h3>
        <p dir="rtl" class="font-bold text-4xl font-md">${firstDay.temp.max}&deg;C</p>
        <p class="text-xl font-bold">${new Date(firstDay.dt * 1000).toLocaleDateString("fr-FR")}</p>
    `;
      ariana_con.innerHTML += ariana_w
      document.querySelector(".img").src = `http://openweathermap.org/img/wn/${firstDay.weather[0].icon}@4x.png`
      // weatherContainer.innerHTML += dailyWeatherHTML;
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
                <span class="w-full">
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
                <span class="w-full">
                ${city.city}
                </span>
            </a>
        `;
  
      citiesList.innerHTML += cityTemplate;
    });
  }

}
const city_name = document.querySelector(".city_name")
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
document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang")
  populateCities(lang);
  getRandomCity(lang)
  // callWeatherAPI(36.8587351,10.188232, lang)
});


// function initMap() {
//   const mapElement = document.getElementById("googleMap");
//   const map = new google.maps.Map(mapElement, {
//     center: { lat: 33.8869, lng: 9.5375 },
//     zoom: 8,
//   });

//   google.maps.event.addListener(map, 'click', function (event) {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
//     fetch(geocodingUrl)
//       .then(response => response.json())
//       .then(data => {
//         const city = data.address.county;
//         lang = localStorage.getItem("lang")
//         callWeatherAPI(lat, lng, city,lang);
//       })
//       .catch(error => {
//         console.error("error", error);
//       });
//     const marker = new google.maps.Marker({
//       position: { lat, lng },
//       map: map,
//       title: `الطقس في ${lat}, ${lng}`,
//     });
//   });
// }

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
  // lang = localStorage.getItem("lang")
  populateCities(lang);
  getRandomCity(lang)
}

document.addEventListener('DOMContentLoaded', loadTranslations);



