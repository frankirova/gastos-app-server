const { MongoClient } = require("mongodb");

async function addMovement(movement) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const movementsCollection = db.collection("movements");

    const result = await movementsCollection.insertOne(movement);

    client.close();

    console.log("New movement added to MongoDB:", result.insertedId);
  } catch (error) {
    console.error("Error al agregar el movimiento a MongoDB:", error);
    throw new Error("Error al agregar el movimiento a MongoDB");
  }
}

module.exports = addMovement;
