import NavBar from "../Components/NavBar";
import useUser from "../hooks/useUser";
import {Box, Paper, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import UserCard from "../Components/UserCard";

export default function SearchUser() {
    const {users} = useUser();
    const [search, setSearch] = useState("");

    return (
        <>
            <NavBar />

            <Paper elevation={5} sx={{p: .25}}>

                <Box sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography variant={"h5"}>Search for Bookish-Members</Typography>
                </Box>

                <Box sx={{my: 5, display: "flex", justifyContent: "center"}}>
                    <TextField
                        id="search-bar"
                        className="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        label="Search for Members"
                        variant="outlined"
                        placeholder="Search..."
                        size="medium"
                        sx={{width: 350}}
                    />
                </Box>

            </Paper>

            <div>
                {users.filter((user => user.username.toLowerCase().includes(search))).map(user => (
                    <UserCard key={user.id} id={user.id} username={user.username} imageId={"/images/"+user.imageId}/>
                ))}
            </div>

        </>
    )
}