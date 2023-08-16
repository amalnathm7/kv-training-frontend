import { useParams } from "react-router-dom";
import Form from "../../components/form/Form";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";
import { useSelector } from "react-redux";

const EmployeeEditPage: React.FC = () => {
    const { id } = useParams();

    const employeesData = useSelector((state: any) => {
        return state.employees;
    });

    const employee = employeesData.find((employee) => employee.id === id);

    return <HomeLayout subHeaderAction={() => { }} subHeaderLabel="Edit Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form employee={employee} isEdit={true} />
    </HomeLayout>;
};

export default EmployeeEditPage;
