import React from 'react';
import './CustomPopup.css';
import PrimaryButton from '../button/PrimaryButton/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton/SecondaryButton';

export type CustomPopupPropsType = {
  subtext?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const CustomPopup: React.FC<CustomPopupPropsType> = (props) => (
  <div
    className='popup-overlay'
    onClick={(event) => {
      event.stopPropagation();
    }}
    data-testid='custom-popup-test'
  >
    <div className='popup-content'>
      <h2>Are you sure?</h2>
      <p>{props.subtext ? props.subtext : 'Do you really want to delete this?'}</p>
      <div className='popup-buttons'>
        <PrimaryButton onClick={props.onConfirm} type={'button'} label={'Confirm'} />
        <SecondaryButton onClick={props.onCancel} type={'button'} label={'Cancel'} />
      </div>
    </div>
  </div>
);

export default CustomPopup;
