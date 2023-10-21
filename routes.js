// const connectToMongoDB = require("./services/mongo/connectToMongo");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const addCategories = require("./services/mongo/categories/addCategory");
const getCategories = require("./services/mongo/categories/getCategory");
const deleteCategory = require("./services/mongo/categories/deleteCategory");

const deleteMovement = require("./services/mongo/movements/deleteMovement");
const editMovement = require("./services/mongo/movements/editMovement");
const addMovement = require("./services/mongo/movements/addMovement");
const getMovements = require("./services/mongo/movements/getMovements");
const getMovementById = require("./services/mongo/movements/getMovementById");
const getTotals = require("./services/mongo/movements/getTotals");

const deleteAccount = require("./services/mongo/accounts/deleteAccount");
const editAccount = require("./services/mongo/accounts/editAccount");
const addAccount = require("./services/mongo/accounts/addAccount");
const getAccounts = require("./services/mongo/accounts/getAccounts");
const getAccountById = require("./services/mongo/accounts/getAccountById");

const app = express();

// midleware
app.use(morgan("dev"));
app.use(express.json());
// Middleware para habilitar CORS
const origins = ['http://localhost:5173',"https://gastos-app-client.vercel.app"]
app.use(
  cors({
    origin: origins,
  })
);

//routes
app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

app.get("/myCategories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).send("Error al obtener las categorías");
  }
});

app.get("/movements", async (req, res) => {
  try {
    const movements = await getMovements();
    res.json(movements);
  } catch (error) {
    console.error("Error al obtener los moviemientos:", error);
    res.status(500).send("Error al obtener los moviemientos");
  }
});

app.get("/movement/:id", async (req, res) => {
  try {
    const movementId = req.params.id;
    const movement = await getMovementById(movementId);

    if (movement) {
      res.json(movement);
    } else {
      res.status(404).send("Movimiento no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el movimiento:", error);
    res.status(500).send("Error al obtener el movimiento");
  }
});

app.get("/totals", async (req, res) => {
  try {
    const totals = await getTotals();

    if (totals) {
      res.json(totals);
    } else {
      res.status(404).send("total no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el total:", error);
    res.status(500).send("Error al obtener el total");
  }
});

app.get("/accounts", async (req, res) => {
  try {
    const accounts = await getAccounts();

    if (accounts) {
      res.json(accounts);
    } else {
      res.status(404).send("cuenta no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener la cuenta:", error);
    res.status(500).send("Error al obtener la cuenta");
  }
});

app.get("/account/:id", async (req, res) => {
  try {
    const accountId = req.params.id;
    const account = await getAccountById(accountId);

    if (account) {
      res.json(account);
    } else {
      res.status(404).send("Cuenta no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener la cuenta:", error);
    res.status(500).send("Error al obtener la cuenta");
  }
});

//post
app.post("/addCategories", (req, res) => {
  const category = req.body;
  addCategories(category);
  res.send("Listo pa");
});

app.post("/addMovement", async (req, res) => {
  try {
    const movement = req.body;
    await addMovement(movement);
    res.send("listo pa");
  } catch (error) {
    console.error("Error al agregar movimiento:", error);
    res.status(500).send("Error al agregar el movimiento");
  }
});

app.post("/addAccount", async (req, res) => {
  try {
    const account = req.body;
    await addAccount(account);
    res.send("Listo pa");
  } catch (error) {
    console.error("Error al agregar la cuenta:", error);
    res.status(500).send("Error al agregar la cuenta");
  }
});

//delete
app.delete("/category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    await deleteCategory(categoryId);
    res.send("Categoria eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el categoria:", error);
    res.status(500).send("Error al eliminar el categoria");
  }
});

app.delete("/movement/:id", async (req, res) => {
  try {
    const movementId = req.params.id;
    await deleteMovement(movementId);
    res.send("Movimiento eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el movimiento:", error);
    res.status(500).send("Error al eliminar el movimiento");
  }
});

app.delete("/account/:id", async (req, res) => {
  try {
    const accountId = req.params.id;
    await deleteAccount(accountId);
    res.send("Cuenta eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    res.status(500).send("Error al eliminar la cuenta");
  }
});

//put
app.put("/movement/:id", async (req, res) => {
  try {
    const movementId = req.params.id;
    const updatedMovement = req.body; // Los nuevos valores del gasto

    await editMovement(movementId, updatedMovement);

    res.send("Movimiento actualizado correctamente");
  } catch (error) {
    console.error("Error al editar el movimiento:", error);
    res.status(500).send("Error al editar el movimiento");
  }
});

app.put("/account/:id", async (req, res) => {
  try {
    const accountId = req.params.id;
    const updatedAccount = req.body; // Los nuevos valores del gasto

    await editAccount(accountId, updatedAccount);

    res.send("Cuenta actualizada correctamente");
  } catch (error) {
    console.error("Error al editar la cuenta:", error);
    res.status(500).send("Error al editar la cuenta");
  }
});

//listen
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
