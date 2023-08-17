import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/form/Form";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React, { useEffect } from "react";
import { useGetEmployeeByIdQuery, useGetMyProfileQuery } from "../../services/employeeApi";
import { PermissionLevel } from "../../utils/PermissionLevel";
import { RouteConstants } from "../../constants/routeConstants";

const EmployeeEditPage: React.FC = () => {
    const { data: myProfile, isSuccess: isProfileSuccess } = useGetMyProfileQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (isProfileSuccess && !myProfile.data.role || isProfileSuccess && myProfile.data.role.permissionLevel !== PermissionLevel.SUPER)
            navigate(`${RouteConstants.employee}`, { replace: true });
    }, [isProfileSuccess]);

    const { id } = useParams();

    const { data: employeesData, isSuccess } = useGetEmployeeByIdQuery(id);

    let employee = null;

    if (isSuccess)
        employee = employeesData.data;

    return <HomeLayout subHeaderAction={null} subHeaderLabel="Edit Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form employee={employee} isEdit={true} />
    </HomeLayout>;
};

export default EmployeeEditPage;
