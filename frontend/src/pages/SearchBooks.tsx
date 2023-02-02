import React, {useState} from "react";
import axios from "axios";
import {BookAPI} from "../Types/BookAPI";
import {
    Box,
    ImageList,
    ImageListItem, ImageListItemBar, Paper,
    TextField, Typography,
} from "@mui/material";

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
                console.log(data.data.items);
                setResult(data.data.items);
            })
    }

    return (
        <>
            <Paper elevation={5} sx={{p: .25}}>

                <Box sx={{marginTop: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant={"h4"}>Search for books</Typography>
                    <Typography>Search for books using the Google Books API</Typography>
                </Box>

                <Box sx={{my: 5, display: "flex", justifyContent: "center"}}>
                    <form onSubmit={handleSubmit}>
                            <TextField
                                id="search-bar"
                                className="text"
                                value={search}
                                onChange={handleChange}
                                label="Search for books"
                                variant="outlined"
                                placeholder="Search..."
                                size="medium"
                                sx={{width: 350}}
                            />
                    </form>
                </Box>

            </Paper>

                <ImageList sx={{ width: 350 }}>

                    {result.map((item: BookAPI) => (

                      <ImageListItem key={item.id} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                      <a href={item.volumeInfo.infoLink} target={"_blank"} rel={"noreferrer"}>

                        {item.volumeInfo.imageLinks === undefined ?
                              <img src={"https://via.placeholder.com/150"} alt={item.volumeInfo.title} />
                              :
                              <img
                                  height={250}
                                    width={175}
                              src={item.volumeInfo.imageLinks.smallThumbnail}
                              srcSet={item.volumeInfo.imageLinks.smallThumbnail}
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

        </>
    )

}