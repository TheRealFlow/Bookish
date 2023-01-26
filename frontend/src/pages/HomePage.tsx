import {useEffect} from "react";
import getMe from "../hooks/getMe";
import Logout from "../Auth/Logout";
import AddNewBook from "../Components/AddNewBook";
import {Book} from "../Model/Book";
import UpdateBook from "../Components/UpdateBook";

type HomePageProps = {
    book: Book;
    books: Book[];
    getAllBooks: () => void;
    addNewBook: (book: Book) => void;
    deleteBook: (id: string) => void;
    updateBook: (book: Book) => void;
}

export default function HomePage (props: HomePageProps) {

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
            <h1>HomePage</h1>
            <p>List of your Books</p>
            {props.books.map((book) =>
                <ul key={props.book.id}>
                    <li>
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                        <img src={book.imageUrl} alt={props.book.title}/>
                        <p>{book.genre}</p>
                        <p>{book.isbn}</p>
                        <p>{book.pages}</p>
                        <p>{book.year}</p>
                        <button onClick={() => deleteHandler}>Delete</button>
                        <UpdateBook book={book} updateBook={updateHandler}/>
                    </li>
                </ul>)}
            <AddNewBook books={props.books} addNewBook={props.addNewBook} getAllBooks={props.getAllBooks}/>
            <Logout/>
        </>
    );
}