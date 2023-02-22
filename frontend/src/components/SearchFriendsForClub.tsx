import {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import useFriends from "../hooks/useFriends";
import {useNavigate} from "react-router-dom";

export default function SearchFriendsForClub() {
    const {friends} = useFriends();
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
                        label="Search for Friends"
                        variant="outlined"
                        placeholder="Search..."
                        size="medium"
                        sx={{width: 350}}
                    />
                </Box>

            </Paper>

            <div>
                {friends.filter((friend => friend.username.toLowerCase().includes(search))).map(friend => (
                    <Box key={friend.id}>
                        <Typography variant={"h6"}>{friend.username}</Typography>
                        <Button onClick={() => navigate(`/friends/${friend.id}`)}>Show Friend</Button>
                    </Box>
                ))}
            </div>

        </>
)
}