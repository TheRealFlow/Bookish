import {useEffect, useState} from "react";
import {Book} from "../Types/Book";
import axios from "axios";
import {toast} from "react-toastify";

export default function useBooks() {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = () => {
        axios.get("/api/books")
            .then(response => response.data)
            .then(books => setBooks(books))
            .catch((error) => toast.error(error.message));
    }

    const addNewBook = (book: Book) => {
        axios.post("/api/books", book)
            .then(() => toast.success("Book added successfully!"))
            .then(() => getAllBooks())
            .catch((error) => toast.error(error.message));
    }

    const updateBook = (book: Book) => {
        axios.post("/api/books", book)
            .then(() => toast.success("Book updated successfully!"))
            .then(() => getAllBooks())
            .catch((error) => toast.error(error.message));
    }

    const deleteBook = (id: string) => {
        axios.delete(`/api/books/${id}`)
            .then(() => toast.success("Book deleted successfully!"))
            .then(() => getAllBooks())
            .catch((error) => toast.error(error.message));
    }

    return {books, getAllBooks ,addNewBook, updateBook, deleteBook};
}