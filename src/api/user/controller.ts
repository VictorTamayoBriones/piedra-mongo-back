import express from "express";
import * as service from "./service"

async function createNewUserController(req: express.Request, res: express.Response) {

    try {
        const userData = req.body || null;
        const uid = req.body.uid;
        const mail = req.body.mail;

        let response = await service.createNewUser(uid, mail)
        res.send({
            code: 200,
            message: 'User created',
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function getByUidController(req: express.Request, res: express.Response) {

    try {
        const uid = req.params.uid || null;

        let response = await service.getUserByUid(uid);

        res.send({
            code: 200,
            message: 'User found',
            data: response
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function updateUserNameController(req: express.Request, res: express.Response) {

    try {
        const uid = req.body.uid;
        const name = req.body.name;
        
        let response = await service.updateUserName(uid, name)
        res.send({
            code: 200,
            message: 'User updated',
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function updateProfilePictureController(req: express.Request, res: express.Response) {

    try {
        const uid = req.body.uid;
        const photoUrl = req.body.photoUrl;

        if(uid == null || photoUrl == null){
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }
        
        let response = await service.updateProfilePicture(uid, photoUrl);
        res.send({
            code: 200,
            message: 'User updated',
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function addBookMarkedDishController(req: express.Request, res: express.Response) {

    try {
        const uid = req.body.uid;
        const dishId = req.body.dishId;

        if(uid == null || dishId == null){
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let response = await service.addBookMarkedDish(uid, dishId);
        res.send({
            code: 200,
            message: 'User updated',
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function removeBookMarkedDishController(req: express.Request, res: express.Response) {

    try {
        const uid = req.body.uid;
        const dishId = req.body.dishId;

        if(uid == null || dishId == null){
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let response = await service.removeBookMarkedDish(uid, dishId);
        res.send({
            code: 200,
            message: 'User updated',
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function checkIfDishIsBookMarkedController(req: express.Request, res: express.Response) {

    try {
        const uid = req.params.uid;
        const dishId = req.params.dishId;

        if(uid == null || dishId == null){
            throw {
                code: 418,
                message: "Missing parameters",
            };
        }

        let response = await service.checkIfDishIsBookMarked(uid, dishId);

        res.send({
            code: 200,
            message: 'User found',
            data: response
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


export {
    createNewUserController,
    getByUidController,
    updateUserNameController,
    updateProfilePictureController,
    addBookMarkedDishController,
    checkIfDishIsBookMarkedController,
    removeBookMarkedDishController
}