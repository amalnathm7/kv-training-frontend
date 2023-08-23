import React, { useEffect, useState } from 'react';
import CardItem from '../card-item/CardItem';
import './Card.css';
import SecondaryButton, {
  SecondaryButtonPropsType
} from '../button/SecondaryButton/SecondaryButton';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';

type CardItemType = {
  label: string;
  value: string;
  isStatus?: boolean;
};

export type CardPropsType = {
  items: CardItemType[];
  secondaryButtonsProps?: SecondaryButtonPropsType[];
};

const Card: React.FC<CardPropsType> = (props) => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  const items = props.items.map((item: CardItemType) =>
    ['Employee ID', 'Opening ID', 'Referral ID'].includes(item.label) ? (
      isSuperAuthorized && (
        <CardItem
          key={item.value}
          label={item.label}
          value={item.value}
          isStatus={item.isStatus ? item.isStatus : false}
        />
      )
    ) : (
      <CardItem
        key={item.value}
        label={item.label}
        value={item.value}
        isStatus={item.isStatus ? item.isStatus : false}
      />
    )
  );

  const secondaryButtons = props.secondaryButtonsProps?.map((secondaryButtonProps) => (
    <SecondaryButton
      key={secondaryButtonProps.label}
      style={secondaryButtonProps.style}
      type={secondaryButtonProps.type}
      label={secondaryButtonProps.label}
      onClick={secondaryButtonProps.onClick}
    />
  ));

  return (
    <div>
      <div className='details-card'>
        {items}
        <div style={{ width: '100%' }}>{secondaryButtons}</div>
      </div>
    </div>
  );
};

export default Card;
