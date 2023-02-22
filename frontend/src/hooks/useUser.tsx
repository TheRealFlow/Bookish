import {useEffect, useState} from "react";
import {User} from "../types/User";
import axios from "axios";
import {toast} from "react-toastify";

export default function useUser() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        axios.get("/api/user")
            .then(response => response.data)
            .then(users => setUsers(users))
            .catch((error) => toast.error(error.message));
    }

    const deleteUser = (id: string | undefined) => {
        axios.delete("/api/user/"+id)
            .then(response => response.data)
            .then(() => getAllUsers())
            .catch((error) => toast.error(error.message));
    }

    return {users, getAllUsers, deleteUser};
}