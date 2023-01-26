import {Book} from "../Model/Book";
import {useEffect} from "react";
import getMe from "../hooks/getMe";
import UpdateBook from "../Components/UpdateBook";
import AddNewBook from "../Components/AddNewBook";
import Logout from "../Auth/Logout";

type HomePageProps = {
    books: Book[];
    getAllBooks: () => void;
    addNewBook: (book: Book) => void;
    deleteBook: (id: string) => void;
    updateBook: (book: Book) => void;
}

export default function UserPage(props: HomePageProps) {
    useEffect(() => {
        (async () => {
            const user = await getMe();
            console.log("Logged in user:", user);
            if (user.role === "USER") {
                console.log("You are logged in as a basic user!");
            }
        })();
    }, []);

    const deleteHandler = (id: string) => {
        props.deleteBook(id);
    }
    const updateHandler = (book: Book) => {
        props.updateBook(book);
    }

    return (
        <>
            <p>List of your Books</p>
            {props.books.map((book) =>
                <ul key={book.id}>
                    <li>
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                        <img src={book.imageUrl} alt={book.title}/>
                        <p>{book.genre}</p>
                        <p>{book.isbn}</p>
                        <p>{book.pages}</p>
                        <p>{book.year}</p>
                        <button onClick={() => book.id ? deleteHandler(book.id) : null}>Delete</button>
                        <UpdateBook book={book} updateBook={updateHandler}/>
                    </li>
                </ul>)}
            <AddNewBook books={props.books} addNewBook={props.addNewBook} getAllBooks={props.getAllBooks}/>
            <Logout/>
        </>
    );
}