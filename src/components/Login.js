import React from "react";
import {AuthContext} from "../App";

const Login = () => {

    const {dispatch} = React.useContext(AuthContext);

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = React.useState(initialState);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });
        console.log("Before Fetch")

        fetch("https://hookedbe.herokuapp.com/api/login",
        {
            method: "post",
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"    },
            body: JSON.stringify({
                username: data.email,
                password: data.password
            })
        }).then(res => {
            if(res.ok) {
                console.log("Login was successful")
                return res.json();
            } else {
            throw res;
        }
        }).then(res => {
            dispatch({type: "LOGIN", payload: res});
        }).catch(error => {
            console.log("Error occured: ", error)
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: error.message || error.status.Text
            })
        })
    };

    return (
        <div className="login-container">
            <div className="card">
            <div className="container">
            <form onSubmit={handleFormSubmit}>
            <h1> Log In </h1>
            <label htmlFor="email">
                Email
                <input name="email" type="text" value={data.email} id="email" onChange={handleInputChange} />
            </label>
            <label htmlFor="password">
                Password
                <input name="password" type="password" value={data.password} id="password" onChange={handleInputChange}/>
            </label>
            {data.errorMessage && <span className="error"> {data.errorMessage} </span>}
            <button disabled={data.isSubmitting}>{data.isSubmitting ? "Loading..." : "LogIn"}</button>
        </form>
            </div>
            </div>
        </div>
    )
}

export default Login;




// import React from "react";
// import logo from "../logo.svg";
// import { AuthContext } from "../App";

// export const Login = () => {
//   const { dispatch } = React.useContext(AuthContext);
//   const initialState = {
//     email: "",
//     password: "",
//     isSubmitting: false,
//     errorMessage: null
//   };

//   const [data, setData] = React.useState(initialState);

//   const handleInputChange = event => {
//     setData({
//       ...data,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleFormSubmit = event => {
//     event.preventDefault();
//     setData({
//       ...data,
//       isSubmitting: true,
//       errorMessage: null
//     });
//     fetch("https://hookedbe.herokuapp.com/api/login", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username: data.email,
//         password: data.password
//       })
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw res;
//       })
//       .then(resJson => {
//         dispatch({
//             type: "LOGIN",
//             payload: resJson
//         })
//       })
//       .catch(error => {
//         setData({
//           ...data,
//           isSubmitting: false,
//           errorMessage: error.message || error.statusText
//         });
//       });
//   };

//   return (
//     <div className="login-container">
//       <div className="card">
//         <div className="container">
//           <form onSubmit={handleFormSubmit}>
//             <h1>Login</h1>

//             <label htmlFor="email">
//               Email Address
//               <input
//                 type="text"
//                 value={data.email}
//                 onChange={handleInputChange}
//                 name="email"
//                 id="email"
//               />
//             </label>

//             <label htmlFor="password">
//               Password
//               <input
//                 type="password"
//                 value={data.password}
//                 onChange={handleInputChange}
//                 name="password"
//                 id="password"
//               />
//             </label>

//             {data.errorMessage && (
//               <span className="form-error">{data.errorMessage}</span>
//             )}

//             <button disabled={data.isSubmitting}>
//               {data.isSubmitting ? (
//                 <img className="spinner" src={logo} alt="loading icon" />
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;