const { MongoClient, ObjectId } = require("mongodb");

async function deleteMovement(id) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const movementsCollection = db.collection("movements");

    const result = await movementsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    client.close();

    if (result.deletedCount === 1) {
      console.log("Movimiento eliminado de MongoDB");
    } else {
      throw new Error("No se pudo eliminar el movimiento");
    }
  } catch (error) {
    console.error("Error al eliminar el movimiento de MongoDB:", error);
    throw new Error("Error al eliminar el movimiento de MongoDB");
  }
}
module.exports = deleteMovement;
