import React from "react";
import "./Listing.css";
import { Employee } from "../../types/Employee";
import ListItem from "../list-item/ListItem";

type ListingPropsType = {
    labels: string[],
    employees: Employee[]
}

const Listing: React.FC<ListingPropsType> = (props) => {
    const labels = props.labels.map((label) => <div className="listing-label" key={label}><label>{label}</label></div>);
    const employees = props.employees.map((employee) => <ListItem key={employee.id} employee={employee}></ListItem>);

    return <div className="listing">
        <div className="list-header">{labels}</div>
        <table className="list-items">
            {employees}
        </table>
    </div>;
};

export default Listing;
