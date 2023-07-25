const apiKey = "caf1de4c27bae43908929e13e3d0a255";
const apiUrl = "https://v3.football.api-sports.io";

async function fetchInfoPlayer() {
  const url = new URL(window.location.href);
  const playerId = url.searchParams.get("id");

  const response = await fetch(`${apiUrl}/players?id=${playerId}&season=2021`, {
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey,
    },
  });
  const data = await response.json();
  const player = data.response[0];
  return player;
}

async function showPlayerStatistics(player) {
  try {
    const detailsElement = document.getElementById("details");
    const statisticsContainer = document.createElement("div");
    statisticsContainer.setAttribute("id", "player-statistics");

    const table = document.createElement("table");
    table.classList.add("statistics-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const emptyCell = document.createElement("th");
    headerRow.appendChild(emptyCell);

    const teamNames = player.statistics.map((stat) => stat.team.name);
    const uniqueTeamNames = [...new Set(teamNames)]; 

    uniqueTeamNames.forEach((teamName) => {
      const teamCell = document.createElement("th");
      teamCell.textContent = teamName;
      headerRow.appendChild(teamCell);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const statisticsTypes = Object.keys(player.statistics[0]);
    statisticsTypes.forEach((type) => {
      if (type === "team" || type === "league" || type === "substitutes") {
        return;
      }

      if (type === "cards") {
        const rowYellow = document.createElement("tr");
        const typeCellYellow = document.createElement("td");
        typeCellYellow.textContent = "Yellow cards";
        rowYellow.appendChild(typeCellYellow);

        const rowRed = document.createElement("tr");
        const typeCellRed = document.createElement("td");
        typeCellRed.textContent = "Red cards";
        rowRed.appendChild(typeCellRed);

        uniqueTeamNames.forEach((teamName) => {
          const teamStat = player.statistics.find((stat) => stat.team.name === teamName);
          const yellowCards = teamStat[type]?.yellow ?? 0;
          const redCards = teamStat[type]?.red ?? 0;

          const statCellYellow = document.createElement("td");
          statCellYellow.textContent = yellowCards;
          rowYellow.appendChild(statCellYellow);

          const statCellRed = document.createElement("td");
          statCellRed.textContent = redCards;
          rowRed.appendChild(statCellRed);
        });

        table.appendChild(rowYellow);
        table.appendChild(rowRed);
      } else {
        const row = document.createElement("tr");
        const typeCell = document.createElement("td");
        typeCell.textContent = type;
        row.appendChild(typeCell);

        uniqueTeamNames.forEach((teamName) => {
          const teamStat = player.statistics.find((stat) => stat.team.name === teamName);
          let statValue;

          switch (type) {
            case "games":
            typeCell.textContent = "Games";
              statValue = teamStat[type]?.appearences ?? "-";
              break;
            case "dribbles":
            typeCell.textContent = "Dribbles";
              statValue = teamStat[type]?.success ?? "-";
              break;
            case "fouls":
            typeCell.textContent = "Fouls";
              statValue = teamStat[type]?.committed ?? "-";
              break;
            case "penalty":
            typeCell.textContent = "Penalty";
              statValue = teamStat[type]?.scored ?? "-";
              break;
              case "shots":
              typeCell.textContent = "Shots";
              statValue = teamStat[type]?.total ?? "-";

              break;
            case "goals":
              typeCell.textContent = "Goals";
              statValue = teamStat[type]?.total ?? "-";

              break;
            case "passes":
              typeCell.textContent = "Passes";
              statValue = teamStat[type]?.total ?? "-";

              break;
            case "tackles":
              typeCell.textContent = "Tackles";
              statValue = teamStat[type]?.total ?? "-";

              break;
            case "duels":
              typeCell.textContent = "Duels";
              statValue = teamStat[type]?.total ?? "-";

              break;
            default:
              statValue = teamStat[type]?.total ?? "-";
              break;
          }

          const statCell = document.createElement("td");
          statCell.textContent = statValue;
          row.appendChild(statCell);
        });

        table.appendChild(row);
      }
    });

    statisticsContainer.appendChild(table);
    detailsElement.appendChild(statisticsContainer);
  } catch (err) {
    console.log(err);
  }
}


async function addContentPlayer() {
  try {
    const player = await fetchInfoPlayer();
    console.log(player);
    const detailsElement = document.getElementById("details");

    const playerDiv = document.createElement("div");
    playerDiv.classList.add("league-details");

    const img = document.createElement("img");
    img.src = player.player.photo;
    img.alt = `${player.player.name} logo`;
    playerDiv.appendChild(img);

    const name = document.createElement("h2");
    name.textContent = ` ${player.player.name}`;
    playerDiv.appendChild(name);

    detailsElement.appendChild(playerDiv);

    await showPlayerStatistics(player);
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await addContentPlayer();
});