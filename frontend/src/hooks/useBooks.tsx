import {useEffect, useState} from "react";
import {Book} from "../Components/Book";
import axios from "axios";

export default function useBooks() {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        (async () => {
            const res = await axios.get("/books")
            setBooks(res.data)
        })();
    }, []);

    async function addBook(book: { pages: number; year: number; author: string; imageUrl: string; isbn: string; genre: string; description: string; title: string }) {
        const res = await axios.post("/books", book)
        setBooks([...books, res.data])
    }

    async function deleteBook(id: string) {
        await axios.delete(`/books/${id}`)
        setBooks(books.filter((book) => book.id !== id))
    }

    return {books, addBook, deleteBook}
}