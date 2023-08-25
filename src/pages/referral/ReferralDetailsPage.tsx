import Card, { CardItemType } from '../../components/card/Card';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApproveReferralMutation, useGetReferralByIdQuery } from '../../services/referralApi';
import { useGetFileUrlQuery } from '../../services/fileApi';
import { AuthorizationContext, SelectedContext } from '../../app';
import CustomPopup from '../../components/popup/CustomPopup';
import { toast } from 'react-toastify';

const ReferralDetailsPage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const [canEdit, setCanEdit] = useState(false);
  const [canEditBonusStatus, setCanEditBonusStatus] = useState(false);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: referralData, isSuccess } = useGetReferralByIdQuery(id);

  const { isSuperAuthorized } = useContext(AuthorizationContext);

  useEffect(() => {
    if (isSuccess) {
      const referral = referralData.data;

      setCanEdit(
        (isSuperAuthorized || myProfile?.id === referral.referredBy?.id) &&
          referral.status !== 'Hired'
      );
      setCanEditBonusStatus(
        referralData.data.status === 'Hired' &&
          (referral.bonusStatus === 'Eligible' || referral.bonusStatus === 'Processing')
      );
    }
  }, [isSuccess, isSuperAuthorized, myProfile, referralData]);

  const { data: resumeUrl } = useGetFileUrlQuery({
    fileName: referralData?.data.resume
  });

  let items: CardItemType[] = [];

  if (isSuccess) {
    const referral = referralData.data;

    items = [
      {
        label: 'Referral Code',
        value: referral.candidateCode
      },
      {
        label: 'Name',
        value: referral.name
      },
      {
        label: 'Email',
        value: referral.email
      },

      {
        label: 'Experience',
        value: referral.experience + ' Years'
      },
      {
        label: 'Phone',
        value: referral.phone
      },

      {
        label: 'Role',
        value: referral.role ? referral.role.role : 'NIL'
      },
      {
        label: 'Status',
        value: referral.status,
        isStatus: true
      },
      {
        label: 'Referred By ',
        value: referral.referredBy ? referral.referredBy.name : 'NIL'
      },
      {
        label: 'Opening Title',
        value: referral.opening ? referral.opening.title : 'NIL'
      },
      {
        label: 'Address',
        value:
          referral.address.line1 +
          ', ' +
          referral.address.line2 +
          ', ' +
          referral.address.city +
          ', ' +
          referral.address.state +
          ', ' +
          referral.address.country +
          ', ' +
          referral.address.pincode
      },
      {
        label: 'Resume',
        value: 'View Resume',
        filePath: resumeUrl
      },
      {
        label: 'Bonus Status',
        value: referral.bonusStatus,
        isStatus: true
      }
    ];
  }

  const onEditClicked = () => {
    navigate(window.location.pathname + '/edit');
  };

  const onApproveClicked = () => {
    const bonusStatus = referralData.data.bonusStatus;

    if (bonusStatus === 'Processing' || bonusStatus === 'Eligible') setShowApprovePopup(true);
  };

  const [approveReferral, { isSuccess: isApproveReferralSucess, isError: isApproveReferralError }] =
    useApproveReferralMutation();

  const onConfirmApprove = () => {
    approveReferral({ id: referralData.data.id });
  };

  useEffect(() => {
    if (isApproveReferralSucess) {
      setShowApprovePopup(false);
      toast.success('Successfully Approved Bonus');
    }
  }, [isApproveReferralSucess]);

  useEffect(() => {
    if (isApproveReferralError) {
      setShowApprovePopup(false);
      toast.error('Error Approving Bonus');
    }
  }, [isApproveReferralError]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={canEdit ? onEditClicked : null}
      subHeaderLabel='Referral Details'
      subHeaderPrimaryActionLabel={canEdit ? 'Edit' : ''}
      subHeaderPrimaryActionIcon={canEdit ? 'edit.svg' : ''}
      subHeaderSecondaryAction={canEditBonusStatus ? onApproveClicked : null}
      subHeaderSecondaryActionLabel={canEditBonusStatus ? 'Approve Bonus' : ''}
      subHeaderSecondaryActionIcon={canEditBonusStatus ? 'tick-white.svg' : ''}
    >
      <Card items={items}></Card>
      {showApprovePopup && (
        <CustomPopup
          onConfirm={onConfirmApprove}
          onCancel={() => {
            setShowApprovePopup(false);
          }}
          subtext={
            referralData.data.bonusStatus === 'Processing'
              ? 'Referral is still being processed. Do you still want to Approve the Bonus'
              : 'Do you really want to Approve Bonus for the referral?'
          }
        />
      )}
    </HomeLayout>
  );
};

export default ReferralDetailsPage;
