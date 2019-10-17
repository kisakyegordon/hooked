import React from "react";

const Reducer = (state, action) => {
        switch(action.type) {
            case "LOGIN":
                localStorage.setItem("user", action.payload.user);
                localStorage.setItem("auth", "Bearer" + action.payload.token);
                return ({
                    ...state,
                    isAuthenticateed: true,
                    user: action.payload.user,
                    token: action.payload.token
                    }
                )
            case "LOGOUT":
                localStorage.clear();
                return ({
                    ...state,
                    isAuthenticateed: false,
                    user: null,
                    token: null
                })
                

            default:
                return ({...state})
        }
}

export default Reducer;