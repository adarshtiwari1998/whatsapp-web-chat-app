import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider} from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";


function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user, 
            });
        })
        .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login-container">
                <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt=""/>
                <div className="login-text">
                    <h1>Sign in to WhatsApp Web Chat</h1>

               </div>
               <Button type="submit" onClick={signIn}>Sign in with google</Button>

            </div>
            
        </div>
    )
}

export default Login;
