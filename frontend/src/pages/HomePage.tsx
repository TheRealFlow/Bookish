import {useEffect} from "react";
import getMe from "../hooks/getMe";
import Logout from "../Auth/Logout";
import useBooks from "../hooks/useBooks";
import AddNewBook from "../Components/AddNewBook";


export default function HomePage () {
    const {books, deleteBook} = useBooks();

    useEffect(() => {
        (async () => {
            const user = await getMe();
            console.log("Logged in user:", user);
            if (user.role === "USER") {
                console.log("You are logged in as a basic user!");
            }
        })();
    }, []);

    return (
        <>
            <h1>HomePage</h1>
            <p>List of your Books</p>
            {books.map((book) =>
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
                        <button onClick={() => deleteBook(book.id)}>Delete</button>
                    </li>
                </ul>)}
            <AddNewBook/>
            <Logout/>
        </>
    );
}