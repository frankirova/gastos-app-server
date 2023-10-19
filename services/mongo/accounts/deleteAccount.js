const { MongoClient, ObjectId } = require("mongodb");

async function deleteAccount(id) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const accountsCollection = db.collection("accounts");

    const result = await accountsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    client.close();

    if (result.deletedCount === 1) {
      console.log("Cuenta eliminado de MongoDB");
    } else {
      throw new Error("No se pudo eliminar la cuenta");
    }
  } catch (error) {
    console.error("Error al eliminar la cuenta de MongoDB:", error);
    throw new Error("Error al eliminar la cuenta de MongoDB");
  }
}
module.exports = deleteAccount;
