import React, {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import useBooks from "../hooks/useBooks";
import {useNavigate} from "react-router-dom";

export default function SearchBooksForClub() {
    const {books} = useBooks();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

        return (
        <>
            <Paper elevation={5} sx={{m: 2.5}}>

                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                        id="search-bar"
                        fullWidth
                        className="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        label="Search for Books"
                        variant="outlined"
                        placeholder="Search..."
                        size="medium"
                        sx={{width: 350}}
                    />
                </Box>

            </Paper>

            <div>
                {books.filter((book => book.title.toLowerCase().includes(search))).map(book => (
                    <Box key={book.id}>
                        <Typography variant={"h6"}>{book.title}</Typography>
                        <Button onClick={() => navigate(`/detail/${book.id}`)}>Show Book</Button>
                    </Box>
                ))}
            </div>

        </>
)
}
