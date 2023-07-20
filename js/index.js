const apiKey = "caf1de4c27bae43908929e13e3d0a255";
const apiUrl = "https://v3.football.api-sports.io";

async function fetchLiveMatches() {
  const response = await fetch(`${apiUrl}/fixtures?live=all`, {
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey,
    },
  });
  const data = await response.json();
  return data.response;
}

async function fetchGuardiolaData() {
  const response = await fetch(
    "https://v3.football.api-sports.io/coachs?search=guardiola",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": apiUrl,
        "x-rapidapi-key": apiKey,
      },
    }
  );
  const data = await response.json();
  return data.response[0];
}

async function fetchGuardiolaTrophies(coachId) {
  const response = await fetch(
    `https://v3.football.api-sports.io/trophies?coach=${coachId}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": apiUrl,
        "x-rapidapi-key": apiKey,
      },
    }
  );
  const data = await response.json();
  return data.response;
}



async function addLiveMatches() {
  try {
    const liveMatches = await fetchLiveMatches();
    const matchesElement = document.getElementById("matches");

    liveMatches.forEach((match) => {
      const homeTeam = match.teams.home.name;
      const awayTeam = match.teams.away.name;
      const homeLogo = match.teams.home.logo;
      const awayLogo = match.teams.away.logo;
      const score = `${match.goals.home} - ${match.goals.away}`;
      const matchTime = new Date(match.fixture.date);
      matchTime.setHours(matchTime.getHours() + 2);
      const stadium = match.fixture.venue.name;

      const matchBox = document.createElement("div");
      matchBox.classList.add("match");

      // Match-content
      const matchContent = document.createElement("div");
      matchContent.classList.add("match-content");

      const homeTeamLogoDiv = document.createElement("div");
      homeTeamLogoDiv.classList.add("team-logo");
      const homeTeamLogo = document.createElement("img");
      homeTeamLogo.src = homeLogo;
      homeTeamLogo.alt = "Logo del equipo local";
      homeTeamLogoDiv.appendChild(homeTeamLogo);

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("team-info");

      const homeTeamNameDiv = document.createElement("div");
      const homeTeamName = document.createElement("p");
      homeTeamName.textContent = homeTeam;
      homeTeamNameDiv.appendChild(homeTeamName);
      infoDiv.appendChild(homeTeamNameDiv);

      const scoreElemDiv = document.createElement("div");
      const scoreElem = document.createElement("p");
      scoreElem.classList.add("score");
      scoreElem.textContent = score;
      scoreElemDiv.appendChild(scoreElem);
      infoDiv.appendChild(scoreElemDiv);

      const awayTeamNameDiv = document.createElement("div");
      const awayTeamName = document.createElement("p");
      awayTeamName.textContent = awayTeam;
      awayTeamNameDiv.appendChild(awayTeamName);
      infoDiv.appendChild(awayTeamNameDiv);

      const awayTeamLogoDiv = document.createElement("div");
      awayTeamLogoDiv.classList.add("team-logo");
      const awayTeamLogo = document.createElement("img");
      awayTeamLogo.src = awayLogo;
      awayTeamLogo.alt = "Logo del equipo visitante";
      awayTeamLogoDiv.appendChild(awayTeamLogo);

      matchContent.appendChild(homeTeamLogoDiv);
      matchContent.appendChild(infoDiv);
      matchContent.appendChild(awayTeamLogoDiv);

      matchBox.appendChild(matchContent);

      // Match-info
      const matchInfo = document.createElement("div");
      matchInfo.classList.add("match-info");

      const timeIconDiv = document.createElement("div");
      const timeElem = document.createElement("p");
      timeElem.innerHTML = `<ion-icon name="time-outline"></ion-icon> ${matchTime.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`;
      timeIconDiv.appendChild(timeElem);

      const stadiumNameDiv = document.createElement("div");
      const stadiumIcon = document.createElement("ion-icon");
      stadiumIcon.setAttribute("name", "location-outline");
      const stadiumElem = document.createElement("p");
      stadiumElem.innerHTML = `<ion-icon name="location-outline"></ion-icon> ${stadium}`;
      stadiumNameDiv.appendChild(stadiumElem);

      matchInfo.appendChild(timeIconDiv);
      matchInfo.appendChild(stadiumNameDiv);

      matchBox.appendChild(matchInfo);

      // Match-links
      const matchLinks = document.createElement("div");
      matchLinks.classList.add("match-links");

      const favoritesLink = document.createElement("a");
      favoritesLink.href = "#";
      favoritesLink.innerHTML = `<ion-icon name="star-outline"></ion-icon>`;

      const detailsLink = document.createElement("a");
      detailsLink.href = `detailMatch.html?id=${match.fixture.id}`;
      detailsLink.innerHTML = `View Details <ion-icon name="arrow-forward-circle-outline"></ion-icon>`;

      matchLinks.appendChild(favoritesLink);
      matchLinks.appendChild(detailsLink);

      matchBox.appendChild(matchLinks);

      matchesElement.appendChild(matchBox);
    });
  } catch (err) {
    console.log(err);
  }
}

async function addGuardiolaInfo() {
  try {
    const guardiolaInfo = await fetchGuardiolaData();
    const guardiolaTrophies = await fetchGuardiolaTrophies(guardiolaInfo.id);

    const trendingDiv = document.getElementById("trending");

    const coachDiv = document.createElement("div");
    coachDiv.classList.add("coach");

    const coachPhoto = document.createElement("img");
    coachPhoto.setAttribute("src", guardiolaInfo.photo);
    coachPhoto.setAttribute("alt", "Pep Guardiola");
    coachPhoto.width = 80;
    coachPhoto.height = 80;

    const coachName = document.createElement("h3");
    coachName.innerText =
      guardiolaInfo.firstname + " " + guardiolaInfo.lastname;

    coachDiv.appendChild(coachPhoto);
    coachDiv.appendChild(coachName);

    trendingDiv.appendChild(coachDiv);

    const championsDiv = document.createElement("div");
    championsDiv.classList.add("champions");

    const championsLeagues = guardiolaTrophies.filter(
      (trophy) =>
        trophy.league === "UEFA Champions League" && trophy.place === "Winner"
    );

    const championsCount = championsLeagues.length;
    const championsText = `${championsCount + 1} Champion League`;

    const icon = document.createElement("ion-icon");
    icon.setAttribute("name", "flash-outline");

    championsDiv.appendChild(icon);
    championsDiv.appendChild(document.createTextNode(championsText));

    trendingDiv.appendChild(championsDiv);
  } catch (err) {
    console.log(err);
  }
}
document.addEventListener("DOMContentLoaded", () => {
   addLiveMatches();
   addGuardiolaInfo();
});
