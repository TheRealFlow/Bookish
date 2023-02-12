import React, {useEffect, useState} from "react";
import getMe from "../hooks/getMe";
import AddNewBook from "../Components/AddNewBook";
import {
    Box,
    Button,
    Dialog, DialogActions, DialogTitle, Fab,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import NavBar from "../Components/NavBar";
import useBooks from "../hooks/useBooks";

export default function BooksPage() {
    const navigate = useNavigate();
    const {books} = useBooks();
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
        <>
        <NavBar />
            <Box sx={{m: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant={"h4"} color={"secondary"} sx={{fontWeight: 600}}>My Books</Typography>
                <Fab color="secondary" size={"small"} aria-label="add">
                    <AddIcon onClick={handleShowAddForm} />
                </Fab>
            </Box>

            <Dialog open={showAddForm} onClose={handleCloseAddForm}>
                <DialogTitle>Add new Book</DialogTitle>
                <AddNewBook />
                <DialogActions>
                    <Button onClick={handleCloseAddForm} color={"secondary"}>Close</Button>
                </DialogActions>
            </Dialog>

            <Box>
                <ImageList sx={{m: .4, width: 370}}>
                {books.map((book) =>
                    <ImageListItem key={book.id} sx={{m: .25}}>
                        <img
                            src={book.imageUrl}
                            srcSet={book.imageUrl}
                            alt={book.title}
                        />
                        <ImageListItemBar
                            title={book.title}
                            subtitle={book.author}
                            actionIcon={<IconButton
                                onClick={() => navigate(`/detail/${book.id}`)}
                                sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                                aria-label={`info about ${book.title}`}>
                                <InfoIcon />
                            </IconButton>}
                        />
                    </ImageListItem>)}
                </ImageList>
            </Box>
        </>
    );
}
