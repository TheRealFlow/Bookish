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

export default function BookClubDetailPage() {
    const {id} = useParams<{id: string}>();
    const {deleteBookClub, updateBookClub} = useBookClubs();
    const {bookClubDetails} = useBookClubDetails(id);
    const [showEditForm, setShowEditForm] = useState(false);
    const navigate = useNavigate();

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

                <Button onClick={handleShowEditForm} sx={{my: 5, mx: 2, px: 2, py: 1, bgcolor: green[500]}} variant={"contained"}>Edit Club</Button>
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

                <Button onClick={() => id ? handleDelete(id) : null} variant={"contained"} sx={{mx: 1.5, bgcolor: red[500]}}>Delete Club</Button>
                <Button variant={"outlined"} sx={{my: 1.5}} onClick={() => navigate("/bookclubs")}>Back</Button>

            </Box>
        </>
    );
}