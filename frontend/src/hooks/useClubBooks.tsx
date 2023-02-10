import {useEffect, useState} from "react";
import {ClubBook} from "../Types/ClubBook";
import {toast} from "react-toastify";
import axios from "axios";

export default function useClubBooks() {
    const [clubBooks, setClubBooks] = useState<ClubBook[]>([])

    useEffect(() => {
        getAllClubBooks();
    }, []);

    const getAllClubBooks = () => {
        axios.get("/clubbooks")
            .then(response => response.data)
            .then(clubBooks => setClubBooks(clubBooks))
            .catch((error) => toast.error(error.message));
    }

    const addNewClubBook = (clubBook: ClubBook) => {
        axios.post("/clubbooks", clubBook)
            .then(() => toast.success("Club book added successfully!"))
            .then(() => getAllClubBooks())
            .catch((error) => toast.error(error.message));
    }

    const deleteClubBook = (id: string) => {
        axios.delete(`/clubbooks/${id}`)
            .then(() => toast.success("Club book deleted successfully!"))
            .then(() => getAllClubBooks())
            .catch((error) => toast.error(error.message));
    }

    return {clubBooks, getAllClubBooks ,addNewClubBook, deleteClubBook};
}