import {useEffect, useState} from "react";
import axios from "axios";
import {Book} from "../Model/Book";

export default function useBookDetails(id: string|undefined) {
    const [bookDetails, setBookDetails] = useState<Book>();

    useEffect(() => {
        (async () => {
            const book = await axios.get(`/books/${id}`);
            setBookDetails(book.data);
        })();
    }, [id]);

    return {bookDetails};
}