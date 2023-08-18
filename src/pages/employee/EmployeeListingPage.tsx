import Listing from "../../components/listing/Listing";
import { RouteConstants } from "../../constants/routeConstants";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyProfileQuery } from "../../services/employeeApi";
import { PermissionLevel } from "../../utils/PermissionLevel";

const EmployeeListingPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: myProfile, isSuccess } = useGetMyProfileQuery();
    const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        if (isSuccess && myProfile.data.role && myProfile.data.role.permissionLevel === PermissionLevel.SUPER)
            setIsSuperAuthorized(true);
    }, [isSuccess]);

    useEffect(() => {
        if (isSuperAuthorized) {
            labelArray.push("Actions");
            setLabels(labelArray);
        }
    }, [isSuperAuthorized]);

    const labelArray = ["Employee ID", "Employee Name", "Email", "Joining Date", "Role", "Department", "Status", "Experience", "Address"];

    useEffect(() => {
        setLabels(labelArray);
    }, []);

    const onCreateClicked = () => {
        navigate(`${RouteConstants.employee}/create`);
    };

    return <HomeLayout subHeaderAction={isSuperAuthorized ? onCreateClicked : null} subHeaderLabel="Employee List" subHeaderActionLabel={isSuperAuthorized ? "Create Employee" : ""} subHeaderActionIcon={isSuperAuthorized ? "create.png" : ""}>
        <Listing labels={labels} />
    </HomeLayout>;
};

export default EmployeeListingPage;
