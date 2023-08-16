import { EmployeeType } from "../../types/EmployeeType";
import React, { useState } from "react";
import "./ListItem.css";
import { StatusType } from "../../types/StatusType";
import StatusIcon from "../status-icon/StatusIcon";
import ActionButton from "../button/ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";
import CustomPopup from "../popup/CustomPopup";
import { useDispatch } from "react-redux";
import DispatchConstants from "../../constants/dispatchConstants";

type ListItemProps = {
    employee: EmployeeType
};

const ListItem: React.FC<ListItemProps> = (props) => {
    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    let status: StatusType = {
        label: props.employee.status,
        color: props.employee.status === 'Active' ? '#D3F4BE' : props.employee.status === 'Inactive' ? '#FFBFBF' : '#F5ECB8'
    };

    const handleEdit = () => {
        navigate(`/employee/${props.employee.id}/edit`);
    };

    const handleDelete = () => {
        setShowDeletePopup(true);
    };

    const onClick = () => {
        navigate(`/employee/${props.employee.id}`);
    };

    const dispatch = useDispatch();

    const onConfirmDelete = () => {
        dispatch({
            type: DispatchConstants.deleteEmployee,
            payload: {
                id: props.employee.id
            }
        });
        setShowDeletePopup(false);
    };

    return <tr className="list-item" onClick={onClick}>
        <td>{props.employee.id}</td>
        <td>{props.employee.name}</td>
        <td>{props.employee.joiningDate}</td>
        <td>{props.employee.role ? props.employee.role.role : "NIL"}</td>
        <td>{props.employee.department ? props.employee.department.name : "NIL"}</td>
        <td><StatusIcon status={status}></StatusIcon></td>
        <td>{props.employee.experience + " years"}</td>
        <td>{props.employee.address.addressLine1 + ", " + props.employee.address.addressLine2 + ", " + props.employee.address.city + ", " + props.employee.address.state + ", " + props.employee.address.country + ", " + props.employee.address.pincode}</td>
        <td>
            <ActionButton icon="delete.png" onClick={handleDelete}></ActionButton>
            <ActionButton icon="edit.png" onClick={handleEdit}></ActionButton>
        </td>
        {showDeletePopup && <CustomPopup showPopup={showDeletePopup} onConfirm={onConfirmDelete} onCancel={() => {
            setShowDeletePopup(false);
        }} />}
    </tr>;
};

export default ListItem;
