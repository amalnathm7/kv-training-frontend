import React from "react";
import "./SubHeader.css";

type SubHeaderPropsType = {
    label: string,
    actionLabel: string,
    actionIcon: string,
    action: () => void
}

const SubHeader: React.FC<SubHeaderPropsType> = (props) => {
    return <div className="sub-header">
        <label className="sub-header-label">{props.label}</label>
        {props.actionLabel.length > 0 && <div className="action-button" onClick={props.action}>
            <div className="sub-header-action-icon-container">
                <img className="sub-header-action-icon" src={"/assets/icons/" + props.actionIcon}></img>
            </div>
            <label className="sub-header-action-label">{props.actionLabel}</label>
        </div>}
    </div>;
};

export default SubHeader;
