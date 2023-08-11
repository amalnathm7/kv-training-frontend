import Card from "../../components/card/Card";
import { data } from "../../constants/data";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";
import { useParams } from "react-router-dom";

const EmployeeDetailsPage: React.FC = () => {
    const { id } = useParams();

    const employee = data.find((employee) => employee.id === id);

    const items = [
        {
            label: "Employee Name",
            value: employee.name,
            isStatus: false
        },
        {
            label: "Joining Date",
            value: employee.joiningDate.toDateString(),
            isStatus: false
        },
        {
            label: "Department",
            value: employee.department.name,
            isStatus: false
        },
        {
            label: "Role",
            value: employee.role.role,
            isStatus: false
        },
        {
            label: "Status",
            value: employee.status,
            isStatus: true
        },
        {
            label: "Experience",
            value: employee.experience + " Years",
            isStatus: false
        },
        {
            label: "Address",
            value: employee.address.addressLine1 + ", " + employee.address.addressLine2 + ", " + employee.address.city + ", " + employee.address.state + ", " + employee.address.country + ", " + employee.address.pincode,
            isStatus: false
        },
        {
            label: "Employee ID",
            value: employee.id,
            isStatus: false
        }
    ];

    return <HomeLayout subHeaderLabel="Employee Details" subHeaderActionLabel="Edit" subHeaderActionIcon="edit.svg">
        <Card items={items}></Card>
    </HomeLayout>;
};

export default EmployeeDetailsPage;
