import { Category } from "api/categories/model";

export interface Dish {
    id?: string;
    name: string;
    description: string;
    price: number;
    tags: Array<Category>;
    photos: Array<FileInfo>;
    reviews?: Array<Review>;
    likes: number;
    restaurantID: string;
    amount: number;
    dateIso?: string;
}

interface FileInfo {
    path: string;
    size: number;
}

export interface Review {
    id?: string;
    uid: string;
    author: string;
    content: string;
    dateSent: Date;
    photos: Array<FileInfo>;
    helpful: number;
    dishId: string;
    restaurantID: string;
}