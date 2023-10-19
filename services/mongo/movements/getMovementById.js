const { MongoClient, ObjectId } = require("mongodb");

async function getMovementById(id) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const movementsCollection = db.collection("movements");

    const movement = await movementsCollection.findOne({ _id: new ObjectId(id) });

    client.close();

    return movement;
  } catch (error) {
    console.error("Error al obtener el movimiento de MongoDB:", error);
    throw new Error("Error al obtener el movimiento de MongoDB");
  }
}

module.exports = getMovementById;
