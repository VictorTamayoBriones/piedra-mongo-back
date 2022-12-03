import { connect, getMongoId } from "../database/mongodb";
import { Tag } from "./model";

async function createTag(tag: Tag) {
    try {
        if (!tag) {
            throw {
                code: 418,
                message: "Tag not found",
                queryRequest: tag,
            };
        }
        const db = await connect();
        let dbRef = db.collection("tags");
        let response = await dbRef.insertOne(tag)
        return response.insertedId
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function deleteTag(id: string) {
    try {
        const db = await connect();
        let dbRef = db.collection("tags");
        await dbRef.deleteOne({_id: getMongoId(id)})
        return
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function updateTag(data: any, id: string) {
    try {
        if (!id) {
            throw {
                code: 418,
                message: "Tag not found",
                queryRequest: id,
            };
        }
        const db = await connect();
        let dbRef = db.collection("tags");
        let response = await dbRef.updateOne(
            {_id: getMongoId(id)},
            { set: data }
        )
        return response.upsertedId
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getAllTags() {
    try {
        const db = await connect();
        let dbRef = db.collection("tags");
        let tags = await dbRef.find().toArray() as Tag[]
        return tags
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getTagById(id: string) {
    try {
        if (!id) {
            throw {
                code: 418,
                message: "Tag not found",
                queryRequest: id,
            };
        }
        const db = await connect();
        let dbRef = db.collection("tags");
        let response = await dbRef.findOne({_id: getMongoId(id)})
        return response as Tag
    } catch (error) {
        console.log(error);
        throw error
    }
}

export {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag
}