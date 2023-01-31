import React, {useState} from "react";
import {Book} from "../Types/Book";

type AddNewBookProps = {
    books: Book[];
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
        event.preventDefault();

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
            <input name={"title"} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input name={"author"} placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
            <input name={"description"} placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
            <input name={"imageUrl"} placeholder="Image URL" onChange={(e) => setImageUrl(e.target.value)}/>
            <input name={"genre"} placeholder="Genre" onChange={(e) => setGenre(e.target.value)}/>
            <input name={"isbn"} placeholder="ISBN" onChange={(e) => setIsbn(e.target.value)}/>
            <input name={"pages"} placeholder="Pages" onChange={(e) => setPages(parseInt(e.target.value))}/>
            <input name={"year"} placeholder="Year" onChange={(e) => setYear(parseInt(e.target.value))}/>
            <button>Add new Book</button>
        </form>
    );
}