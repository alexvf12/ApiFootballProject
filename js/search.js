
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
  
      const nav2 = document.querySelector(".nav2");
  
      let resultsContainer = document.querySelector(".results-container");
      if (!resultsContainer) {
        resultsContainer = document.createElement("div");
        resultsContainer.classList.add("results-container");
        nav2.appendChild(resultsContainer);
      }
  
      resultsContainer.innerHTML = "";
  
      if (searchText) {

  
        leaguesData.response.slice(0, 5).forEach((league) => {
            console.log(league);
          const leagueDiv = document.createElement("div");
          const leagueLink = document.createElement("a");
          leagueLink.textContent = league.league.name;
          leagueLink.classList.add("league");
          leagueLink.setAttribute(
            "href",
            `/html/detailLeague.html?id=${league.league.id}`
          );
          leagueDiv.appendChild(leagueLink);
          resultsContainer.appendChild(leagueDiv);
        });
      }
  
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