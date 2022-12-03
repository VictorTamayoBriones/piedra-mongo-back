import express from "express";
import { Dish, Review } from './models';
import * as service from './service';

async function createDishController(
    req: express.Request,
    res: express.Response
) {
    try {
        const dish: Dish = req.body.dish;

        var item = await service.createDish(dish);

        res.send({
            code: 200,
            message: "Item added",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
}

async function getAllDishesController(req: express.Request, res: express.Response) {
    try {
        let posts = await service.getAllDishes()
        res.send({
            code: 200,
            message: 'Dishes found!',
            data: posts
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getFavoritesDishesController(req: express.Request, res: express.Response) {
    try {
        let dishes = await service.getFavoritesDishes()
        res.send({
            code: 200,
            message: 'Dishes found!',
            data: dishes
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getDishesLatesController(req: express.Request, res: express.Response) {
    try {
        let posts = await service.getDishesLates()
        res.send({
            code: 200,
            message: 'Dishes found!',
            data: posts
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getDishesNearbyController(req: express.Request, res: express.Response) {
    try {
        const lat = req.params.lat;
        const lng = req.params.lng;
        if (lat == null || lng == null) {
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let posts = await service.getDishesNearby(parseFloat(lat), parseFloat(lng))
        res.send({
            code: 200,
            message: 'Dishes found!',
            data: posts
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getDishesFilteredController(req: express.Request, res: express.Response) {
    try {
        const input = req.params.input;
        if (input == null) {
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let posts = await service.getFilteredDishes(input);
        res.send({
            code: 200,
            message: 'Dishes found!',
            data: posts
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getByRestaurantController(req: express.Request, res: express.Response) {
    try {
        let obj = req.body.obj

        let item = await service.getByRestaurant(obj)

        res.send({
            code: 200,
            message: 'Dishes found!',
            data: item
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}


async function deleteDishController(req: express.Request, res: express.Response) {
    try {
        const id = req.body.id || null;
        const restaurantId = req.body.restaurantId || null;
        await service.deleteDish(id, restaurantId)
        res.send({
            code: 200,
            message: 'Dish deleted successfully!'
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function updateDishController(req: express.Request, res: express.Response) {
    try {
        const data = req.body.data || null
        const id = req.body.id || null;
        await service.updateDish(data, id)
        res.send({
            code: 200,
            message: 'Dish updated successfully!'
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getDishByIdController(req: express.Request, res: express.Response) {
    try {
        const id = req.body.id || null;
        let post = await service.getDishById(id)
        res.send({
            code: 200,
            message: 'Dish found!',
            data: post
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function addReviewsController(
    req: express.Request,
    res: express.Response
) {
    try {
        const review = req.body;


        var item = await service.addReview(review);

        res.send({
            code: 200,
            message: "Item added",
            data: item,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
}

async function updateImageDishController(req: express.Request, res: express.Response) {
    try {

        if (req.body.dishId == undefined || req.body.dish == undefined) {
            throw 'missing data';
        }

        const dishId = req.body.dishId || null;
        const dish = req.body.dish || null;
        let response = await service.updateDishImage(dishId, dish);
        res.send({
            code: 200,
            message: "dish updated successfully",
            data: response,
        });
    } catch (error) {
        if (error == 'missing data') {
            return res.status(400).json({
                ok: false,
                msg: error,
            });
        }

        return res.status(500).json({
            ok: false,
            msg: error,
        });
    }
}

async function getDishesByCategoryNameController(req: express.Request, res: express.Response) {
    try {
        const categoryName = req.params.categoryName;
        if (categoryName == null || categoryName == undefined) {
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let posts = await service.getDishesByCategoryName(categoryName)
        res.send({
            code: 200,
            message: 'Dishes found!',
            data: posts
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getDishReviewsController(req: express.Request, res: express.Response) {
    try {
        const dishId = req.params.dishId;
        if (dishId == null || dishId == undefined) {
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let posts = await service.getDishReviews(dishId)
        res.send({
            code: 200,
            message: 'Reviews found!',
            data: posts
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function incrementDishReviewHelpfulController(req: express.Request, res: express.Response) {
    try {
        const dishId = req.body.dishId;
        const reviewId = req.body.reviewId;
        if (dishId == null || dishId == undefined || reviewId == null || reviewId == undefined) {
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let response = await service.incrementDishReviewHelpful(reviewId, dishId);
        res.send({
            code: 200,
            message: 'Helpful incremented!',
            data: response
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}


export {
    createDishController,
    getAllDishesController,
    deleteDishController,
    getDishByIdController,
    updateDishController,
    getByRestaurantController,
    getFavoritesDishesController,
    getDishesLatesController,
    getDishesNearbyController,
    getDishesFilteredController,
    addReviewsController,
    updateImageDishController,
    getDishesByCategoryNameController,
    getDishReviewsController,
    incrementDishReviewHelpfulController
}