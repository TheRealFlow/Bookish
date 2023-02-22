import {BookClub} from "../types/BookClub";
import React, {useState} from "react";
import useBookClubs from "../hooks/useBookClubs";
import {Box, Button, TextField} from "@mui/material";

export default function AddNewBookClub() {
    const {addNewBookClub} = useBookClubs();
    const [owner, setOwner] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        const newBookClub: BookClub = {
            createdBy: "",
            owner: owner,
            name: name,
            image: image,
            description: description,
            genre: genre,
        }
        addNewBookClub(newBookClub);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{p: 2, display: "flex", flexDirection: "column", width: 300}}>
                <TextField autoFocus margin={"dense"} name={"owner"} label={"Club-Owner"} type={"text"} variant={"standard"} onChange={(e) => setOwner(e.target.value)} />
                <TextField autoFocus margin={"dense"} name={"name"} label={"Name"} type={"text"} variant={"standard"} onChange={(e) => setName(e.target.value)} />
                <TextField autoFocus margin={"dense"} name={"image"} label={"Image URL"} type={"text"} variant={"standard"} onChange={(e) => setImage(e.target.value)} />
                <TextField margin={"dense"} name={"description"} label={"Description"} type={"text"} variant={"standard"} onChange={(e) => setDescription(e.target.value)}/>
                <TextField margin={"dense"} name={"genre"} label={"Genre"} type={"text"} variant={"standard"} onChange={(e) => setGenre(e.target.value)}/>
                <Button sx={{marginTop: 5}} type={"submit"} variant={"contained"}>Create BookClub</Button>
            </Box>
        </form>
    );
}