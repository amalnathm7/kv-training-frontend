import React from "react";
import CardItem from "../card-item/CardItem";
import "./Card.css";

type CardItemType = {
    label: string,
    value: string,
    isStatus?: boolean
}

type CardPropsType = {
    items: CardItemType[]
};

const Card: React.FC<CardPropsType> = (props) => {
    const items = props.items.map(
        (item: CardItemType) => <CardItem key={item.value} label={item.label} value={item.value} isStatus={item.isStatus ? item.isStatus : false} />);

    return <div>
        <div className="details-card">
            {items}
        </div>
    </div>;
};

export default Card;
