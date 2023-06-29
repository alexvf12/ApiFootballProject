const apiKey = "caf1de4c27bae43908929e13e3d0a255";
const apiUrl = "https://v3.football.api-sports.io";

// 20 Random Leagues
fetch("Leagues.json")
  .then((response) => response.json())
  .then((data) => {
    const leagues = data.response;
    const randomLeagues = leagues.sort(() => Math.random() - 0.5).slice(0, 15);
    const listContainer = document.getElementById("league-list");

    randomLeagues.forEach((league) => {
      const div = document.createElement("div");
      const contentDiv = document.createElement("div"); // Nuevo div para contener el <a> y <img>
      const a = document.createElement("a");
      const img = document.createElement("img");
      const icon = document.createElement("ion-icon");

      a.textContent = league.league.name;
      img.src = league.league.logo;
      img.alt = "Logo" + league.league.name;
      img.width = 25;
      img.height = 25;

      div.classList.add("league"); // Agregar la clase CSS deseada al div
      icon.setAttribute("name", "arrow-forward-circle-outline"); // Establecer el atributo "name" del ion-icon

      contentDiv.appendChild(img);
      contentDiv.appendChild(a);

      div.appendChild(contentDiv);
      div.appendChild(icon); // El ion-icon sigue siendo hijo directo del div principal

      listContainer.appendChild(div);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Live matches
fetch("https://v3.football.api-sports.io/fixtures?live=all", {
  method: "GET",
  headers: {
    "x-rapidapi-host": apiUrl,
    "x-rapidapi-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const liveMatches = data.response;

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

      // Div para el contenido principal del partido
      const matchContent = document.createElement("div");
      matchContent.classList.add("match-content");

      // Primer div con la imagen del equipo local
      const homeTeamLogoDiv = document.createElement("div");
      homeTeamLogoDiv.classList.add("team-logo");
      const homeTeamLogo = document.createElement("img");
      homeTeamLogo.src = homeLogo;
      homeTeamLogo.alt = "Logo del equipo local";
      homeTeamLogoDiv.appendChild(homeTeamLogo);

      // Tercer div con las tres etiquetas <p>
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("team-info");
      const homeTeamName = document.createElement("p");
      homeTeamName.textContent = homeTeam;
      const scoreElem = document.createElement("p");
      scoreElem.textContent = score;
      const awayTeamName = document.createElement("p");
      awayTeamName.textContent = awayTeam;
      infoDiv.appendChild(homeTeamName);
      infoDiv.appendChild(scoreElem);
      infoDiv.appendChild(awayTeamName);

      // Último div con la imagen del equipo visitante
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

      // Div para la hora del partido y el estadio
      const matchInfo = document.createElement("div");
      matchInfo.classList.add("match-info");
      const timeElem = document.createElement("p");
      timeElem.innerHTML = `<ion-icon name="time-outline"></ion-icon> ${matchTime.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`;

      const stadiumIcon = document.createElement("ion-icon");
      stadiumIcon.setAttribute("name", "location-outline");
      const stadiumElem = document.createElement("p");
      stadiumElem.innerHTML = `<ion-icon name="location-outline"></ion-icon> ${stadium}`;

      matchInfo.appendChild(timeElem);
      matchInfo.appendChild(stadiumElem);

      matchBox.appendChild(matchInfo);

      // Div para los enlaces de favoritos y ver detalles
      const matchLinks = document.createElement("div");
      matchLinks.classList.add("match-links");

      const favoritesLink = document.createElement("a");
      favoritesLink.href = "#";
      favoritesLink.innerHTML = `<ion-icon name="star-outline"></ion-icon>`;

      const detailsLink = document.createElement("a");
      detailsLink.href = "#";
      detailsLink.innerHTML = `View Details <ion-icon name="arrow-forward-circle-outline"></ion-icon>`;

      matchLinks.appendChild(favoritesLink);
      matchLinks.appendChild(detailsLink);

      matchBox.appendChild(matchLinks);

      matchesElement.appendChild(matchBox);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Obtener los datos de Pep Guardiola
fetch("https://v3.football.api-sports.io/coachs?search=guardiola", {
  method: "GET",
  headers: {
    "x-rapidapi-host": apiUrl,
    "x-rapidapi-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const guardiolaData = data.response[0];
    console.log(guardiolaData);

    const trendingDiv = document.getElementById("trending");

    // Crear div para la foto y el nombre de Pep Guardiola
    const coachDiv = document.createElement("div");
    coachDiv.classList.add("coach");

    // Crear elemento de imagen para la foto de Pep Guardiola
    const coachPhoto = document.createElement("img");
    coachPhoto.setAttribute("src", guardiolaData.photo);
    coachPhoto.setAttribute("alt", "Pep Guardiola");
    coachPhoto.width = 80
    coachPhoto.height = 80

    // Crear elemento de nombre para Pep Guardiola
    const coachName = document.createElement("h3");
    coachName.innerText =
      guardiolaData.firstname + " " + guardiolaData.lastname;

    // Añadir los elementos al div del entrenador
    coachDiv.appendChild(coachPhoto);
    coachDiv.appendChild(coachName);

    // Añadir el div del entrenador al div trending
    trendingDiv.appendChild(coachDiv);

    // Fetch para obtener los trofeos de Pep Guardiola
    fetch("https://v3.football.api-sports.io/trophies?coach=4", {
      method: "GET",
      headers: {
        "x-rapidapi-host": apiUrl,
        "x-rapidapi-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const trophies = data.response;
        const championsLeagues = trophies.filter(
          (trophy) =>
            trophy.league === "UEFA Champions League" && trophy.place === "Winner"
        );

        const championsDiv = document.createElement("div");
        championsDiv.classList.add("champions");

        const championsCount = championsLeagues.length;
        const championsText = `${championsCount + 1} Champion League`;

        const icon = document.createElement("ion-icon");
        icon.setAttribute("name", "flash-outline");

        championsDiv.appendChild(icon);
        championsDiv.appendChild(document.createTextNode(championsText));

        trendingDiv.appendChild(championsDiv);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
