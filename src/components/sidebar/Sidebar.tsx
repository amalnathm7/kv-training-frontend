import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
    return <div className="sidebar">
        <div className="item container">
            <div className="icon container">
                <img src="/assets/icons/employees.svg" alt="Icon"></img>
            </div>
            <h3>Employee List</h3>
        </div>
    </div>;
};

export default Sidebar;
