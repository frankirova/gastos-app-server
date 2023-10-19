const { MongoClient } = require("mongodb");

async function resetExpenses() {
  const uri =
    "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
  const client = await MongoClient.connect(uri);
  const db = client.db("MisGastos");
  await db.collection("movements").deleteMany({ group: "expense" });
  client.close();
}
module.exports = resetExpenses;
