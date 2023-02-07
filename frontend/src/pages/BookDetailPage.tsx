import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useBookDetails from "../hooks/useBookDetails";
import {Book} from "../Types/Book";
import {Box, Button, Container, Dialog, DialogActions, DialogTitle, Paper, Typography} from "@mui/material";
import {green, grey, red} from "@mui/material/colors";
import UpdateBook from "../Components/UpdateBook";
import NavBar from "../Components/NavBar";

type DetailPageProps = {
    deleteBook: (id: string) => void;
    updateBook: (updateBook: Book) => void;
}

export default function BookDetailPage(props: DetailPageProps) {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {bookDetails} = useBookDetails(id);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleShowEditForm = () => {
        setShowEditForm(true);
    }
    const handleCloseEditForm = () => {
        setShowEditForm(false);
    }
    const handleDelete = (id: string) => {
        props.deleteBook(id);
        navigate("/mybooks");
    }
    const handleUpdate = (book: Book) => {
        props.updateBook(book);
          navigate("/mybooks");
    }



    return (
        <>
        <NavBar />
        <Container sx={{maxWidth: 375, display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Paper elevation={3}>
                    <Typography variant={"h5"}>{bookDetails?.title}</Typography>
                    <Typography>{bookDetails?.author}</Typography>
            </Paper>
                <Box component={"img"} src={bookDetails?.imageUrl} sx={{maxHeight: "300", maxWidth: "200"}}/>
            <Paper elevation={3}>
                    <Typography sx={{my: 1}}>{bookDetails?.description}</Typography>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography>Pages: {bookDetails?.pages}</Typography>
                    <Typography>Release year: {bookDetails?.year}</Typography>
                    <Typography>Genre: {bookDetails?.genre}</Typography>
                    <Typography>ISBN: {bookDetails?.isbn}</Typography>
                </Box>
                <Box>
                    <Button onClick={() => id ? handleDelete(id) : null} sx={{my: 5, mx: 5, px: 2, py: 1, bgcolor: red[500]}} variant={"contained"}>Delete</Button>

                    <Button onClick={handleShowEditForm} sx={{my: 5, mx: 2, px: 2, py: 1, bgcolor: green[500]}} variant={"contained"}>Edit Book</Button>
                    <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                        <DialogTitle>Edit this Book</DialogTitle>
                    {showEditForm && (
                        //@ts-ignore
                        <UpdateBook updateBook={handleUpdate} book={bookDetails}/>
                    )}
                        <DialogActions>
                            <Button onClick={handleCloseEditForm} variant={"outlined"}>Close</Button>
                        </DialogActions>
                    </Dialog>

                    <Button onClick={() => navigate("/mybooks")} sx={{my: 5, mx: 2, px: 2, py: 1, bgcolor: grey[500]}} variant={"contained"}>Back</Button>
                </Box>
            </Paper>
        </Container>
        </>
    )
}

