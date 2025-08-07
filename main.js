const navLinks = document.querySelectorAll(".nav-link");

// Market Content
// <p id="market-exchange-text">Exchange:</p>
//   <p id="market-status-text">Status:</p>
//   <p id="market-timezone-text">Timezone:</p>
//   <p id="market-localtime-text">Local Time:</p>
//   <p id="market-holiday-text">Holiday:</p>

const exchangeText = document.querySelector("#market-exchange-text");
const statusText = document.querySelector("#market-status-text");
const timezoneText = document.querySelector("#market-timezone-text");
const localTimeText = document.querySelector("#market-localtime-text");
const holidayText = document.querySelector("#market-holiday-text");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((nav) => nav.classList.remove("active", "custom-active"));
    link.classList.add("active", "custom-active");
  });
});

const apiKey = "d25ua7pr01qhge4ef840d25ua7pr01qhge4ef84g";
const prefixUrl = `https://finnhub.io/api/v1`;
const suffixUrl = `&token=${apiKey}`;
let category = "";

async function getMarketData() {
  category = "/stock/market-status?exchange=US";
  let url = `${prefixUrl}${category}${suffixUrl}`;

  try {
    let res = await fetch(url);
    let marketData = await res.json();
    console.log(marketData);

    const status = marketData.isOpen ? "Open ✅" : "Closed ❌";
    const localTime = new Date(marketData.t * 1000).toLocaleString("en-US", {
      timeZone: marketData.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    exchangeText.textContent = `Exchange: ${marketData.exchange} 🇺🇸`;
    statusText.textContent = `Status: ${status}`;
    timezoneText.textContent = `Timezone: ${marketData.timezone} 🇺🇸`;
    localTimeText.textContent = `Local Time: ${localTime} 🕒`;
  } catch (error) {
    console.error(error);
  }
}

getMarketData();

async function getQuoteData() {
  const cardTitles = document.querySelectorAll(".card-title");
  const cardTexts = document.querySelectorAll(".card-text");

  for (let i = 0; i < cardTitles.length; i++) {
    const symbol = cardTitles[i].textContent;
    const category = `/quote?symbol=${symbol}`;
    const url = `${prefixUrl}${category}${suffixUrl}`;

    try {
      const res = await fetch(url);
      const quoteData = await res.json();

      console.log(quoteData);

      cardTexts[i].innerHTML += `Current Price: $${quoteData.c}<br>`;
      cardTexts[i].innerHTML += `Change: ${quoteData.d}<br>`;
      cardTexts[i].innerHTML += `Percent Change: ${quoteData.dp.toFixed(2)}%`;
    } catch (error) {
      console.error(error);
    }
  }
}

getQuoteData();
