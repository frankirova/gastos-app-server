const { MongoClient, ObjectId } = require("mongodb");

async function editAccount(id, updatedAccount) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const accountsCollection = db.collection("accounts");

    const result = await accountsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedAccount }
    );

    client.close();

    if (result.modifiedCount === 1) {
      console.log("Cuenta actualizado en MongoDB");
    } else {
      throw new Error("No se pudo actualizar la cuenta");
    }
  } catch (error) {
    console.error("Error al editar la cuenta en MongoDB:", error);
    throw new Error("Error al editar la cuenta en MongoDB");
  }
}

module.exports = editAccount;
