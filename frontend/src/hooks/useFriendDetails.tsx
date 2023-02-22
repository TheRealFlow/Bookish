import {useEffect, useState} from "react";
import {Friend} from "../types/Friend";
import axios from "axios";

export default function useFriendDetails(id: string|undefined) {
    const [friendDetails, setFriendDetails] = useState<Friend>();

    useEffect(() => {
        (async () => {
            const friend = await axios.get(`/api/friends/${id}`);
            setFriendDetails(friend.data);
        })();
    }, [id]);

    return {friendDetails};
}