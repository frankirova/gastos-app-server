const { MongoClient } = require("mongodb");

async function getMovements(accountId) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    await client.connect();

    const db = client.db("MisGastos");
    const movementsCollection = db.collection("movements");

    // Query the collection for movements
    const movements = await movementsCollection.find({ account: accountId }).toArray();

    // Close the connection when done
    await client.close();

    return movements;
  } catch (error) {
    console.error("Error al obtener los movimientos de MongoDB:", error);
    throw new Error("Error al obtener los movimientos de MongoDB");
  }
}

module.exports = getMovements;

