import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
            <Box sx={{mx: 5, my: 7, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h1" sx={{fontWeight: 700}}>
                    404
                </Typography>
                <Typography variant="h4" sx={{fontWeight: 700}} color={"secondary"}>
                    Page not found
                </Typography>
                <Typography variant="h6" sx={{m: 3}}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </Typography>
                <Button sx={{m: 3, px: 5, py: 1}} variant={"outlined"} color={"secondary"} onClick={() => navigate("/")}>Go to Home</Button>
            </Box>
    )
}