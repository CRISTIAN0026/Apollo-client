import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Home(){
    const { user } = useContext(AuthContext);
    return(
        <>
        <h1>This is the homepage</h1>
        {
            user ?
                <>
                <h2>{user.email} is logged in</h2>
                </>
            :
                <>
                <p>There is no user data</p>
                </>
        }
        </>
    )
}

export default Home;