const footerTextElement = document.getElementById('footerText');
const currentYear = new Date().getFullYear();
footerTextElement.textContent = `meteo-Tunisie.net © ! أفضل معلومات الطقس. ${currentYear}!`;
let selectElement = document.getElementById("languageSelect");
const searchResultsElement = document.getElementById("searchResults");
const mainContainer = document.querySelector("body");
let the_main = document.querySelector(".the_main")
let content_here = document.querySelector(".content_here")


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
  change_content(selectedValue)
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
  change_content(lang)
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

function change_content(lang) {
  if (lang === "ar") {
    content_here.innerHTML= arConditions
    the_main.classList.add("md:flex-row")
    the_main.classList.remove("md:flex-row-reverse")
  } else {
    content_here.innerHTML= frConditions
    the_main.classList.remove("md:flex-row")
    the_main.classList.add("md:flex-row-reverse")
  }
  
}


let arConditions = `
<section class="col-sm-9">
                  <a id="main-content"></a>
                    <h1 class="page-header"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">شروط الاستخدام</font></font></h1>
                                                          <div class="region region-content">
    <section id="block-system-main" class="block block-system clearfix">
  <article id="node-7595" class="node node-page clearfix">
    <div class="field field-name-body field-type-text-with-summary field-label-hidden"><div class="field-items"><div class="field-item even"><h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">نظرة عامة على الخدمة</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">موقع Meteo-Tunisie.net هو خدمة مخصصة لمعلومات الطقس في تونس. </font><font style="vertical-align: inherit;">يسمح للمستخدمين باستشارة معلومات الطقس من عدة مصادر على نفس الموقع. </font><font style="vertical-align: inherit;">الهدف من الموقع هو تسهيل الوصول إلى المعلومات التي تم جمعها.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">معلومات الطقس ومصادرها</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يتم تحديث معلومات الطقس عدة مرات في اليوم:</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">- 3 مرات يوميا بخصوص النشرة الجوية التي يصدرها المعهد الوطني للأرصاد الجوية بتونس. </font><font style="vertical-align: inherit;">يمكن الولوج إلى الموقع الرسمي للحركة الوطنية العراقية على هذا الرابط </font></font><a href="http://www.meteo.tn"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">www.meteo.tn</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> .</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">- بيانات الطقس (درجة الحرارة، الرياح، المطر) هي توقعات وبالتالي قد تختلف عن الواقع. </font><font style="vertical-align: inherit;">يستخدم موقع Meteo-Tunisie.net خدمة بيانات الطقس </font><font style="vertical-align: inherit;">التي يقدمها </font></font><a href="http://www.yr.no"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">www.yr.no.</font></font></a><font style="vertical-align: inherit;"></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">- الصور الفضائية تأتي من موقع الصور الفضائية المتخصص ( </font></font><a href="http://www.sat24.com"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">www.sat24.com</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> ). </font><font style="vertical-align: inherit;">يتم تحديثها 3 مرات في اليوم.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">حدود المسؤولية</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">موقع Meteo-Tunisie.net ليس مسؤولا عن مصداقية البيانات المذكورة أعلاه. </font><font style="vertical-align: inherit;">الخدمة المقدمة هي جمع وعرض هذه البيانات في شكل بديهي وسهل التشاور. </font><font style="vertical-align: inherit;">ولا يتحمل موقع Meteo-Tunisie.net بأي حال من الأحوال أي مسؤولية عن استخدام واستغلال هذه المعلومات.</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">قد تمنع المشاكل التقنية تحديث بعض البيانات المذكورة أعلاه. </font><font style="vertical-align: inherit;">على الرغم من أن موقع Meteo-Tunisie.net يسعى جاهدا للاستجابة لمشاكل التحديث، إلا أنه لا يتحمل بأي حال من الأحوال المسؤولية عن مشاكل تحديث البيانات.</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Meteo-Tunisie.net ليس الموقع الرسمي لمعلومات الطقس في تونس. </font><font style="vertical-align: inherit;">الموقع الرسمي مملوك ومدار من قبل المعهد الوطني للأرصاد الجوية (INM) ويمكن الوصول إليه على هذا العنوان </font></font><a href="http://www.meteo.tn"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">www.meteo.tn</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> .</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">هذه القائمة من حدود المسؤولية ليست شاملة.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">الضمان الفني</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يسعى موقع Meteo-Tunisie.net إلى تقديم خدمة تقنية موثوقة لضمان التحديث المنتظم لمعلومات الأرصاد الجوية المذكورة أدناه بالإضافة إلى التوفر المستمر للوصول إلى الموقع. </font><font style="vertical-align: inherit;">ومع ذلك، فإن الأرصاد الجوية التونسية ليست ملزمة بأي التزام لتحقيق ذلك.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">باستخدام التعليقات</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">يتيح موقع Meteo-Tunisie.net لمستخدميه فرصة التفاعل وإبداء آرائهم عبر التعليقات. </font><font style="vertical-align: inherit;">ومع ذلك فإن موقع Meteo-Tunisie.net ليس مسؤولا بأي حال من الأحوال عن محتوى هذه التعليقات.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">استخدام الخدمة</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">إن استخدام الخدمة التي يقدمها موقع Meteo-Tunisie.net مجاني ومتاح لأي شخص مجهز بمحطة طرفية واتصال بالإنترنت. </font><font style="vertical-align: inherit;">استخدام الخدمة يعني القبول والموافقة على شروط استخدام موقع Meteo-Tunisie.net.</font></font></p>
<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">اتصال</font></font></h3>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">بالنسبة لأي طلبات للحصول على معلومات أو اقتراحات لتحسين الخدمة التي تقدمها Meteo-Tunisie.net، فإننا نقدم لك عنوان بريدنا الإلكتروني </font></font><a href="mailto:contact@meteo-tunisie.net"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">contact@meteo-tunisie.net</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> بالإضافة إلى نموذج اتصال يمكن الوصول إليه عبر هذا </font></font><a href="http://meteo-tunisie.net/node/277"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">الرابط</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> .</font></font></p>
<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">النسخة العربية متاحة على هذا </font></font><a href="/conditions-utilisation-arabe"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">الرابط</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> .</font></font></p>
</div></div></div>    </article>

</section>
  </div>
    </section>
`

