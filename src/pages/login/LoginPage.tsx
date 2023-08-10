import PrimaryButton from "../../components/button/PrimaryButton";
import InputField from "../../components/input-field/InputField";
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const changeUsername = (event) => {
        setUsername(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const click = () => {
        console.log(username + password);
    };

    return <div className="container">
        <div className="split left">
            <div className="circle">
                <img className="placeholder" src="assets/img/banner.png" alt="Login Placeholder"></img>
            </div>
        </div>
        <div className="split right">
            <div className="form-container">
                <img className="logo" src="assets/img/kv-logo.png" alt="KeyValue Logo"></img>
                <InputField label="Username" onChange={changeUsername} value={username} type="text" ></InputField>
                <InputField label="Password" onChange={changePassword} value={password} type="password" ></InputField>
                <PrimaryButton type="submit" label='Log in' onClick={click}></PrimaryButton>
            </div>
        </div>
    </div>;
};

export default LoginPage;
