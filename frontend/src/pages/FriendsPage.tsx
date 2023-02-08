import NavBar from "../Components/NavBar";
import {Box, Button, Container, Dialog, DialogActions, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import SearchUser from "../Components/SearchUser";
import useFriends from "../hooks/useFriends";

export default function FriendsPage() {
    const [showSearch, setShowSearch] = useState(false);
    const {friends} = useFriends();

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
                    <Typography variant={"h6"} sx={{my: 1.5}}>Map of Friends...</Typography>
                    {friends.map(friend => (
                        <Box key={friend.id} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <img src={"/images/"+friend.imageId} alt={"preview"} style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
                            <Typography variant={"h6"} sx={{my: 1.5}}>{friend.username}</Typography>
                        </Box>
                    ))}
                </Paper>

            </Container>
        </>
    )
}