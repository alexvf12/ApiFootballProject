const apiKey = "caf1de4c27bae43908929e13e3d0a255";
const apiUrl = "https://v3.football.api-sports.io";

let showStatisticsActive = false;
let showPlayersActive = false;
let teamsWithLeagueId = [];
let playersLoaded = false;

async function fetchInfoTeam() {
  const url = new URL(window.location.href);
  const teamId = url.searchParams.get("id");
  const response = await fetch(`${apiUrl}/teams?id=${teamId}`, {
    headers: {
      "x-rapidapi-host": apiUrl,
      "x-rapidapi-key": apiKey,
    },
  });
  const data = await response.json();
  const team = await data.response[0].team;
  console.log(team);
  return team;
}

async function fetchStatisticsTeam(season) {
  const url = new URL(window.location.href);
  const teamId = url.searchParams.get("id");
  const leagueId = url.searchParams.get("league");
  const response = await fetch(
    `${apiUrl}/teams/statistics?season=${season}&team=${teamId}&league=${leagueId}`,
    {
      headers: {
        "x-rapidapi-host": apiUrl,
        "x-rapidapi-key": apiKey,
      },
    }
  );
  const data = await response.json();
  const teamStats = await data.response;
  return teamStats;
}

async function fetchPlayersTeam() {
  const url = new URL(window.location.href);
  const leagueId = url.searchParams.get("league");
  const teamId = url.searchParams.get("id");
  const seasonInput = document.getElementById("season-select");
  const season = seasonInput.value;
  let currentPage = 1;
  let allPlayers = [];
  while (true) {
    const response = await fetch(
      `${apiUrl}/players?league=${leagueId}&season=${season}&page=${currentPage}`,
      {
        headers: {
          "x-rapidapi-host": apiUrl,
          "x-rapidapi-key": apiKey,
        },
      }
    );
    const data = await response.json();
    const players = data.response;
    allPlayers = [...allPlayers, ...players];
    const totalPages = data.paging.total;
    if (currentPage >= totalPages) {
      break;
    }
    currentPage++;
  }
  teamsWithLeagueId = allPlayers.filter((player) => {
    const statistics = player.statistics[0].team.id;
    return statistics === parseInt(teamId);
  });
  return teamsWithLeagueId;
}

async function addContentTeam() {
  const team = await fetchInfoTeam();
  const detailsElement = document.getElementById("details");
  const leagueDiv = document.createElement("div");
  leagueDiv.classList.add("league-details");
  const img = document.createElement("img");
  img.src = team.logo;
  img.alt = `${team.name} logo`;
  leagueDiv.appendChild(img);
  const name = document.createElement("h2");
  name.textContent = team.name;
  leagueDiv.appendChild(name);
  detailsElement.appendChild(leagueDiv);
}

