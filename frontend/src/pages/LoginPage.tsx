import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {toast} from "react-toastify";

export default function LoginPage () {
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

    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );
    const navigate = useNavigate();

    const location = useLocation();

    const login = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/api/user/login", null, {
                    headers: {
                        "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                    }
                });

                navigate(redirect);
            } catch (e) {
                toast.error("Incorrect Username or Password",
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                setErrors((errors) => [...errors,]);
            }
        },
        [credentials, navigate, redirect]
    );

    return (
        <Container sx={{my: 10, display: "flex", flexDirection: "column", alignItems: "center"}}>

                <Typography sx={{my: 2}} variant={"h3"}>Login</Typography>

                {errors.length > 0 && (
                        <div>
                            {errors.map((error) => <p key={error}>{error}</p>)}
                        </div>
                )}

            <form onSubmit={login}>
                <Box sx={{my: 2}}>
                    <TextField
                        variant={"outlined"}
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{my: 2}}>
                    <TextField
                        variant={"outlined"}
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{my: 3, display: "flex", flexDirection: "column"}}>
                    <Button sx={{px: 6, py: 1.5}} variant={"contained"} type={"submit"}>Login</Button>
                    <Button sx={{px: 6, py: 1.5, my: 8}} variant={"outlined"}>
                        <Link to={"/signup" + location.search}>Sign Up now</Link>
                    </Button>
                </Box>
            </form>
        </Container>
    );
}
