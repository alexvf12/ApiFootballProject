
const searchLeaguesAndTeams = async (searchText) => {
    const searchQuery = searchText ? `&search=${searchText}` : "";
  
    try {
      const leaguesResponse = await fetch(`${apiUrl}/leagues?${searchQuery}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });
  
      const teamsResponse = await fetch(`${apiUrl}/teams?${searchQuery}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });
  
      if (!leaguesResponse.ok) {
        throw new Error("Error fetching leagues");
      }
      if (!teamsResponse.ok) {
        throw new Error("Error fetching teams");
      }
  
      const leaguesData = await leaguesResponse.json();
      const teamsData = await teamsResponse.json();
  
      // Obtener el div "nav2" para actualizar sus resultados
      const nav2 = document.querySelector(".nav2");
  
      // Obtener o crear el contenedor "results-container"
      let resultsContainer = document.querySelector(".results-container");
      if (!resultsContainer) {
        resultsContainer = document.createElement("div");
        resultsContainer.classList.add("results-container");
        nav2.appendChild(resultsContainer);
      }
  
      // Limpiar resultados anteriores
      resultsContainer.innerHTML = "";
  
      // Mostrar los 5 primeros equipos solo si hay texto en el input
      if (searchText) {
        /* teamsData.response.slice(0, 5).forEach((team) => {
            console.log(team);
          const teamDiv = document.createElement("div");
          const teamLink = document.createElement("a");
          teamLink.textContent = team.team.name;
          teamLink.classList.add("team");
          teamLink.setAttribute(
            "href",
            `detailTeam.html?id=${team.team.id}&league=${team.league.id}`
          );
          teamDiv.appendChild(teamLink);
          resultsContainer.appendChild(teamDiv);
        }); */
  
        // Mostrar las 5 primeras ligas solo si hay texto en el input
        leaguesData.response.slice(0, 5).forEach((league) => {
            console.log(league);
          const leagueDiv = document.createElement("div");
          const leagueLink = document.createElement("a");
          leagueLink.textContent = league.league.name;
          leagueLink.classList.add("league");
          leagueLink.setAttribute(
            "href",
            `detailLeague.html?id=${league.league.id}`
          );
          leagueDiv.appendChild(leagueLink);
          resultsContainer.appendChild(leagueDiv);
        });
      }
  
      // Actualizar el atributo 'display' del contenedor según si hay resultados o no
      resultsContainer.style.display = searchText ? "block" : "none";
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  
  const searchInput = document.querySelector(".search-input");
  
  searchInput.addEventListener("input", (event) => {
    const searchText = event.target.value.trim();
    searchLeaguesAndTeams(searchText);
  });