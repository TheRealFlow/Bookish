import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useBookDetails from "../hooks/useBookDetails";
import {Book} from "../types/Book";
import {Box, Button, Container, Dialog, DialogActions, DialogTitle, Fab, Paper, Typography} from "@mui/material";
import UpdateBook from "../components/UpdateBook";
import NavBar from "../components/NavBar";
import useClubBooks from "../hooks/useClubBooks";
import useBooks from "../hooks/useBooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {ArrowBack} from "@mui/icons-material";

export default function BookDetailPage() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {updateBook, deleteBook} = useBooks();
    const {bookDetails} = useBookDetails(id);
    const {addNewClubBook} = useClubBooks();
    const [showEditForm, setShowEditForm] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleShowEditForm = () => {
        setShowEditForm(true);
    }
    const handleCloseEditForm = () => {
        setShowEditForm(false);
    }
    const handleDelete = (id: string) => {
        deleteBook(id);
        navigate("/mybooks");
    }
    const handleUpdate = (book: Book) => {
        updateBook(book);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <>
        <NavBar />
        <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

            <Box component={"img"} src={bookDetails?.imageUrl}/>

            <Paper elevation={1}>
                <Typography sx={{m: 2, textAlign: "center"}}>{bookDetails?.description}</Typography>

                <Box sx={{display: "flex", alignItems: "center", border: 1}}>
                    <Box sx={{mx: 2, my: 1, display: "flex", flexDirection: "column"}}>
                        <Typography>Pages: {bookDetails?.pages}</Typography>
                        <Typography>Release year: {bookDetails?.year}</Typography>
                        <Typography>Genre: {bookDetails?.genre}</Typography>
                        <Typography>ISBN: {bookDetails?.isbn}</Typography>
                    </Box>
                    <Fab color="warning" aria-label="edit" sx={{ml: 5}}>
                        <EditIcon onClick={handleShowEditForm}/>
                    </Fab>
                    <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                        <DialogTitle>Update the Book Infos</DialogTitle>
                        {showEditForm && (
                            //@ts-ignore
                            <UpdateBook updateBook={handleUpdate} book={bookDetails}/>
                        )}
                        <DialogActions>
                            <Button onClick={handleCloseEditForm} color={"secondary"}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                <Button onClick={() => addNewClubBook(bookDetails as any)} sx={{my: 3, ml: 10}} color={"secondary"} variant={"contained"}>Add to Book-Club</Button>

                <Box sx={{my: 2, display: "flex", justifyContent: "space-around"}}>
                    <Fab color="error" aria-label="delete">
                        <DeleteIcon onClick={handleClickOpen}/>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this book?"}</DialogTitle>
                            <DialogActions>
                                <Button onClick={() => id ? handleDelete(id) : null} variant={"outlined"} color={"secondary"} autoFocus>Yes</Button>
                                <Button onClick={handleClose} color={"secondary"}>No</Button>
                            </DialogActions>
                        </Dialog>
                    </Fab>
                    <Fab color="primary" aria-label="back">
                        <ArrowBack onClick={() => window.history.back()}/>
                    </Fab>
                </Box>

            </Paper>
        </Container>
        </>
    )
}

