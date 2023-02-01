import {Book} from "../Types/Book";
import React, {useState} from "react";

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
            <input name={"title"} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input name={"author"} placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            <input name={"description"} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input name={"imageUrl"} placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
            <input name={"genre"} placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)}/>
            <input name={"isbn"} placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)}/>
            <input name={"pages"} type={"number"} placeholder="Pages" value={pages} onChange={(e) => setPages(parseInt(e.target.value))}/>
            <input name={"year"} type={"number"} placeholder="Year" value={year} onChange={(e) => setYear(parseInt(e.target.value))}/>
            <button>Update Book</button>
        </form>
    );
}