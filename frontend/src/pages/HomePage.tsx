import {Link} from "react-router-dom";
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import NavBar from "../Components/NavBar";

export default function HomePage () {

    return (
        <>
            <NavBar/>
            <Container sx={{my: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>

                <Typography sx={{my: 2}} variant={"h5"}>Willkommen bei Bookish</Typography>
                <Typography>Bookish ist eine Plattform, auf der Sie Bücher verwalten können.</Typography>

                <Box sx={{my: 1, display: "flex", flexDirection: "column"}}>
                    <Button sx={{px: 6, py: 1.5, my: 8}} variant={"outlined"}>
                        <Link to={"/mybooks"}>Hier gehts zu deinen Büchern</Link>
                    </Button>
                </Box>

                <Box>
                    <Button sx={{px: 6, py: 1.5}} variant={"outlined"}>
                        <Link to={"/search"}>Nach neuen Büchern suchen</Link>
                    </Button>
                </Box>
            </Container>
        </>
    );
}