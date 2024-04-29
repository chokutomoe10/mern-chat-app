import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { login, signup } from "../../actions/authAction";

const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    const [data, setData] = useState({firstname: "", lastname: "", username: "", password: "", confirmpassword: ""});

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    };

    const [isConfirmPassword, setIsConfirmPassword] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            data.password === data.confirmpassword ? dispatch(signup(data)) : setIsConfirmPassword(false)
        } else {
            dispatch(login(data))
        }
    };

    const resetForm = () => {
        setIsConfirmPassword(true);
        setData({firstname: "", lastname: "", username: "", password: "", confirmpassword: ""});
    };

    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt=""/>
                <div className="Webname">
                    <h1>Chat App</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignup ? "Sign up" : "Login"}</h3>
                    {isSignup && <div>
                        <input type="text" className="infoInput" placeholder="First Name" name="firstname" onChange={handleChange} value={data.firstname}/>
                        <input type="text" className="infoInput" placeholder="Last Name" name="lastname" onChange={handleChange} value={data.lastname}/>
                    </div>}
                    <div>
                        <input type="text" className="infoInput" placeholder="Username" name="username" onChange={handleChange} value={data.username}/>
                    </div>
                    <div>
                        <input type="password" className="infoInput" placeholder="Password" name="password" onChange={handleChange} value={data.password}/>
                        {isSignup && <input type="password" className="infoInput" placeholder="Confirm Password" name="confirmpassword" onChange={handleChange} value={data.confirmpassword}/>}
                    </div>
                    <span style={{ display: isConfirmPassword ? "none" : "block", color:"red", fontSize:'12px', alignSelf:"flex-end", marginRight:"5px"}}>
                        * Confirm password is not same
                    </span>
                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => {setIsSignup((prev) => !prev); resetForm()}}>{isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}</span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading}>
                        {loading ? "Loading..." : isSignup ? "Signup" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;