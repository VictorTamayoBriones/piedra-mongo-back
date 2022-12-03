import fetch from "node-fetch";
import { connect, getMongoId } from "../database/mongodb";
import { DateTime, Duration } from 'luxon';
import { Dish, Review } from './models';
import * as geolib from 'geolib';
import { Restaurant } from "api/restaurants/models";
import { storage } from '../database/firebase';
import { Category } from "api/categories/model";
import { ObjectId } from "mongodb";

async function createDish(dish: Dish) {
    try {
        const database = await connect();

        const dbRef = await database.collection("dishes");
        let newDish: Dish = {
            name: dish.name,
            description: dish.description,
            price: dish.price,
            tags: dish.tags,
            photos: dish.photos,
            reviews: dish.reviews,
            likes: dish.likes,
            restaurantID: dish.restaurantID,
            amount: dish.amount,
            dateIso: new Date().toISOString(),
        }
        let response = await dbRef.insertOne(newDish);

        return response.insertedId;
    } catch (error) {
        throw error;
    }
}

async function getDishesLates() {
    let dishes = await getAllDishes()
    var dishesLates = [];
    dishes.map(async (dish) => {
        var months = 0;

        var startDate = new Date().toISOString();
        var endDate = dish.dateIso

        let set = { hour: 0, second: 0, minute: 0, millisecond: 0 }

        let starDateFormat = DateTime.fromJSDate(new Date(startDate)).set(set);
        let endDateFormat = DateTime.fromJSDate(new Date(endDate)).set(set)

        let difference: Duration | any = starDateFormat.diff(endDateFormat, ["months", "days", "hours"]);

        let monthDiff = difference.values.months
        let dayDiff = difference.values.days

        if (monthDiff == 0) {

            dishesLates.push(dish)
        }

    }

    )
    return dishesLates.slice(0, 14)

}

async function getDishesNearby(lat: number, lng: number) {
    let dishes = await getAllDishes()
    let restaurants = await getAllRestuarants();

    var dishesLates = [];
    dishes.map(async (dish) => {
        restaurants.map((restaurant) => {
            if (dish.restaurantID == restaurant['_id']) {
                var distance = geolib.getDistance({ latitude: lat, longitude: lng }, { latitude: restaurant.lat, longitude: restaurant.long });
                var distanceInKm = geolib.convertDistance(distance, 'km');

                //FORMA DE CALCULAR DISTANCIA ENTRE DOS PUNTOS DE FORMA MANUAL
                // var unit = "K";
                // var radlat1 = Math.PI * restaurant.lat/180;
                // var radlat2 = Math.PI * lat/180;
                // var theta = restaurant.long-lng;
                // var radtheta = Math.PI * theta/180;
                // var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                // if (dist > 1) {
                //     dist = 1;
                // }
                // dist = Math.acos(dist);
                // dist = dist * 180/Math.PI;
                // dist = dist * 60 * 1.1515;
                // if (unit=="K") { dist = dist * 1.609344 }
                // if (unit=="N") { dist = dist * 0.8684 }
                // console.log(dist);


                if (distanceInKm <= 3) {
                    dishesLates.push(dish);
                }

            }
        })
    }

    )
    var result = shuffle(dishesLates);
    return result.slice(0, 14)

}

