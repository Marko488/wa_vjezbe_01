import express from "express";
const router = express.Router();

let narudzbe = [];
let nextid = 1;
const pizze = [
  { id: 1, naziv: "Margherita", cijena: 6.5 },
  { id: 2, naziv: "Capricciosa", cijena: 8.0 },
  { id: 3, naziv: "Quattro formaggi", cijena: 10.0 },
  { id: 4, naziv: "Šunka sir", cijena: 7.0 },
  { id: 5, naziv: "Vegetariana", cijena: 9.0 },
];

router.get("/", (req, res) => {
  res.status(200).json(narudzbe);
});

router.get("/:id", (req, res) => {
  const id_narudzba = req.params.id;
  const narudzba = narudzbe.find((n) => n.id == id_narudzba);
  if (narudzba) {
    res.status(200).json(narudzba);
  } else {
    res.status(404).json({ message: "Narudzba sa trazenim id ne postoji" });
  }
});

router.delete("/:id", (req, res) => {
  const id_narudzba = req.params.id;
  const index = narudzbe.findIndex((n) => n.id == id_narudzba);
  if (index !== -1) {
    narudzbe.splice(index, 1);
    res.status(204).json({});
  } else {
    res.status(404).json({ message: "Narudzba sa trazenim idem ne postoji!" });
  }
});

router.post("/naruci", (req, res) => {
  let ukupna_cijena = 0;
  const { narudzba, klijent } = req.body;
  if (!Array.isArray(narudzba)) {
    res.status(400).json({ message: "Ocekujem polje objekata!" });
    return;
  }

  const klj_klijenta = Object.keys(klijent);
  if (
    !(
      klj_klijenta.includes("prezime") &&
      klj_klijenta.includes("adresa") &&
      klj_klijenta.includes("broj_telefona")
    )
  ) {
    res
      .status(400)
      .json({ message: "Niste poslali sve podatke o klijentu za narudznu!" });
    return;
  }

  for (let item of narudzba) {
    const kljucevi = Object.keys(item);
    if (
      !(
        kljucevi.includes("pizza") &&
        kljucevi.includes("velicina") &&
        kljucevi.includes("kolicina")
      )
    ) {
      res
        .status(400)
        .json({ message: "Niste poslali sve podatke za narudzbu!" });
      return;
    }

    let pizza = pizze.find((pizza) => pizza.naziv == item.pizza);
    if (!pizza) {
      res.status(404).json({
        message: `Ta pizza ${item.pizza} ne postoji u nasem jelovniku!`,
      });
      return;
    }
    ukupna_cijena += pizza.cijena * item.kolicina;
  }

  const nova_narudzba = {
    id: nextid++,
    narudzba,
    klijent,
    ukupna_cijena,
  };

  narudzbe.push(nova_narudzba);

  const pizze_ime_vel = narudzba
    .map((item) => `${item.pizza} ${item.velicina}`)
    .join(", ");

  res.status(201).json({
    message: `Vaša narudžba za ${pizze_ime_vel} je uspješno zaprimljena!`,
    prezime: klijent.prezime,
    adresa: klijent.adresa,
    ukupna_cijena: ukupna_cijena,
  });
});

export default router;
