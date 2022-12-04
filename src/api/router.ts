import express, { Router } from "express";

import * as AdminsController from "./admins/controller";
import * as RestaurantController from './restaurants/controller';
import * as DishesController from './dishs/controller';
import * as TagController from './tags/controller'
import * as UserController from "./user/controller";
import * as CateogryController from "./categories/controller";
import * as ContactController from './contact/controller'

const router = express.Router();

//ADMINS
router.post("/admins/create", AdminsController.addAdminUserController);
router.post("/admins/update", AdminsController.updateAdminUserController);
router.post("/admins/delete", AdminsController.deleteAdminUserController);

//RESTAURANTS
router.post("/restaurants/create", RestaurantController.createRestaurantController);
router.get("/restaurants/get-all", RestaurantController.getAllRestaurantsController);
router.post("/restaurants/get-by-id", RestaurantController.getRestaurantByIdController);
router.post("/restaurants/update", RestaurantController.updateRestaurantController);
router.post("/restaurants/delete", RestaurantController.deleteResturantController);
router.put('/restaurants/update-image', RestaurantController.updateImageRestaurantController);
router.get("/restaurants/get-total-reviews/:restaurantId", RestaurantController.getTotalReviewsController);


//DISHES
router.post("/dishes/create", DishesController.createDishController);
router.get("/dishes/get-all", DishesController.getAllDishesController);
router.get("/dishes/get-favorites", DishesController.getFavoritesDishesController);
router.post("/dishes/get-by-id", DishesController.getDishByIdController);
router.post("/dishes/get-by-key-value", DishesController.getByRestaurantController);
router.get("/dishes/get-lates", DishesController.getDishesLatesController);
router.get("/dishes/get-nearby/:lat/:lng", DishesController.getDishesNearbyController);
router.get("/dishes/get-filtered/:input", DishesController.getDishesFilteredController);
router.post("/dishes/update", DishesController.updateDishController);
router.post("/dishes/delete", DishesController.deleteDishController);
router.put('/dishes/update-image', DishesController.updateImageDishController);
router.get("/dishes/get-by-category/:categoryName", DishesController.getDishesByCategoryNameController);
router.get("/dishes/get-reviews/:dishId", DishesController.getDishReviewsController);
router.post("/dishes/increment-helpful", DishesController.incrementDishReviewHelpfulController);


// REVIEWS 
router.post("/dishes/add-review", DishesController.addReviewsController);

// router.get("/tag/get-by-restaurant/:id",  ReviewController.getTagByIdController );

//TAGS
router.post("/tag/create", TagController.createTagController);
router.post("/tag/update", TagController.updateTagController);
router.post("/tag/delete", TagController.deleteTagController);
router.get("/tag/get-all", TagController.getAllTagsController);
router.get("/tag/get-by-id/:id", TagController.getTagByIdController);

// Blog
router.post('/category/create', CateogryController.createCategoryController);
router.get('/category/get-all', CateogryController.getCategoriesController)
router.get('/category/get/:id', CateogryController.getCategoryController)
// router.get('/category/filter-by-tag/:tag', CateogryController.filtercategoryEntriesByTagController)
router.post('/category/update', CateogryController.updateCategoryController)
router.put('/category/update-image', CateogryController.updateImageCategoryController)
router.post('/category/delete', CateogryController.deleteCategoryController)


// USER
router.post("/user/create/", UserController.createNewUserController);
router.get("/user/get-by-uid/:uid", UserController.getByUidController);
router.post("/user/update-username/", UserController.updateUserNameController);
router.post("/user/update-profile-picture", UserController.updateProfilePictureController);
router.post("/user/add-bookmarked-dish", UserController.addBookMarkedDishController);
router.post("/user/remove-bookmarked-dish", UserController.removeBookMarkedDishController);
router.get("/user/check-if-dish-bookmarked/:uid/:dishId", UserController.checkIfDishIsBookMarkedController);

//Contact
router.post("/contact/create/", ContactController.createContactController);
router.get("/contact/get-all/", ContactController.getAllContactsController);

export { router };