const { MongoClient, ObjectId } = require("mongodb");

async function getCardById(id) {
    try {
        const uri =
            "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("MisGastos");
        const cardCollection = db.collection("cards");

        const card = await cardCollection.findOne({ _id: new ObjectId(id) });

        client.close();

        return card;
    } catch (error) {
        console.error("Error al obtener la tarjeta de MongoDB:", error);
        throw new Error("Error al obtener la tarjeta de MongoDB");
    }
}

module.exports = getCardById;
