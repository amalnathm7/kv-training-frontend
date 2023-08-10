import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";

const EmployeePage: React.FC = () => {
    return <HomeLayout subHeaderLabel="Employee List" subHeaderActionLabel="Create Employee" subHeaderActionIcon="assets/icons/create.png" />;
};

export default EmployeePage;
