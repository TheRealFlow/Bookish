import React from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import Box from "@mui/material/Box";
import NavBar from "../Components/NavBar";

export default function ProfilePage() {
    const [file, setFile] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <NavBar/>
            <Typography variant={"h4"} sx={{my: 1.5}}>My Profile</Typography>

                {imgPreview && (
                    <img
                        style={{width: "200px", height: "200px", borderRadius: "50%"}}
                        src={imgPreview}
                        alt={"preview"}
                    />
                )}

            <form onSubmit={async (e) => {
                e.preventDefault();
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    axios.post("/images", formData)
                        .then(() => toast.success("Image uploaded successfully!"))
                        .catch((error) => toast.error(error.message));
                }
                }}>
                <Button sx={{marginTop: 2, marginLeft: 14}} variant={"outlined"} endIcon={<PhotoCamera/>} onClick={() => {
                    fileInputRef.current?.click();
                }}> SELECT IMAGE</Button>

                <input
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    type={"file"}
                    onChange={(e) => {
                        if (!e.target.files || e.target.files.length < 1) {
                            toast.error("No image selected", {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                            })
                            setFile(null);
                            setImgPreview(null);
                            return;
                        }
                        setFile(e.target.files[0]);
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                            setImgPreview(reader.result as string);
                        }, false);
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    }}
                    accept={"image/jpeg, image/png"}
                />

                <Paper elevation={3} sx={{m: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 350}}>
                    <TextField variant={"standard"} label={"Change Username"} sx={{m: 1}}/>
                    <TextField variant={"standard"} label={"New Password"} sx={{m: 1}}/>
                    <TextField variant={"standard"} label={"Confirm Password"} sx={{m: 1}}/>

                    <Button sx={{m: 2.5}} variant={"contained"} type={"submit"}>Save Changes</Button>
                </Paper>
            </form>

            </Box>
    );
}