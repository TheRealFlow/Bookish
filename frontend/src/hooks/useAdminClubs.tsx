import {useEffect, useState} from "react";
import {BookClub} from "../types/BookClub";
import axios from "axios";

export default function useAdminClubs() {
    const [adminClubs, setAdminClubs] = useState<BookClub[]>([])

    useEffect(() => {
        getAllAdminClubs();
    }, []);

    const getAllAdminClubs = () => {
        axios.get("/api/admin/clubs")
            .then(response => response.data)
            .then(adminClubs => setAdminClubs(adminClubs))
            .catch((error) => console.log(error.message));
    }

    const getAdminClub = (id: string) => {
        axios.get(`/api/admin/clubs/${id}`)
            .then(response => response.data)
            .then(adminClub => setAdminClubs(adminClub))
            .catch((error) => console.log(error.message));
    }

    const deleteAdminClub = (id: string | undefined) => {
        axios.delete(`/api/admin/clubs/${id}`)
            .then(() => console.log("BookClub deleted successfully!"))
            .then(() => getAllAdminClubs())
            .catch((error) => console.log(error.message));
    }

    return {adminClubs, getAllAdminClubs, getAdminClub, deleteAdminClub};
}