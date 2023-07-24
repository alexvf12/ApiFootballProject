async function fetchInfoLeagueById(leagueId) {
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

async function fetchInfoTeamById(teamId, leagueId) {
  const response = await fetch(`${apiUrl}/teams?id=${teamId}`, {
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey,
    },
  });
  const data = await response.json();
  const team = await data.response[0].team;
  team.leagueId = leagueId; 
  return team;
}

async function displayFavorites() {
  try {
    const favoritesDiv = document.getElementById("favorites");
    favoritesDiv.innerHTML = "";

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("favorites-title");

    const titleIcon = document.createElement("ion-icon");
    titleIcon.setAttribute("name", "star");

    const titleText = document.createElement("h4");
    titleText.textContent = "Favorites Leagues";
    titleText.appendChild(titleIcon);

    titleDiv.appendChild(titleText);

    favoritesDiv.appendChild(titleDiv);

    const leaguesFavoritas = obtenerleaguesFavoritas();
    for (const leagueId of leaguesFavoritas) {
      const league = await fetchInfoLeagueById(leagueId);
      const div = document.createElement("div");
      div.classList.add("league");

      const a = document.createElement("a");
      a.textContent = league.name;
      a.href = `detailLeague.html?id=${league.id}`;

      const contentDiv = document.createElement("div");

      const img = document.createElement("img");
      img.src = league.logo;
      img.alt = "Logo " + league.name;
      img.width = 25;
      img.height = 25;

      const icon = document.createElement("ion-icon");
      icon.setAttribute("name", "arrow-forward-circle-outline");

      contentDiv.appendChild(img);
      contentDiv.appendChild(a);

      div.appendChild(contentDiv);
      div.appendChild(icon);

      favoritesDiv.appendChild(div);
    }

    const titleDivTeams = document.createElement("div");
    titleDivTeams.classList.add("favorites-title");
  
    const titleIconTeams = document.createElement("ion-icon");
    titleIconTeams.setAttribute("name", "star");
  
    const titleTextTeams = document.createElement("h4");
    titleTextTeams.textContent = "Favorite Teams";
    titleTextTeams.appendChild(titleIconTeams);
  
    titleDivTeams.appendChild(titleTextTeams);
  
    favoritesDiv.appendChild(titleDivTeams);
  
    const teamsFavoritos = obtenerTeamsFavoritos();
    for (const teamInfo of teamsFavoritos) {
      const team = await fetchInfoTeamById(teamInfo.id, teamInfo.leagueId);

      const teamDiv = document.createElement("div");
      teamDiv.classList.add("league");

      const a = document.createElement("a");
      a.textContent = team.name;
      a.href = `detailTeam.html?id=${team.id}&league=${team.leagueId}`;

      const contentDiv = document.createElement("div");

      const img = document.createElement("img");
      img.src = team.logo;
      img.alt = "Logo " + team.name;
      img.width = 25;
      img.height = 25;

      const icon = document.createElement("ion-icon");
      icon.setAttribute("name", "arrow-forward-circle-outline");

      contentDiv.appendChild(img);
      contentDiv.appendChild(a);

      teamDiv.appendChild(contentDiv);
      teamDiv.appendChild(icon);

      favoritesDiv.appendChild(teamDiv);
    }
  } catch (err) {
    console.log(err);
  }
}

function obtenerleaguesFavoritas() {
  const leaguesFavoritasString = localStorage.getItem("leaguesFavoritas");
  if (leaguesFavoritasString) {
    return JSON.parse(leaguesFavoritasString);
  } else {
    return [];
  }
}

function obtenerTeamsFavoritos() {
  const teamsFavoritosString = localStorage.getItem("teamsFavoritos");
  if (teamsFavoritosString) {
    return JSON.parse(teamsFavoritosString);
  } else {
    return [];
  }
}

function toggleFavorito(id, leagueId, type, enlaceFavoritos) {
  let favorites = [];
  const favoritesString = localStorage.getItem(type);
  if (favoritesString) {
    favorites = JSON.parse(favoritesString);
  }

  const index = favorites.findIndex((item) => item.id === id && item.leagueId === leagueId);

  if (index === -1) {
    favorites.push({ id, leagueId });
    enlaceFavoritos.innerHTML = `<ion-icon name="star"></ion-icon>`;
  } else {
    favorites.splice(index, 1);
    enlaceFavoritos.innerHTML = `<ion-icon name="star-outline"></ion-icon>`;
  }

  localStorage.setItem(type, JSON.stringify(favorites));
  displayFavorites();
}

async function toggleFavoritoLeague(leagueId, enlaceFavoritos) {
  let leaguesFavoritas = obtenerleaguesFavoritas();
  const index = leaguesFavoritas.indexOf(leagueId);

  if (index === -1) {
    leaguesFavoritas.push(leagueId);
    enlaceFavoritos.innerHTML = `<ion-icon name="star"></ion-icon>`;
  } else {
    leaguesFavoritas.splice(index, 1);
    enlaceFavoritos.innerHTML = `<ion-icon name="star-outline"></ion-icon>`;
  }

  localStorage.setItem("leaguesFavoritas", JSON.stringify(leaguesFavoritas.filter(Boolean)));
  displayFavorites();
}



document.addEventListener("DOMContentLoaded", async () => {
  await displayFavorites();
});
