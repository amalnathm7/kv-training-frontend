import Form from "../../components/form/EmployeeForm";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React, { useEffect } from "react";
import { useGetMyProfileQuery } from "../../services/employeeApi";
import { PermissionLevel } from "../../utils/PermissionLevel";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../../constants/routeConstants";

const EmployeeCreatePage: React.FC = () => {
    const { data: myProfile, isSuccess } = useGetMyProfileQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && !myProfile.data.role || isSuccess && myProfile.data.role.permissionLevel !== PermissionLevel.SUPER)
            navigate(`${RouteConstants.employee}`);
    }, [isSuccess]);

    return <HomeLayout subHeaderAction={() => { }} subHeaderLabel="Create Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form employee={null} isEdit={false} />
    </HomeLayout>;
};

export default EmployeeCreatePage;
