import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {ClubMember} from "../types/ClubMember";

export default function useClubMembers() {
    const [clubMembers, setClubMembers] = useState<ClubMember[]>([])

    useEffect(() => {
        getAllClubMembers();
    }, []);

    const getAllClubMembers = () => {
        axios.get("/api/club-member")
            .then(response => response.data)
            .then(clubMembers => setClubMembers(clubMembers))
            .catch((error) => toast.error(error.message));
    }

    const addNewClubMember = (clubMember: ClubMember) => {
        axios.post("/api/club-member", clubMember)
            .then(() => toast.success("Club member added successfully!"))
            .then(() => getAllClubMembers())
            .catch((error) => toast.error(error.message));
    }

    const deleteClubMember = (id: string) => {
        axios.delete(`/api/club-member/${id}`)
            .then(() => toast.success("Club member deleted successfully!"))
            .then(() => getAllClubMembers())
            .catch((error) => toast.error(error.message));
    }

    return {clubMembers, getAllClubMembers, addNewClubMember, deleteClubMember};
}