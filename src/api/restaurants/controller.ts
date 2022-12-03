import express from "express";
import { Restaurant } from './models';
import * as service from './service';

async function createRestaurantController(
    req: express.Request,
    res: express.Response
) {
    try {
        const restaurant: Restaurant = req.body.restaurant;

        var item = await service.createRestaurant(restaurant);

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

async function getAllRestaurantsController(req: express.Request, res: express.Response) {
    try {
        let posts = await service.getAllRestuarants()
        res.send({
            code: 200,
            message: 'Posts found!',
            data: posts
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function deleteResturantController(req: express.Request, res: express.Response) {
    try {
        const id = req.body.id || null;
        await service.deleteRestaurant(id)
        res.send({
            code: 200,
            message: 'Restaurant deleted successfully!'
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function updateRestaurantController(req: express.Request, res: express.Response) {
    try {
        const data = req.body.data || null
        const id = req.body.id || null;
        await service.updateRestaurant(data, id)
        res.send({
            code: 200,
            message: 'Restaurant updated successfully!'
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getRestaurantByIdController(req: express.Request, res: express.Response) {
    try {
        const id = req.body.id || null;
        let restaurant = await service.getRestaurantById(id)

        res.send({
            code: 200,
            message: 'Restaurant found!',
            data: restaurant
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function updateImageRestaurantController(req: express.Request, res: express.Response) {
    try {

        if (req.body.restaurantId == undefined || req.body.restaurant == undefined) {
            throw 'missing data';
        }

        const restaurantId = req.body.restaurantId || null;
        const restaurant = req.body.restaurant || null;
        let response = await service.updateRestaurantImage(restaurantId, restaurant);
        res.send({
            code: 200,
            message: "restaurant updated successfully",
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

async function getTotalReviewsController(req: express.Request, res: express.Response) {
    try {
        const restaurantId = req.params.restaurantId;
        if (restaurantId == null || restaurantId == undefined) {
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let reviews = await service.getTotalReviews(restaurantId)
        res.send({
            code: 200,
            message: 'Reviews found!',
            data: reviews
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

export {
    createRestaurantController,
    getAllRestaurantsController,
    deleteResturantController,
    getRestaurantByIdController,
    updateRestaurantController,
    updateImageRestaurantController,
    getTotalReviewsController
}