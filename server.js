const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);
// //TODO POST route for `/api/diagnostics`
// app.post('/api/diagnostics', (req, res) => {
//   // that will store information about the invalid form submissions
//   res.json(`${req.method} request recieved`);
//   // Show the user agent information in the terminal
//   console.info(req.rawHeaders);

//   // Log our request to the terminal
//   console.info(`${req.method} request received`);
// });

//TODO wildcard for 404 error to redirect to my custom 404.html page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
