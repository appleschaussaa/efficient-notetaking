// required modules
const express = require("express");
// const dbJson = require("./db/db.json");
const path = require("path");
const fs = require("fs");
// for generating unique ids
// const uuid = require('uuid');
const api = require("./public/assets/js/index.js");
const { response } = require("express");

// used to create paths and use with insomnia
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", api);

app.use(express.static('public'));


app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET template from activity 20
app.get("/api/notes", (req, res) => {
  res.json(`${req.method} request received to get notes`);
  console.info(`${req.method} request received to get notes`);
});

// POST template from activity 20
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNotes = {
      title,
      text,
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNotes);
      // }
      fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null),
      (errMessage) => errMessage 
        ? console.error(errMessage)
        : console.info("Notes were added successfully")
      );
      };
    });

    const response = {
      status: "success",
      body: newNotes,
    };
    console.info(response);
    res.status(201).json(response);

  } else {
    res.status(500).json("could not add note due to an error")
  }
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} `)
);
