import React from "react";
import "./Header.css";
import SecondaryButton from "../button/SecondaryButton/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../../constants/routeConstants";
import { useDispatch } from "react-redux";
// import { GET_MY_PROFILE } from "../../constants/apiConstants";
import { baseApi } from "../../services";

type HeaderPropsType = {
    isSplash?: boolean
}

const Header: React.FC<HeaderPropsType> = (props) => {
    const style = {
        width: props.isSplash ? '100%' : '300px'
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(baseApi.util.resetApiState());
        navigate(RouteConstants.login, { replace: true });
    };

    return <div className="header">
        <div className="img-bg" style={style}>
            <img className="header-logo" src="/assets/img/kv-logo.png" alt="KeyValue Logo"></img>
        </div>
        {!props.isSplash && <div className="header-logout-button">
            <SecondaryButton label="Log out" type={"button"} onClick={handleLogout} />
        </div>}
    </div>;
};

export default Header;
