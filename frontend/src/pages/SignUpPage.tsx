import React, {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

export default function SignUpPage () {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const navigate = useNavigate();

    const location = useLocation();

    const signUp = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/user", credentials);
                navigate("/login" + location.search);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
            }
        },
        [credentials, navigate, location]
    );

    return (
        <Container sx={{my: 10, display: "flex", flexDirection: "column", alignItems: "center"}}>

            <Typography sx={{my: 2}} variant={"h3"}>Sign Up</Typography>

            {errors.length > 0 && (
                <div>
                    {errors.map((error) => <p key={error}>{error}</p>)}
                </div>
            )}

            <form onSubmit={signUp}>
                <Box sx={{my: 2}}>
                    <TextField
                        variant={"outlined"}
                        label="Username"
                        placeholder={"username"}
                        value={credentials.username}
                        name={"username"}
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{my: 2}}>
                    <TextField
                        variant={"outlined"}
                        label="Password"
                        placeholder={"password"}
                        type={"password"}
                        name={"password"}
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{my: 3, display: "flex", flexDirection: "column"}}>
                    <Button sx={{px: 5, py: 1.5}} variant={"contained"} type={"submit"}>Sign Up</Button>
                    <Button sx={{px: 5, py: 1.5, my: 8}} variant={"outlined"}>
                        <Link to={"/"}>Back to Login</Link>
                    </Button>
                </Box>
            </form>
        </Container>
    );
}