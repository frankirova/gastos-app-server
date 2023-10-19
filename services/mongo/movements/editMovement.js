const { MongoClient, ObjectId } = require("mongodb");

async function editMovement(id, updatedMovement) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const movementsCollection = db.collection("movements");

    const result = await movementsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedMovement }
    );

    client.close();

    if (result.modifiedCount === 1) {
      console.log("Movimiento actualizado en MongoDB");
    } else {
      throw new Error("No se pudo actualizar el movimiento");
    }
  } catch (error) {
    console.error("Error al editar el movimiento en MongoDB:", error);
    throw new Error("Error al editar el movimiento en MongoDB");
  }
}

module.exports = editMovement;
