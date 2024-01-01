const { MongoClient } = require("mongodb");

async function addCard(card) {
    try {
        const uri =
            "mongodb+srv://franki:TEVuNkEx7Qev9KDp@cluster0.sdqqh1u.mongodb.net/";
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("MisGastos");
        const cardsCollection = db.collection("cards");

        const result = await cardsCollection.insertOne(card);

        client.close();

        console.log("New card added to MongoDB:", result.insertedId);
    } catch (error) {
        console.error("Error al agregar la tarjeta a MongoDB:", error);
        throw new Error("Error al agregar la tarjeta a MongoDB");
    }
}

module.exports = addCard;
