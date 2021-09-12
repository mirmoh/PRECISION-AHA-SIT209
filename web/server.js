const express = require('express');
const app = express();
const port = 3006;
const base = `${__dirname}/public`;

//Specify middleware to server static files from the /public directory
app.use(express.static('public'));

//Add a route middleware for the root URI path
app.get('/', function (req, res) {
    res.sendFile(`${base}/404.html`);
  });

app.get('/register', (req, res) => {
    res.sendFile(`${base}/register.html`);
  });
  
app.get('/iot-applications', (req, res) => {
    res.sendFile(`${base}/iot-applications.html`);
  });

//start the web server and listen to requests on the specified port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });

//handle any paths that cannot be found by the web server
app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
  });