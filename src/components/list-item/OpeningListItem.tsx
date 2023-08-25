import React, { useContext, useEffect, useState } from 'react';
import './ListItem.css';
import ActionButton from '../button/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
import CustomPopup from '../popup/CustomPopup';
import { RouteConstants } from '../../constants/routeConstants';
import { OpeningType } from '../../types/OpeningType';
import { useDeleteOpeningMutation } from '../../services/openingApi';
import { toast } from 'react-toastify';
import { AuthorizationContext } from '../../app';

type OpeningListItemPropsType = {
  opening: OpeningType;
};

const OpeningListItem: React.FC<OpeningListItemPropsType> = (props) => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);

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
    if (isDeleteSuccess) {
      setShowDeletePopup(false);
      toast.success('Successfully deleted opening');
    }
  }, [isDeleteSuccess]);

  return (
    <tr className='list-item' onClick={onClick}>
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
          <>
            <a
              data-tooltip-content='Delete Opening'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              <ActionButton icon='delete.png' onClick={handleDelete}></ActionButton>
            </a>
            <a
              data-tooltip-content='Edit Opening'
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
