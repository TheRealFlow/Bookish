import NavBar from "../Components/NavBar";
import {Button, Container, Dialog, DialogActions, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import useBookClubs from "../hooks/useBookClubs";
import AddNewBookClub from "../Components/AddNewBookClub";

export default function BookClubsPage() {
    const [showAddForm, setShowAddForm] = useState(false);
    const {bookClubs} = useBookClubs();
    /*const navigate = useNavigate();*/

    const handleShowAddForm = () => {
        setShowAddForm(true);
    }
    const handleCloseAddForm = () => {
        setShowAddForm(false);
    }

    return (
        <>
            <NavBar />
            <Container sx={{my: 3, textAlign: "center"}}>

                <Typography variant={"h3"}>Book-Clubs</Typography>

                <Button onClick={handleShowAddForm} variant={"contained"} sx={{my: 2}}>Create a new Club</Button>
                <Dialog open={showAddForm} onClose={handleCloseAddForm}>
                    <AddNewBookClub />
                    <DialogActions>
                        <Button onClick={handleCloseAddForm}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Paper elevation={3} sx={{my: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <Typography variant={"h6"} sx={{my: 1.5}}>My Book-Clubs</Typography>
                    {bookClubs.map(bookClub => (
                        <Paper elevation={6} key={bookClub.id} sx={{my: 1, p: 1, width: 300}}>
                            <Typography variant={"h6"} sx={{mx: 1.5}}>{bookClub.name}</Typography>
                            <Typography variant={"h6"} sx={{mx: 1.5}}>{bookClub.description}</Typography>
                            {/*<Button onClick={() => navigate(`/user/${friend.id}`)} variant={"outlined"} sx={{mx: 1.5}}>Profile</Button>*/}
                        </Paper>
                    ))}
                </Paper>

            </Container>
        </>
    )
}