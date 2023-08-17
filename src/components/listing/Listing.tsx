import React from "react";
import "./Listing.css";
import ListItem from "../list-item/ListItem";
import { useGetEmployeeListQuery } from "../../services/employeeApi";

type ListingPropsType = {
    labels: string[]
}

const Listing: React.FC<ListingPropsType> = (props) => {
    const { data: employeesData, isSuccess } = useGetEmployeeListQuery();

    const labels = props.labels.map((label) => <td className="listing-label" key={label}><label>{label}</label></td>);

    let employees = [];

    if (isSuccess)
        employees = employeesData.data.map((employee) => <ListItem key={employee.id} employee={employee}></ListItem>);

    return <div className="listing">
        <table>
            <thead className="list-header">{labels}</thead>
            <tbody className="list-items">
                {employees}
            </tbody>
        </table>
    </div>;
};

export default Listing;
