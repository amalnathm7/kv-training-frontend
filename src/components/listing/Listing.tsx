import React from "react";
import "./Listing.css";
import ListItem from "../list-item/ListItem";
import { useGetEmployeeListQuery } from "../../services/employeeApi";

type ListingPropsType = {
    labels: string[]
}

const Listing: React.FC<ListingPropsType> = (props) => {
    const { data: employeesData, isSuccess } = useGetEmployeeListQuery();

    const labels = props.labels.map((label) => <div className="listing-label" key={label}><label>{label}</label></div>);

    let employees = [];

    if (isSuccess)
        employees = employeesData.data.map((employee) => <ListItem key={employee.id} employee={employee}></ListItem>);

    return <div className="listing">
        <div className="list-header">{labels}</div>
        <table>
            <tbody className="list-items">
                {employees}
            </tbody>
        </table>
    </div>;
};

export default Listing;
