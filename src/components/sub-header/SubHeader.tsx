import React from "react";
import "./SubHeader.css";

type SubHeaderPropsType = {
    label: string,
    actionLabel: string,
    actionIcon: string,
}

const SubHeader: React.FC<SubHeaderPropsType> = (props) => {
    return <div className="sub-header">
        <label className="sub-header-label">{props.label}</label>
        <div className="action-button">
            <div className="sub-header-action-icon-container">
                <img className="sub-header-action-icon" src={props.actionIcon}></img>
            </div>
            <label className="sub-header-action-label">{props.actionLabel}</label>
        </div>
    </div>;
};

export default SubHeader;
