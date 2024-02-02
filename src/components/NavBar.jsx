import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography, Link, Button } from '@mui/material'
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function NavBar(){
    const { user, logout } = useContext(AuthContext);
    let navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/')
    }

    console.log(user)

    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" style={{color:"red"}}>
                        <Link style={{color:"white", textDecoration:"none", cursor:"pointer"}} href="/">ReactLogin</Link>
                    </Typography>
                    <Box alignItems="right" sx={{flexGrow: 1, textAlign:"right"}}>
                        {
                            user ? 
                            <>
                                <Button style={{textDecoration:"none", color:"white"}} onClick={onLogout}>Logout</Button>
                            </>
                            :
                            <>
                                <Link href="/login" style={{textDecoration:"none", color:"white", marginRight:"10px"}}>Login</Link>
                                <Link href="/register" style={{textDecoration:"none", color:"white"}}>Register</Link>
                            </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;