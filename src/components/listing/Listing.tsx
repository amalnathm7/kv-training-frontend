import React from "react";
import "./Listing.css";
import ListItem from "../list-item/ListItem";
import { useSelector } from "react-redux";

type ListingPropsType = {
    labels: string[]
}

const Listing: React.FC<ListingPropsType> = (props) => {
    const employeesData = useSelector((state: any) => {
        return state.employees;
    });

    const labels = props.labels.map((label) => <div className="listing-label" key={label}><label>{label}</label></div>);
    const employees = employeesData.map((employee) => <ListItem key={employee.id} employee={employee}></ListItem>);

    return <div className="listing">
        <div className="list-header">{labels}</div>
        <table className="list-items">
            {employees}
        </table>
    </div>;
};

export default Listing;
