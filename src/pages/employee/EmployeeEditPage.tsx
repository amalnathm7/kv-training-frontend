import { useParams } from "react-router-dom";
import Form from "../../components/form/Form";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";
import { data } from "../../constants/data";

const EmployeeEditPage: React.FC = () => {
    const { id } = useParams();
    const employee = data.find((employee) => employee.id === id);

    return <HomeLayout subHeaderAction={() => { }} subHeaderLabel="Edit Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form employee={employee} isEdit={true} />
    </HomeLayout>;
};

export default EmployeeEditPage;
