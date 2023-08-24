import React, { useContext, useEffect, useState } from 'react';
import './Form.css';
import FormField from '../input-field/form-field/FormField';
import PrimaryButton from '../button/PrimaryButton/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { ApplicationType } from '../../types/ApplicationType';
import { OpeningType } from '../../types/OpeningType';
import {
  useCreateApplicationMutation,
  useUpdateApplicationMutation
} from '../../services/applicationApi';
import FileUpload from '../input-field/file-upload/FileUpload';
import { useUploadFileMutation } from '../../services/fileApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail, validatePhoneNo, validateResume } from '../../utils/validation';
import DropDown from '../input-field/drop-down/DropDown';
import { AuthorizationContext } from '../../app';

export type ApplicationFormPropsType = {
  opening: OpeningType;
  application: ApplicationType;
  isEdit: boolean;
};

const ApplicationForm: React.FC<ApplicationFormPropsType> = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState(0);
  const [resume, setResume] = useState<string | File>('');
  const [status, setStatus] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [roleId, setRoleId] = useState('');
  const [openingId, setOpeningId] = useState('');
  const { isSuperAuthorized } = useContext(AuthorizationContext);

  useEffect(() => {
    if (props.application) {
      setName(props.application.name);
      setEmail(props.application.email);
      setPhone(props.application.phone);
      setExperience(props.application.experience);
      setStatus(props.application.status);
      setResume(props.application.resume);
      setLine1(props.application.address.line1);
      setLine2(props.application.address.line2);
      setCity(props.application.address.city);
      setState(props.application.address.state);
      setCountry(props.application.address.country);
      setPincode(props.application.address.pincode);
    }
  }, [props.application]);

  useEffect(() => {
    setRoleId(props.opening?.role?.id.toString());
    setOpeningId(props.opening?.id.toString());
  }, [props.opening]);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);
  const [resumeError, setResumeError] = useState(false);
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
    setEmailError(false);
  };

  const onChangePhone = (event) => {
    setPhone(event.target.value);
    setPhoneError(false);
  };

  const onChangeExperience = (event) => {
    setExperience(event.target.value);
    setExperienceError(false);
  };

  const onChangeResume = (event) => {
    if (event.target.files[0])
      if (validateResume(event.target.files[0])) {
        setResume(event.target.files[0]);
        setResumeError(false);
      } else {
        setResumeError(true);
      }
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

  const onChangeStatus = (event) => {
    setStatus(event.target.value);
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

  const primaryButtonLabel = props.isEdit ? 'Save' : 'Submit Application';
  const navigate = useNavigate();

  const [
    uploadFile,
    { data: fileData, isSuccess: isFileUploadSuccess, isError: isFileUploadError }
  ] = useUploadFileMutation();

  const saveApplication = () => {
    let isValidated = true;

    if (name.trim().length === 0) {
      isValidated = false;
      setNameError(true);
    }
    if (!validateEmail(email.trim())) {
      isValidated = false;
      setEmailError(true);
    }
    if (!validatePhoneNo(phone.trim())) {
      isValidated = false;
      setPhoneError(true);
    }
    if (experience < 0) {
      isValidated = false;
      setExperienceError(true);
    }
    if (!resume) {
      isValidated = false;
      setResumeError(true);
    }
    if (props.isEdit && isSuperAuthorized && status.trim().length === 0) {
      isValidated = false;
      setStatusError(true);
    }
    if (line1.trim().length === 0) {
      isValidated = false;
      setLine1Error(true);
    }
    if (line2.trim().length === 0) {
      isValidated = false;
      setLine2Error(true);
    }
    if (city.trim().length === 0) {
      isValidated = false;
      setCityError(true);
    }
    if (state.trim().length === 0) {
      isValidated = false;
      setStateError(true);
    }
    if (country.trim().length === 0) {
      isValidated = false;
      setCountryError(true);
    }
    if (pincode.trim().length === 0) {
      isValidated = false;
      setPincodeError(true);
    }
    if (isValidated) {
      const formData = new FormData();

      formData.append('file', resume);
      uploadFile(formData);
    } else {
      notifyError('Fill all required fields');
    }
  };

  useEffect(() => {
    if (isFileUploadSuccess) {
      const application = {
        id: props.application?.id,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        experience: Number(experience),
        openingId,
        status: status,
        resume: fileData.data.file,
        roleId,
        candidateCode: props.application?.candidateCode,
        address: {
          line1: line1.trim(),
          line2: line2.trim(),
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          pincode: pincode.trim()
        }
      };

      props.isEdit
        ? updateApplication({ id: props.application.id, application: application })
        : createApplication(application);
    } else if (isFileUploadError) {
      notifyError('Resume upload error');
    }
  }, [isFileUploadSuccess, isFileUploadError]);

  const [
    createApplication,
    {
      isSuccess: isCreateApplicationSuccess,
      isError: isCreateApplicationError,
      error: createApplicationError
    }
  ] = useCreateApplicationMutation();
  const [
    updateApplication,
    {
      isSuccess: isUpdateApplicationSuccess,
      isError: isUpdateApplicationError,
      error: updateApplicationError
    }
  ] = useUpdateApplicationMutation();

  const notifySuccess = (action: string) => toast.success(`Successfully ${action} application`);
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    if (props.isEdit) {
      if (isUpdateApplicationSuccess) {
        navigate(-1);
        setTimeout(() => {
          notifySuccess('updated');
        }, 100);
      } else if (isUpdateApplicationError) {
        notifyError(updateApplicationError['data'].errors.error);
      }
    } else {
      if (isCreateApplicationSuccess) {
        navigate(-1);
        setTimeout(() => {
          notifySuccess('submitted');
        }, 100);
      } else if (isCreateApplicationError) {
        notifyError(createApplicationError['data'].errors.error);
      }
    }
  }, [
    isCreateApplicationSuccess,
    isUpdateApplicationSuccess,
    isCreateApplicationError,
    isUpdateApplicationError
  ]);

  return (
    <div className='form-container'>
      <FormField
        type='text'
        value={name}
        label='Candidate Name'
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
        type='number'
        value={experience}
        label='Experience (Years)'
        placeholder=''
        onChange={onChangeExperience}
        showError={experienceError}
      />
      {props.isEdit && isSuperAuthorized && (
        <DropDown
          options={[
            'Received',
            'Review',
            'Round 1',
            'Round 2',
            'Round 3',
            'Hired',
            'Offered',
            'Offer Accepted',
            'Offer Declined',
            'Rejected',
            'Hired'
          ]}
          value={status}
          label='Status'
          placeholder='Select Status'
          onChange={onChangeStatus}
          showError={statusError}
        />
      )}
      <FileUpload label='Resume' onChange={onChangeResume} showError={resumeError} value={resume} />
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
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
          value={props.application?.candidateCode}
          onChange={() => {}}
          label={'Application Code'}
          placeholder={'Application Code'}
          type={'text'}
          showError={false}
        />
      )}
      <div className='form-buttons'>
        <div className='form-primary-button'>
          <PrimaryButton type='submit' label={primaryButtonLabel} onClick={saveApplication} />
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

export default ApplicationForm;
