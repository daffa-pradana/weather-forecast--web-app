// Server side javascript

const path = require("path"); // Load path modules
const express = require("express"); // Load express.js package
const hbs = require("hbs"); // Load handlebars (hbs) package
const geocode = require("./utils/geocode"); // Load geocode function
const forecast = require("./utils/forecast"); // Load forecast function

// Define express paths
// -- Public directory path
const publicDirectoryPath = path.join(__dirname, "../public");
// -- Views directory path
const viewsPath = path.join(__dirname, "../templates/views");
// -- Partials directory path
const partialsPath = path.join(__dirname, "../templates/partials");

// Initiate app express()
const app = express();

/*
  ----- Handlebars -----

  Handlebars (package):
  handlebars is gonna allow us to render dynamic documents
  and create a code that we can reuse across pages.

  hbs (package):
  hbs is using handlebars behind the scene, and make it ea
  -sier to integrate with express. since handlebars is a l
  -ow level package.

  Step:
  1. install hbs: "npm i hbs"
  2. setup hbs
  3. Create a folder named views and partials in templates folder
  4. Create a file named "page.hbs" in the folder, Eg. "index.hbs"
  5. render hbs file
  6. Set views directory path to integrate with express.js
  7. Set partials directory path to integrate with express.js

*/

// Setup handlebars engine and views directory location
// -- Set view engine
app.set("view engine", hbs);
// -- Set views
app.set("views", viewsPath);
// -- Set partials
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Index
app.get("", (req, res) => {
  // Render index page
  res.render("index.hbs", {
    title: "Weather",
    name: "Dave Pradana",
  });
});

// About
app.get("/about", (req, res) => {
  // Render about page
  res.render("about.hbs", {
    title: "About me",
    name: "Dave Pradana",
  });
});

// Help
app.get("/help", (req, res) => {
  // Render help page
  res.render("help.hbs", {
    title: "Help",
    message: "this is some helpful text.",
    name: "Dave Pradana",
  });
});

// Weather
app.get("/weather", (req, res) => {
  // Error Handler
  if (!req.query.address) {
    // Send error json
    return res.send({
      error: "You have to input an address",
    });
  }

  // Geocode
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      // Error handler
      if (error) {
        // Send error json
        return res.send({ error });
      }

      // Forecast
      forecast(latitude, longitude, (error, forecastData) => {
        // Error handler
        if (error) {
          // Send error json
          return res.send({ error });
        }

        // Send weather json
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// 404
app.get("*", (req, res) => {
  // Render 404 page
  res.render("404.hbs", {
    title: "404",
    errMessage: "Sorry, the page you're looking for doesn't exist",
    name: "Dave Pradana",
  });
});

// Help 404
app.get("/help/*", (req, res) => {
  // Render help 404 page
  res.render("404.hbs", {
    title: "404",
    errMessage: "Sorry, the article you're looking for doesn't exist",
    name: "Dave Pradana",
  });
});

// Start a server on port 3000
app.listen(3000, () => {
  console.log("Server is up on port 3000"); // Indicator
});

/* 
    EXPRESS API REFERENCE
    
    ----- Application -----

    1. app.set()
      Set method used for assigning a name to a value, to configure
      the behavior of the server.
      Eg. Syntax:
      app.set("name", "value");

    2. app.get()
      Get method used for HTTP GET requests to the specified
      callback functions. The callback function would take 2
      important arguments, request and respond.
      Eg. Syntax:
      app.get("path", (request, respond) => {callback function});

    3. app.listen()
      Listen method used for start a UNIX socket and listens for
      connections on the given path.
      Eg. Syntax:
      app.listen(port, () => {callback function});

    ----- Request -----

    1. req.query.foo
      Request query is used for HTTP query strings (HTTP Endpoint)
      The syntax is usually followed by several query that passed
      within the URL.
      Eg. URL:
      "localhost:3000/request?foo=value"
      Eg. Syntax:
      // To access value
      req.query.foo

    ----- Respond -----

    1. res.send()
      Send method used for sending a response in a form of simple
      non-streaming responses, for example: object, boolean, array
      html tag, etc.
      Eg. Syntax:
      res.send({ some: json });

    2. res.render()
      Render method is used for rendering a view and sends the ren
      -dered HTML string to the client.
      Eg. Syntax:
      res.render("index", {some: json});

*/
/*
    Note:
    To develop an app within a server, it's simpler to use
    nodemon since it will restart the server it self whenever
    the changes is made and saved.

    to start: 
      "nodemon app.js"
    to start with a restart preference:
      "nodemon app.js -e js,hbs"
*/
