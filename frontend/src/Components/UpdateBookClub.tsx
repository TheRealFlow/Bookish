import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {BookClub} from "../Types/BookClub";

type UpdateBookClubProps = {
    bookClub: BookClub;
    updateBookClub: (updateBookClub: BookClub) => void;
}

export default function UpdateBookClub(props: UpdateBookClubProps) {
    const [name, setName] = useState(props.bookClub.name);
    const [owner, setOwner] = useState(props.bookClub.owner);
    const [description, setDescription] = useState(props.bookClub.description);

    const saveBookClub = () => {
        const updatedBookClub: BookClub = {
            ...props.bookClub,
            name: name,
            owner: owner,
            description: description,
        }
        props.updateBookClub(updatedBookClub);
    }

    return (
        <form onSubmit={saveBookClub}>
            <Box sx={{p: 2, display: "flex", flexDirection: "column", width: 300}}>
                <TextField autoFocus margin={"dense"} name={"name"} value={name} label={"Name"} type={"text"} variant={"standard"} onChange={(e) => setName(e.target.value)} />
                <TextField autoFocus margin={"dense"} name={"owner"} value={owner} label={"Club-Owner"} type={"text"} variant={"standard"} onChange={(e) => setOwner(e.target.value)} />
                <TextField margin={"dense"} name={"description"} value={description} label={"Description"} type={"text"} variant={"standard"} onChange={(e) => setDescription(e.target.value)}/>
                <Button sx={{marginTop: 5}} type={"submit"} variant={"contained"}>Update BookClub</Button>
            </Box>
        </form>
    );
}