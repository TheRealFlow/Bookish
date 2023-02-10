import {BookClub} from "../Types/BookClub";
import React, {useState} from "react";
import useBookClubs from "../hooks/useBookClubs";
import {Box, Button, TextField} from "@mui/material";

export default function AddNewBookClub() {
    const {addNewBookClub} = useBookClubs();
    const [owner, setOwner] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [books, setBooks] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        const newBookClub: BookClub = {
            createdBy: "",
            owner: owner,
            name: name,
            description: description,
            books: books.split(",")
        }
        addNewBookClub(newBookClub);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{p: 2, display: "flex", flexDirection: "column", width: 300}}>
                <TextField autoFocus margin={"dense"} name={"owner"} label={"Club-Owner"} type={"text"} variant={"standard"} onChange={(e) => setOwner(e.target.value)} />
                <TextField autoFocus margin={"dense"} name={"name"} label={"Name"} type={"text"} variant={"standard"} onChange={(e) => setName(e.target.value)} />
                <TextField margin={"dense"} name={"description"} label={"Description"} type={"text"} variant={"standard"} onChange={(e) => setDescription(e.target.value)}/>
                <TextField margin={"dense"} name={"books"} label={"Books"} type={"text"} variant={"standard"} onChange={(e) => setBooks(e.target.value)}/>
                <Button sx={{marginTop: 5}} type={"submit"} variant={"contained"}>Create BookClub</Button>
            </Box>
        </form>
    );
}