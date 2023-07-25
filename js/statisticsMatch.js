import fetchInfoMatch from "./detailMatch.js";

const apiKey = "caf1de4c27bae43908929e13e3d0a255";
const apiUrl = "https://v3.football.api-sports.io";

async function addStatisticsMatch() {
  try {
    const match = await fetchInfoMatch();

    const detailsElement = document.getElementById("details");

    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("id", "buttons-container");

    const summaryButton = document.createElement("button");
    summaryButton.textContent = "SUMMARY";
    summaryButton.addEventListener("click", showSummary);
    buttonsContainer.appendChild(summaryButton);

    // Statistiscs button
    const statsButton = document.createElement("button");
    statsButton.textContent = "STATISTICS";
    statsButton.addEventListener("click", showStatistics);
    buttonsContainer.appendChild(statsButton);
    detailsElement.appendChild(buttonsContainer);

    const statsContainer = document.createElement("div");
    statsContainer.setAttribute("id", "statistics");
    detailsElement.appendChild(statsContainer);

    const eventsContainer = document.createElement("div");
    eventsContainer.setAttribute("id", "summary");
    detailsElement.appendChild(eventsContainer);

    function showSummary() {
      statsContainer.style.display = "none";
      eventsContainer.style.display = "block";

      eventsContainer.innerHTML = "";
      const events = match.events;

      // First time
      const firstHalfEvents = events.filter(
        (event) => event.time.elapsed <= 45
      );

      const firstHalfBar = document.createElement("div");
      firstHalfBar.classList.add("firstHalf");
      firstHalfBar.textContent = "1ST HALF";
      eventsContainer.appendChild(firstHalfBar);

      const firstHalfList = document.createElement("ul");
      firstHalfList.classList.add("firstHalfList");
      const sortedFirstHalfEvents = firstHalfEvents.sort(
        (a, b) => a.time.elapsed - b.time.elapsed
      );

      sortedFirstHalfEvents.forEach((event) => {
        const eventItem = document.createElement("li");

        const eventType = event.type;
        let eventIconClass = "";
        if (eventType === "Goal") {
          eventIconClass = "fa-light";
        } else if (eventType === "Card") {
          eventIconClass = "fa-regular";
        } else if (eventType === "subst") {
          eventIconClass = "fa-solid";
        }

        const eventIcon = document.createElement("i");
        eventIcon.classList.add("fa", eventIconClass);
        if (eventType === "Goal") {
          eventIcon.classList.add("fa-futbol");
        } else if (eventType === "Card") {
          eventItem.innerHTML = `(${event.type})`;
          eventIcon.classList.add("fa-cards-blank");
        } else if (eventType === "subst") {
          eventIcon.classList.add("fa-rotate");
        }
        eventItem.appendChild(eventIcon);

        eventItem.innerHTML += `${event.time.elapsed}' ${event.player.name}`;

        if (event.team.id === match.teams.home.id) {
          eventItem.classList.add("homeEvent");
        } else {
          eventItem.classList.add("awayEvent");
        }

        firstHalfList.appendChild(eventItem);
      });

      eventsContainer.appendChild(firstHalfList);

      // Second time
      const secondHalfEvents = events.filter(
        (event) => event.time.elapsed > 45
      );

      const secondHalfBar = document.createElement("div");
      secondHalfBar.classList.add("secondHalf");
      secondHalfBar.textContent = "2nd HALF";
      eventsContainer.appendChild(secondHalfBar);

      const secondHalfList = document.createElement("ul");
      secondHalfList.classList.add("secondHalfList");

      const sortedSecondHalfEvents = secondHalfEvents.sort(
        (a, b) => a.time.elapsed - b.time.elapsed
      );

      sortedSecondHalfEvents.forEach((event) => {
        const eventItem = document.createElement("li");

        const eventType = event.type;
        let eventIconClass = "";
        if (eventType === "Goal") {
          eventIconClass = "fa-light";
        } else if (eventType === "subst") {
          eventIconClass = "fa-solid";
        } else if (eventType === "Card") {
          eventItem.innerHTML = `(${event.type})`;
          eventIconClass = "fa-regular";
        }

        const eventIcon = document.createElement("i");
        eventIcon.classList.add("fa", eventIconClass);
        if (eventType === "Goal") {
          eventIcon.classList.add("fa-futbol");
        } else if (eventType === "subst") {
          eventIcon.classList.add("fa-rotate");
        } else if (eventType === "Card") {
          eventIcon.classList.add("fa-cards-blank");
        }
        eventItem.appendChild(eventIcon);

        eventItem.innerHTML += ` ${event.time.elapsed}' ${event.player.name}`;

        if (event.team.id === match.teams.home.id) {
          eventItem.classList.add("homeEvent");
        } else {
          eventItem.classList.add("awayEvent");
        }

        secondHalfList.appendChild(eventItem);
      });

      eventsContainer.appendChild(secondHalfList);
    }

    async function showStatistics() {
      eventsContainer.style.display = "none";
      statsContainer.style.display = "block";

      statsContainer.innerHTML = "";
      const statistics = match.statistics;

      const statsList = document.createElement("ul");

      statistics.forEach((stat) => {
        const statItem = document.createElement("li");
        statItem.textContent = `${stat.team.name}: ${stat.statistics
          .map((s) => s.type)
          .join(", ")}`;
        statsList.appendChild(statItem);
      });

      statsContainer.appendChild(statsList);
    }
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addStatisticsMatch();
  showSummary();
  showStatistics();
});
