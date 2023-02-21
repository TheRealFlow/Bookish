import NavBar from "../Components/NavBar";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog, DialogActions, DialogTitle,
    Fab,
    Paper,
    Typography
} from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
import useUser from "../hooks/useUser";
import {DeleteOutline} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useNavigate} from "react-router-dom";
import useAdminClubs from "../hooks/useAdminClubs";
import useAdminBooks from "../hooks/useAdminBooks";

export default function AdminPage() {
    const {users, deleteUser} = useUser();
    const {adminBooks, deleteAdminBook} = useAdminBooks()
    const {adminClubs, deleteAdminClub} = useAdminClubs();
    const navigate = useNavigate();
/*    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };*/

  return (
    <>
      <NavBar/>

        <Typography variant={"h4"} color={"secondary"} sx={{my: 2, display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 600}}>ADMIN-SPACE</Typography>

        <hr/>

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant={"h5"} color={"secondary"} sx={{m: 2, fontWeight: 600}}>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    {users.map(user => (
                        <Paper elevation={6} key={user.id} sx={{my: 1.5, p: 1, display: "flex", justifyContent: "space-around"}}>
                            <Avatar src={"/api/images/"+user?.imageId} sx={{width: 50, height: 50}} />
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <Typography color={"secondary"} sx={{fontWeight: 600}}>{user.username}</Typography>
                            </Box>
                            <Button sx={{}} variant={"outlined"} onClick={() => navigate(`/user/${user.id}`)}>Visit</Button>

                            <Button variant={"contained"} color={"error"} sx={{}} onClick={() => deleteUser(user.id)}>
                                <DeleteOutline sx={{mr: 1}} />
                            </Button>
                           {/* <Box sx={{m: 4, display: "flex", justifyContent: "space-around"}}>
                                <Fab color="error" aria-label="delete">
                                    <DeleteIcon onClick={handleClickOpen}/>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this User?"}</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={() => deleteUser(user.id)} variant={"outlined"} color={"secondary"} autoFocus>Yes</Button>
                                            <Button onClick={handleClose} color={"secondary"}>No</Button>
                                        </DialogActions>
                                    </Dialog>
                                </Fab>
                            </Box>*/}

                        </Paper>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant={"h5"} color={"secondary"} sx={{m: 2, fontWeight: 600}}>Books</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    {adminBooks.map(book => (
                        <Paper elevation={6} key={book.id} sx={{my: 2, p: 1, display: "flex", justifyContent: "space-around"}}>
                            <Avatar src={book.imageUrl} sx={{mx: 1, width: 50, height: 50}} />
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <Typography color={"secondary"} sx={{fontWeight: 600}}>{book.title}</Typography>
                            </Box>
                            <Button sx={{my: 2}} variant={"outlined"} onClick={() => navigate(`/detail/${book.id}`)}>Visit</Button>
                            <Button variant={"contained"} color={"error"} sx={{m: 1}} onClick={() => deleteAdminBook(book.id)}>
                                <DeleteOutline sx={{mr: 1}} />
                            </Button>
                        </Paper>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant={"h5"} color={"secondary"} sx={{m: 2, fontWeight: 600}}>Book Clubs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    {adminClubs.map(bookClub => (
                        <Paper elevation={6} key={bookClub.id} sx={{my: 2, display: "flex", justifyContent: "space-around"}}>
                            <Avatar src={bookClub.image} sx={{my: 1, width: 50, height: 50}} />
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <Typography variant={"h6"} color={"secondary"} sx={{fontWeight: 600}}>{bookClub.name}</Typography>
                                <Typography sx={{mx: 1.5, fontWeight: 600}}>Owner: {bookClub.owner}</Typography>
                            </Box>
                            <Button sx={{my: 2}} variant={"outlined"} onClick={() => navigate(`/bookclubs/${bookClub.id}`)}>Visit</Button>
                            <Button variant={"contained"} color={"error"} sx={{m: 1}} onClick={() => deleteAdminClub(bookClub.id)}>
                                <DeleteOutline sx={{mr: 1}} />
                            </Button>
                        </Paper>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>



    </>
  );
}