import React, {useState} from "react";
import {Button, Dialog, DialogActions, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import NavBar from "../Components/NavBar";
import useAuth from "../hooks/useAuth";
import {green} from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import ChangeImage from "../Components/ChangeImage";
import useBooks from "../hooks/useBooks";
import useFriends from "../hooks/useFriends";
import useBookClubs from "../hooks/useBookClubs";

export default function ProfilePage() {
    const {books} = useBooks();
    const {user} = useAuth();
    const {friends} = useFriends();
    const {bookClubs} = useBookClubs();
    const [showEditForm, setShowEditForm] = useState(false);

    const handleShowEditForm = () => {
        setShowEditForm(true);
    }
    const handleCloseEditForm = () => {
        setShowEditForm(false);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <NavBar/>
            <Typography variant={"h4"} sx={{my: 1.5}}>My Profile</Typography>

            <img src={"/api/images/"+user?.imageId} alt={"preview"} style={{width: "200px", height: "200px", borderRadius: "50%"}}/>

            <Button onClick={handleShowEditForm} sx={{m: 2, bgcolor: green[500]}} variant={"contained"} endIcon={<EditIcon/>}>Change Image</Button>
            <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                {showEditForm && (
                    <ChangeImage/>
                )}
                <DialogActions>
                    <Button onClick={handleCloseEditForm} variant={"outlined"}>Close</Button>
                </DialogActions>
            </Dialog>

            <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                <Typography variant={"h6"} sx={{my: .5}}>Username: {user?.username}</Typography>
                <Typography variant={"h6"} sx={{my: .5}}>Friends: {friends.length}</Typography>
                <Typography variant={"h6"} sx={{my: .5}}>Books: {books.length}</Typography>
                <Typography variant={"h6"} sx={{my: .5}}>Book-Clubs: {bookClubs.length}</Typography>
                <Typography variant={"h6"} sx={{my: .5}}>Genres: {books.map(book => book.genre).join(", ")}</Typography>
            </Paper>

        </Box>
    );
}