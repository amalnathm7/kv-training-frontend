import Card from "../../components/card/Card";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeByIdQuery, useGetMyProfileQuery } from "../../services/employeeApi";
import { RouteConstants } from "../../constants/routeConstants";
import { PermissionLevel } from "../../utils/PermissionLevel";

const EmployeeDetailsPage: React.FC = () => {
    const { data: myProfile, isSuccess: isProfileSuccess } = useGetMyProfileQuery();
    const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

    useEffect(() => {
        if (isProfileSuccess && myProfile.data.role.permissionLevel === PermissionLevel.SUPER)
            setIsSuperAuthorized(true);
    }, [isProfileSuccess]);

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: employeesData, isSuccess } = useGetEmployeeByIdQuery(id);

    let items = [];

    if (isSuccess) {
        const employee = employeesData.data;

        items = [
            {
                label: "Employee ID",
                value: employee.id
            },
            {
                label: "Employee Name",
                value: employee.name
            },
            {
                label: "Username",
                value: employee.username
            },
            {
                label: "Joining Date",
                value: new Date(employee.joiningDate).toISOString().split('T')[0]
            },
            {
                label: "Role",
                value: employee.role ? employee.role.role : "NIL"
            },
            {
                label: "Department",
                value: employee.department ? employee.department.name : "NIL"
            },
            {
                label: "Status",
                value: employee.status,
                isStatus: true
            },
            {
                label: "Experience",
                value: employee.experience + " Years"
            },
            {
                label: "Address",
                value: employee.address.addressLine1 + ", " + employee.address.addressLine2 + ", " + employee.address.city + ", " + employee.address.state + ", " + employee.address.country + ", " + employee.address.pincode
            }
        ];
    }

    const onEditClicked = () => {
        navigate(`${RouteConstants.employee}/${id}/edit`);
    };

    return <HomeLayout subHeaderAction={isSuperAuthorized ? onEditClicked : null} subHeaderLabel="Employee Details" subHeaderActionLabel={isSuperAuthorized ? "Edit" : ""} subHeaderActionIcon={isSuperAuthorized ? "edit.svg" : ""}>
        <Card items={items}></Card>
    </HomeLayout>;
};

export default EmployeeDetailsPage;
