import * as express from "express";
import * as service from "./service";
import { Category } from './model';

async function createCategoryController(
    req: express.Request,
    res: express.Response
) {
    try {
        if (req.body.category == undefined) {
            throw 'invalid format';
        }

        const category = req.body.category as Category;

        let response = await service.createCategory(category);

        res.send({
            code: 200,
            message: "Category added",
            data: response,
        });
    } catch (error) {
        if (error == 'invalid format') {
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

async function getCategoriesController(
    req: express.Request,
    res: express.Response
) {
    try {
        var categories = await service.getCategories();

        res.send({
            code: 200,
            message: "Categories found",
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error,
        });
    }
}

async function getCategoryController(
    req: express.Request,
    res: express.Response
) {
    try {

        if (req.params.id == undefined) {
            throw 'id not provided';
        }

        const id = req.params.id

        const response = await service.getCategory(id);

        res.send({
            code: 200,
            message: "Category found",
            data: response
        });
    } catch (error) {
        if (error == 'id not provided') {
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

// async function filterCategoriesByTagController(
//     req: express.Request,
//     res: express.Response
// ) {
//     try {

//         if (req.params.tag == undefined) {
//             throw 'tag not provided';
//         }

//         const tag = req.params.tag;

//         const response = await service.filterBlogEntriesByTag(tag);

//         res.send({
//             code: 200,
//             message: "Entries found",
//             data: response
//         });

//     } catch (error) {
//         if (error == 'tag not provided') {
//             return res.status(400).json({
//                 ok: false,
//                 msg: error,
//             });
//         }

//         return res.status(500).json({
//             ok: false,
//             msg: error,
//         });
//     }
// }

async function updateCategoryController(
    req: express.Request,
    res: express.Response
) {
    try {

        if (req.body.id == undefined || req.body.data == undefined) {
            throw 'missing data';
        }
        const data = req.body.data
        const id = req.body.id;

        var item = await service.updateCategory(data, id);

        res.send({
            code: 200,
            message: "Category updated",
            data: item,
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

async function updateImageCategoryController(req: express.Request, res: express.Response) {
    try {
        if (req.body.categoryId == undefined || req.body.category == undefined) {
            throw 'missing data';
        }

        const categoryId = req.body.categoryId || null;
        const category = req.body.category || null;
        let response = await service.updateCategoryImage(categoryId, category);
        res.send({
            code: 200,
            message: "Category updated successfully",
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

async function deleteCategoryController(
    req: express.Request,
    res: express.Response
) {
    try {
        if (req.body.id == undefined) {
            throw 'missing data';
        }

        const id = req.body.id || null;
        let response = await service.deleteCategory(id);
        res.send({
            code: 200,
            message: "Category deleted",
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


export {
    createCategoryController,
    getCategoriesController,
    getCategoryController,
    updateCategoryController,
    updateImageCategoryController,
    deleteCategoryController
}