import express from "express";
const app = express();
app.use(express.json());
const PORT = 3000;

let narudzbe = [];

const pizze = [
  { id: 1, naziv: "Margherita", cijena: 6.5 },
  { id: 2, naziv: "Capricciosa", cijena: 8.0 },
  { id: 3, naziv: "Quattro formaggi", cijena: 10.0 },
  { id: 4, naziv: "Šunka sir", cijena: 7.0 },
  { id: 5, naziv: "Vegetariana", cijena: 9.0 },
];

app.post("/naruci", (req, res) => {
  let ukupna_cijena = 0;
  const { narudzba, klijent } = req.body;
  if (!Array.isArray(narudzba)) {
    res.json({ message: "Ocekujem polje objekata!" });
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
    res.json({ message: "Niste poslali sve podatke o klijentu za narudznu!" });
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
      res.json({ message: "Niste poslali sve podatke za narudzbu!" });
      return;
    }

    let pizza = pizze.find((pizza) => pizza.naziv == item.pizza);
    if (!pizza) {
      res.json({
        message: `Ta pizza ${item.pizza} ne postoji u nasem jelovniku!`,
      });
      return;
    }
    ukupna_cijena += pizza.cijena * item.kolicina;
  }
  narudzbe.push({ narudzba, klijent, ukupna_cijena });

  const pizze_ime_vel = narudzba
    .map((item) => `${item.pizza} ${item.velicina}`)
    .join(", ");

  res.json({
    message: `Vaša narudžba za ${pizze_ime_vel} je uspješno zaprimljena!`,
    prezime: klijent.prezime,
    adresa: klijent.adresa,
    ukupna_cijena: ukupna_cijena,
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Doslo je do greske prilikom pokretannja web posluzitelja");
  } else {
    console.log(`Server ceka da obradi podatke na portu ${PORT}`);
  }
});
