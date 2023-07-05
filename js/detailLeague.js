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
  const results = await data.response[0].league;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchInfoLeague();
});
