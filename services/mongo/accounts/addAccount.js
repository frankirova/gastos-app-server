const { MongoClient } = require("mongodb");

async function addAccount(account) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const accountsCollection = db.collection("accounts");

    const result = await accountsCollection.insertOne(account);

    client.close();

    console.log("New movement added to MongoDB:", result.insertedId);
  } catch (error) {
    console.error("Error al agregar la cuenta a MongoDB:", error);
    throw new Error("Error al agregar la cuenta a MongoDB");
  }
}

module.exports = addAccount;
