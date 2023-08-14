import { useSelector } from "react-redux";
import Card from "../../components/card/Card";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const employeesData = useSelector((state: any) => {
        return state.employees;
    });

    const employee = employeesData.find((employee) => employee.id === id);

    const items = [
        {
            label: "Employee Name",
            value: employee.name
        },
        {
            label: "Joining Date",
            value: employee.joiningDate.toDateString()
        },
        {
            label: "Department",
            value: employee.department.name
        },
        {
            label: "Role",
            value: employee.role.role
        },
        {
            label: "Status",
            value: employee.status,
            isStatus: true
        },
        {
            label: "Experience",
            value: employee.experience + " Years"
        },
        {
            label: "Address",
            value: employee.address.addressLine1 + ", " + employee.address.addressLine2 + ", " + employee.address.city + ", " + employee.address.state + ", " + employee.address.country + ", " + employee.address.pincode
        },
        {
            label: "Employee ID",
            value: employee.id
        }
    ];

    const onEditClicked = () => {
        navigate(`/employee/${id}/edit`);
    };

    return <HomeLayout subHeaderAction={onEditClicked} subHeaderLabel="Employee Details" subHeaderActionLabel="Edit" subHeaderActionIcon="edit.svg">
        <Card items={items}></Card>
    </HomeLayout>;
};

export default EmployeeDetailsPage;
