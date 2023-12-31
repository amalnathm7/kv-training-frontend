import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import SubHeader, { FilterType } from '../../components/sub-header/SubHeader';
import React, { useContext, useEffect } from 'react';
import './HomeLayout.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { AuthorizationContext, SelectedContext } from '../../app';
import { ToastContainer, toast } from 'react-toastify';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetMyProfileQuery } from '../../services/employeeApi';

type HomeLayoutPropsType = {
  subHeaderLabel: string;
  subHeaderPrimaryActionLabel: string;
  subHeaderPrimaryActionIcon: string;
  subHeaderPrimaryActionValue?: string;
  subHeaderPrimaryActionPlaceholder?: string;
  subHeaderPrimaryAction: (e) => void;
  subHeaderSecondaryActionLabel?: string;
  subHeaderSecondaryActionIcon?: string;
  subHeaderSecondaryActionPlaceholder?: string;
  subHeaderSecondaryAction?: (e) => void;
  subHeaderRouteOptions?: string[];
  subHeaderOnRouteChanged?: (event) => void;
  subHeaderFilters?: FilterType[];
};

const HomeLayout: React.FC<HomeLayoutPropsType> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data,
    isSuccess: isMyProfileFetchSuccess,
    isError: isMyProfileFetchFailed
  } = useGetMyProfileQuery();
  const { id } = useParams();
  const { setSelectedTabIndex, isMyReferralsSelected } = useContext(SelectedContext);
  const { setMyProfile } = useContext(SelectedContext);
  const authorizationContext = useContext(AuthorizationContext);

  useEffect(() => {
    if (isMyProfileFetchSuccess) {
      setMyProfile(data?.data);
      if (data?.data.role?.permissionLevel === PermissionLevel.SUPER) {
        authorizationContext.setIsSuperAuthorized(true);
        authorizationContext.setIsAdvanceAuthorized(false);
        authorizationContext.setIBasicAuthorized(false);
      } else if (data?.data.role?.permissionLevel === PermissionLevel.ADVANCED) {
        authorizationContext.setIsSuperAuthorized(false);
        authorizationContext.setIsAdvanceAuthorized(true);
        authorizationContext.setIBasicAuthorized(false);
      } else if (data?.data.role?.permissionLevel === PermissionLevel.BASIC) {
        authorizationContext.setIsSuperAuthorized(false);
        authorizationContext.setIsAdvanceAuthorized(false);
        authorizationContext.setIBasicAuthorized(true);
      }
    }
    if (isMyProfileFetchFailed) {
      authorizationContext.setIsSuperAuthorized(false);
      authorizationContext.setIsAdvanceAuthorized(false);
      authorizationContext.setIBasicAuthorized(true);
    }
  }, [isMyProfileFetchSuccess, data, isMyProfileFetchFailed]);

  useEffect(() => {
    if (
      !localStorage.getItem('token') &&
      location.pathname !== RouteConstants.opening &&
      location.pathname !== `${RouteConstants.opening}/${id}` &&
      location.pathname !== `${RouteConstants.opening}/${id}/apply` &&
      location.pathname !== `${RouteConstants.application}/${id}`
    )
      navigate(-1);
  }, []);

  useEffect(() => {
    if (location.pathname.includes(RouteConstants.employee)) setSelectedTabIndex(0);
    else if (
      location.pathname.includes(RouteConstants.opening) ||
      authorizationContext.isBasicAuthorized
    )
      setSelectedTabIndex(1);
    else if (location.pathname.includes(RouteConstants.application)) setSelectedTabIndex(2);
    else if (location.pathname.includes(RouteConstants.referral)) setSelectedTabIndex(3);
    else setSelectedTabIndex(0);
  });

  useEffect(() => {
    if (
      authorizationContext.isAdvanceAuthorized &&
      location.pathname.includes(RouteConstants.application)
    )
      navigate(-1);
  });
  useEffect(() => {
    if (
      authorizationContext.isAdvanceAuthorized &&
      location.pathname.includes(RouteConstants.application)
    )
      navigate(-1);
  });
  useEffect(() => {
    if (
      localStorage.getItem('token') &&
      (location.pathname === RouteConstants.referral ||
        location.pathname === RouteConstants.myReferral)
    )
      if (isMyReferralsSelected) navigate(RouteConstants.myReferral);
      else navigate(RouteConstants.referral);
  }, [isMyReferralsSelected]);

  return (
    <div className='home'>
      {props.children}
      <SubHeader
        routeOptions={props.subHeaderRouteOptions}
        onRouteChanged={props.subHeaderOnRouteChanged}
        label={props.subHeaderLabel}
        primaryAction={props.subHeaderPrimaryAction}
        primaryActionLabel={props.subHeaderPrimaryActionLabel}
        primaryActionIcon={props.subHeaderPrimaryActionIcon}
        primaryActionValue={props.subHeaderPrimaryActionValue}
        primaryActionPlaceholder={props.subHeaderPrimaryActionPlaceholder}
        secondaryAction={props.subHeaderSecondaryAction}
        secondaryActionLabel={props.subHeaderSecondaryActionLabel}
        secondaryActionIcon={props.subHeaderSecondaryActionIcon}
        filters={props.subHeaderFilters ?? []}
      />
      <Sidebar />
      <Header />
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={1500}
        hideProgressBar={true}
      />
    </div>
  );
};

export default HomeLayout;
