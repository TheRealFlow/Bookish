
import useUser from "../hooks/useUser";
import {Box, Paper, TextField} from "@mui/material";
import React, {useState} from "react";
import UserCard from "./UserCard";

export default function SearchUser() {
    const {users} = useUser();
    const [search, setSearch] = useState("");

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
                        label="Search for User"
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