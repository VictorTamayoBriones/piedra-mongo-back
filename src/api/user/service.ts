import { connect, getMongoId } from "../database/mongodb";
import { User } from "./model";

async function createNewUser(uid: string, mail: string){
    try{
        if(!uid || !mail){
            throw {
                code: 418,
                message: "Missing parameters",
              };
        }

        const database = await connect();
        const dbRef = database.collection("users");
        var userData = {'uid': uid, 'name': '', 'email': mail, };
        await dbRef.insertOne(userData);
        // console.log('Complexes', individualComplexes);
    } catch(error){
        console.log(error);
        
        throw error;
    }
}

async function getUserByUid(uid: string){
    try{
        if(!uid){
            throw {
                code: 418,
                message: "Missing parameters",
              };
        }

        const database = await connect();
        const dbRef = database.collection("users");

        let response = await dbRef.findOne({uid: uid})
        
        return response;
    } catch(error){
        console.log(error);
        
        throw error;
    }
}

async function updateUserName(uid: string, name: string){
    try{
        if(!uid || !name){
            throw {
                code: 418,
                message: "Missing parameters",
              };
        }

        const database = await connect();
        const dbRef = database.collection("users");
        console.log('datos',uid, name);
        
        const response = await dbRef.updateOne(
            {
                uid: uid
            },
            {
                $set: {name: name}
            }
        );
        return response.upsertedId;
    } catch(error){
        console.log(error);
        
        throw error;
    }
}

async function updateProfilePicture(uid: string, photoUrl: string){
    try{
        if(!uid || !photoUrl){
            throw {
                code: 418,
                message: "Missing parameters",
              };
        }

        const database = await connect();
        const dbRef = database.collection("users");
        
        const response = await dbRef.updateOne(
            {
                uid: uid
            },
            {
                $set: {photoUrl: photoUrl}
            }
        );
        return response.upsertedId;
    } catch(error){
        console.log(error);
        
        throw error;
    }
}

async function addBookMarkedDish(uid: string, dishId: string){
    
    try{
        if(!uid || !dishId){
            throw {
                code: 418,
                message: "Missing parameters",
              };
        }

        const database = await connect();
        const dbRef = database.collection("users");

        var dish = await getDishById(dishId);
        
        const response = await dbRef.updateOne(
            {
                uid: uid
            },
            {
                $push: {bookMarkedDishes: dish}
            }
        );
        return true;
    } catch(error){
        console.log(error);
        
        throw error;
    }
}

async function removeBookMarkedDish(uid: string, dishId: string){
    console.log("llegando");
    
    try{
        if(!uid || !dishId){
            throw {
                code: 418,
                message: "Missing parameters",
              };
        }

        console.log(getMongoId(dishId));
        

        const database = await connect();
        const dbRef = database.collection("users");

        var dish = await getDishById(dishId);
        
        const response = await dbRef.updateOne(
            {
                uid: uid
            },
            {
                $pull: {
                    bookMarkedDishes: {
                        _id : getMongoId(dishId)
                    }
                }
            }
        );
        return true;
    } catch(error){
        console.log(error);
        
        throw error;
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
        let response = await dbRef.findOne({ _id: getMongoId(id) });
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function checkIfDishIsBookMarked(uid: string, dishId: string){
    try{
        if(!uid || !dishId){
            throw {
                code: 418,
                message: "Missing parameters",
              };
        }

        const database = await connect();
        const dbRef = database.collection("users");

        let response = await dbRef.findOne({uid: uid}) as User;

        console.log(response    );
        
        
        return true;
    } catch(error){
        console.log(error);
        
        throw error;
    }
}

export {
    createNewUser,
    getUserByUid,
    updateUserName,
    updateProfilePicture,
    addBookMarkedDish,
    removeBookMarkedDish,
    checkIfDishIsBookMarked
}