import React from 'react';
import { Chip } from '@mui/material';
import { status, statusEnum } from 'constants/approvalStatus';
import PropsType from 'prop-types';

const ApprovalStatus = ({ approval }) => {
  switch (approval) {
    case statusEnum.APPROVED: {
      return <Chip color="success" label={status[statusEnum.APPROVED]} size="small" />;
    }
    case statusEnum.PENDING: {
      return <Chip color="warning" label={status[statusEnum.PENDING]} size="small" />;
    }
    case statusEnum.REJECTED: {
      return <Chip color="error" label={status[statusEnum.REJECTED]} size="small" />;
    }
    default: {
      return <Chip label="N/A" size="small" />;
    }
  }
};

ApprovalStatus.propTypes = {
  approval: PropsType.string
};

export default ApprovalStatus;
