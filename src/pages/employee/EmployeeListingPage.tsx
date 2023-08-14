import Listing from "../../components/listing/Listing";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeListingPage: React.FC = () => {
    const navigate = useNavigate();
    const labels = ["Employee ID", "Employee Name", "Joining Date", "Role", "Department", "Status", "Experience", "Address", "Action"];

    const onCreateClicked = () => {
        navigate("/employee/create");
    };

    return <HomeLayout subHeaderAction={onCreateClicked} subHeaderLabel="Employee List" subHeaderActionLabel="Create Employee" subHeaderActionIcon="create.png">
        <Listing labels={labels} />
    </HomeLayout>;
};

export default EmployeeListingPage;
