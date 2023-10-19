const { MongoClient } = require("mongodb");

async function getAccounts() {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const accountsCollection = db.collection("accounts");

    const accounts = await accountsCollection.find().toArray();

    client.close();

    return accounts;
  } catch (error) {
    console.error("Error al obtener la cuenta de MongoDB:", error);
    throw new Error("Error al obtener la cuenta de MongoDB");
  }
}

module.exports = getAccounts;
