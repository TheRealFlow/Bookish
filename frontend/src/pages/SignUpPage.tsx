import React, {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {toast} from "react-toastify";
import Bookish_Logo from "../assets/Bookish_Logo.png";

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
                await axios.post("/api/user", credentials);
                navigate("/login" + location.search);
                toast.success("Successfully signed up",
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    })
            } catch (e) {
                toast.error("Username already exists",
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                setErrors((errors) => [...errors]);
            }
        },
        [credentials, navigate, location]
    );

    return (
        <Container sx={{my: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>

            <Box component={"img"} src={Bookish_Logo} alt={"Bookish Logo"} sx={{mb: 4, height: 70, width: 300}}/>

            <Typography sx={{my: 3}} variant={"h3"}>Sign Up</Typography>

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
                    <Button sx={{px: 5, py: 1.5, my: 8}} color={"secondary"} onClick={() => navigate("/login")}>Back to Login</Button>
                </Box>
            </form>
        </Container>
    );
}