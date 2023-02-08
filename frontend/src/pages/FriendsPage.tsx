import NavBar from "../Components/NavBar";
import {Button, Container, Dialog, DialogActions, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import SearchUser from "../Components/SearchUser";

export default function FriendsPage() {
    const [showSearch, setShowSearch] = useState(false);

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
                </Paper>

            </Container>
        </>
    )
}