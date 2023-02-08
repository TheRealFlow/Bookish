import {useEffect, useState} from "react";
import {User} from "../Types/User";
import axios from "axios";
import {toast} from "react-toastify";

export default function useUser() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        axios.get("/user")
            .then(response => response.data)
            .then(users => setUsers(users))
            .catch((error) => toast.error(error.message));
    }

    return {users, getAllUsers};
}