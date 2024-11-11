const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

let users = [
  {
    id: 1,
    ime: "Marko",
    prezime: "Damijanjević",
  },
  {
    id: 2,
    ime: "Ivo",
    prezime: "Ivić",
  },
  {
    id: 3,
    ime: "Loren",
    prezime: "Tadić",
  },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Zad 1.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Zad 2.html"));
});

app.get("/users", (req, res) => {
  res.json(users);
});
app.listen(PORT, (error) => {
  if (error) {
    console.log("Doslo je do greske prilikom pokretannja web posluzitelja");
  } else {
    console.log(`Server ceka da obradi podatke na portu ${PORT}`);
  }
});
