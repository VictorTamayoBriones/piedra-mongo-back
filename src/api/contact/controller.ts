import express from "express";
import * as service from './service';

async function createContactController(
    req: express.Request,
    res: express.Response
) {
    try {
        const contactData: any = req.body.contactData;

        var item = await service.createContact(contactData);

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


async function getAllContactsController(req: express.Request, res: express.Response) {
    try {
        let posts = await service.getAllContacts()
        res.send({
            code: 200,
            message: 'contacts found!',
            data: posts
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

export{
    createContactController,
    getAllContactsController
}