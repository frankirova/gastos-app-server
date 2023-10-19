const { MongoClient } = require("mongodb");

async function getCategory() {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const categoriesCollection = db.collection("categories");

    const categories = await categoriesCollection.find().toArray();

    client.close();

    return categories;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw new Error("Error al obtener las categorías de MongoDB");
  }
}

module.exports = getCategory;
