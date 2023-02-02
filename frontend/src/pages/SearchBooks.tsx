import React, {useState} from "react";
import axios from "axios";
import {BookAPI} from "../Types/BookAPI";
import {Box, Button, Container, IconButton, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";

export default function SearchBooks() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.API_KEY}&maxResults=20`)
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

                        <Container sx={{ m: 5, p: 5, border: 1, borderRadius: "5px" }}>

                            <Box>
                                {item.volumeInfo.imageLinks === undefined ?
                                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"} alt={"Not Available"}/> :
                                    <Box component={"img"}
                                         sx={{height: 300, width: 220}}
                                         src={item.volumeInfo.imageLinks.thumbnail}
                                         alt={item.volumeInfo.title}>
                                    </Box>}
                            </Box>
                            <Box sx={{borderBottom: 1}} key={item.id}>
                                <>
                                    {item.volumeInfo.title === undefined ?
                                        <Typography>Unknown Title</Typography> :
                                    <Typography variant={"h5"}>{item.volumeInfo.title}</Typography>}

                                    {item.volumeInfo.authors === undefined ?
                                        <Typography>Unknown Author</Typography> :
                                    <Typography variant={"h6"}>- {item.volumeInfo.authors} -</Typography>}
                                </>
                            </Box>
                            <Box sx={{borderBottom: 1, my: 1.5}}>
                                {item.volumeInfo.description === undefined ?
                                    <Typography>No description available</Typography> :
                                <Typography>{item.volumeInfo.description}</Typography>}
                            </Box>
                            <Box sx={{borderBottom: 1, my: 2}}>
                                <>
                                    {item.volumeInfo.publishedDate === undefined ?
                                        <Typography>Unknown Publication Date</Typography> :
                                    <Typography>Published: {item.volumeInfo.publishedDate}</Typography>}

                                    {item.volumeInfo.pageCount === undefined ?
                                        <Typography>Unknown Pages</Typography> :
                                    <Typography>Pages: {item.volumeInfo.pageCount}</Typography>}

                                    {item.volumeInfo.categories === undefined ?
                                        <Typography>Unknown Category</Typography> :
                                    <Typography>Category: {item.volumeInfo.categories}</Typography>}

                                    {item.volumeInfo.industryIdentifiers === undefined ?
                                        <Typography>Unknown ISBN</Typography> :
                                        <Typography>{item.volumeInfo.industryIdentifiers[0].type}: {item.volumeInfo.industryIdentifiers[0].identifier}</Typography>}
                                </>
                            </Box>

                            <Button variant={"contained"}>Add to my List</Button>

                        </Container>
                ))}
            </Box>

            <Button variant={"outlined"} onClick={() => navigate("/")}>Home</Button>
        </>
    )

}