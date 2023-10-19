const { MongoClient } = require("mongodb");

function connectToMongoDB() {
  try {
    // Configuración de la conexión a MongoDB
    const mongoClient = new MongoClient(
      "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/"
    );
    const db = mongoClient.db("MisGastos"); // Reemplaza "nombre_basedatos" con el nombre de tu base de datos
    return { mongoClient, db };
  } catch (error) {
    console.error("Ocurrió un error:", error);
    throw new Error("Error al agregar los datos a MongoDB");
  }
}
module.exports = connectToMongoDB;


