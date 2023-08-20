import React, { useEffect, useState } from 'react';
import './Form.css';
import FormField from '../input-field/form-field/FormField';
import DropDown from '../input-field/drop-down/DropDown';
import PrimaryButton from '../button/PrimaryButton/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { EmployeeType } from '../../types/EmployeeType';
import { useGetRoleListQuery } from '../../services/roleApi';
import { useGetDepartmentListQuery } from '../../services/departmentApi';
import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from '../../services/employeeApi';

export type EmployeeFormPropsType = {
    employee: EmployeeType;
    isEdit: boolean;
};

const EmployeeForm: React.FC<EmployeeFormPropsType> = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState('');
    const [experience, setExperience] = useState(0);
    const [department, setDepartment] = useState('Select Department');
    const [role, setRole] = useState('Select Role');
    const [status, setStatus] = useState('Select Status');
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');

    useEffect(() => {
        if (props.employee) {
            setName(props.employee.name);
            setEmail(props.employee.email);
            setPhone(props.employee.phone);
            setDate(new Date(props.employee.joiningDate).toISOString().split('T')[0]);
            setExperience(props.employee.experience);
            setDepartment(props.employee.department?.name);
            setRole(props.employee.role?.role);
            setStatus(props.employee.status);
            setLine1(props.employee.address.line1);
            setLine2(props.employee.address.line2);
            setCity(props.employee.address.city);
            setState(props.employee.address.state);
            setCountry(props.employee.address.country);
            setPincode(props.employee.address.pincode);
        }
    }, [props.employee]);

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
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

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        setPassword(event.target.value);
        setEmailError(false);
    };

    const onChangePhone = (event) => {
        setPhone(event.target.value);
        setPhoneError(false);
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

    const navigate = useNavigate();

    const saveEmployee = () => {
        let isValidated = true;

        if (name.trim().length === 0) { isValidated = false; setNameError(true); }
        if (date.trim().length === 0) { isValidated = false; setDateError(true); }
        if (email.trim().length === 0) { isValidated = false; setEmailError(true); }
        if (phone.trim().length === 0) { isValidated = false; setPhoneError(true); }
        if (experience < 0) { isValidated = false; setExperienceError(true); }
        if (status.trim().length === 0 || status === 'Select Status') { isValidated = false; setStatusError(true); }
        if (line1.trim().length === 0) { isValidated = false; setLine1Error(true); }
        if (line2.trim().length === 0) { isValidated = false; setLine2Error(true); }
        if (city.trim().length === 0) { isValidated = false; setCityError(true); }
        if (state.trim().length === 0) { isValidated = false; setStateError(true); }
        if (country.trim().length === 0) { isValidated = false; setCountryError(true); }
        if (pincode.trim().length === 0) { isValidated = false; setPincodeError(true); }

        if (isValidated) {
            const employee = {
                id: props.employee?.id,
                name,
                email,
                phone,
                password,
                joiningDate: new Date(date),
                status,
                experience: Number(experience),
                departmentId: (departmentData.data.find((dept) => dept.name === department))?.id,
                roleId: (rolesData.data.find((roleData) => roleData.role === role))?.id,
                address: {
                    line1,
                    line2,
                    city,
                    state,
                    country,
                    pincode
                }
            };

            props.isEdit ? updateEmployee({ id: props.employee.id, employee: employee }) : createEmployee(employee);
        }
    };

    let roles = [];
    let departments = [];

    const { data: departmentData, isSuccess: isDeptFetchSuccess } = useGetDepartmentListQuery();
    const { data: rolesData, isSuccess: isRoleFetchSuccess } = useGetRoleListQuery();

    useEffect(() => {
        if (isDeptFetchSuccess)
            departments = departmentData.data.map((department) => department.name);

        if (isRoleFetchSuccess)
            roles = rolesData.data.map((role) => role.role);
    }, [isDeptFetchSuccess, isRoleFetchSuccess]);

    const [createEmployee, { isSuccess: isCreateEmployeeSuccess }] = useCreateEmployeeMutation();
    const [updateEmployee, { isSuccess: isUpdateEmployeeSuccess }] = useUpdateEmployeeMutation();

    useEffect(() => {
        if (props.isEdit) {
            if (isUpdateEmployeeSuccess)
                navigate(-1);
        } else {
            if (isCreateEmployeeSuccess)
                navigate(-1);
        }
    }, [isCreateEmployeeSuccess, isUpdateEmployeeSuccess]);

    const primaryButtonLabel = props.isEdit ? 'Save' : 'Create';

    return (
        <div className='form-container'>
            <FormField
                type='text'
                value={name}
                label='Employee Name'
                placeholder='John Doe'
                onChange={onChangeName}
                showError={nameError}
            />
            <FormField
                type='text'
                value={email}
                label='Email'
                placeholder='johndoe@mail.com'
                onChange={onChangeEmail}
                showError={emailError}
            />
            <FormField
                type='text'
                value={phone}
                label='Phone'
                placeholder='1234567890'
                onChange={onChangePhone}
                showError={phoneError}
            />
            <FormField
                type='date'
                value={date}
                label='Joining Date'
                placeholder=''
                onChange={onChangeDate}
                showError={dateError}
            />
            <FormField
                type='number'
                value={experience}
                label='Experience (Years)'
                placeholder=''
                onChange={onChangeExperience}
                showError={experienceError}
            />
            <DropDown
                options={departments}
                value={department}
                label='Department'
                placeholder='Select Department'
                onChange={onChangeDepartment}
                showError={departmentError}
            />
            <DropDown
                options={roles}
                value={role}
                label='Role'
                placeholder='Select Role'
                onChange={onChangeRole}
                showError={roleError}
            />
            <DropDown
                options={['Active', 'Inactive', 'Probation']}
                value={status}
                label='Status'
                placeholder='Select Status'
                onChange={onChangeStatus}
                showError={statusError}
            />
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                <FormField
                    type='text'
                    value={line1}
                    label='Address'
                    placeholder='Line 1'
                    onChange={onChangeLine1}
                    showError={line1Error}
                />
                <FormField
                    type='text'
                    value={line2}
                    label=''
                    placeholder='Line 2'
                    onChange={onChangeLine2}
                    showError={line2Error}
                />
                <FormField
                    type='text'
                    value={city}
                    label=''
                    placeholder='City'
                    onChange={onChangeCity}
                    showError={cityError}
                />
                <FormField
                    type='text'
                    value={state}
                    label=' '
                    placeholder='State'
                    onChange={onChangeState}
                    showError={stateError}
                />
                <FormField
                    type='text'
                    value={country}
                    label=' '
                    placeholder='Country'
                    onChange={onChangeCountry}
                    showError={countryError}
                />
                <FormField
                    type='text'
                    value={pincode}
                    label=' '
                    placeholder='Pincode'
                    onChange={onChangePincode}
                    showError={pincodeError}
                />
            </div>
            {props.isEdit && (
                <FormField
                    disabled={true}
                    value={props.employee?.id}
                    onChange={() => { }}
                    label={'Employee ID'}
                    placeholder={'Employee ID'}
                    type={'text'}
                    showError={false}
                />
            )}
            <div className='form-buttons'>
                <div className='form-primary-button'>
                    <PrimaryButton type='submit' label={primaryButtonLabel} onClick={saveEmployee} />
                </div>
                <SecondaryButton
                    type='button'
                    label='Cancel'
                    onClick={() => {
                        navigate(-1);
                    }}
                />
            </div>
        </div>
    );
};

export default EmployeeForm;