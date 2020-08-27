const request = require("request"); // Load request package

/*
    ----- Weatherstack HTTP Request -----
    1. "http://api.weatherstack.com/current?"
    2. access_key="..."& (access key given in your account)
    3. query="...","..."& (longitude and latitude of the location)
    4. units="..." (m, for metrics system unit)
*/

/*
    ----- Request package syntax -----
    request({url: http...., json: true}, (error, response) => {
        actions go here..
    });
*/

// Forcast function
const forecast = (latitude, longitude, callback) => {
  // URL
  const url =
    "http://api.weatherstack.com/current?access_key=aa0bd62e2f039918a0ca6178cff22ccb&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  // Request HTTPs
  /*  Note:
      1. url property in request is shorthanded from "{ url: url }" into "{ url }"
      2. response parameter in request is destructured from "response" into "{ body }"
  */
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // -- Low level error
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      // -- Response level error
      callback(
        "Unable to find the location, Please input the correct location!",
        undefined
      );
    } else {
      // -- Request success
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ", it's currently " +
          body.current.temperature +
          " degrees out, and it feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast; // Export forecast function
