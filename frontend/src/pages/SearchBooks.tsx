import React, {useState} from "react";
import axios from "axios";
import {BookAPI} from "../Types/BookAPI";
import {Box, IconButton, ImageList, ImageListItem, ImageListItemBar, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import InfoIcon from "@mui/icons-material/Info";

export default function SearchBooks() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search + "&key=AIzaSyC2jzd6VDxU8aIhWzQIWNkZQi4boNbx7Pg&maxResults=20")
            .then(data => {
                console.log(data.data.items);
                setResult(data.data.items);
            })
    }

    return (
        <>
            <Box sx={{my: 8, display: "flex", justifyContent: "center"}}>
                <form onSubmit={handleSubmit}>
                        <TextField
                            id="search-bar"
                            className="text"
                            value={search}
                            onChange={handleChange}
                            label="Search for books"
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                        />
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon style={{ fill: "blue" }} />
                        </IconButton>
                </form>
            </Box>

            <Box>
                {result.map((item: BookAPI) => (
                    <ImageList sx={{mx: 8, width: 500, height: 400 }} key={item.id}>
                        <ImageListItem key={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail}>
                            <img
                                src={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail}
                                srcSet={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail}
                                alt={item.volumeInfo.title}
                            />
                            <ImageListItemBar
                                title={item.volumeInfo.title}
                                subtitle={<span>by: {item.volumeInfo.authors}</span>}
                                actionIcon={<IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                                    aria-label={`info about ${item.volumeInfo.title}`}>
                                    <InfoIcon />
                                </IconButton>}
                            />
                        </ImageListItem>
                    </ImageList>
                    ))}
            </Box>
        </>
    )

}