import {useEffect, useState} from "react";
import {Book} from "../types/Book";
import axios from "axios";

export default function useAdminBooks() {
    const [adminBooks, setAdminBooks] = useState<Book[]>([])

    useEffect(() => {
        getAllAdminBooks();
    }, []);

    const getAllAdminBooks = () => {
        axios.get("/api/admin/books")
            .then(response => response.data)
            .then(adminBooks => setAdminBooks(adminBooks))
            .catch((error) => console.log(error.message));
    }

    const getAdminBook = (id: string) => {
        axios.get(`/api/admin/books/${id}`)
            .then(response => response.data)
            .then(adminBook => setAdminBooks(adminBook))
            .catch((error) => console.log(error.message));
    }

    const deleteAdminBook = (id: string | undefined) => {
        axios.delete(`/api/admin/books/${id}`)
            .then(() => console.log("Book deleted successfully!"))
            .then(() => getAllAdminBooks())
            .catch((error) => console.log(error.message));
    }

    return {adminBooks, getAllAdminBooks, getAdminBook, deleteAdminBook};
}