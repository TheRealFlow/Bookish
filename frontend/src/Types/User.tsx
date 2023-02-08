import {Book} from "./Book";

export type User = {
    id?: string;
    username: string;
    imageId: string;
    friends?: User[];
    books?: Book[];
}