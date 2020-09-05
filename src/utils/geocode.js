const request = require("request"); // Load request package

/*
    ----- Mapbox(Geocode) HTTP Request -----
    1. https://api.mapbox.com/geocoding/v5/mapbox.places/ (forward geocoding)
    2. "...".json? (place or location name)
    3. access_token="...."& (access token given in your account)
    4. limit=".." (limit the features array response)
    5. encodeURIComponent() is used for converting a special character into a URL code
*/

/*
    ----- Request package syntax -----
    request({url: http...., json: true}, (error, response) => {
        actions go here..
    });
*/

// Geocode function
const geocode = (address, callback) => {
  // URL
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZGF2ZWsyIiwiYSI6ImNrY3I1cWljcDB4Z2MyeWxlaW9hcjkxeTAifQ.rMMFVeS03QSFI0YnlgTKWg&limit=1";
  // Request HTTPs
  /*  Note:
      1. url property in request is shorthanded from "{ url: url }" into "{ url }"
      2. response parameter in request is destructured from "response" into "{ body }"
  */
  request({ url, json: true }, (error, { body }) => {
    // Error handling
    if (error) {
      // -- Low level error
      callback("Unable to connect to location services!", undefined);
    } else if (body.message) {
      // -- Response level error 1
      callback("Please enter a correct location!", undefined);
    } else if (body.features.length === 0) {
      // -- Response level error 2
      callback("Unable to find the location, Try another search!", undefined);
    } else {
      // -- Request success
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode; // Export geocode function
