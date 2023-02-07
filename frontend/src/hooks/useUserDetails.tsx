import {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../Types/User";

export default function useUserDetails(id: string|undefined) {
    const [userDetails, setUserDetails] = useState<User>();

    useEffect(() => {
        (async () => {
            const user = await axios.get(`/user/${id}`);
            setUserDetails(user.data);
        })();
    }, [id]);

    return {userDetails};
}