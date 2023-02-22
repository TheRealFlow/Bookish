import React, {useState} from "react";
import axios from "axios";
import {BookAPI} from "../types/BookAPI";
import {
    Box, Container, IconButton,
    ImageList, ImageListItem, ImageListItemBar, InputBase,
    Paper, Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBooks() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([])

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.REACT_APP_API_KEY}&maxResults=40`)
            .then(data => {
                setResult(data.data.items);
            })
    }

    return (
        <>
            <NavBar/>
                <Box sx={{
                    m: 3,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography color={"secondary"} variant={"h4"} sx={{fontWeight: 700}}>Search for Books</Typography>
                    <Typography sx={{fontWeight: 600}}>...using Google Books and find new Books for your Club</Typography>
                </Box>

                <Paper component="form"
                       onSubmit={handleSubmit}
                       sx={{ m: 2, p: '3px 6px', display: 'flex', alignItems: 'center'}}>
                        <InputBase
                            id="search-bar"
                            value={search}
                            onChange={handleChange}
                            placeholder="Search for books"
                            sx={{ ml: 1, flex: 1 }}
                        />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

            <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <ImageList sx={{width: 350}}>
                    {result.map((item: BookAPI) => (
                        <ImageListItem key={item.id} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <a href={item.volumeInfo.infoLink} target={"_blank"} rel={"noreferrer"}>
                                {item.volumeInfo.imageLinks === undefined ?
                                    <img src={"https://via.placeholder.com/150"} alt={item.volumeInfo.title}/>
                                    :
                                    <img
                                        height={250}
                                        width={175}
                                        src={item.volumeInfo.imageLinks.thumbnail}
                                        srcSet={item.volumeInfo.imageLinks.thumbnail}
                                        alt={item.volumeInfo.title}
                                    />}
                                <ImageListItemBar sx={{borderBottom: 1, backgroundColor: 'rgba(0, 0, 0, 0.65)'}}
                                                  title={item.volumeInfo.title ? item.volumeInfo.title : "No title"}
                                                  subtitle={item.volumeInfo.authors ? item.volumeInfo.authors : "No author"}
                                />
                            </a>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
        </>
    )
}