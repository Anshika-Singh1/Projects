// import { countryList } from "./code.js";

const countryList = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CZK: "CZ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  EGP: "EG",
  EUR: "EU",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KRW: "KR",
  KWD: "KW",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  MAD: "MA",
  MYR: "MY",
  MXN: "MX",
  NOK: "NO",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  QAR: "QA",
  RON: "RO",
  RUB: "RU",
  SAR: "SA",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TND: "TN",
  TRY: "TR",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VND: "VN",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const amountInput = document.querySelector(".amount input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const exchangeRateText = document.querySelector(".exchange-rate");
const convertBtn = document.querySelector("form button");

// Populate dropdowns
dropdowns.forEach((select) => {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;
    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;
    select.appendChild(option);
  }
  select.addEventListener("change", (e) => updateFlag(e.target));
});

// Update flag when currency is changed
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Fetch exchange rate
const fetchExchangeRate = async () => {
  try {
    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    exchangeRateText.innerText = `1 ${fromCurr.value} = ${rate.toFixed(2)} ${
      toCurr.value
    }`;
    return rate;
  } catch (error) {
    exchangeRateText.innerText = "Error fetching exchange rate!";
    console.error(error);
  }
};

// Convert currency when button is clicked
convertBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let rate = await fetchExchangeRate();
  let amount = parseFloat(amountInput.value) || 1;
  let finalAmount = (amount * rate).toFixed(2);
  exchangeRateText.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

// Load exchange rate on page load
window.addEventListener("load", fetchExchangeRate);
