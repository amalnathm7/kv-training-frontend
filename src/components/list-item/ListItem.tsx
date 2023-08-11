import { Employee } from "../../types/Employee";
import React from "react";
import "./ListItem.css";
import { Status } from "@app/types/Status";
import StatusIcon from "../status-icon/StatusIcon";
import ActionButton from "../button/ActionButton";

type ListItemProps = {
    employee: Employee
};

const ListItem: React.FC<ListItemProps> = (props) => {
    let status: Status = {
        label: props.employee.status,
        color: props.employee.status === 'Active' ? '#D3F4BE' : props.employee.status === 'Inactive' ? '#FFBFBF' : '#F5ECB8'
    };

    const handleEdit = () => {

    };

    const handleDelete = () => {

    };

    return <tr className="list-item">
        <td>{props.employee.id}</td>
        <td>{props.employee.name}</td>
        <td>{props.employee.joiningDate.toDateString()}</td>
        <td>{props.employee.role.role}</td>
        <td><StatusIcon status={status}></StatusIcon></td>
        <td>{props.employee.experience + " years"}</td>
        <td>{props.employee.address.addressLine1 + ", " + props.employee.address.addressLine2 + ", " + props.employee.address.city + ", " + props.employee.address.state + ", " + props.employee.address.country + ", " + props.employee.address.pincode}</td>
        <td>
            <ActionButton icon="delete.png" onClick={handleEdit}></ActionButton>
            <ActionButton icon="edit.png" onClick={handleDelete}></ActionButton>
        </td>
    </tr>;
};

export default ListItem;
