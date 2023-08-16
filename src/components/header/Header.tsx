import React from "react";
import "./Header.css";

type HeaderPropsType = {
    isSplash?: boolean
}

const Header: React.FC<HeaderPropsType> = (props) => {
    const style = {
        width: props.isSplash ? '100%' : '300px'
    };

    return <div className="header">
        <div className="img-bg" style={style}>
            <img className="header-logo" src="/assets/img/kv-logo.png" alt="KeyValue Logo"></img>
        </div>
    </div>;
};

export default Header;
