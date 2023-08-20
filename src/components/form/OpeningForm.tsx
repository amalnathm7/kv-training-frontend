import React, { useEffect, useState } from 'react';
import './EmployeeForm.css';
import FormField from '../input-field/form-field/FormField';
import DropDown from '../input-field/drop-down/DropDown';
import PrimaryButton from '../button/PrimaryButton/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useGetRoleListQuery } from '../../services/roleApi';
import { useGetDepartmentListQuery } from '../../services/departmentApi';
import { OpeningType } from '../../types/OpeningType';
import { useCreateOpeningMutation, useUpdateOpeningMutation } from '../../services/openingApi';

export type OpeningnFormPropsType = {
  opening: OpeningType;
  isEdit: boolean;
};

const OpeningForm: React.FC<OpeningnFormPropsType> = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState(0);
  const [department, setDepartment] = useState('Select Department');
  const [role, setRole] = useState('Select Role');

  useEffect(() => {
    if (props.opening) {
      setTitle(props.opening.title);
      setDescription(props.opening.description);
      setSkills(props.opening.skills);
      setCount(props.opening.count);
      setLocation(props.opening.location);
      setExperience(props.opening.experience);
      setDepartment(props.opening.department?.name);
      setRole(props.opening.role.role);
    }
  }, [props.opening]);

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [skillsError, setSkillsError] = useState(false);
  const [countError, setCountError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  const onChangeSkills = (event) => {
    setSkills(event.target.value);
    setSkillsError(false);
  };

  const onChangeCount = (event) => {
    setCount(event.target.value);
    setCountError(false);
  };

  const onChangeLocation = (event) => {
    setLocation(event.target.value);
    setLocationError(false);
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

  const primaryButtonLabel = props.isEdit ? 'Save' : 'Create';

  const navigate = useNavigate();

  const saveOpening = () => {
    let isValidated = true;

    if (title.trim().length === 0) {
      isValidated = false;
      setTitleError(true);
    }
    if (description.trim().length === 0) {
      isValidated = false;
      setDescriptionError(true);
    }
    if (skills.trim().length === 0) {
      isValidated = false;
      setSkillsError(true);
    }
    if (isNaN(Number(count)) || Number(count) < 0) {
      isValidated = false;
      setCountError(true);
    }
    if (location.trim().length === 0) {
      isValidated = false;
      setLocationError(true);
    }
    if (isNaN(Number(experience)) || Number(experience) < 0) {
      isValidated = false;
      setExperienceError(true);
    }

    if (isValidated) {
      const opening = {
        id: props.opening?.id,
        title,
        description,
        skills,
        count: Number(count),
        location,
        experience: Number(experience),
        departmentId: departmentData.data.find((dept) => dept.name === department)?.id.toString(),
        roleId: rolesData.data.find((roleData) => roleData.role === role)?.id.toString()
      };

      props.isEdit ? updateOpening({ id: props.opening.id, opening }) : createOpening(opening);
    }
  };

  let roles = [];
  let departments = [];

  const [createOpening, { isSuccess: isCreateOpeningSuccess }] = useCreateOpeningMutation();
  const [updateOpening, { isSuccess: isUpdateOpeningSuccess }] = useUpdateOpeningMutation();
  const { data: departmentData, isSuccess: isDeptFetchSuccess } = useGetDepartmentListQuery();
  const { data: rolesData, isSuccess: isRoleFetchSuccess } = useGetRoleListQuery();

  useEffect(() => {
    if (props.isEdit) {
      if (isUpdateOpeningSuccess) navigate(-1);
    } else {
      if (isCreateOpeningSuccess) navigate(-1);
    }
  }, [isCreateOpeningSuccess, isUpdateOpeningSuccess]);

  if (isDeptFetchSuccess) departments = departmentData.data.map((department) => department.name);

  if (isRoleFetchSuccess) roles = rolesData.data.map((role) => role.role);

  return (
    <div className='form-container'>
      <FormField
        type='text'
        value={title}
        label='Job Title'
        placeholder='Title'
        onChange={onChangeTitle}
        showError={titleError}
      />
      <FormField
        type='text'
        value={description}
        label='Description'
        placeholder='Description'
        onChange={onChangeDescription}
        showError={descriptionError}
      />
      <FormField
        type='text'
        value={skills}
        label='Skills'
        placeholder='skills'
        onChange={onChangeSkills}
        showError={skillsError}
      />
      <FormField
        type='number'
        value={count}
        label='Count'
        placeholder=''
        onChange={onChangeCount}
        showError={countError}
      />
      <FormField
        type='text'
        value={location}
        label='Location'
        placeholder='Location'
        onChange={onChangeLocation}
        showError={locationError}
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
      {props.isEdit && (
        <FormField
          disabled={true}
          value={props.opening?.id}
          onChange={() => {}}
          label={'Opening ID'}
          placeholder={'Opening ID'}
          type={'text'}
          showError={false}
        />
      )}
      <div className='form-buttons'>
        <div className='form-primary-button'>
          <PrimaryButton type='submit' label={primaryButtonLabel} onClick={saveOpening} />
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

export default OpeningForm;
