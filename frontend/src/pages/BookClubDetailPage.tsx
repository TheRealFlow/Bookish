import useBookClubDetails from "../hooks/useBookClubDetails";
import {useParams, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import useBookClubs from "../hooks/useBookClubs";
import NavBar from "../components/NavBar";
import {Box, Button, Dialog, DialogActions, DialogTitle, Fab, Paper, Typography} from "@mui/material";
import UpdateBookClub from "../components/UpdateBookClub";
import {BookClub} from "../types/BookClub";
import SearchBooksForClub from "../components/SearchBooksForClub";
import useClubBooks from "../hooks/useClubBooks";
import useClubMembers from "../hooks/useClubMembers";
import SearchFriendsForClub from "../components/SearchFriendsForClub";
import DeleteIcon from "@mui/icons-material/Delete";
import {ArrowBack} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

export default function BookClubDetailPage() {
    const {id} = useParams<{id: string}>();
    const {deleteBookClub, updateBookClub} = useBookClubs();
    const {bookClubDetails} = useBookClubDetails(id);
    const {clubBooks} = useClubBooks();
    const {clubMembers} = useClubMembers()
    const [showEditForm, setShowEditForm] = useState(false);
    const [showSearchBooks, setShowSearchBooks] = useState(false);
    const [showSearchFriends, setShowSearchFriends] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleShowSearchBooks = () => {
        setShowSearchBooks(true);
    }
    const handleCloseSearchBooks = () => {
        setShowSearchBooks(false);
    }
    const handleShowSearchFriends = () => {
        setShowSearchFriends(true);
    }
    const handleCloseSearchFriends = () => {
        setShowSearchFriends(false);
    }
    const handleShowEditForm = () => {
        setShowEditForm(true);
    }
    const handleCloseEditForm = () => {
        setShowEditForm(false);
    }
    const handleDelete = (id: string) => {
        deleteBookClub(id);
        navigate("/bookclubs");
    }
    const handleUpdate = (bookClub: BookClub) => {
        updateBookClub(bookClub);
        navigate("/bookclubs");
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <NavBar/>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <img src={bookClubDetails?.image} alt={"preview"} style={{marginTop: "1rem", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "whitesmoke"}}/>
                    <Typography variant={"h5"} color={"secondary"} sx={{my: 1.5, fontWeight: 600}}>{bookClubDetails?.name}</Typography>
                    <Paper elevation={1} sx={{m: 1, p: 1}}>
                        <Typography sx={{m: 1, p: 1}}><Typography color={"secondary"}>Club-Owner: </Typography>{bookClubDetails?.owner}</Typography>
                        <Typography sx={{m: 1, p: 1}}><Typography color={"secondary"}>Description: </Typography>{bookClubDetails?.description}</Typography>
                        <Typography sx={{m: 1, p: 1}}><Typography color={"secondary"}>Genre: </Typography>{bookClubDetails?.genre}</Typography>
                    </Paper>
                </Box>

                <Box sx={{display: "flex", width: "100%", justifyContent: "center"}}>
                    <Paper elevation={1} sx={{m: 1, p: 2}}>
                        <Typography sx={{fontWeight: 600}} color={"secondary"}>Books: </Typography>
                        {clubBooks.map((clubBook) => (
                                <Typography key={clubBook.id}>- {clubBook.title}</Typography>
                        ))}
                    </Paper>

                    <Paper elevation={1} sx={{m: 1, p: 2}}>
                        <Typography sx={{fontWeight: 600}} color={"secondary"}>Member: </Typography>
                        {clubMembers.map((clubMember) => (
                            <Typography key={clubMember.id}>- {clubMember.username}</Typography>
                        ))}
                    </Paper>
                </Box>

                <Box sx={{my: 1, display: "flex"}}>
                    <Button onClick={handleShowSearchBooks} variant={"outlined"} color={"warning"}>Add new Book</Button>
                    <Dialog open={showSearchBooks} onClose={handleCloseSearchBooks}>
                        <DialogTitle>Add one of your Books</DialogTitle>
                        {showSearchBooks && (
                            <SearchBooksForClub/>
                        )}
                        <DialogActions>
                            <Button onClick={handleCloseSearchBooks} variant={"outlined"}>Close</Button>
                        </DialogActions>
                    </Dialog>

                    <Button onClick={handleShowSearchFriends} variant={"outlined"} color={"warning"}>Add new Member</Button>
                    <Dialog open={showSearchFriends} onClose={handleCloseSearchFriends}>
                        <DialogTitle>Add one of your Friends</DialogTitle>
                        {showSearchFriends && (
                            <SearchFriendsForClub/>
                        )}
                        <DialogActions>
                            <Button onClick={handleCloseSearchFriends} variant={"outlined"}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                <Box sx={{m: 4, display: "flex", justifyContent: "space-around"}}>
                    <Fab color="error" aria-label="delete">
                        <DeleteIcon onClick={handleClickOpen}/>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this Club?"}</DialogTitle>
                            <DialogActions>
                                <Button onClick={() => id ? handleDelete(id) : null} variant={"outlined"} color={"secondary"} autoFocus>Yes</Button>
                                <Button onClick={handleClose} color={"secondary"}>No</Button>
                            </DialogActions>
                        </Dialog>
                    </Fab>
                    <Fab color="warning" aria-label="edit" sx={{ml: 5}}>
                        <EditIcon onClick={handleShowEditForm}/>
                    </Fab>
                    <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                        <DialogTitle>Update the Book Infos</DialogTitle>
                        {showEditForm && (
                            // @ts-ignore
                            <UpdateBookClub bookClub={bookClubDetails} updateBookClub={handleUpdate}/>
                        )}
                        <DialogActions>
                            <Button onClick={handleCloseEditForm} color={"secondary"}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                <Fab color="primary" aria-label="back">
                    <ArrowBack onClick={() => window.history.back()}/>
                </Fab>

            </Box>
        </>
    );
}