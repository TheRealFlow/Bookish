import Box from "@mui/material/Box";
import {Button, Container, Typography} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import axios from "axios";
import {toast} from "react-toastify";
import React from "react";
import {green} from "@mui/material/colors";

export default function ChangeImage() {
    const [file, setFile] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <Container sx={{my: 1.5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant={"h5"} sx={{my: 2.5}}>Change Image</Typography>

            {imgPreview === null ?
                <Box sx={{mx: 3, width: "200px", height: "200px", borderRadius: "50%", border: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Button variant={"outlined"} endIcon={<PhotoCamera/>} onClick={() => {
                        fileInputRef.current?.click();
                    }}> SELECT IMAGE</Button>
                </Box> :
                <img
                    style={{width: "200px", height: "200px", borderRadius: "50%"}}
                    src={imgPreview}
                    alt={"preview"}
                />
            }

            <form onSubmit={async (e) => {
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    axios.post("/images", formData)
                        .then(() => toast.success("Image uploaded successfully!"))
                        .catch((error) => toast.error(error.message));
                }
            }}>

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

                    reader.readAsDataURL(e.target.files[0]);

                }}
                accept={"image/jpeg, image/png"}
            />

                <Button sx={{m: 3, backgroundColor: green[500]}} variant={"contained"} type={"submit"}>Save</Button>
            </form>

        </Container>
    )
}