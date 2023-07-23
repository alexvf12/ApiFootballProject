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
  
      titleDiv.appendChild(titleText);
      titleDiv.appendChild(titleIcon);
  
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
  // Call the function when the DOM is loaded
  document.addEventListener("DOMContentLoaded", async () => {
    await displayFavorites();
  });
  