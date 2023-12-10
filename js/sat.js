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





let translations;

async function loadTranslations() {
  const response = await fetch('./locales/translations.json');
  translations = await response.json();
  lang = localStorage.getItem("lang")
  changeLanguage(lang || 'ar');
}

function changeLanguage() {
  let selectedValue = selectElement.value;
  console.log(selectedValue)
  document.documentElement.lang = selectedValue;
  localStorage.setItem("lang",selectedValue)
  const elements = document.querySelectorAll('[data-translation]');
  elements.forEach(element => {
    const translationKey = element.dataset.translation;
    element.textContent = translations[selectedValue][translationKey] || '';
  });
  populateCities(selectedValue);
  getRandomCity(selectedValue)
}



loadTranslations()
document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar"
  theme = localStorage.getItem("theme") || "light"
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  changeLanguage();
  populateCities(lang)
});



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
  return all.filter(city_name => city_name.city.toLowerCase().includes(text));
}

function displayResults(results) {

  searchResultsElement.innerHTML = "";

  results.forEach(result => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span class="inline-block w-full  result_item" >${result.city}</span>`;
    searchResultsElement.appendChild(listItem);
  });
  searchResultsElement.style.display = results.length > 0 ? "flex" : "none";
}
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

// document.addEventListener("DOMContentLoaded", function() {
//   var currentIndex = 0;
//   var items = document.querySelectorAll('#carousel img');
//   console.log(items)
//   var totalItems = items.length;
//   var autoSlideInterval = 1500;

//   function autoSlide() {
//     currentIndex = (currentIndex + 1) % totalItems;
//     updateCarousel();
//   }

//   function updateCarousel() {
//     var newTransformValue = -currentIndex * 100 + '%';
//     document.querySelector('#carousel img').style.transform = 'translateX(' + newTransformValue + ')';
//   }

//   setInterval(autoSlide, 500);
// });

let index = 0;
let slides = document.querySelectorAll(".slides");
let dot = document.querySelectorAll(".dot");

function changeSlide(){

  if(index<0){
    index = slides.length-1;
  }
  
  if(index>slides.length-1){
    index = 0;
  }
  
  for(let i=0;i<slides.length;i++){
    slides[i].style.display = "none";
    dot[i].classList.remove("active");
  }
  
  slides[index].style.display= "block";
  dot[index].classList.add("active");
  
  index++;
  
  setTimeout(changeSlide,700);
  
}

changeSlide();


function populateCities(lang) {
  console.log(lang)
  const citiesList = document.querySelector(".cities_list");
  citiesList.innerHTML = "";
  if (lang === "ar") {
    arTun.forEach((city) => {
      const cityTemplate = `
            <a href="" 
                class="bg-gray-50 m-auto flex justify-center items-center font-bold h-[50px] border-2 rounded-lg text-center text-md w-[140px] py-1 px-2 "
                data-lat="${city.lat}" 
                data-lng="${city.lng}"
                data-city="${city.city}"
                onclick="handleCityClickOtherwhere(event)"
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
            <a href="" 
                class="bg-gray-50 m-auto flex justify-center items-center font-bold border-2 rounded-lg text-center text-md w-[150px] h-[50px] py-1 px-2 "
                data-lat="${city.lat}" 
                data-lng="${city.lng}"
                data-city="${city.city}"
                onclick="handleCityClickOtherwhere(event)"
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

function handleCityClickOtherwhere(event) {
  event.preventDefault();
  const lat = event.currentTarget.getAttribute("data-lat");
  const lng = event.currentTarget.getAttribute("data-lng");
  const city = event.currentTarget.getAttribute("data-city");
  window.location.href = `../index.html?lat=${lat}&lng=${lng}&city=${city}`;
  city_name.innerText = city;
}