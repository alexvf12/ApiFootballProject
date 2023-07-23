const apiKey = "caf1de4c27bae43908929e13e3d0a255";
const apiUrl = "https://v3.football.api-sports.io";

async function fetchInfoLeague() {
  const url = new URL(window.location.href);
  const leagueId = url.searchParams.get("id");

  const response = await fetch(`${apiUrl}/leagues?id=${leagueId}`, {
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey,
    },
  });
  const data = await response.json();
  const league = await data.response[0].league;
  return league;
}

async function fetchTeamsLeague() {
  const url = new URL(window.location.href);
  const leagueId = url.searchParams.get("id");

  const response = await fetch(
    `${apiUrl}/teams?league=${leagueId}&season=2022`,
    {
      headers: {
        "x-rapidapi-host": apiUrl,
        "x-rapidapi-key": apiKey,
      },
    }
  );
  const data = await response.json();
  const teams = await data.response;
  return teams;
}

async function addContentLeague() {
  try {
    const league = await fetchInfoLeague();
    const detailsElement = document.getElementById("details");

    const leagueDiv = document.createElement("div");
    leagueDiv.classList.add("league-details");

    const img = document.createElement("img");
    img.src = league.logo;
    img.alt = "League Logo";
    leagueDiv.appendChild(img);

    const div = document.createElement("div");
    div.classList.add("favorites");
    const name = document.createElement("h2");
    name.textContent = league.name;
    div.appendChild(name);
    leagueDiv.appendChild(div);

    const enlaceFavoritos = document.createElement("a");
    enlaceFavoritos.href = "#";

    const leaguesFavoritas = obtenerleaguesFavoritas();
    if (leaguesFavoritas.includes(league.id)) {
      enlaceFavoritos.innerHTML = `<ion-icon name="star"></ion-icon>`;
    } else {
      enlaceFavoritos.innerHTML = `<ion-icon name="star-outline"></ion-icon>`;
    }

    enlaceFavoritos.addEventListener("click", () => {
      toggleFavorito(league.id, enlaceFavoritos);
    });
    div.appendChild(enlaceFavoritos);
    leagueDiv.appendChild(div);

    detailsElement.appendChild(leagueDiv);
  } catch (err) {
    console.log(err);
  }
}

async function addContentTeams() {
  try {
    const url = new URL(window.location.href);
    const leagueId = url.searchParams.get("id");

    const teams = await fetchTeamsLeague();
    const detailsElement = document.getElementById("details");

    teams.forEach((teamData) => {
      const team = teamData.team;
      const venue = teamData.venue;

      const teamDiv = document.createElement("a");
      teamDiv.href = `detailTeam.html?id=${team.id}&league=${leagueId}`;
      teamDiv.classList.add("team");

      const logoDiv = document.createElement("div");
      logoDiv.classList.add("league-logo");
      const logoImg = document.createElement("img");
      logoImg.src = team.logo;
      logoImg.alt = team.name;
      logoImg.width = 25;
      logoImg.height = 25;
      logoDiv.appendChild(logoImg);
      teamDiv.appendChild(logoDiv);

      const nameDiv = document.createElement("div");
      nameDiv.classList.add("league-name");
      const name = document.createElement("p");
      name.textContent = team.name;
      nameDiv.appendChild(name);
      teamDiv.appendChild(nameDiv);

      const foundedDiv = document.createElement("div");
      foundedDiv.classList.add("league-founded");
      const founded = document.createElement("p");
      founded.textContent = "Founded: " + team.founded;
      foundedDiv.appendChild(founded);
      teamDiv.appendChild(foundedDiv);

      const stadiumDiv = document.createElement("div");
      stadiumDiv.classList.add("league-stadium");
      const stadium = document.createElement("p");
      stadium.textContent = venue.name;
      stadiumDiv.appendChild(stadium);
      teamDiv.appendChild(stadiumDiv);

      const moreDetailsDiv = document.createElement("div");
      moreDetailsDiv.classList.add("league-more-details");
      const detailsLink = document.createElement("a");
      detailsLink.href = `detailTeam.html?id=${team.id}&league=${leagueId}`;
      detailsLink.innerHTML = `<ion-icon name="arrow-forward-circle-outline"></ion-icon>`;
      moreDetailsDiv.appendChild(detailsLink);
      teamDiv.appendChild(moreDetailsDiv);

      detailsElement.appendChild(teamDiv);
    });
  } catch (err) {
    console.log(err);
  }
}

async function toggleFavorito(idleague, enlaceFavoritos) {
  const leaguesFavoritas = obtenerleaguesFavoritas();
  const indice = leaguesFavoritas.indexOf(idleague);

  if (indice === -1) {
    // If the league ID is not in favorites, add it
    leaguesFavoritas.push(idleague);
    enlaceFavoritos.innerHTML = `<ion-icon name="star"></ion-icon>`;
  } else {
    // If the league ID is already in favorites, remove it
    leaguesFavoritas.splice(indice, 1);
    enlaceFavoritos.innerHTML = `<ion-icon name="star-outline"></ion-icon>`;
  }

  localStorage.setItem("leaguesFavoritas", JSON.stringify(leaguesFavoritas));

  // Update the displayed favorites without refreshing the page
  await displayFavorites();
}


function obtenerleaguesFavoritas() {
  const leaguesFavoritasString = localStorage.getItem("leaguesFavoritas");
  if (leaguesFavoritasString) {
    return JSON.parse(leaguesFavoritasString);
  } else {
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  
  await addContentLeague();
  await addContentTeams();
});

