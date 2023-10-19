const { MongoClient, ObjectId } = require("mongodb");

async function getAccountById(id) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const accountsCollection = db.collection("accounts");

    const account = await accountsCollection.findOne({ _id: new ObjectId(id) });

    client.close();

    return account;
  } catch (error) {
    console.error("Error al obtener la cuenta de MongoDB:", error);
    throw new Error("Error al obtener la cuenta de MongoDB");
  }
}

module.exports = getAccountById;
