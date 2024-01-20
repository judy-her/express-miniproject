const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  console.info(`${req.method} request received for diagnostics`);
  readFromFile('./db/diagnostics.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for an error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.info(`${req.method} request received to log an error`);
  console.log(req.body);
  const { error_id, errors, tip, username } = req.body;
  if (req.body) {
    const newError = {
      error_id,
      errors,
      tip,
      username
    };

    readAndAppend(newError, './db/diagnostics.json');
    res.json(`New Diagnostic added successfully`);
  } else {
    res.error('Error in adding diagnosis');
  }

});

module.exports = diagnostics;







});
