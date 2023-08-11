import React from "react";
import "./Header.css";

const Header: React.FC = () => {
    return <div className="header">
        <div className="img-bg">
            <img className="header-logo" src="/assets/img/kv-logo.png" alt="KeyValue Logo"></img>
        </div>
    </div>;
};

export default Header;
