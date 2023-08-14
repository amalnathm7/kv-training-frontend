import React from 'react';
import Popup from 'reactjs-popup';
import './CustomPopup.css';
import PrimaryButton from '../button/PrimaryButton/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton/SecondaryButton';

type PopupPropType = {
  showPopup: boolean,
  onConfirm: () => void,
  onCancel: () => void
}

const CustomPopup: React.FC<PopupPropType> = (props) => (
  <Popup open={props.showPopup} onClose={props.onCancel}>
    <div className="popup-content">
      <h2>Are you sure?</h2>
      <p>Do you really want to delete the employee?</p>
      <div className="popup-buttons">
        <PrimaryButton onClick={props.onConfirm} type={'button'} label={'Confirm'} />
        <SecondaryButton onClick={props.onCancel} type={'button'} label={'Cancel'} />
      </div>
    </div>
  </Popup>
);

export default CustomPopup;
