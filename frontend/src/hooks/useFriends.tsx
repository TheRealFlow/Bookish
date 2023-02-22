import {useEffect, useState} from "react";
import {Friend} from "../types/Friend";
import axios from "axios";
import {toast} from "react-toastify";

export default function useFriends() {
    const [friends, setFriends] = useState<Friend[]>([])

    useEffect(() => {
        getAllFriends();
    }, []);

    const getAllFriends = () => {
        axios.get("/api/friends")
            .then(response => response.data)
            .then(friends => setFriends(friends))
            .catch((error) => toast.error(error.message));
    }

    const addNewFriend = (friend: Friend) => {
        axios.post("/api/friends", friend)
            .then(() => toast.success("Friend added successfully!"))
            .then(() => getAllFriends())
            .catch((error) => toast.error(error.message));
    }

    const deleteFriend = (id: string) => {
        axios.delete(`/api/friends/${id}`)
            .then(() => toast.success("Friend deleted successfully!"))
            .then(() => getAllFriends())
            .catch((error) => toast.error(error.message));
    }

    return {friends, getAllFriends, addNewFriend, deleteFriend};
}