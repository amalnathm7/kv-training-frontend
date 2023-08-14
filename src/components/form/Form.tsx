import React, { useEffect, useState } from "react";
import "./Form.css";
import FormField from "../input-field/form-field/FormField";
import DropDown from "../input-field/drop-down/DropDown";
import { Employee } from "@app/types/Employee";
import PrimaryButton from "../button/PrimaryButton/PrimaryButton";
import SecondaryButton from "../button/SecondaryButton/SecondaryButton";
import { useNavigate } from "react-router-dom";

type FormPropsType = {
    employee: Employee,
    onSubmit: () => void,
    isEdit: boolean
};

const Form: React.FC<FormPropsType> = (props) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [experience, setExperience] = useState(0);
    const [department, setDepartment] = useState("Select Department");
    const [role, setRole] = useState("Select Role");
    const [status, setStatus] = useState("Select Status");
    const [line1, setLine1] = useState("");
    const [line2, setLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");

    useEffect(() => {
        if (props.employee) {
            setName(props.employee.name);
            setDate(props.employee.joiningDate.toDateString());
            setExperience(props.employee.experience);
            setDepartment(props.employee.department.name);
            setRole(props.employee.role.role);
            setStatus(props.employee.status);
            setLine1(props.employee.address.addressLine1);
            setLine2(props.employee.address.addressLine2);
            setCity(props.employee.address.city);
            setState(props.employee.address.state);
            setCountry(props.employee.address.country);
            setPincode(props.employee.address.pincode);
        }
    }, []);

    const [nameError, setNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [line1Error, setLine1Error] = useState(false);
    const [line2Error, setLine2Error] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [pincodeError, setPincodeError] = useState(false);

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
        setStatusError(false);
    };

    const onChangeLine1 = (event) => {
        setLine1(event.target.value);
        setLine1Error(false);
    };

    const onChangeLine2 = (event) => {
        setLine2(event.target.value);
        setLine2Error(false);
    };

    const onChangeCity = (event) => {
        setCity(event.target.value);
        setCityError(false);
    };

    const onChangeState = (event) => {
        setState(event.target.value);
        setStateError(false);
    };

    const onChangeCountry = (event) => {
        setCountry(event.target.value);
        setCountryError(false);
    };

    const onChangePincode = (event) => {
        setPincode(event.target.value);
        setPincodeError(false);
    };

    const primaryButtonLabel = props.isEdit ? "Save" : "Create";
    const navigate = useNavigate();

    return <div className="form-container">
        <FormField disabled={false} type="text" value={name} label="Employee Name" placeholder="John Doe" onChange={onChangeName} showError={nameError} />
        <FormField disabled={false} type="date" value={date} label="Joining Date" placeholder="" onChange={onChangeDate} showError={dateError} />
        <FormField disabled={false} type="number" value={experience} label="Experience (Years)" placeholder="" onChange={onChangeExperience} showError={experienceError} />
        <DropDown options={["HR", "Dev", "UI/UX"]} value={department} label="Department" placeholder="Select Department" onChange={onChangeDepartment} showError={departmentError} />
        <DropDown options={["Manager", "Developer", "Designer"]} value={role} label="Role" placeholder="Select Role" onChange={onChangeRole} showError={roleError} />
        <DropDown options={["Active", "Inactive", "Probation"]} value={status} label="Status" placeholder="Select Status" onChange={onChangeStatus} showError={statusError} />
        <FormField disabled={false} type="text" value={line1} label="Address" placeholder="Line 1" onChange={onChangeLine1} showError={line1Error} />
        <FormField disabled={false} type="text" value={line2} label="" placeholder="Line 2" onChange={onChangeLine2} showError={line2Error} />
        <FormField disabled={false} type="text" value={city} label="" placeholder="City" onChange={onChangeCity} showError={cityError} />
        <FormField disabled={false} type="text" value={state} label=" " placeholder="State" onChange={onChangeState} showError={stateError} />
        <FormField disabled={false} type="text" value={country} label=" " placeholder="Country" onChange={onChangeCountry} showError={countryError} />
        <FormField disabled={false} type="text" value={pincode} label=" " placeholder="Pincode" onChange={onChangePincode} showError={pincodeError} />
        {props.isEdit && <FormField disabled={true} value={props.employee.id} onChange={() => { }} label={"Employee ID"} placeholder={"Employee ID"} type={"text"} showError={false} />}
        <div className="form-buttons">
            <div className="form-primary-button"><PrimaryButton type="submit" label={primaryButtonLabel} onClick={props.onSubmit} /></div>
            <SecondaryButton type="button" label="Cancel" onClick={() => {
                navigate(-1);
            }} />
        </div>
    </div>;
};

export default Form;
