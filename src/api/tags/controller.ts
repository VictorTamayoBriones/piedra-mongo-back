import express from 'express';
import * as service from './service';

async function createTagController(req: express.Request, res: express.Response) {
    try {
        const Tag = req.body.data || null;
        await service.createTag(Tag)
        res.send({
            code: 200,
            message: 'Entry created successfully!'
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function updateTagController(req: express.Request, res: express.Response) {
    try {
        const data = req.body.data || null
        const id = req.body.id || null;
        await service.updateTag(data, id)
        res.send({
            code: 200,
            message: 'Entry updated successfully!'
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function deleteTagController(req: express.Request, res: express.Response) {
    try {
        const id = req.body.id || null;
        await service.deleteTag(id)
        res.send({
            code: 200,
            message: 'Tag deleted successfully!'
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getAllTagsController(req: express.Request, res: express.Response) {
    try {
        let tags = await service.getAllTags()
        res.send({
            code: 200,
            message: 'Tags found!',
            data: tags
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

async function getTagByIdController(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id || null;
        let tag = await service.getTagById(id)
        res.send({
            code: 200,
            message: 'Tag found!',
            data: tag
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

export {
    createTagController,
    deleteTagController,
    getAllTagsController,
    getTagByIdController,
    updateTagController
}