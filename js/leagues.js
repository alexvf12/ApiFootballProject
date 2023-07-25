async function fetchLeagues() {
  const response = await fetch("../assets/Leagues.json");
  const data = await response.json();
  return data.response;
}

async function fetchTopLeagues() {
  const response = await fetch("../assets/TopLeagues.json");
  const data = await response.json();
  return data.response;
}

async function addRandomLeagues() {
  try {
    const leagues = await fetchLeagues();
    const randomLeagues = leagues.sort(() => Math.random() - 0.5).slice(0, 15);
    const listContainer = document.querySelector("#league-random-list");

    randomLeagues.forEach((league) => {
      const a = document.createElement("a");
      a.textContent = league.league.name;
      a.href = `detailLeague.html?id=${league.league.id}`;
      a.style.whiteSpace = "nowrap";

      const div = document.createElement("a");
      div.href = `detailLeague.html?id=${league.league.id}`;
      const contentDiv = document.createElement("div");
      const img = document.createElement("img");
      const icon = document.createElement("ion-icon");

      img.src = league.league.logo;
      img.alt = "Logo" + league.league.name;
      img.width = 25;
      img.height = 25;

      div.classList.add("league");
      icon.setAttribute("name", "arrow-forward-circle-outline");

      contentDiv.appendChild(img);
      contentDiv.appendChild(a);
      div.appendChild(contentDiv);
      div.appendChild(icon);

      listContainer.appendChild(div); 
    });
  } catch (err) {
    console.log(err);
  }
}

async function addTopLeagues() {
  try {
    const leagues = await fetchTopLeagues();
    const listContainer = document.querySelector("#league-list");

    leagues.forEach((league) => {
      const a = document.createElement("a");
      a.textContent = league.league.name;
      a.href = `detailLeague.html?id=${league.league.id}`;

      const div = document.createElement("a");
      div.href = `detailLeague.html?id=${league.league.id}`;
      const contentDiv = document.createElement("div");
      const img = document.createElement("img");
      const icon = document.createElement("ion-icon");

      img.src = league.league.logo;
      img.alt = "Logo" + league.league.name;
      img.width = 25;
      img.height = 25;

      div.classList.add("league");
      icon.setAttribute("name", "arrow-forward-circle-outline");

      contentDiv.appendChild(img);
      contentDiv.appendChild(a);
      div.appendChild(contentDiv);
      div.appendChild(icon);

      listContainer.appendChild(div);
    });
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addRandomLeagues();
  addTopLeagues();
});