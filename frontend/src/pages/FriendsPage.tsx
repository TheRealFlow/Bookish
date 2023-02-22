import NavBar from "../components/NavBar";
import {Box, Button, Dialog, DialogActions, DialogTitle, Fab, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import SearchUser from "../components/SearchUser";
import useFriends from "../hooks/useFriends";
import {useNavigate} from "react-router-dom";
import {red} from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import {DeleteOutline} from "@mui/icons-material";

export default function FriendsPage() {
    const [showSearch, setShowSearch] = useState(false);
    const {friends, deleteFriend} = useFriends();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleShowSearch = () => {
        setShowSearch(true);
    }
    const handleCloseSearch = () => {
        setShowSearch(false);
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
                <Box sx={{m: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography variant={"h4"} color={"secondary"} sx={{fontWeight: 600}}>My Friends</Typography>
                    <Fab color="secondary" size={"small"} aria-label="add">
                        <AddIcon onClick={handleShowSearch} />
                    </Fab>
                </Box>
                <Dialog open={showSearch} onClose={handleCloseSearch}>
                    <DialogTitle>
                        Add new Friends
                    </DialogTitle>
                    <SearchUser />
                    <DialogActions>
                        <Button onClick={handleCloseSearch}>Close</Button>
                    </DialogActions>
                </Dialog>

            <Box sx={{m: 2}}>
                {friends.length === 0 &&
                    <Typography variant={"h5"} sx={{display: "flex", justifyContent: "center", mt: 10}}>...no Friends added yet</Typography>
                }
                {friends.map(friend => (
                    <Paper elevation={6} key={friend.id} sx={{my: 2, display: "flex"}}>
                        <Avatar src={"/api/images/"+friend.imageId} sx={{width: 100, height: 100, m: 1}} />
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography variant={"h5"} color={"secondary"} sx={{mt: 1, mx: 1.5, fontWeight: 600}}>{friend.username}</Typography>
                            <Box sx={{display: "flex"}}>
                                <Button variant={"outlined"} onClick={() => navigate(`/friends/${friend.id}`)} sx={{mx: 1.5, mt: 2}}>Profile</Button>
                                <Button variant={"contained"} sx={{mx: 1.5, mt: 2, bgcolor: red[500]}} onClick={handleClickOpen}><DeleteOutline/>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this Friend?"}</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={() => deleteFriend(friend.id)} variant={"outlined"} color={"secondary"} autoFocus>Yes</Button>
                                        <Button onClick={handleClose} color={"secondary"}>No</Button>
                                    </DialogActions>
                                </Dialog>
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </>
    )
}