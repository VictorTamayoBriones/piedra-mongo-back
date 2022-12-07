import { connect, getMongoId } from "../database/mongodb";
import { ObjectId } from "mongodb";

async function createPedido(pedidoData: any) {
    try {
        const database = await connect();

        const dbRef = await database.collection("pedidos");


        let response = await dbRef.insertOne(pedidoData);

        return response.insertedId;
    } catch (error) {
        throw error;
    }
}

async function getAllPedidos() {
    try {
        const db = await connect();
        let dbRef = db.collection("pedidos");
        let response = await dbRef.find().toArray()
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

export{
    createPedido,
    getAllPedidos
}