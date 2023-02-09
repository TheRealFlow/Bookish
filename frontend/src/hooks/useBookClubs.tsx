import {useEffect, useState} from "react";
import {BookClub} from "../Types/BookClub";
import {toast} from "react-toastify";
import axios from "axios";

export default function useBookClubs() {
    const [bookClubs, setBookClubs] = useState<BookClub[]>([])

    useEffect(() => {
        getAllBookClubs();
    }, []);

    const getAllBookClubs = () => {
        axios.get("/bookclubs")
            .then(response => response.data)
            .then(bookClubs => setBookClubs(bookClubs))
            .catch((error) => toast.error(error.message));
    }

    const addNewBookClub = (bookClub: BookClub) => {
        axios.post("/bookclubs", bookClub)
            .then(() => toast.success("BookClub added successfully!"))
            .then(() => getAllBookClubs())
            .catch((error) => toast.error(error.message));
    }

    const updateBookClub = (bookClub: BookClub) => {
        axios.post("/bookclubs", bookClub)
            .then(() => toast.success("BookClub updated successfully!"))
            .then(() => getAllBookClubs())
            .catch((error) => toast.error(error.message));
    }

    const deleteBookClub = (id: string) => {
        axios.delete(`/bookclubs/${id}`)
            .then(() => toast.success("BookClub deleted successfully!"))
            .then(() => getAllBookClubs())
            .catch((error) => toast.error(error.message));
    }

    return {bookClubs, getAllBookClubs, addNewBookClub, updateBookClub, deleteBookClub};
}