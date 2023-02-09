import {useEffect, useState} from "react";
import {Friend} from "../Types/Friend";
import axios from "axios";

export default function useFriendDetails(id: string|undefined) {
    const [friendDetails, setFriendDetails] = useState<Friend>();

    useEffect(() => {
        (async () => {
            const friend = await axios.get(`/friends/${id}`);
            setFriendDetails(friend.data);
        })();
    }, [id]);

    return {friendDetails};
}