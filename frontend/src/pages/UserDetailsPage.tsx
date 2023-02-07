import {Box, Paper, Typography} from "@mui/material";
import useUserDetails from "../hooks/useUserDetails";
import {useParams} from "react-router-dom";
import NavBar from "../Components/NavBar";

export default function UserDetail() {
    const {id} = useParams<{id: string}>();
    const {userDetails} = useUserDetails(id);

    return (
        <>
            <NavBar />
            <Paper elevation={5} sx={{p: .25}}>
                <Box sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography variant={"h5"}>{userDetails?.username} DetailPage</Typography>
                    <img src={"/images/"+userDetails?.imageId} alt={userDetails?.username} width={200} height={200}/>
                </Box>
            </Paper>
        </>
    )
}
