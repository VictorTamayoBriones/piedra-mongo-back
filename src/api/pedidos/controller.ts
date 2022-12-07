import express from "express";
import * as service from './service';

async function createPedidoController(req: express.Request,res: express.Response) {
    try {
        const peidoData: any = req.body;

        var item = await service.createPedido(peidoData);

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


async function getAllPedidosController(req: express.Request, res: express.Response) {
    try {
        let posts = await service.getAllPedidos()
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
    createPedidoController,
    getAllPedidosController
}