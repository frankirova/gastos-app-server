const { MongoClient, ObjectId } = require("mongodb");

async function deleteCard(id) {
    try {
        const uri =
            "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("MisGastos");
        const cardCollection = db.collection("cards");

        const result = await cardCollection.deleteOne({
            _id: new ObjectId(id),
        });

        client.close();

        if (result.deletedCount === 1) {
            console.log("tarjeta eliminado de MongoDB");
        } else {
            throw new Error("No se pudo eliminar la tarjeta");
        }
    } catch (error) {
        console.error("Error al eliminar la tarjeta de MongoDB:", error);
        throw new Error("Error al eliminar la tarjeta de MongoDB");
    }
}
module.exports = deleteCard;
