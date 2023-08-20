import Card from "../../components/card/Card";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeByIdQuery, useGetMyProfileQuery } from "../../services/employeeApi";
import { RouteConstants } from "../../constants/routeConstants";
import { PermissionLevel } from "../../utils/PermissionLevel";

const EmployeeDetailsPage: React.FC = () => {
    const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
    const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

    useEffect(() => {
        if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
            setIsSuperAuthorized(true);
    }, [isMyProfileFetchSuccess]);

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: employeeData, isSuccess } = useGetEmployeeByIdQuery(id);

    let items = [];

    if (isSuccess) {
        const employee = employeeData.data;

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
                label: "Email",
                value: employee.email
            },
            {
                label: "Phone",
                value: employee.phone
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
                value: employee.address.line1 + ", " + employee.address.line2 + ", " + employee.address.city + ", " + employee.address.state + ", " + employee.address.country + ", " + employee.address.pincode
            }
        ];
    }

    const onEditClicked = () => {
        navigate(`${RouteConstants.employee}/${id}/edit`);
    };

    return <HomeLayout subHeaderPrimaryAction={isSuperAuthorized ? onEditClicked : null} subHeaderLabel="Employee Details" subHeaderPrimaryActionLabel={isSuperAuthorized ? "Edit" : ""} subHeaderPrimaryActionIcon={isSuperAuthorized ? "edit.svg" : ""}>
        <Card items={items}></Card>
    </HomeLayout>;
};

export default EmployeeDetailsPage;
