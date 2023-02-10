import useBookClubDetails from "../hooks/useBookClubDetails";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import useBookClubs from "../hooks/useBookClubs";
import NavBar from "../Components/NavBar";
import {Box, Button, Dialog, DialogActions, DialogTitle, Paper, Typography} from "@mui/material";
import {green, red} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import UpdateBookClub from "../Components/UpdateBookClub";
import {BookClub} from "../Types/BookClub";
import SearchBooksForClub from "../Components/SearchBooksForClub";
import useClubBooks from "../hooks/useClubBooks";
import useClubMembers from "../hooks/useClubMembers";
import SearchFriendsForClub from "../Components/SearchFriendsForClub";

export default function BookClubDetailPage() {
    const {id} = useParams<{id: string}>();
    const {deleteBookClub, updateBookClub} = useBookClubs();
    const {bookClubDetails} = useBookClubDetails(id);
    const {clubBooks} = useClubBooks();
    const {clubMembers} = useClubMembers()
    const [showEditForm, setShowEditForm] = useState(false);
    const [showSearchBooks, setShowSearchBooks] = useState(false);
    const [showSearchFriends, setShowSearchFriends] = useState(false);
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

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <NavBar/>

                <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                    <Typography variant={"h4"} sx={{my: 1.5}}>{bookClubDetails?.name}</Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Club-Owner: {bookClubDetails?.owner}</Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Description: {bookClubDetails?.description}</Typography>
                </Paper>

                <Box sx={{m: 1, display: "flex"}}>
                    <Button onClick={handleShowSearchBooks} variant={"outlined"}>Add Book</Button>
                    <Dialog open={showSearchBooks} onClose={handleCloseSearchBooks}>
                        <DialogTitle>Add one of your Books</DialogTitle>
                        {showSearchBooks && (
                            <SearchBooksForClub/>
                        )}
                        <DialogActions>
                            <Button onClick={handleCloseSearchBooks} variant={"outlined"}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>

                <Box sx={{m: 1, display: "flex"}}>
                    <Button onClick={handleShowSearchFriends} variant={"outlined"}>Add Member</Button>
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

                <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                    <Typography variant={"h6"} sx={{my: 1}}>Books</Typography>
                    {clubBooks.map((clubBook) => (
                            <Typography key={clubBook.id}>- {clubBook.title}</Typography>
                    ))}
                </Paper>

                <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                    <Typography variant={"h6"} sx={{my: 1}}>Member</Typography>
                    {clubMembers.map((clubMember) => (
                        <Typography key={clubMember.id}>- {clubMember.username}</Typography>
                    ))}
                </Paper>

                <Box sx={{m: 1, display: "flex"}}>
                    <Button onClick={handleShowEditForm} sx={{bgcolor: green[500]}} variant={"contained"}>Edit Club</Button>
                    <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                        <DialogTitle>Edit this Club</DialogTitle>
                            {showEditForm && (
                                // @ts-ignore
                                <UpdateBookClub bookClub={bookClubDetails} updateBookClub={handleUpdate}/>
                            )}
                        <DialogActions>
                                <Button onClick={handleCloseEditForm} variant={"outlined"}>Close</Button>
                        </DialogActions>
                    </Dialog>

                    <Button onClick={() => id ? handleDelete(id) : null} variant={"contained"} sx={{bgcolor: red[500]}}>Delete Club</Button>
                </Box>

                <Button variant={"outlined"} onClick={() => navigate("/bookclubs")}>Back</Button>

            </Box>
        </>
    );
}