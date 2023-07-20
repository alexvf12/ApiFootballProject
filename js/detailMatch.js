 const apiKey = "caf1de4c27bae43908929e13e3d0a255";
const apiUrl = "https://v3.football.api-sports.io";

export default async function fetchInfoMatch() {
  const url = new URL(window.location.href);
  const matchId = url.searchParams.get("id");

  const response = await fetch(`${apiUrl}/fixtures?id=${matchId}`, {
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey,
    },
  });
  const data = await response.json();
  const match = await data.response[0];
  return match;
}

/*
async function addContentMatch() {
  try {
    const match = await fetchInfoMatch();
    const detailsElement = document.getElementById("details");

    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match-details");

    //Home Div
    const homeDiv = document.createElement("div");
    homeDiv.classList.add("home-details");
    const homeLogo = document.createElement("img");
    homeLogo.src = match.teams.home.logo;
    homeLogo.alt = "Home Logo";
    homeDiv.appendChild(homeLogo);

    const homeName = document.createElement("h2");
    homeName.textContent = match.teams.home.name;
    homeDiv.appendChild(homeName);

    matchDiv.appendChild(homeDiv);

    // Info Div
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-details");

    // DateTime Div
    const dateTimeDiv = document.createElement("div");
    dateTimeDiv.classList.add("time-details");

    // Time Icon Div
    const timeIconDiv = document.createElement("div");
    const timeIcon = document.createElement("ion-icon");
    timeIcon.setAttribute("name", "time-outline");
    timeIconDiv.appendChild(timeIcon);
    dateTimeDiv.appendChild(timeIconDiv);

    // Time and Date Div
    const timeDateWrapperDiv = document.createElement("div");
    timeDateWrapperDiv.classList.add("time-date-details");

    // Time Div
    const timeDiv = document.createElement("div");

    const timeElem = document.createElement("p");
    const matchTime = new Date(match.fixture.date);
    matchTime.setHours(matchTime.getHours() + 2);
    timeElem.innerHTML = matchTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeDiv.appendChild(timeElem);
    timeDateWrapperDiv.appendChild(timeDiv);

    // Date Div
    const dateDiv = document.createElement("div");

    const dateElem = document.createElement("p");
    const dia = matchTime.getDate();
    const mes = matchTime.getMonth() + 1;
    const año = matchTime.getFullYear();
    dateElem.innerHTML = `${dia < 10 ? "0" : ""}${dia}-${
      mes < 10 ? "0" : ""
    }${mes}-${año}`;
    dateDiv.appendChild(dateElem);
    timeDateWrapperDiv.appendChild(dateDiv);

    dateTimeDiv.appendChild(timeDateWrapperDiv);
    infoDiv.appendChild(dateTimeDiv);

    // Score Div
    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("score-details");

    const scoreElem = document.createElement("p");
    const score = `${match.goals.home} - ${match.goals.away}`;
    scoreElem.textContent = score;
    scoreDiv.appendChild(scoreElem);
    infoDiv.appendChild(scoreDiv);

    // Stadium Div
    const stadiumDiv = document.createElement("div");
    stadiumDiv.classList.add("stadium-details");

    const stadiumIconDiv = document.createElement("div");
    const stadiumIcon = document.createElement("ion-icon");
    stadiumIcon.setAttribute("name", "location-outline");
    stadiumIconDiv.appendChild(stadiumIcon);
    stadiumDiv.appendChild(stadiumIconDiv);

    const stadiumElem = document.createElement("p");
    stadiumElem.innerHTML = match.fixture.venue.name;
    stadiumDiv.appendChild(stadiumElem);

    infoDiv.appendChild(stadiumDiv);

    matchDiv.appendChild(infoDiv);

    //Away Div
    const awayDiv = document.createElement("div");
    awayDiv.classList.add("away-details");
    const awayLogo = document.createElement("img");
    awayLogo.src = match.teams.away.logo;
    awayLogo.alt = "Home Logo";
    awayDiv.appendChild(awayLogo);

    const awayName = document.createElement("h2");
    awayName.textContent = match.teams.away.name;
    awayDiv.appendChild(awayName);

    matchDiv.appendChild(awayDiv);

    detailsElement.appendChild(matchDiv);
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchInfoMatch();
  addContentMatch();
});


 */

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const matchId = url.searchParams.get("id");

  const widgetElement = document.getElementById("wg-api-football-game");
  widgetElement.dataset.id = matchId;

  fetchInfoMatch();
});