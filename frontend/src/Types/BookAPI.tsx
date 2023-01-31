export type BookAPI = {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        categories: string[];
        pageCount: number;
        publishedDate: string;
        imageLinks: {
            thumbnail: string;
            smallThumbnail: string;
        }
    }
}