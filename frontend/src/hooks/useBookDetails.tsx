import {useEffect, useState} from "react";
import axios from "axios";
import {Book} from "../Types/Book";

export default function useBookDetails(id: string|undefined) {
    const [bookDetails, setBookDetails] = useState<Book>();

    useEffect(() => {
        (async () => {
            const book = await axios.get(`/api/books/${id}`);
            setBookDetails(book.data);
        })();
    }, [id]);

    return {bookDetails};
}