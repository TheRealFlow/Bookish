import React from "react";
import Typography from '@mui/material/Typography';
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import {Box, Button, Container} from "@mui/material";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import {useNavigate} from "react-router-dom";
import Bookish_Logo from "../assets/Bookish_Logo.png";

export default function HomePage () {
    const {user} = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <NavBar />

            <Container sx={{my: 5, display: "flex", flexDirection: "column", alignItems: "left"}}>

                <Typography color={"secondary"} sx={{fontWeight: 700}} variant={"h4"}>Welcome back,</Typography>
                <Typography sx={{fontWeight: 700}} variant={"h4"}>{user?.username}...</Typography>
                <Typography sx={{my: 2, fontWeight: 700}} variant={"h6"}>...to your personal Book Library. Be</Typography>

                <Box component={"img"} src={Bookish_Logo} alt={"Bookish Logo"} sx={{mx: 3, height: 70, width: 300}}/>

                <Box sx={{my: 9, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Button sx={{px: 5, py: 2, my: 3}} size="large" variant={"contained"} color={"secondary"} onClick={() => navigate("/mybooks")}><ArrowLeftOutlinedIcon/>to your Book-List</Button>
                    <Button sx={{px: 4, py: 2, my: 2}} size="large" variant={"contained"} color={"secondary"} onClick={() => navigate("/bookclubs")}>to your Book-Clubs<ArrowRightOutlinedIcon/></Button>
                </Box>

            </Container>
        </>
    );
}