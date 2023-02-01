export type BookAPI = {
    id: string;
    volumeInfo: {
        title: string;
        subtitle: string;
        authors: string[];
        description: string;
        categories: string[];
        pageCount: number;
        publishedDate: string;
        industryIdentifiers: {
            0: {
                type: string;
                identifier: string;
            }
            1: {
                type: string;
                identifier: string;
            }
        }
        imageLinks: {
            thumbnail: string;
            smallThumbnail: string;
        }
    }
}