import {useParams} from "react-router-dom";
import useFriendDetails from "../hooks/useFriendDetails";
import {Box, Button, Paper, Typography} from "@mui/material";
import NavBar from "../Components/NavBar";
import useClubMembers from "../hooks/useClubMembers";

export default function FriendDetailPage() {
    const {id} = useParams<{id: string}>();
    const {friendDetails} = useFriendDetails(id);
    const {addNewClubMember} = useClubMembers();

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <NavBar/>
                <Typography variant={"h4"} sx={{my: 1.5}}>{friendDetails?.username}</Typography>

                <img src={"/api/images/"+friendDetails?.imageId} alt={"preview"} style={{width: "200px", height: "200px", borderRadius: "50%"}}/>

                <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                    <Typography variant={"h6"} sx={{my: 1.5}}>User Informations</Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Friends: </Typography>
                    <Typography variant={"h6"} sx={{my: 1}}>Books: </Typography>
                    <Button variant={"contained"} sx={{my: 1.5}} onClick={() => addNewClubMember(friendDetails as any)}>Add to Book-Club</Button>
                </Paper>

                <Button variant={"outlined"} sx={{my: 1.5}} onClick={() => window.history.back()}>Back</Button>

            </Box>
        </>
    )
}