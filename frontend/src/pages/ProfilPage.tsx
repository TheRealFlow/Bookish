import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle, Fab, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import EditIcon from '@mui/icons-material/Edit';
import ChangeImage from "../components/ChangeImage";
import useBooks from "../hooks/useBooks";
import useFriends from "../hooks/useFriends";
import useBookClubs from "../hooks/useBookClubs";
import {ArrowBack} from "@mui/icons-material";
import useUser from "../hooks/useUser";
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    const {books} = useBooks();
    const {user} = useAuth();
    const {deleteUser} = useUser();
    const {friends} = useFriends();
    const {bookClubs} = useBookClubs();
    const [showEditForm, setShowEditForm] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleShowEditForm = () => {
        setShowEditForm(true);
    }
    const handleCloseEditForm = () => {
        setShowEditForm(false);
    }
    const handleDelete = (id: string | undefined) => {
        deleteUser(id);
        navigate("/login");
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <NavBar/>
            <Typography variant={"h4"} color={"secondary"} sx={{my: 2.5, fontWeight: 600}}>My Profile</Typography>

            <Box sx={{position: "relative"}}>
                <img src={"/api/images/"+user?.imageId} alt={"preview"} style={{position: "relative", width: "200px", height: "200px", borderRadius: "50%"}}/>
                <Fab color="warning" aria-label="edit" sx={{position: "absolute", bottom: 0, right: 0}}>
                    <EditIcon onClick={handleShowEditForm}/>
                </Fab>
            </Box>

            <Dialog open={showEditForm} onClose={handleCloseEditForm}>
                {showEditForm && (
                    <ChangeImage/>
                )}
                <DialogActions>
                    <Button onClick={handleCloseEditForm} variant={"outlined"}>Close</Button>
                </DialogActions>
            </Dialog>

            <Paper elevation={1} sx={{my: 4, mx: 1, display: "flex", textAlign: "center", justifyContent: "space-between", flexWrap: "wrap"}}>
                <Typography sx={{m: 1, p: 1, fontWeight: 600}}><Typography color={"secondary"}>Username: </Typography>{user?.username}</Typography>
                <Typography sx={{m: 1, p: 1, fontWeight: 600}}><Typography color={"secondary"}>Friends: </Typography>{friends.length}</Typography>
                <Typography sx={{m: 1, p: 1, fontWeight: 600}}><Typography color={"secondary"}>Book-Clubs: </Typography>{bookClubs.length}</Typography>
                <Typography sx={{m: 1, p: 1, fontWeight: 600}}><Typography color={"secondary"}>Books: </Typography>{books.length}</Typography>

                <Button variant={"contained"} color={"error"} sx={{m: 4}} onClick={handleClickOpen}>Delete Account</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your Account?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => handleDelete(user?.id)} variant={"outlined"} color={"secondary"} autoFocus>Yes</Button>
                        <Button onClick={handleClose} color={"secondary"}>No</Button>
                    </DialogActions>
                </Dialog>

            </Paper>

            <Fab color="primary" aria-label="back">
                <ArrowBack onClick={() => window.history.back()}/>
            </Fab>

        </Box>
    );
}