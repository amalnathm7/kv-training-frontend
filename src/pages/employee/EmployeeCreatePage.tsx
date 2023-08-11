import FormField from "../../components/input-field/form-field/FormField";
import Form from "../../components/form/Form";
import HomeLayout from "../../layouts/home-layout/HomeLayout";
import React, { useState } from "react";
import DropDown from "../../components/input-field/drop-down/DropDown";

const EmployeeCreatePage: React.FC = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [date, setDate] = useState("");
    const [dateError, setDateError] = useState(false);
    const [experience, setExperience] = useState("");
    const [experienceError, setExperienceError] = useState(false);
    const [department, setDepartment] = useState("");
    const [departmentError, setDepartmentError] = useState(false);
    const [role, setRole] = useState("");
    const [roleError, setRoleError] = useState(false);
    const [status, setStatus] = useState("");
    const [statusError, setStatustError] = useState(false);

    const onChangeName = (event) => {
        setName(event.target.value);
        setNameError(false);
    };

    const onChangeDate = (event) => {
        setDate(event.target.value);
        setDateError(false);
    };

    const onChangeExperience = (event) => {
        setExperience(event.target.value);
        setExperienceError(false);
    };

    const onChangeDepartment = (event) => {
        setDepartment(event.target.value);
        setDepartmentError(false);
    };

    const onChangeRole = (event) => {
        setRole(event.target.value);
        setRoleError(false);
    };

    const onChangeStatus = (event) => {
        setStatus(event.target.value);
        setStatustError(false);
    };

    return <HomeLayout subHeaderAction={() => { }} subHeaderLabel="Create Employee" subHeaderActionLabel="" subHeaderActionIcon="">
        <Form>
            <FormField type="text" value={name} label="Employee Name" placeholder="John Doe" onChange={onChangeName} showError={nameError} />
            <FormField type="date" value={date} label="Joining Date" placeholder="" onChange={onChangeDate} showError={dateError} />
            <FormField type="number" value={experience} label="Experience (Years)" placeholder="3" onChange={onChangeExperience} showError={experienceError} />
            <DropDown type="text" options={["HR", "Dev", "UI/UX"]} value={department} label="Department" placeholder="Select Department" onChange={onChangeDepartment} showError={departmentError} />
            <DropDown type="text" options={["Manager", "Developer", "Designer"]} value={role} label="Role" placeholder="Select Role" onChange={onChangeRole} showError={roleError} />
            <DropDown type="text" options={["Active", "Inactive", "Probation"]} value={status} label="Status" placeholder="Select Status" onChange={onChangeStatus} showError={statusError} />
            <FormField type="text" value={name} label="Address" placeholder="Line 1" onChange={onChangeName} showError={nameError} />
            <FormField type="text" value={name} label="" placeholder="Line 2" onChange={onChangeName} showError={nameError} />
            <FormField type="text" value={name} label="" placeholder="City" onChange={onChangeName} showError={nameError} />
            <FormField type="text" value={name} label=" " placeholder="State" onChange={onChangeName} showError={nameError} />
            <FormField type="text" value={name} label=" " placeholder="Country" onChange={onChangeName} showError={nameError} />
            <FormField type="text" value={name} label=" " placeholder="Pincode" onChange={onChangeName} showError={nameError} />
        </Form>
    </HomeLayout>;
};

export default EmployeeCreatePage;
