const { MongoClient, ObjectId } = require("mongodb");

async function updateCard(id, updatedCard) {
    try {
        const uri =
            "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("MisGastos");
        const cardCollection = db.collection("cards");

        const result = await cardCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedCard }
        );

        client.close();

        if (result.modifiedCount === 1) {
            console.log("Tarjeta actualizado en MongoDB");
        } else {
            throw new Error("No se pudo actualizar la tarjeta");
        }
    } catch (error) {
        console.error("Error al editar la tarjeta en MongoDB:", error);
        throw new Error("Error al editar la tarjeta en MongoDB");
    }
}

module.exports = updateCard;
