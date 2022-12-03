import { connect, getMongoId } from "../database/mongodb";
import { storage } from "../database/firebase";
import { Category } from './model';

async function createCategory(category: Category) {
    try {
        const database = await connect();
        const categoryRef = database.collection('categories');

        let snapshot = await categoryRef.insertOne(category);

        return snapshot.insertedId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCategories() {
    try {
        const db = await connect();
        let dbRef = db.collection("categories");
        let response = await dbRef.find().toArray() as Category[];
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getCategory(categoryId: string) {
    try {
        const database = await connect();
        const categoriesRef = database.collection("categories");
        let category = await categoriesRef.findOne<Category>({ _id: getMongoId(categoryId) })
        return category;
    } catch (error) {
        throw error;
    }
}

async function updateCategory(category: Category, categoryId: string) {
    try {
        const db = await connect();
        let dbRef = db.collection("categories");


        const response = await dbRef.updateOne(
            {
                _id: getMongoId(categoryId)
            },
            {
                $set: category
            }
        );

        return 'Category updated'
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateCategoryImage(categoryId: string, category: Category) {
    try {
        const db = await connect();
        let dbRef = db.collection("categories");
        
        await dbRef.updateOne(
            {
                _id: getMongoId(categoryId),
            },
            {
                $set: {
                    image: category.image
                },
            }
        );

        return;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteCategory(categoryId: string) {
    try {
        storage().deleteFiles({
            prefix: `categories/${categoryId}/`
        }, function(err) {
            if(err) {
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
        let dbRef = db.collection("categories");

        let dbDishesRef = db.collection("dishes");

        var dishes = await dbDishesRef.find({ 'tags._id': categoryId }).toArray()


        dishes.forEach(async dish => {
            console.log('dishes w/ category', dish._id);
            await dbDishesRef.updateOne({
                _id: getMongoId(dish._id)
            }, {
                $pull: { tags: { _id: categoryId } }
            });
        });



        await dbRef.deleteOne({ _id: getMongoId(categoryId) })
        return
    } catch (error) {
        console.log(error);
        throw error
    }
}

export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    updateCategoryImage,
    deleteCategory
}