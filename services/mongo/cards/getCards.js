const { MongoClient } = require("mongodb");

async function getCards() {
    try {
        const uri =
            "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("MisGastos");
        const cardCollection = db.collection("cards");

        const cards = await cardCollection.find().toArray();

        client.close();

        return cards;
    } catch (error) {
        console.error("Error al obtener la tarjeta de MongoDB:", error);
        throw new Error("Error al obtener la tarjeta de MongoDB");
    }
}

module.exports = getCards;
