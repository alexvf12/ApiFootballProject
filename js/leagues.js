async function fetchLeagues() {
  const response = await fetch("../srcs/Leagues.json");
  const data = await response.json();
  return data.response;
}

async function addRandomLeagues() {
  try {
    const leagues = await fetchLeagues();
    const randomLeagues = leagues.sort(() => Math.random() - 0.5).slice(0, 15);
    const listContainer = document.querySelector("#league-list");

    randomLeagues.forEach((league) => {
      const div = document.createElement("div");
      const contentDiv = document.createElement("div");
      const a = document.createElement("a");
      const img = document.createElement("img");
      const icon = document.createElement("ion-icon");

      a.textContent = league.league.name;
      a.href = `detailLeague.html?id=${league.league.id}`;
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

async function main() {
  await addRandomLeagues();
}
main().catch(console.error);
