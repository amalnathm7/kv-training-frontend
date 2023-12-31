import { EmployeeType } from '../../types/EmployeeType';
import React, { useContext, useEffect, useState } from 'react';
import './ListItem.css';
import { StatusType } from '../../types/StatusType';
import StatusIcon from '../status-icon/StatusIcon';
import ActionButton from '../button/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
import CustomPopup from '../popup/CustomPopup';
import { useDeleteEmployeeMutation } from '../../services/employeeApi';
import { RouteConstants } from '../../constants/routeConstants';
import { toast } from 'react-toastify';
import { AuthorizationContext, SelectedContext } from '../../app';

type EmployeeListItemPropsType = {
  employee: EmployeeType;
};

const EmployeeListItem: React.FC<EmployeeListItemPropsType> = (props) => {
  const { myProfile } = useContext(SelectedContext);
  const { isSuperAuthorized } = useContext(AuthorizationContext);

  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  let status: StatusType = {
    label: props.employee.status,
    color:
      props.employee.status === 'Active'
        ? '#D3F4BE'
        : props.employee.status === 'Inactive'
        ? '#FFBFBF'
        : '#F5ECB8'
  };

  const handleEdit = () => {
    navigate(`${RouteConstants.employee}/${props.employee.id}/edit`);
  };

  const handleDelete = () => {
    if (props.employee.id !== myProfile?.id) setShowDeletePopup(true);
    else toast.error('You cannot delete yourself!');
  };

  const onClick = () => {
    navigate(`${RouteConstants.employee}/${props.employee.id}`);
  };

  const onConfirmDelete = () => {
    deleteEmployee(props.employee.id);
  };

  const [deleteEmployee, { isSuccess: isDeleteSuccess }] = useDeleteEmployeeMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      setShowDeletePopup(false);
      toast.success('Successfully deleted employee');
    }
  }, [isDeleteSuccess]);

  return (
    <tr className='list-item' onClick={onClick}>
      <td>{props.employee.employeeCode}</td>
      <td>{props.employee.name}</td>
      <td>{props.employee.email}</td>
      <td>{props.employee.phone}</td>
      <td>{new Date(props.employee.joiningDate).toISOString().split('T')[0]}</td>
      <td>{props.employee.role ? props.employee.role.role : 'NIL'}</td>
      <td>{props.employee.department ? props.employee.department.name : 'NIL'}</td>
      <td>
        <StatusIcon status={status}></StatusIcon>
      </td>
      <td>
        {props.employee.experience == 1
          ? props.employee.experience + ' year'
          : props.employee.experience + ' years'}
      </td>
      <td className='address-td'>
        {props.employee.address.line1 +
          ', ' +
          props.employee.address.line2 +
          ', ' +
          props.employee.address.city +
          ', ' +
          props.employee.address.state +
          ', ' +
          props.employee.address.country +
          ', ' +
          props.employee.address.pincode}
      </td>
      {isSuperAuthorized && (
        <td>
          <>
            <a
              data-tooltip-content='Delete Employee'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              <ActionButton icon='delete.png' onClick={handleDelete}></ActionButton>
            </a>
            <a
              data-tooltip-content='Edit Employee'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              <ActionButton icon='edit.png' onClick={handleEdit}></ActionButton>
            </a>
          </>
        </td>
      )}
      {showDeletePopup && (
        <CustomPopup
          onConfirm={onConfirmDelete}
          onCancel={() => {
            setShowDeletePopup(false);
          }}
          subtext='Do you really want to delete the employee?'
        />
      )}
    </tr>
  );
};

export default EmployeeListItem;
