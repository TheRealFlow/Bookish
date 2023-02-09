import NavBar from "../Components/NavBar";
import {Button, Container, Dialog, DialogActions, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import SearchUser from "../Components/SearchUser";
import useFriends from "../hooks/useFriends";
import {useNavigate} from "react-router-dom";
import {red} from "@mui/material/colors";

export default function FriendsPage() {
    const [showSearch, setShowSearch] = useState(false);
    const {friends, deleteFriend} = useFriends();
    const navigate = useNavigate();

    const handleShowSearch = () => {
        setShowSearch(true);
    }
    const handleCloseSearch = () => {
        setShowSearch(false);
    }

    return (
        <>
            <NavBar />
            <Container sx={{my: 3, textAlign: "center"}}>

                <Typography variant={"h3"}>Friendlist</Typography>

                <Button onClick={handleShowSearch} variant={"contained"} sx={{my: 2}}>Search for User</Button>
                <Dialog open={showSearch} onClose={handleCloseSearch}>
                    <SearchUser />
                    <DialogActions>
                        <Button onClick={handleCloseSearch}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Paper elevation={3} sx={{my: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <Typography variant={"h6"} sx={{my: 1.5}}>My Friends</Typography>
                    {friends.map(friend => (
                        <Paper elevation={6} key={friend.id} sx={{my: 1, p: 1, width: 300}}>
                            <img src={"/images/"+friend.imageId} alt={"preview"} style={{margin: 1.5, width: "75px", height: "75px", borderRadius: "50%"}}/>
                            <Typography variant={"h6"} sx={{mx: 1.5}}>{friend.username}</Typography>
                            <Button onClick={() => navigate(`/user/${friend.id}`)} variant={"outlined"} sx={{mx: 1.5}}>Profile</Button>
                            <Button onClick={() => deleteFriend(friend.id)} variant={"contained"} sx={{mx: 1.5, bgcolor: red[500]}}>Delete</Button>
                        </Paper>
                    ))}
                </Paper>

            </Container>
        </>
    )
}