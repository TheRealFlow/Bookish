import {Box, Paper, Typography} from "@mui/material";
import useUserDetails from "../hooks/useUserDetails";
import {useParams} from "react-router-dom";
import NavBar from "../Components/NavBar";
import React from "react";

export default function UserDetail() {
    const {id} = useParams<{id: string}>();
    const {userDetails} = useUserDetails(id);

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <NavBar/>
                <Typography variant={"h4"} sx={{my: 1.5}}>{userDetails?.username}</Typography>

                <img src={"/images/"+userDetails?.imageId} alt={"preview"} style={{width: "200px", height: "200px", borderRadius: "50%"}}/>

                <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                    <Typography variant={"h6"} sx={{my: 1.5}}>Platzhalter für User Infos</Typography>
                </Paper>

            </Box>
        </>
    )
}
