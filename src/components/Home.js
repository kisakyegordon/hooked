import React from "react";
import Card from "./Card";
import {AuthContext} from "../App";


const initialState = {
    songs: [],
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch(action.type) {
        case "FETCH_SONGS_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case "FETCH_SONGS_SUCCESS":
            return {
                ...state,
                songs: action.payload,
                isFetching: false
            }
        case "FETCH_SONGS_ERROR":
                return {
                    ...state,
                    isFetching: false,
                    error: true
                }
        default:
            return state;
    }
}

const Home = () => {

    const {state: authState} = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect( () => {
        dispatch({type: "FETCH_SONGS_REQUEST"});

        fetch("https://kookedbe.herokuapp.com/api/songs", {headers: { Authorization: `Bearer ${authState.token}`}})
        .then(res => {
            if(res.ok) {
                return res;
            } else throw res;
        })
        .then( res => {
            dispatch({type: "FETCH_SONGS_SUCCESS", payload: JSON.stringify(res)})
        })
        .catch( error => {
            dispatch({
                type: "FETCH_SONGS_ERROR"
            })
        })
    }, [authState.token])

    return (
        <React.Fragment>
        <div className="home">
        {
            state.isFetching ? (<span className="loading">LOADING...</span>) : state.hasError ? (<span className="error"> Error Occured while fetching data</span>) : ( <> { state.songs.length > 0 && state.songs.map(song => <Card key={song.id.toString()} song={song} />)} </>)
        }
        </div>
        </React.Fragment>
    )
}

export default Home;