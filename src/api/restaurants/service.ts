import { Dish } from 'api/dishs/models';
import { storage } from '../database/firebase';
import { connect, getMongoId } from "../database/mongodb";
import { Restaurant } from './models';

async function createRestaurant(restaurant: Restaurant) {
    try {
        const database = await connect();

        const dbRef = await database.collection("restaurants");

        let response = await dbRef.insertOne(restaurant);

        return response.insertedId;
    } catch (error) {
        throw error;
    }
}

async function getAllRestuarants() {
    try {
        const db = await connect();
        let dbRef = db.collection("restaurants");
        let response = await dbRef.find().toArray() as Restaurant[]
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function updateRestaurant(data: any, id: string) {
    try {
        if (!data) {
            throw {
                code: 418,
                message: "Restaurant not found",
                queryRequest: data,
            };
        }
        const db = await connect();
        let dbRef = db.collection("restaurants");
        const response = await dbRef.updateOne(
            {
                _id: getMongoId(id)
            },
            {
                $set: data
            }
        );
        return response.upsertedId;
    } catch (error) {
        throw error;
    }
}

async function deleteRestaurant(id: string) {

    try {
        storage().deleteFiles({
            prefix: `restaurants/${id}/`
        }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('deleted');
            }
        })
    } catch (error) {
        console.log(error);
    }

    try {
        const db = await connect();
        let dbRef = db.collection("restaurants");

        let dishRef = db.collection('dishes');
        let deleteResponse = await dishRef.deleteMany({ restaurantID: id });

        await dbRef.deleteOne({ _id: getMongoId(id) })

        return
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function deleteImgFromFB(path: string) {
    let getStorage = await storage().file(`${path}/`)
}

async function getRestaurantById(id: string) {
    try {
        if (!id) {
            throw {
                code: 418,
                message: "Restaurant not found",
                queryRequest: id,
            };
        }
        const db = await connect();
        let dbRef = db.collection("restaurants");
        let response = await dbRef.findOne({ _id: getMongoId(id) }) as Restaurant
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function updateRestaurantImage(restaurantId: string, restaurant: Restaurant) {
    try {
        const db = await connect();
        let dbRef = db.collection("restaurants");
        await dbRef.updateOne(
            {
                _id: getMongoId(restaurantId),
            },
            {
                $set: {
                    coverPhoto: restaurant.coverPhoto
                },
            }
        );

        return;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getTotalReviews(restaurantId: string) {
    console.log(restaurantId);

    try {
        const db = await connect();
        let dbRefDishes = db.collection("dishes");
        let dishes = await dbRefDishes.find({ restaurantID: restaurantId }).toArray() as Dish[];

        console.log(dishes);

        var likes = 0;

        for (let dish of dishes) {
            likes = likes + dish.reviews.length;
        }

        return likes;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export {
    createRestaurant,
    getAllRestuarants,
    getRestaurantById,
    deleteRestaurant,
    updateRestaurant,
    updateRestaurantImage,
    getTotalReviews
}