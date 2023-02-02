import {Book} from "../Types/Book";
import React, {useEffect, useState} from "react";
import getMe from "../hooks/getMe";
import AddNewBook from "../Components/AddNewBook";
import Logout from "../Components/Logout";
import {
    Box,
    Button,
    Container, Dialog, DialogActions, DialogTitle,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {Link, useNavigate} from "react-router-dom";

type HomePageProps = {
    books: Book[];
    getAllBooks: () => void;
    addNewBook: (book: Book) => void;
}

export default function UserPage(props: HomePageProps) {
    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);

    const handleShowAddForm = () => {
        setShowAddForm(true);
    }
    const handleCloseAddForm = () => {
        setShowAddForm(false);
    }

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
        <Container>

            <Typography variant={"h3"}>Book List</Typography>

            <Box>
            {props.books.map((book) =>
                <ImageList sx={{ width: 500, height: 400 }} key={book.id}>
                    <ImageListItem key={book.imageUrl}>
                        <img
                            src={book.imageUrl}
                            srcSet={book.imageUrl}
                            alt={book.title}
                        />
                        <ImageListItemBar
                            title={book.title}
                            subtitle={<span>by: {book.author}</span>}
                            actionIcon={<IconButton
                                onClick={() => navigate(`/detail/${book.id}`)}
                                sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                                aria-label={`info about ${book.title}`}>
                                <InfoIcon />
                            </IconButton>}
                        />

                    </ImageListItem>
                </ImageList>)}
            </Box>

            <Button onClick={handleShowAddForm}>Add new Book</Button>
                <Dialog open={showAddForm} onClose={handleCloseAddForm}>
                    <DialogTitle>Add new Book</DialogTitle>
                    <AddNewBook addNewBook={props.addNewBook} getAllBooks={props.getAllBooks} />
                <DialogActions>
                    <Button onClick={handleCloseAddForm}>Close</Button>
                </DialogActions>
                </Dialog>


            <Box sx={{my: 20}}>
                <Logout/>
                <Button sx={{mx: 6}} variant={"contained"}>
                    <Link to={"/"}>Home</Link>
                </Button>
            </Box>

        </Container>
    );
}