export interface Restaurant{
    id?: string;
    name: string;
    description: string;
    address: string;
    lat: number;
    long: number;
    tags: Array<string>;
    likes: number;
    coverPhoto: string;
    coverPhotoRef: string;
}