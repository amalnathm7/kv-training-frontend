import React from 'react';
import CardItem from '../card-item/CardItem';
import './Card.css';
import SecondaryButton, {
  SecondaryButtonPropsType
} from '../button/SecondaryButton/SecondaryButton';

type CardItemType = {
  label: string;
  value: string;
  isStatus?: boolean;
};

export type CardPropsType = {
  items: CardItemType[];
  secondaryButtonProps?: SecondaryButtonPropsType;
};

const Card: React.FC<CardPropsType> = (props) => {
  const items = props.items.map((item: CardItemType) => (
    <CardItem
      key={item.value}
      label={item.label}
      value={item.value}
      isStatus={item.isStatus ? item.isStatus : false}
    />
  ));

  return (
    <div>
      <div className='details-card'>
        {items}
        <div style={{ width: '100%' }}>
          {props.secondaryButtonProps && (
            <SecondaryButton
              style={props.secondaryButtonProps.style}
              type={props.secondaryButtonProps.type}
              label={props.secondaryButtonProps.label}
              onClick={props.secondaryButtonProps.onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
