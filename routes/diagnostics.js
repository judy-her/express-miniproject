const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json--status 200 to indicata succesful request
  readFromFile('./db/diagnostics.json').then((dataJson) =>
    res.status(200).json(JSON.parse(dataJson))
  );
});

// POST Route for an error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file

  const { tip, topic, username } = req.body;

  const newData = {
    time: Date.now(),
    error_id: uuidv4(),
    errors: {
      tip,
      topic,
      username,
    },
  };

  readAndAppend(newData, './db/diagnostics.json');

  res.status(200).json({ msg: 'New Diagnostic logged successfully' });
});

module.exports = diagnostics;
