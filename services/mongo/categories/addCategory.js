const { MongoClient } = require("mongodb");
async function addCategories(category) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const categoriesCollection = db.collection("categories");

    const result = await categoriesCollection.insertOne(category);
    console.log("New category added to MongoDB:" + result.insertedId);

    client.close();
  } catch (error) {
    console.error("Error adding category to MongoDB:", error);
    throw new Error("Error al agregar la categoría a MongoDB");
  }
}

module.exports = addCategories;
