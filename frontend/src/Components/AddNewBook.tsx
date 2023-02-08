import React, {useState} from "react";
import {Book} from "../Types/Book";
import {Box, Button, TextField} from "@mui/material";

type AddNewBookProps = {
    getAllBooks: () => void;
    addNewBook: (book: Book) => void;
}

export default function AddNewBook(props: AddNewBookProps) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isbn, setIsbn] = useState("");
    const [pages, setPages] = useState(0);
    const [year, setYear] = useState(0);
    const [genre, setGenre] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        const newBook: Book = {
            createdBy: "",
            title: title,
            author: author,
            description: description,
            imageUrl: imageUrl,
            isbn: isbn,
            pages: pages,
            year: year,
            genre: genre
        }
        props.addNewBook(newBook);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{p: 2, display: "flex", flexDirection: "column", width: 300}}>
                <TextField autoFocus margin={"dense"} name={"title"} label="Title" type={"text"} variant={"standard"} onChange={(e) => setTitle(e.target.value)}/>
                <TextField margin={"dense"} name={"author"} label="Author" type={"text"} variant={"standard"} onChange={(e) => setAuthor(e.target.value)}/>
                <TextField margin={"dense"} name={"description"} label="Description" type={"text"} variant={"standard"} onChange={(e) => setDescription(e.target.value)}/>
                <TextField margin={"dense"} name={"imageUrl"} label="Image URL" type={"text"} variant={"standard"} onChange={(e) => setImageUrl(e.target.value)}/>
                <TextField margin={"dense"} name={"genre"} label="Genre" type={"text"} variant={"standard"} onChange={(e) => setGenre(e.target.value)}/>
                <TextField margin={"dense"} name={"isbn"} label="ISBN" type={"text"} variant={"standard"} onChange={(e) => setIsbn(e.target.value)}/>
                <TextField margin={"dense"} name={"pages"} label="Pages" type={"number"} variant={"standard"} onChange={(e) => setPages(parseInt(e.target.value))}/>
                <TextField margin={"dense"} name={"year"} label="Year" type={"number"} variant={"standard"} onChange={(e) => setYear(parseInt(e.target.value))}/>
                <Button sx={{marginTop: 5}} type={"submit"} variant={"contained"}>Add new Book</Button>
            </Box>
        </form>
    );
}