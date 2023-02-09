import axios from "axios";
import {useEffect, useState} from "react";
import {BookClub} from "../Types/BookClub";

export default function useBookClubDetails(id: string|undefined) {
    const [bookClubDetails, setBookClubDetails] = useState<BookClub>();

    useEffect(() => {
        (async () => {
            const bookClub = await axios.get(`/bookclubs/${id}`);
            setBookClubDetails(bookClub.data);
        })();
    }, [id]);

    return {bookClubDetails};
}