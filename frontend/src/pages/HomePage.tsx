import Logout from "../Components/Logout";
import {Link} from "react-router-dom";
import {Box, Button, Container, Typography} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {BookAPI} from "../Types/BookAPI";

export default function HomePage () {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();/**/
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search + "&key=AIzaSyC2jzd6VDxU8aIhWzQIWNkZQi4boNbx7Pg&maxResults=20")
            .then(data => {
                console.log(data.data.items);
                setResult(data.data.items);
            })
    }

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
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search for books" onChange={handleChange}/>
                    <button value={search}>Search</button>
                </form>

                <ul>
                    {result.map((b: BookAPI) => (
                    <li key={b.id}>
                        <h3>{b.volumeInfo.title}</h3>
                        <p>{b.volumeInfo.authors}</p>
                        <p>{b.volumeInfo.description}</p>
                        <img src={b.volumeInfo.imageLinks && b.volumeInfo.imageLinks.smallThumbnail} alt={b.volumeInfo.title}/>
                    </li>))}
                </ul>
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