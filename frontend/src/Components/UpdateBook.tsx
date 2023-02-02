import {Book} from "../Types/Book";
import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";

type UpdateBookProps = {
    book: Book;
    updateBook: (updateBook: Book) => void;
}

export default function UpdateBook(props: UpdateBookProps) {
    const [title, setTitle] = useState(props.book.title);
    const [author, setAuthor] = useState(props.book.author);
    const [description, setDescription] = useState(props.book.description);
    const [imageUrl, setImageUrl] = useState(props.book.imageUrl);
    const [isbn, setIsbn] = useState(props.book.isbn);
    const [pages, setPages] = useState(props.book.pages);
    const [year, setYear] = useState(props.book.year);
    const [genre, setGenre] = useState(props.book.genre);

    const saveBook = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updateBook: Book = {
            id: props.book.id,
            createdBy: props.book.createdBy,
            title: title,
            author: author,
            description: description,
            imageUrl: imageUrl,
            isbn: isbn,
            pages: pages,
            year: year,
            genre: genre
        }
        props.updateBook(updateBook);
    }

    return (
        <form onSubmit={saveBook}>
            <Box sx={{p: 2, display: "flex", flexDirection: "column", width: 300}}>
                <TextField autoFocus margin={"dense"} name={"title"} label="Title" type={"text"} variant={"standard"} value={title} onChange={(e) => setTitle(e.target.value)}/>
                <TextField margin={"dense"} name={"author"} label="Author" type={"text"} variant={"standard"} value={author} onChange={(e) => setAuthor(e.target.value)}/>
                <TextField margin={"dense"} name={"description"} label="Description" type={"text"} variant={"standard"} value={description} onChange={(e) => setDescription(e.target.value)}/>
                <TextField margin={"dense"} name={"imageUrl"} label="Image URL" type={"text"} variant={"standard"} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                <TextField margin={"dense"} name={"genre"} label="Genre" type={"text"} variant={"standard"} value={genre} onChange={(e) => setGenre(e.target.value)}/>
                <TextField margin={"dense"} name={"isbn"} label="ISBN" type={"text"} variant={"standard"} value={isbn} onChange={(e) => setIsbn(e.target.value)}/>
                <TextField margin={"dense"} name={"pages"} label="Pages" type={"number"} variant={"standard"} value={pages} onChange={(e) => setPages(parseInt(e.target.value))}/>
                <TextField margin={"dense"} name={"year"} label="Year" type={"number"} variant={"standard"} value={year} onChange={(e) => setYear(parseInt(e.target.value))}/>
                <Button sx={{marginTop: 5}} type={"submit"} variant={"contained"}>Update Book</Button>
            </Box>
        </form>
    );
}