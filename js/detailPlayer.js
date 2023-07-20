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
  const player = await data.response[0];
  return player;
}

async function addContentPlayer() {
  try {
    const player = await fetchInfoPlayer();
    console.log(player.player);
    const detailsElement = document.getElementById("details");

    const playerDiv = document.createElement("div");
    playerDiv.classList.add("league-details");

    const img = document.createElement("img");
    img.src = player.player.photo;
    img.alt = `${player.player.name} logo`;
    playerDiv.appendChild(img);

    const name = document.createElement("h2");
    name.textContent = `${player.player.firstname}  ${player.player.name}`;
    playerDiv.appendChild(name);

    detailsElement.appendChild(playerDiv);
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchInfoPlayer();
  await addContentPlayer();
});
