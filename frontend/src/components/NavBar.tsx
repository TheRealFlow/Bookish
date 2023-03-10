import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import React, {useState} from "react";
import {Link} from "@mui/material";
import Logout from "./Logout";
import useAuth from "../hooks/useAuth";
import Bookish_Logo from "../assets/Bookish_Logo.png";

export default function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const {user} = useAuth();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color={"inherit"}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: 'block',
                                }}
                            >
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link variant={"button"} href='/mybooks'>My Books</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link variant={"button"} href='/bookclubs'>My Bookclubs</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link variant={"button"} href='/friends'>My Friends</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link variant={"button"} href='/search'>Search for Books</Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Link
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                flexGrow: 1,
                                fontWeight: 700,
                                fontFamily: 'Roboto',
                                letterSpacing: '.1rem',
                            }}
                        >
                            <img src={Bookish_Logo} alt="Bookish Logo" style={{height: 40, width: 200}}/>
                        </Link>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar src={"/api/images/"+user?.imageId} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link variant={"button"} href='/profile'>My Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link variant={"button"} href='/admin'>Admin-Space</Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Logout/>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    )
}