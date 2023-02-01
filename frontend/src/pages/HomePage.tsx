import Logout from "../Components/Logout";
import {Link} from "react-router-dom";
import {Box, Button, Container, Typography} from "@mui/material";
import React from "react";

export default function HomePage () {

    // @ts-ignore
    return (
        <Container sx={{my: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>

            <Typography sx={{my: 2}} variant={"h5"}>Willkommen bei Bookish</Typography>
            <Typography>Bookish ist eine Plattform, auf der Sie Bücher verwalten können.</Typography>

            <Box sx={{my: 1, display: "flex", flexDirection: "column"}}>
                <Button sx={{px: 6, py: 1.5, my: 8}} variant={"outlined"}>
                    <Link to={"/mypage"}>Hier gehts zu deinen Büchern</Link>
                </Button>
            </Box>

            <Box>
                <Button sx={{px: 6, py: 1.5}} variant={"outlined"}>
                    <Link to={"/search"}>Nach neuen Büchern suchen</Link>
                </Button>
            </Box>

            <Box sx={{my: 20}}>
                <Logout/>
                <Button sx={{mx: 6}} variant={"contained"}>
                    <Link to={"/"}>Home</Link>
                </Button>
            </Box>

        </Container>
    );
}