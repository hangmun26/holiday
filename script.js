const API_KEY = "5f7d8589-6569-42ab-b10f-7180bd8648e7";
const searchQuery = document.getElementById("search-query");
const yearQuery = document.getElementById("year-query");
const monthQuery = document.getElementById("month-query");
const dayQuery = document.getElementById("day-query");
const countryQuery = document.getElementById("country-query");
const languageQuery = document.getElementById("language-query");

const getCountries = async () => {
  try {
    const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    console.log("res", res);
    console.log("data", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderCountries = async () => {
  try {
    //1. Fetch all the countries by using function `getCountries`
    const data = await getCountries();

    //2. Find the element with the id `countries-list`
    const countriesList = document.getElementById("countries-list");

    //3. Take out the `ul` element
    const ulCountriesList = countriesList.children[2];

    //4. Delete the sample inside `ul` element
    ulCountriesList.innerHTML = "";

    //5. Loop through the list of countries
    data.countries.forEach((country, index) => {
      //Create new `li` for each element
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`;

      //Then append them to the `ul` element
      ulCountriesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
  console.log("hs");
};

document
  .getElementById("countries-list-btn")
  .addEventListener("click", renderCountries);

async function getLanguage() {
  try {
    const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log("languages", data);
    return data.languages;
  } catch (err) {
    console.log("err", err);
  }
}

async function renderLanguages() {
  const languagesList = document.getElementById("languages-display-list");
  languagesList.innerHTML = "";
  const languages = await getLanguage();
  languages.forEach((language, index) => {
    languagesList.innerHTML += `
    <li>
    <div class="bullet">${index + 1}</div>
    <div class="li-wrapper">
      <div class="li-title">${language.name}</div>
      <div class="li-text">Code : ${language.code}</div>
    </div>
  </li>
    `;
  }); //language => {
}

//renderHolidays();

async function getHolidays() {
  try {
    const searchValue = searchQuery.value;
    const monthValue = monthQuery.value;
    const dayValue = dayQuery.value;
    const countryValue = countryQuery.value;
    const languageValue = languageQuery.value;
    const yearValue = yearQuery.value;
    // let url =
    //   "https://holidayapi.com/v1/holidays?year=2023&country=VN&key=5f7d8589-6569-42ab-b10f-7180bd8648e7";
    let url = `https://holidayapi.com/v1/holidays?key=${API_KEY}&year=2023&country=VN`;

    if (searchValue) {
      url = url + `&search=${searchValue}`;
    }
    if (monthValue) {
      url = url + `&month=${monthValue}`;
    }
    if (dayValue) {
      url = url + `&day=${dayValue}`;
    }

    if (countryValue) {
      url = url + `&country=${countryValue}`;
    }

    if (languageValue) {
      url = url + `&language=${languageValue}`;
    }

    if (yearValue) {
      url = url + `&year=${yearValue}`;
    }
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log("holidays", data);
    return data.holidays;
  } catch (err) {
    console.log("err", err);
  }
}

async function renderHolidays() {
  // const searchValue = searchQuery.value;
  // const monthValue = monthQuery.value;
  // const dayValue = dayQuery.value;
  // const countryValue = countryQuery.value;
  // const languageValue = languageQuery.value;
  // const yearValue = yearQuery.value;

  try {
    const holidaysList = document.getElementById("holidays-list");
    // console.log(holidaysList.children[1]);
    holidaysList.children[1].innerHTML = "";
    const holidays = await getHolidays();
    holidays.forEach((holiday, index) => {
      holidaysList.children[1].innerHTML += `
    <li>
      <div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
        <div class="li-title">${holiday.name}</div>
        <div class="li-text">Code : ${holiday.date}</div>
      </div>
    </li>
    `;
    });
  } catch (err) {
    console.log("err", err);
  }
  // renderHolidays();
}

document
  .getElementById("holidays-btn")
  .addEventListener("click", renderHolidays);