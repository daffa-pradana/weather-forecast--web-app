// Client side javascript

// Form element
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

// Message element
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// Form event listener
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent to refresh the browser after submit
  const location = search.value; // Location input
  messageOne.textContent = "Loading weather data...";
  messageTwo.textContent = "";
  // Forecast URL
  const forecastURL = "/weather?address=" + location;
  // Fetch API
  fetch(forecastURL).then((response) => {
    response.json().then((data) => {
      // Error handler
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
