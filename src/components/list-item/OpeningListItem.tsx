import React, { useEffect, useState } from 'react';
import './ListItem.css';
import ActionButton from '../button/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
import CustomPopup from '../popup/CustomPopup';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { RouteConstants } from '../../constants/routeConstants';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { OpeningType } from '../../types/OpeningType';
import { useDeleteOpeningMutation } from '../../services/openingApi';

type OpeningListItemPropsType = {
  opening: OpeningType;
};

const OpeningListItem: React.FC<OpeningListItemPropsType> = (props) => {
  const { data: myProfile, isSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

  useEffect(() => {
    if (
      isSuccess &&
      myProfile.data.role &&
      myProfile.data.role.permissionLevel === PermissionLevel.SUPER
    )
      setIsSuperAuthorized(true);
  }, [isSuccess]);

  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleEdit = () => {
    navigate(`${RouteConstants.opening}/${props.opening.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeletePopup(true);
  };

  const onClick = () => {
    navigate(`${RouteConstants.opening}/${props.opening.id}`);
  };

  const onConfirmDelete = () => {
    deleteOpening(props.opening.id);
  };

  const [deleteOpening, { isSuccess: isDeleteSuccess }] = useDeleteOpeningMutation();

  useEffect(() => {
    setShowDeletePopup(false);
  }, [isDeleteSuccess]);

  return (
    <tr className='list-item' onClick={onClick}>
      {isSuperAuthorized && <td>{props.opening.id}</td>}
      <td>{props.opening.title}</td>
      <td>{props.opening.description}</td>
      <td>{props.opening.skills}</td>
      <td>{props.opening.location}</td>
      <td>{props.opening.experience + ' years'}</td>
      <td>{props.opening.count}</td>
      <td>{new Date(props.opening.createdAt).toISOString().split('T')[0]}</td>
      <td>{props.opening.role.role}</td>
      <td>{props.opening.department.name}</td>
      {isSuperAuthorized && (
        <td>
          <ActionButton icon='delete.png' onClick={handleDelete}></ActionButton>
          <ActionButton icon='edit.png' onClick={handleEdit}></ActionButton>
        </td>
      )}
      {showDeletePopup && (
        <CustomPopup
          subtext='Do you really want to delete the opening?'
          onConfirm={onConfirmDelete}
          onCancel={() => {
            setShowDeletePopup(false);
          }}
        />
      )}
    </tr>
  );
};

export default OpeningListItem;
