import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import {Link} from 'react-router-dom'
import {faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
const [credentials, setCredentials] = useState({
username: undefined,
password: undefined,
});

const { loading, error, dispatch } = useContext(AuthContext);

const navigate = useNavigate()

const handleChange = (e) => {
setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
};

const handleClick = async (e) => {
e.preventDefault();
dispatch({ type: "LOGIN_START" });
try {
    const res = await axios.post("https://booking-a.herokuapp.com/api/auth/login", credentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    navigate("/")
} catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
}
};


return (

<div className="body">
<div class="login-box">
    <h2>Sign In <FontAwesomeIcon icon={faPersonCirclePlus}/></h2>
        <div class="user-box">
            <input type="text" name="" required onChange={handleChange}/>
            <label for="">Username</label>
        </div>
        <div class="user-box">
            <input type="password" name="" required onChange={handleChange}/>
            <label for="">Password</label>
        </div>
        <div>
            <a href="#" class="forgot_pass">Don't Have an Account?
            Register
            </a>
        </div>
        <button href="#" class="btn_submit" disabled={loading} onClick={handleClick} >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign In
        </button>
        <div className="error">
        {error && <span>{error.message}</span>}
        </div>
        <Link to="/">
        <span className="back">
            Back
        </span>
        </Link>
</div>
</div>
);
};

export default Login;