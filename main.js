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
  //finnhub.io/api/v1/stock/market-status?exchange=US&token=d25ua7pr01qhge4ef840d25ua7pr01qhge4ef84g

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
  const cardFooters = document.querySelectorAll(".card-footer");

  for (let i = 0; i < cardTitles.length; i++) {
    const symbol = cardTitles[i].textContent.trim();
    const category = `/quote?symbol=${symbol}`;
    const url = `${prefixUrl}${category}${suffixUrl}`;

    try {
      const res = await fetch(url);
      const quoteData = await res.json();

      const change = quoteData.d;
      const percentChange = quoteData.dp;
      const isUp = change >= 0;

      const arrowSVG = isUp
        ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="green" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-left: 4px;">
            <path d="M6,0.002L0 6.002 4.8 6.002 4.8 11.9996 7.2 11.9996 7.2 6.002 12 6.002z"></path>
          </svg>`
        : `<svg width="12" height="12" viewBox="0 0 12 12" fill="red" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-left: 4px; transform: rotate(180deg);">
            <path d="M6,0.002L0 6.002 4.8 6.002 4.8 11.9996 7.2 11.9996 7.2 6.002 12 6.002z"></path>
          </svg>`;

      const color = isUp ? "green" : "red";

      cardTexts[i].innerHTML = `
        Current Price: $${quoteData.c.toFixed(2)}<br>
        <span style="color: ${color};">
          Change: ${change.toFixed(2)}${arrowSVG}<br>
          Percent Change: ${percentChange.toFixed(2)}%${arrowSVG}
        </span>
      `;

      const nowDate = new Date();
      const formattedTime = nowDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      cardFooters[i].innerHTML = `Last updated at ${formattedTime}`;
    } catch (error) {
      console.error(error);
    }
  }
}

getQuoteData();

async function getNewsData() {
  const apiKeyNews = "pub_40ef130be2db44dbaa5b724954ebb366";
  const prefixUrlNews = `https://newsdata.io/api/1/latest?apikey=${apiKeyNews}`;
  const suffixUrlNews = `&token=${apiKeyNews}`;

  const urlNews = `https://newsdata.io/api/1/news?apikey=${apiKeyNews}&q=NVDA%20OR%20TESLA%20AND%20%22stock%20market%22&country=us&language=en&size=10
`;

  try {
    const res = await fetch(urlNews);
    const newsData = await res.json();

    newsData.results.forEach(function (article) {
      console.log(article.link);
    });
    // console.log(newsData);
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }
}

getNewsData();
