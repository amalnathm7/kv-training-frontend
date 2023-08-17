import { StatusType } from "../../types/StatusType";
import React from "react";

export type StatusIconPropsType = {
    status: StatusType
};

const StatusIcon: React.FC<StatusIconPropsType> = (props) => {
    const style = {
        backgroundColor: props.status.color,
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: "20px",
        width: "100px",
        display: "flex",
        justifyContent: "center",
        fontSize: "12px"
    };

    return <div style={style} className="status-container">
        <label>{props.status.label}</label>
    </div>;
};

export default StatusIcon;
