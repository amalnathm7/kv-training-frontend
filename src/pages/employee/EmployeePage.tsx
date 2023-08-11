import { Employee } from "@app/types/Employee";
import Listing from "../../components/listing/Listing";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React from "react";

const EmployeePage: React.FC = () => {
    const data: Employee[] = [
        {
            "id": "1",
            "name": "Daniel Brown",
            "role": {
                role: "HR",
                permissionLevel: 0
            },
            "joiningDate": new Date(),
            "status": "Active",
            "experience": 6,
            "address": {
                id: "1",
                addressLine1: "Line 1",
                addressLine2: "Line 2",
                city: "Kannur",
                state: "Kerala",
                country: "India",
                pincode: "123213"
            }
        },
        {
            "id": "2",
            "name": "Daniel Brown",
            "role": {
                role: "HR",
                permissionLevel: 0
            },
            "joiningDate": new Date(),
            "status": "Inactive",
            "experience": 6,
            "address": {
                id: "1",
                addressLine1: "Line 1",
                addressLine2: "Line 2",
                city: "Kannur",
                state: "Kerala",
                country: "India",
                pincode: "123213"
            }
        },
        {
            "id": "4",
            "name": "Daniel Brown",
            "role": {
                role: "HR",
                permissionLevel: 0
            },
            "joiningDate": new Date(),
            "status": "Probation",
            "experience": 6,
            "address": {
                id: "1",
                addressLine1: "Line 1",
                addressLine2: "Line 2",
                city: "Kannur",
                state: "Kerala",
                country: "India",
                pincode: "123213"
            }
        },
        {
            "id": "3",
            "name": "Daniel Brown",
            "role": {
                role: "HR",
                permissionLevel: 0
            },
            "joiningDate": new Date(),
            "status": "Active",
            "experience": 6,
            "address": {
                id: "1",
                addressLine1: "Line 1",
                addressLine2: "Line 2",
                city: "Kannur",
                state: "Kerala",
                country: "India",
                pincode: "123213"
            }
        }
    ];

    const labels = ["Employee ID", "Employee Name", "Joining Date", "Role", "Status", "Experience", "Address", "Action"];

    return <HomeLayout subHeaderLabel="Employee List" subHeaderActionLabel="Create Employee" subHeaderActionIcon="create.png">
        <Listing labels={labels} employees={data} />
    </HomeLayout>;
};

export default EmployeePage;
