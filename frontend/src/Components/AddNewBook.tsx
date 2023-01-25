import useBooks from "../hooks/useBooks";
import React, {useState} from "react";

export default function AddNewBook() {
    const {addBook} = useBooks();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isbn, setIsbn] = useState("");
    const [pages, setPages] = useState(0);
    const [year, setYear] = useState(0);
    const [genre, setGenre] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addBook({title, author, description, imageUrl, isbn, pages, year, genre});
        setTitle("");
        setAuthor("");
        setDescription("");
        setImageUrl("");
        setIsbn("");
        setPages(0);
        setYear(0);
        setGenre("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
            <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)}/>
            <input type="number" placeholder="Pages" value={pages} onChange={(e) => setPages(parseInt(e.target.value))}/>
            <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(parseInt(e.target.value))}/>
            <button>Add new Book</button>
        </form>
    );
}