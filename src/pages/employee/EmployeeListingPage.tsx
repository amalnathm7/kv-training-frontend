import Listing from "../../components/listing/Listing";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";
import { data } from "../../constants/data";

const EmployeeListingPage: React.FC = () => {

    const labels = ["Employee ID", "Employee Name", "Joining Date", "Role", "Department", "Status", "Experience", "Address", "Action"];

    return <HomeLayout subHeaderLabel="Employee List" subHeaderActionLabel="Create Employee" subHeaderActionIcon="create.png">
        <Listing labels={labels} employees={data} />
    </HomeLayout>;
};

export default EmployeeListingPage;
