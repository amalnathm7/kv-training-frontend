import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";

const EmployeeCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const createEmployee = () => {
        navigate("/employee");
    };

    return <HomeLayout subHeaderAction={() => { }} subHeaderLabel="Create Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form employee={null} onSubmit={createEmployee} isEdit={false} />
    </HomeLayout>;
};

export default EmployeeCreatePage;
