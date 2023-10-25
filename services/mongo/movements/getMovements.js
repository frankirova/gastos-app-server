const { MongoClient } = require("mongodb");

async function getMovements(accountId) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const movementsCollection = db
      .collection("movements")
      .find({ account: accountId });

    const movements = await movementsCollection.find().toArray();

    client.close();

    return movements;
  } catch (error) {
    console.error("Error al obtener los movimientos de MongoDB:", error);
    throw new Error("Error al obtener los movimientos de MongoDB");
  }
}

module.exports = getMovements;
