import {useParams} from "react-router-dom";
import useFriendDetails from "../hooks/useFriendDetails";
import {Box, Button, Fab, Paper, Typography} from "@mui/material";
import NavBar from "../Components/NavBar";
import useClubMembers from "../hooks/useClubMembers";
import React from "react";
import {ArrowBack} from "@mui/icons-material";

export default function FriendDetailPage() {
    const {id} = useParams<{id: string}>();
    const {friendDetails} = useFriendDetails(id);
    const {addNewClubMember} = useClubMembers();

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <NavBar/>
                <Typography variant={"h4"} color={"secondary"} sx={{m: 1.5, fontWeight: 600}}>{friendDetails?.username}</Typography>

                <img src={"/api/images/"+friendDetails?.imageId} alt={"preview"} style={{width: "200px", height: "200px", borderRadius: "50%"}}/>

                <Paper elevation={1} sx={{my: 3, mx: 1, p: 2, display: "flex", flexDirection: "column" ,textAlign: "center", justifyContent: "space-between", flexWrap: "wrap"}}>
                    <Typography variant={"h6"} sx={{my: 1}}>Friends: </Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Books: </Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Genres: </Typography>
                <Button variant={"outlined"} color={"secondary"} sx={{my: 2}} onClick={() => addNewClubMember(friendDetails as any)}>Add to Book-Club</Button>
                </Paper>

                <Fab color="primary" aria-label="back">
                    <ArrowBack onClick={() => window.history.back()}/>
                </Fab>

            </Box>
        </>
    )
}