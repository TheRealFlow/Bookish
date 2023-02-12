import React from "react";
import Typography from '@mui/material/Typography';
import NavBar from "../Components/NavBar";
import useAuth from "../hooks/useAuth";
import {Box, Button, Container} from "@mui/material";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import {useNavigate} from "react-router-dom";

export default function HomePage () {
    const {user} = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <Container sx={{my: 8, display: "flex", flexDirection: "column", alignItems: "left"}}>

                <Typography color={"secondary"} sx={{fontWeight: 700}} variant={"h3"}>Welcome,</Typography>
                <Typography sx={{fontWeight: 700}} variant={"h4"}>{user?.username}...</Typography>
                <Typography sx={{my: 2, fontWeight: 700, textAlign: "right"}} variant={"h6"}>...to your personal Book-Club</Typography>

                <Box sx={{my: 4, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Button sx={{px: 5, py: 2, my: 2}} size="large" variant={"outlined"} color={"secondary"} onClick={() => navigate("/mybooks")}><ArrowLeftOutlinedIcon/>to your Book-List</Button>
                    <Button sx={{px: 4, py: 2, my: 2}} size="large" variant={"outlined"} color={"secondary"} onClick={() => navigate("/bookclubs")}>to your Book-Clubs<ArrowRightOutlinedIcon/></Button>
                </Box>

            </Container>
        </>
    );
}