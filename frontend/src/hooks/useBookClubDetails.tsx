import axios from "axios";
import {useEffect, useState} from "react";
import {BookClub} from "../types/BookClub";

export default function useBookClubDetails(id: string|undefined) {
    const [bookClubDetails, setBookClubDetails] = useState<BookClub>();

    useEffect(() => {
        (async () => {
            const bookClub = await axios.get(`/api/bookclubs/${id}`);
            setBookClubDetails(bookClub.data);
        })();
    }, [id]);

    return {bookClubDetails};
}