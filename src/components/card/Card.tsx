import React from 'react';
import CardItem from '../card-item/CardItem';
import './Card.css';
import SecondaryButton, {
  SecondaryButtonPropsType
} from '../button/SecondaryButton/SecondaryButton';

export type CardItemType = {
  label: string;
  value: string;
  isStatus?: boolean;
  filePath?: string;
};

export type CardPropsType = {
  items: CardItemType[];
  secondaryButtonsProps?: SecondaryButtonPropsType[];
};

const Card: React.FC<CardPropsType> = (props) => {
  const items = props.items.map((item: CardItemType) => (
    <CardItem
      key={item.value}
      label={item.label}
      value={item.value}
      isStatus={item.isStatus}
      filePath={item.filePath}
    />
  ));

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
