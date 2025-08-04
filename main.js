const navLinks = document.querySelectorAll(".nav-link");

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
  } catch (error) {
    console.error(error);
  }
}

getMarketData();
