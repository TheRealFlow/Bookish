import {Button, Paper, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {User} from "../types/User";
import {useNavigate} from "react-router-dom";

export default function UserCard({id, username, imageId}: User) {
    const navigate = useNavigate();

    return (
        <Paper elevation={3} sx={{my: 1, p: 1, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Avatar
                alt={username}
                src={imageId}
                sx={{width: 56, height: 56}}
            />
            <Typography variant={"h6"}>{username}</Typography>
            <Button variant={"outlined"} onClick={() => navigate(`/user/${id}`)}>visit profile</Button>
        </Paper>
    )
}