async function addStatsTeam() {
  const detailsElement = document.getElementById("details");
  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("id", "buttons-container");
  const selectDiv = document.createElement("div");
  const select = document.createElement("select");
  select.setAttribute("id", "season-select");
  for (let year = 2016; year <= 2022; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  }
  select.value = "2022";
  selectDiv.appendChild(select);
  buttonsContainer.appendChild(selectDiv);
  const statsButtonDiv = document.createElement("div");
  const statsButton = document.createElement("button");
  statsButton.textContent = "STATISTICS";
  statsButtonDiv.appendChild(statsButton);
  buttonsContainer.appendChild(statsButtonDiv);
  detailsElement.appendChild(buttonsContainer);
  const playersButtonDiv = document.createElement("div");
  const playersButton = document.createElement("button");
  playersButton.textContent = "PLAYERS";
  playersButtonDiv.appendChild(playersButton);
  buttonsContainer.appendChild(playersButtonDiv);
  const contentContainer = document.createElement("div");
  contentContainer.setAttribute("id", "content-container");
  const statsContainer = document.createElement("div");
  statsContainer.setAttribute("id", "statistics");
  contentContainer.appendChild(statsContainer);
  const playersContainer = document.createElement("div");
  playersContainer.setAttribute("id", "players-container");
  playersContainer.style.display = "none";
  contentContainer.appendChild(playersContainer);
  detailsElement.appendChild(contentContainer);
  const seasonSelect = document.getElementById("season-select");
  async function showStatistics() {
    showStatisticsActive = true;
    showPlayersActive = false;
    const playersContainer = document.getElementById("players-container");
    playersContainer.style.display = "none";
    const statisticsContainer = document.getElementById("statistics");
    statisticsContainer.style.display = "block";
    const season = seasonSelect.value;
    try {
      const team = await fetchStatisticsTeam(season);
      const table = document.createElement("table");
      table.classList.add("statistics-table");
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      const emptyCell = document.createElement("th");
      headerRow.appendChild(emptyCell);
      const homeTitleCell = document.createElement("th");
      homeTitleCell.textContent = "Home";
      headerRow.appendChild(homeTitleCell);
      const awayTitleCell = document.createElement("th");
      awayTitleCell.textContent = "Away";
      headerRow.appendChild(awayTitleCell);
      const totalTitleCell = document.createElement("th");
      totalTitleCell.textContent = "All";
      headerRow.appendChild(totalTitleCell);
      thead.appendChild(headerRow);
      table.appendChild(thead);
      const createRow = (label, homeValue, awayValue, totalValue) => {
        const row = document.createElement("tr");
        const labelCell = document.createElement("td");
        labelCell.textContent = label;
        row.appendChild(labelCell);
        const homeCell = document.createElement("td");
        homeCell.textContent = homeValue;
        row.appendChild(homeCell);
        const awayCell = document.createElement("td");
        awayCell.textContent = awayValue;
        row.appendChild(awayCell);
        const totalCell = document.createElement("td");
        totalCell.textContent = totalValue;
        row.appendChild(totalCell);
        return row;
      };
      const columns = [
        {
          label: "Games played",
          homeValue: team.fixtures.played.home,
          awayValue: team.fixtures.played.away,
          totalValue: team.fixtures.played.total,
        },
        {
          label: "Wins",
          homeValue: team.fixtures.wins.home,
          awayValue: team.fixtures.wins.away,
          totalValue: team.fixtures.wins.total,
        },
        {
          label: "Draws",
          homeValue: team.fixtures.draws.home,
          awayValue: team.fixtures.draws.away,
          totalValue: team.fixtures.draws.total,
        },
        {
          label: "Loss",
          homeValue: team.fixtures.loses.home,
          awayValue: team.fixtures.loses.away,
          totalValue: team.fixtures.loses.total,
        },
        {
          label: "Goals For",
          homeValue: team.goals.for.total.home,
          awayValue: team.goals.for.total.away,
          totalValue: team.goals.for.total.total,
        },
        {
          label: "Goals Against",
          homeValue: team.goals.against.total.home,
          awayValue: team.goals.against.total.away,
          totalValue: team.goals.against.total.total,
        },
        {
          label: "Penalty missed",
          homeValue: team.penalty.missed.total,
          awayValue: team.penalty.missed.total,
          totalValue: team.penalty.missed.total,
        },
        {
          label: "Penalty scored",
          homeValue: team.penalty.scored.total,
          awayValue: team.penalty.scored.total,
          totalValue: team.penalty.scored.total,
        },
      ];
      columns.forEach((column) => {
        const row = createRow(
          column.label,
          column.homeValue,
          column.awayValue,
          column.totalValue
        );
        table.appendChild(row);
      });
      statisticsContainer.innerHTML = "";
      statisticsContainer.appendChild(table);
    } catch (err) {
      console.log(err);
    }
  }
  async function showPlayers() {
    showStatisticsActive = false;
    showPlayersActive = true;
    const statisticsContainer = document.getElementById("statistics");
    statisticsContainer.style.display = "none";
    const playersContainer = document.getElementById("players-container");
    playersContainer.style.display = "flex";
    if (showPlayersActive) {
      playersContainer.innerHTML = "";
      if (teamsWithLeagueId.length > 0) {
        teamsWithLeagueId.forEach((player) => {
          const playerDiv = document.createElement("div");
          playerDiv.classList.add("player");
          const playerImage = document.createElement("img");
          playerImage.src = player.player.photo;
          playerImage.alt = `${player.player.name} photo`;
          playerDiv.appendChild(playerImage);
          const playerName = document.createElement("a");
          playerName.textContent = player.player.name;
          playerDiv.appendChild(playerName);
          playersContainer.appendChild(playerDiv);
        });
      } else {
        try {
          teamsWithLeagueId = await fetchPlayersTeam();
          teamsWithLeagueId.forEach((player) => {
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("player");
            const playerImage = document.createElement("img");
            playerImage.src = player.player.photo;
            playerImage.alt = `${player.player.name} photo`;
            playerDiv.appendChild(playerImage);
            const playerName = document.createElement("a");
            playerName.href = `detailPlayer.html?id=${player.player.id}`;
            playerName.style.whiteSpace = "nowrap";
            playerName.textContent = player.player.name;
            playerDiv.appendChild(playerName);
            playersContainer.appendChild(playerDiv);
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  statsButton.addEventListener("click", showStatistics);
  playersButton.addEventListener("click", async () => {
    if (!playersLoaded) {
      await showPlayers();
      playersLoaded = true;
    }
  });
  seasonSelect.addEventListener("change", showStatistics);

  await showPlayers();
}

document.addEventListener("DOMContentLoaded", async () => {
  await addContentTeam();
  await addStatsTeam();
  const statisticsContainer = document.getElementById("statistics");
  const playersContainer = document.getElementById("players-container");
  statisticsContainer.style.display = "block";
  playersContainer.style.display = "none";
});