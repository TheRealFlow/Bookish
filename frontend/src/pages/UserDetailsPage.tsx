import {Box, Button, Paper, Typography} from "@mui/material";
import useUserDetails from "../hooks/useUserDetails";
import {useParams} from "react-router-dom";
import NavBar from "../Components/NavBar";
import React from "react";
import useFriends from "../hooks/useFriends";

export default function UserDetail() {
    const {id} = useParams<{id: string}>();
    const {userDetails} = useUserDetails(id);
    const {addNewFriend} = useFriends();

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <NavBar/>
                <Typography variant={"h4"} sx={{my: 1.5}}>{userDetails?.username}</Typography>

                <img src={"/images/"+userDetails?.imageId} alt={"preview"} style={{width: "200px", height: "200px", borderRadius: "50%"}}/>

                <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                    <Typography variant={"h6"} sx={{my: 1.5}}>User Informations</Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Friends: {userDetails?.friends?.length}</Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Books: {userDetails?.books?.length}</Typography>
                    <Button variant={"contained"} sx={{my: 1.5}} onClick={() => addNewFriend(userDetails as any)}>Add as Friend</Button>
                </Paper>

                <Button variant={"outlined"} sx={{my: 1.5}} onClick={() => window.history.back()}>Back</Button>

            </Box>
        </>
    )
}
