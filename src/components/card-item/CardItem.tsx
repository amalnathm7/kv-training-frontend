import React from "react";
import "./CardItem.css";
import StatusIcon from "../status-icon/StatusIcon";
import { StatusType } from "../../types/StatusType";

export type CardItemPropsType = {
    label: string,
    value: string
    isStatus: boolean
};

const CardItem: React.FC<CardItemPropsType> = (props) => {
    let status: StatusType;

    if (props.isStatus)
        status = {
            label: props.value,
            color: props.value === 'Active' ? '#D3F4BE' : props.value === 'Inactive' ? '#FFBFBF' : '#F5ECB8'
        };

    return <div className="card-item" data-testid="card-item-test">
        <label className="card-label">{props.label}</label>
        {!props.isStatus && <label className="card-value">{props.value}</label>}
        {props.isStatus && <div className="card-value"><StatusIcon status={status}></StatusIcon></div>}
    </div>;
};

export default CardItem;
