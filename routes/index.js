const express = require('express');

const notesRouter = require('./notesRoute');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;