// Converts numeric degrees to radians
function toRad(value) {
    return value * Math.PI / 180;
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

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

async function getAllDishes() {
    try {
        const db = await connect();
        let dbRef = db.collection("dishes");
        let response = await dbRef.find().toArray() as Dish[]
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getFavoritesDishes() {
    try {
        const db = await connect();
        let dbRef = db.collection("dishes");

        var allDishes = await dbRef.find().limit(15).sort({ 'reviewsLength': -1 }).toArray() as Dish[]

        // console.log('go', allDishes);

        return allDishes
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getFilteredDishes(input: string) {
    try {
        let dishes = await getAllDishes()
        let restaurants = await getAllRestuarants();

        input = input.toUpperCase();
        console.log(input);


        var filteredDishes = [];
        dishes.map((dish) => {

            if (dish.name.toUpperCase().includes(input) && !filteredDishes.includes(dish)) {
                filteredDishes.push(dish);
            }

            if (dish.description.toUpperCase().includes(input) && !filteredDishes.includes(dish)) {
                filteredDishes.push(dish);
            }

            dish.tags.map((tag: Category) => {
                if (tag.name.toUpperCase().includes(input) && !filteredDishes.includes(dish)) {
                    filteredDishes.push(dish);
                }
            })
        }
        );

        // restaurants.map((restaurant) => {

        //     if (restaurant.name.toUpperCase().includes(input) && !filteredDishes.includes(restaurant)) {
        //         filteredDishes.push(restaurant);
        //     }

        //     if (restaurant.description.toUpperCase().includes(input) && !filteredDishes.includes(restaurant)) {
        //         filteredDishes.push(restaurant);
        //     }

        //     restaurant.tags.map((tag: any) => {
        //         if (tag['tag'].toUpperCase().includes(input) && !filteredDishes.includes(restaurant)) {
        //             filteredDishes.push(restaurant);
        //         }
        //     })
        // }
        // );

        return filteredDishes;
    } catch (error) {
        console.log('error', error);

        throw error;
    }


}


async function getByRestaurant(obj: any) {
    try {
        const database = await connect();
        const dishesRef = database.collection("dishes");

        let dishesCursor = dishesRef.find(obj);
        const dishes = await dishesCursor.toArray() as any;
        if (dishes.length == 0) return { dishes: [] }

        return { dishes }
    } catch (error) {

    }
}

async function updateDish(data: any, id: string) {
    try {
        if (!data) {
            throw {
                code: 418,
                message: "Dish not found",
                queryRequest: data,
            };
        }
        const db = await connect();
        let dbRef = db.collection("dishes");
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

async function deleteDish(id: string, restaurantId: string) {
    try {
        storage().deleteFiles({
            prefix: `dishes/${restaurantId}/${id}`
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
        let dbRef = db.collection("dishes");
        await dbRef.deleteOne({ _id: getMongoId(id) })
        return
    } catch (error) {
        console.log(error);
        throw error
    }
}


async function getDishById(id: string) {
    try {
        if (!id) {
            throw {
                code: 418,
                message: "Dish not found",
                queryRequest: id,
            };
        }
        const db = await connect();
        let dbRef = db.collection("dishes");
        let response = await dbRef.findOne({ _id: getMongoId(id) }) as Dish
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function addReview(review: Review) {
    try {
        const database = await connect();

        const dbRef = await database.collection("dishes");
        console.log('review', review);

        let newReview: Review = {
            id: new ObjectId().toString(),
            uid: review.uid,
            author: review.author,
            content: review.content,
            dateSent: review.dateSent,
            photos: review.photos,
            helpful: review.helpful,
            dishId: review.dishId,
            restaurantID: review.restaurantID
        }

        var response = await dbRef.updateOne(
            {
                _id: getMongoId(review.dishId)
            },
            { $push: { reviews: newReview } }
        );

        await updateReviewLength(review.dishId);

        return response;
    } catch (error) {
        throw error;
    }
}

async function updateReviewLength(dishId: string) {
    try {

        var dish: Dish = await getDishById(dishId);

        var reviewLength = dish.reviews.length;

        const database = await connect();
        const dbRef = await database.collection("dishes");

        var response = await dbRef.updateOne(
            {
                _id: getMongoId('6329f82c52d1803ab8e9292a')
            },
            { $set: { reviewsLength: reviewLength } }
        );

        return response;
    } catch (error) {
        throw error;
    }
}

async function updateDishImage(dishId: string, dish: Dish) {

    try {
        const db = await connect();
        let dbRef = db.collection("dishes");
        await dbRef.updateOne(
            {
                _id: getMongoId(dishId),
            },
            {
                $set: {
                    photos: dish.photos
                },
            }
        );

        return;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getDishesByCategoryName(categoryName: string) {
    console.log(categoryName);

    try {
        const db = await connect();
        let dbRef = db.collection("dishes");
        let response = await dbRef.find({ tags: { $elemMatch: { name: categoryName } } }).toArray() as Dish[]
        console.log(response);

        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getDishReviews(dishId: string) {
    try {
        const db = await connect();
        let dbRef = db.collection("dishes");
        let response = await getDishById(dishId) as Dish;

        return response.reviews;
    } catch (error) {
        console.log(error);
        throw error
    }
}

// TODO: ESTO NO HACE EL UPDATE
async function incrementDishReviewHelpful(reviewId: string, dishId: string) {
    try {
        if (!reviewId || !dishId) {
            throw {
                code: 418,
                message: "Dish not found",
            };
        }
        console.log(reviewId);
        console.log(dishId);

        const db = await connect();
        let dbRef = db.collection("dishes");
        const response = await dbRef.updateOne(
            {
                _id: getMongoId(dishId), "reviews.id": reviewId
            },
            {
                $inc: { "reviews.$.helpful": 1 }
            },
        );
        return true;
    } catch (error) {
        throw error;
    }
}


export {
    createDish,
    getAllDishes,
    getDishById,
    deleteDish,
    updateDish,
    getByRestaurant,
    getFavoritesDishes,
    getDishesLates,
    getDishesNearby,
    getFilteredDishes,
    addReview,
    updateDishImage,
    getDishesByCategoryName,
    getDishReviews,
    incrementDishReviewHelpful
}