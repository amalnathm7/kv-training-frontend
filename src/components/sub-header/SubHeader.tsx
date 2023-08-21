import React from 'react';
import './SubHeader.css';

export type SubHeaderPropsType = {
  label: string;
  primaryActionLabel: string;
  primaryActionIcon: string;
  primaryAction: () => void,
    secondaryActionLabel?: string,
    secondaryActionIcon?: string,
    secondaryAction?: () => void;
  searchClicked?: boolean;
};

const SubHeader: React.FC<SubHeaderPropsType> = (props) => {
    return <div className="sub-header">
        <label className="sub-header-label">{props.label}</label>
        {props.primaryActionLabel.length > 0 && <div className="action-button" onClick={props.primaryAction}>
            <div className="sub-header-action-icon-container">
                <img className="sub-header-action-icon" src={"/assets/icons/" + props.primaryActionIcon}></img>
            </div>
            <label className="sub-header-action-label">{props.primaryActionLabel}</label>
        </div>}
    </div>;
};

export default SubHeader;
