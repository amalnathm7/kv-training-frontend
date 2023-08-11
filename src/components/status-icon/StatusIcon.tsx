import { Status } from "../../types/Status";
import React from "react";

type StatusProps = {
    status: Status
};
const StatusIcon: React.FC<StatusProps> = (props) => {
    const style = {
        backgroundColor: props.status.color,
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: "20px",
        width: "100px",
        display: "flex",
        justifyContent: "center"
    };

    return <div style={style} className="status-container">
        <label>{props.status.label}</label>
    </div>;
};

export default StatusIcon;
