import Form from "../../components/form/Form";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";

const EmployeeCreatePage: React.FC = () => {
    return <HomeLayout subHeaderAction={() => { }} subHeaderLabel="Create Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form employee={null} onSubmit={() => { }} onCancel={() => { }} />
    </HomeLayout>;
};

export default EmployeeCreatePage;
