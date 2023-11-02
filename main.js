const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-ET-WEB-PT-A/events";

const mainEl = document.querySelector("main");
const formEl = document.querySelector("form");
const partyLabel = document.querySelector("#partyLabel");
const dateLabel = document.querySelector("#dateLabel");
const locationLabel = document.querySelector("#locationLabel");

async function getEvents() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
}

function render(events) {
  const template = events.map(event => {
      return (
        `<section>
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <button data-id="${event.id}">Delete Party</button>
        </section>`
      )
    }).join("");
    mainEl.innerHTML = template;
}

async function eventApp() {
  const events = await getEvents();
  render(events);
}

eventApp();

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: partyLabel.value,
        description: descriptionLabel.value,
        Date: dateLabel.value,
        Location: locationLabel.value,
      }),
    });
console.log("Post request complete");
    partyLabel.value = "";
    dateLabel.value = "";
    locationLabel.value = "";
    descriptionLabel.value = "";
    eventApp();
  } catch (err) {
    console.error(err);
  }
});

mainEl.addEventListener("click", async (event) => {
  if (event.target.matches("button")) {
    const id = event.target.dataset.id;
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    eventApp();
  }
});
