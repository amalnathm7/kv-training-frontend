import PrimaryButton from "../../components/button/PrimaryButton";
import InputField from "../../components/input-field/InputField";
import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const changeUsername = (event) => {
        setUsernameError(false);
        setUsername(event.target.value);
    };

    const changePassword = (event) => {
        setPasswordError(false);
        setPassword(event.target.value);
    };

    const onClick = () => {
        if (username.trim().length === 0) setUsernameError(true);
        if (password.trim().length === 0) setPasswordError(true);
        if (username.trim().length > 0 && password.trim().length > 0) navigate("/employee");
    };

    return <div className="login-container">
        <div className="split left">
            <div className="circle">
                <img className="placeholder" src="assets/img/banner.png" alt="Login Placeholder"></img>
            </div>
        </div>
        <div className="split right">
            <div className="form-container">
                <img className="login-logo" src="assets/img/kv-logo.png" alt="KeyValue Logo"></img>
                <InputField label="Username" onChange={changeUsername} showError={usernameError} value={username} type="text" />
                <InputField label="Password" onChange={changePassword} showError={passwordError} value={password} type="password" />
                <PrimaryButton type="submit" label='Log in' onClick={onClick} />
            </div>
        </div>
    </div>;
};

export default LoginPage;
