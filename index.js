import express from "express";
import pizzaRouter from "./routes/pizze.js";
import narudzbeRouter from "./routes/narudzbe.js";
const app = express();
app.use(express.json());
app.use("/pizze", pizzaRouter);
app.use("/narudzbe", narudzbeRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Doslo je do greske prilikom pokretannja web posluzitelja");
  } else {
    console.log(`Server ceka da obradi podatke na portu ${PORT}`);
  }
});
