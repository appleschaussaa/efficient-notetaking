const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')

notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };
    console.info(response);
    
    res.json(response);
  } else {
    res.json('could not add note due to an error')
  }
});

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((JSON) => {
      const results = JSON.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', results);
      res.json(`Your note has been deleted!`);
    });
});

module.exports = notes;