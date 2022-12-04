import { connect, getMongoId } from "../database/mongodb";
import { ObjectId } from "mongodb";

async function createContact(contactData: any) {
    try {
        const database = await connect();

        const dbRef = await database.collection("contacts");


        let response = await dbRef.insertOne(contactData);

        return response.insertedId;
    } catch (error) {
        throw error;
    }
}

async function getAllContacts() {
    try {
        const db = await connect();
        let dbRef = db.collection("contacts");
        let response = await dbRef.find().toArray()
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

export{
    createContact,
    getAllContacts
}