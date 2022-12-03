import { Dish } from "api/dishs/models";

export interface User {
    _id: string;
    uid: string;
    name: string;
    email: string;
    photoUrl: string;
    bookMarkedDishes: Array<Dish>;
}   