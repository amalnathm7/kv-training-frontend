import { useParams } from "react-router-dom";
import Form from "../../components/form/Form";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";
import { useGetEmployeeByIdQuery } from "../../services/employeeApi";

const EmployeeEditPage: React.FC = () => {
    const { id } = useParams();

    const { data: employeesData, isSuccess } = useGetEmployeeByIdQuery(id);

    let employee = null;

    if (isSuccess)
        employee = employeesData.data;

    return <HomeLayout subHeaderAction={() => { }} subHeaderLabel="Edit Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form employee={employee} isEdit={true} />
    </HomeLayout>;
};

export default EmployeeEditPage;
