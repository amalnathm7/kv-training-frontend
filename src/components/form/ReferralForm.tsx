import React, { useContext, useEffect, useState } from 'react';
import './Form.css';
import FormField from '../input-field/form-field/FormField';
import PrimaryButton from '../button/PrimaryButton/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { ReferralType } from '../../types/ReferralType';
import { EmployeeType } from '../../types/EmployeeType';
import { OpeningType } from '../../types/OpeningType';
import { useCreateReferralMutation, useUpdateReferralMutation } from '../../services/referralApi';
import FileUpload from '../input-field/file-upload/FileUpload';
import { useLazyCheckFileQuery, useUploadFileMutation } from '../../services/fileApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail, validatePhoneNo, validateResume } from '../../utils/validation';
import DropDown from '../input-field/drop-down/DropDown';
import { AuthorizationContext } from '../../app';
import CustomPopup from '../popup/CustomPopup';
import { RouteConstants } from '../../constants/routeConstants';
import { candidateStatuses } from '../../constants/statusConstants';

export type ReferralFormPropsType = {
  referredBy: EmployeeType;
  opening: OpeningType;
  referral: ReferralType;
  isEdit: boolean;
};

const ReferralForm: React.FC<ReferralFormPropsType> = (props) => {
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
  const [referredById, setReferredById] = useState('');
  const [roleId, setRoleId] = useState('');
  const [openingId, setOpeningId] = useState('');
  const [showHirePopup, setShowHirePopup] = useState(false);

  const { isSuperAuthorized } = useContext(AuthorizationContext);

  useEffect(() => {
    if (props.referral) {
      setName(props.referral.name);
      setEmail(props.referral.email);
      setPhone(props.referral.phone);
      setExperience(props.referral.experience);
      setStatus(props.referral.status);
      setResume(props.referral.resume);
      setLine1(props.referral.address.line1);
      setLine2(props.referral.address.line2);
      setCity(props.referral.address.city);
      setState(props.referral.address.state);
      setCountry(props.referral.address.country);
      setPincode(props.referral.address.pincode);
    }
  }, [props.referral]);

  useEffect(() => {
    setReferredById(props.referredBy?.id.toString());
  }, [props.referredBy]);

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

  const primaryButtonLabel = props.isEdit ? 'Save' : 'Submit Referral';
  const navigate = useNavigate();

  const [
    uploadFile,
    { data: fileData, isSuccess: isFileUploadSuccess, isError: isFileUploadError }
  ] = useUploadFileMutation();

  const [
    checkFile,
    {
      data: fileCheckData,
      isSuccess: isFileCheckSuccess,
      isError: isFileCheckError,
      error: fileCheckError
    }
  ] = useLazyCheckFileQuery();

  const updateReferralStatusCheck = () => {
    if (status.trim() === 'Hired') setShowHirePopup(true);
    else saveReferral();
  };

  const saveReferral = () => {
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
    if (isValidated)
      if (typeof resume === 'string' && resume.length > 0 && props.isEdit) {
        checkFile({ file: resume });
      } else {
        const formData = new FormData();

        formData.append('file', resume);
        uploadFile(formData);
      }
    else notifyError('Fill all required fields');
  };

  useEffect(() => {
    if (isFileUploadSuccess || (isFileCheckSuccess && fileCheckData.data.fileExists)) {
      const referral: ReferralType = {
        id: props.referral?.id,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        experience: Number(experience),
        referredById,
        openingId,
        status: status,
        resume: '',
        roleId,
        candidateCode: props.referral?.candidateCode,
        address: {
          line1: line1.trim(),
          line2: line2.trim(),
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          pincode: pincode.trim()
        }
      };

      if (isFileCheckSuccess && typeof resume === 'string') {
        referral.resume = resume;
      } else {
        referral.resume = fileData.data.file;
        setResume(fileData.data.file);
      }

      props.isEdit
        ? updateReferral({ id: props.referral.id, referral: referral })
        : createReferral(referral);
    } else if (isFileUploadError) {
      notifyError('Resume upload error');
    } else if ((isFileCheckSuccess && !fileCheckData.data.fileExists) || isFileCheckError) {
      notifyError('Re-upload Resume');
    }
  }, [
    isFileUploadSuccess,
    isFileUploadError,
    isFileCheckSuccess,
    isFileCheckError,
    fileCheckError
  ]);

  const [
    createReferral,
    {
      isSuccess: isCreateReferralSuccess,
      isError: isCreateReferralError,
      error: createReferralError
    }
  ] = useCreateReferralMutation();
  const [
    updateReferral,
    {
      isSuccess: isUpdateReferralSuccess,
      isError: isUpdateReferralError,
      error: updateReferralError
    }
  ] = useUpdateReferralMutation();

  const notifySuccess = (action: string) => toast.success(`Successfully ${action} referral`);
  const notifyError = (error: string) => toast.error(error);

  useEffect(() => {
    if (props.isEdit) {
      if (isUpdateReferralSuccess) {
        navigate(`${RouteConstants.referral}`, { replace: true });
        setTimeout(() => {
          notifySuccess('updated');
        }, 100);
      } else if (isUpdateReferralError) {
        notifyError(updateReferralError['data'].errors.error);
      }
    } else {
      if (isCreateReferralSuccess) {
        navigate(`${RouteConstants.referral}`, { replace: true });
        setTimeout(() => {
          notifySuccess('submitted');
        }, 100);
      } else if (isCreateReferralError) {
        notifyError(createReferralError['data'].errors.error);
      }
    }
  }, [
    isCreateReferralSuccess,
    isUpdateReferralSuccess,
    isCreateReferralError,
    isUpdateReferralError
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
          options={candidateStatuses}
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
          value={props.referral?.candidateCode}
          onChange={() => {}}
          label={'Referral Code'}
          placeholder={'Referral Code'}
          type={'text'}
          showError={false}
        />
      )}
      <div className='form-buttons'>
        <div className='form-primary-button'>
          <PrimaryButton
            type='submit'
            label={primaryButtonLabel}
            onClick={props.isEdit ? updateReferralStatusCheck : saveReferral}
          />
        </div>
        <SecondaryButton
          type='button'
          label='Cancel'
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      {showHirePopup && (
        <CustomPopup
          onConfirm={saveReferral}
          onCancel={() => {
            setShowHirePopup(false);
          }}
          subtext='A new employee will be created and changes cannot be reverted.'
        />
      )}
    </div>
  );
};

export default ReferralForm;