let frConditions = `<section dir="ltr" class="w-full pol_sec">
<a id="main-content"></a>
<h1 class="page-header">Conditions d'utilisations</h1>
<div class="region region-content">
  <section id="block-system-main" class="block block-system clearfix">


    <article id="node-7595" class="node node-page clearfix">
      <div class="field field-name-body field-type-text-with-summary field-label-hidden">
        <div class="field-items">
          <div class="field-item even">
            <h3>Présentation du service</h3>
            <p>Le site Meteo-Tunisie.net est un service dédié à l'information météo en Tunisie. Il permet aux
              utilisateurs de consulter les informations météo provenant de plusieurs sources sur un même site
              internet. L'objectif du site est de faciliter l'accès aux informations collectées.</p>
            <h3>L'information météorologique et ses sources</h3>
            <p>Les informations meteorologiques&nbsp;sont actualisées plusieurs fois par jour :</p>
            <p>- 3 fois par jour en ce qui concerne le bulletin météo publié par l'Institut National de
              Météorologie en Tunisie. Le site officiel de l'INM est accesible sur ce lien <a
                href="http://www.meteo.tn">www.meteo.tn</a>.</p>
            <p>- Les données météorologiques (température, vent, pluie) sont des prévisions et peuvent ainsi
              être différentes de la réalité. Meteo-Tunisie.net utilise un service de données météo proposés
              par <a href="http://www.yr.no">www.yr.no</a>.</p>
            <p>- Les images satellites viennent du site spécialisé des les images satellite (<a
                href="http://www.sat24.com">www.sat24.com</a>). Elle sont actualisées 3 fois par jour.</p>
            <h3>Limites de responsabilité</h3>
            <p>Le site Meteo-Tunisie.net n'est pas tenu responsable de la fiabilité des données citées
              ci-dessus. Le service proposé est la collecte et la présentation des ces données dans un format
              intuitif et facile à consulter. Le site&nbsp;Meteo-Tunisie.net n'est en aucun cas tenu
              responsable de l'utilisation et de l'exploitation de ces informations.</p>
            <p>Des problèmes techniques peuvent empêcher la mise à jour de certaines données citées ci-dessus.
              Bien que Meteo-Tunisie.net s'efforce à réagir face aux problèmes de mises à jour, il n'est en
              aucun cas tenu responsable des problèmes de mise à jour des données.</p>
            <p>Meteo-Tunisie.net n'est pas le site officiel de l'information météo en Tunisie. Le site
              officiel est tenu et géré par l'Institut National de la Météorologie (INM) et il est accessible
              sur cette adresse <a href="http://www.meteo.tn">www.meteo.tn</a>.</p>
            <p>Cette liste de limites de responsabilité n'est pas exhaustive.</p>
            <h3>Garantie technique</h3>
            <p>Meteo-Tunisie.net s'efforce à fournir un service technique fiable pour garantir une mise à jour
              régulières des informations météorologique citées ci-dessous ainsi qu'une disponibilité continue
              de l'accès au site web. Néanmoins, Meteo-Tunisie n'est tenu à aucune obligation à parvenir.</p>
            <h3>Utilisation des commentaires</h3>
            <p>Meteo-Tunisie.net offre la possibilités à ses utilisateurs de réagir et de donner leurs avis
              via des commentaires. Néanmoins, Meteo-Tunisie.net n'est en aucun cas responsable du contenu des
              ces commentaires.</p>
            <h3>Utilisation du service</h3>
            <p>L'utilisation du service proposé par Meteo-Tunisie.net est gratuite et accessible à toute
              personne équipé d'un terminal et d'une connexion internet. L'utilisation du service implique
              l'acceptation et le consentement des conditions d'utilisation de Meteo-Tunisie.net.</p>
            <h3>Contact</h3>
            <p>Pour toutes demandes de renseignement ou suggestion d'amélioration du service proposé par
              Meteo-Tunisie.net, nous mettons à votre dispositions notre adresse email <a
                href="mailto:contact@meteo-tunisie.net">contact@meteo-tunisie.net</a> ainsi qu'un formulaire
              de contact accessible sur ce <a href="http://meteo-tunisie.net/node/277">lien</a>.</p>
            <p>La version en arabe est accessible sur ce <a href="/conditions-utilisation-arabe">lien</a>.</p>
          </div>
        </div>
      </div>
    </article>

  </section>
</div>
</section>
`