import NavBar from "../Components/NavBar";
import {Box, Button, Dialog, DialogActions, Fab, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import useBookClubs from "../hooks/useBookClubs";
import AddNewBookClub from "../Components/AddNewBookClub";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";

export default function BookClubsPage() {
    const [showAddForm, setShowAddForm] = useState(false);
    const {bookClubs} = useBookClubs();
    const navigate = useNavigate();

    const handleShowAddForm = () => {
        setShowAddForm(true);
    }
    const handleCloseAddForm = () => {
        setShowAddForm(false);
    }

    return (
        <>
            <NavBar />
                <Box sx={{m: 2, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography variant={"h4"} color={"secondary"} sx={{fontWeight: 600}}>My Clubs</Typography>
                    <Fab color="secondary" size={"small"} aria-label="add">
                        <AddIcon onClick={handleShowAddForm} />
                    </Fab>
                </Box>
                <Dialog open={showAddForm} onClose={handleCloseAddForm}>
                    <AddNewBookClub />
                    <DialogActions>
                        <Button onClick={handleCloseAddForm}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Box sx={{m: 2}}>
                    {bookClubs.length === 0 &&
                        <Typography variant={"h5"} sx={{display: "flex", justifyContent: "center", mt: 10}}>...no Book-Clubs added yet</Typography>
                    }
                    {bookClubs.map(bookClub => (
                    <Paper elevation={6} key={bookClub.id} sx={{my: 2, display: "flex"}} onClick={() => navigate(`/bookclubs/${bookClub.id}`)}>
                        <Avatar src={bookClub.image} sx={{width: 100, height: 100, m: 1}} />
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography variant={"h5"} color={"secondary"} sx={{mt: 1, mx: 1.5, fontWeight: 600}}>{bookClub.name}</Typography>
                            <Typography sx={{mx: 1.5, fontWeight: 600}}>Owner: {bookClub.owner}</Typography>
                            <Typography sx={{mx: 1.5}}>{bookClub.genre}</Typography>
                        </Box>
                        <ArrowRightOutlinedIcon sx={{ml: "auto", my: "auto", mr: 1}} />
                    </Paper>
                    ))}
                </Box>
        </>
    )
}