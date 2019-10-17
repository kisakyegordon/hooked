import React from 'react';
import './App.css';
import Home from "../src/components/Home";
import Header from "../src/components/Header";
import Login from "../src/components/Login";
// import Reducer from "../src/components/Reducer";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
}

const reducer = (state, action) => {
  switch(action.type) {
      case "LOGIN":
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", JSON.stringify(action.payload.token));
          return {
              ...state,
              isAuthenticateed: true,
              user: action.payload.user,
              token: action.payload.token
          }

      case "LOGOUT":
          localStorage.clear();
          return {
              ...state,
              isAuthenticateed: false,
              user: null
          }
      default:
          return state
  }
};

const App = () => {

const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
    <Header / >
    <div className="App">
    { state.isAuthenticated ? <Home /> : <Login /> }
    </div>
    </AuthContext.Provider>
  );


}

export default App;
