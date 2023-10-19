const { MongoClient } = require("mongodb");

async function saveMonthlyExpenses(expenseTotal) {
  const uri =
    "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
  const client = await MongoClient.connect(uri);
  const db = client.db("MisGastos");
  await db.collection("monthly_expenses").insertOne({ total: expenseTotal });
  client.close();
}
module.exports = saveMonthlyExpenses;
