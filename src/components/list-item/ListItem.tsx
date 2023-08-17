import { EmployeeType } from "../../types/EmployeeType";
import React, { useEffect, useState } from "react";
import "./ListItem.css";
import { StatusType } from "../../types/StatusType";
import StatusIcon from "../status-icon/StatusIcon";
import ActionButton from "../button/ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";
import CustomPopup from "../popup/CustomPopup";
import { useDeleteEmployeeMutation, useGetMyProfileQuery } from "../../services/employeeApi";
import { RouteConstants } from "../../constants/routeConstants";
import { PermissionLevel } from "../../utils/PermissionLevel";

type ListItemProps = {
    employee: EmployeeType
};

const ListItem: React.FC<ListItemProps> = (props) => {
    const { data: myProfile, isSuccess } = useGetMyProfileQuery();
    const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

    useEffect(() => {
        if (isSuccess && myProfile.data.role && myProfile.data.role.permissionLevel === PermissionLevel.SUPER)
            setIsSuperAuthorized(true);
    }, [isSuccess]);

    const navigate = useNavigate();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    let status: StatusType = {
        label: props.employee.status,
        color: props.employee.status === 'Active' ? '#D3F4BE' : props.employee.status === 'Inactive' ? '#FFBFBF' : '#F5ECB8'
    };

    const handleEdit = () => {
        navigate(`${RouteConstants.employee}/${props.employee.id}/edit`);
    };

    const handleDelete = () => {
        setShowDeletePopup(true);
    };

    const onClick = () => {
        navigate(`${RouteConstants.employee}/${props.employee.id}`);
    };

    const onConfirmDelete = () => {
        deleteEmployee(props.employee.id);
    };

    const [deleteEmployee, { isSuccess: isDeleteSuccess }] = useDeleteEmployeeMutation();

    useEffect(() => {
        setShowDeletePopup(false);
    }, [isDeleteSuccess]);

    return <tr className="list-item" onClick={onClick}>
        <td>{props.employee.id}</td>
        <td>{props.employee.name}</td>
        <td>{props.employee.username}</td>
        <td>{new Date(props.employee.joiningDate).toISOString().split('T')[0]}</td>
        <td>{props.employee.role ? props.employee.role.role : "NIL"}</td>
        <td>{props.employee.department ? props.employee.department.name : "NIL"}</td>
        <td><StatusIcon status={status}></StatusIcon></td>
        <td>{props.employee.experience + " years"}</td>
        <td className="address-td">{props.employee.address.addressLine1 + ", " + props.employee.address.addressLine2 + ", " + props.employee.address.city + ", " + props.employee.address.state + ", " + props.employee.address.country + ", " + props.employee.address.pincode}</td>
        {isSuperAuthorized && <td>
            <ActionButton icon="delete.png" onClick={handleDelete}></ActionButton>
            <ActionButton icon="edit.png" onClick={handleEdit}></ActionButton>
        </td>}
        {showDeletePopup && <CustomPopup showPopup={showDeletePopup} onConfirm={onConfirmDelete} onCancel={() => {
            setShowDeletePopup(false);
        }} />}
    </tr>;
};

export default ListItem;
