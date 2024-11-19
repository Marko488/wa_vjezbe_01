import express from "express";
const router = express.Router();

const pizze = [
  { id: 1, naziv: "Margherita", cijena: 6.5 },
  { id: 2, naziv: "Capricciosa", cijena: 8.0 },
  { id: 3, naziv: "Quattro formaggi", cijena: 10.0 },
  { id: 4, naziv: "Šunka sir", cijena: 7.0 },
  { id: 5, naziv: "Vegetariana", cijena: 9.0 },
];

router.get("/", (req, res) => {
  res.status(200).json(pizze);
});

router.get("/:id", (req, res) => {
  const id_pizza = req.params.id;
  const pizza = pizze.find((pizza) => pizza.id == id_pizza);
  if (pizza) {
    res.status(200).json(pizza);
  } else {
    res.status(404).json({ message: "Pizza sa trazenim Id-em ne postoji!" });
  }
});

router.put("/:id", (req, res) => {
  const id_pizza = req.params.id;
  let nova_pizza = req.body;
  const index = pizze.findIndex((pizza) => pizza.id == id_pizza);
  if (index !== -1) {
    res.status(200);
    pizze[index] = nova_pizza;
  } else {
    res.status(404).json({ message: "Pizza sa trazenim ID ne postoji!" });
  }
});

router.patch("/:id", (req, res) => {
  const id_pizza = req.params.id;
  let nova_pizza = req.body;
  let index = pizze.findIndex((pizza) => pizza.id == id_pizza);
  if (index !== -1) {
    res.status(200);
    pizze[index] = { ...pizze[index], ...nova_pizza };
  } else {
    res.status(404).json({ message: "Pizza sa trazenim id ne postoji!" });
  }
});

router.delete("/:id", (req, res) => {
  const id_pizza = req.params.id;
  let index = pizze.findIndex((pizza) => pizza.id == id_pizza);
  if (index !== -1) {
    pizze.splice(index, 1);
    res.status(204);
  } else {
    res.status(404).json({ message: "Pizza sa trazenim id ne postoji!" });
  }
});

export default router;
