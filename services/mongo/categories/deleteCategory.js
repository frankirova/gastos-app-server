const { MongoClient, ObjectId } = require("mongodb");

async function deleteCategory(id) {
  try {
    const uri =
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("MisGastos");
    const expensesCollection = db.collection("categories");

    const result = await expensesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    client.close();

    if (result.deletedCount === 1) {
      console.log("Categoria eliminado de MongoDB");
    } else {
      throw new Error("No se pudo eliminar la categoria");
    }
  } catch (error) {
    console.error("Error al eliminar la categoria de MongoDB:", error);
    throw new Error("Error al eliminar la categoria de MongoDB");
  }
}

module.exports = deleteCategory;
