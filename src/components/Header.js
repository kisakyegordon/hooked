import React from "react";
import {AuthContext} from "../App";


const Header = () => {
    
    const {state, dispatch} = React.useContext(AuthContext);

    const handleLogout = () => {
        dispatch("LOGOUT")
    }

    return (
        <nav id="navigation">
            <h1 href="#" className="logo">Hooked</h1>
            {state.isAuthenticated ? <button onClick={handleLogout()}>Logout</button> : ""}
        </nav>
    )
}

export default Header;