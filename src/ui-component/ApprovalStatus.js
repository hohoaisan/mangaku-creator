import React from 'react';
import { Chip } from '@mui/material';
import { status } from 'constants/approvalStatus';
import PropsType from 'prop-types';

const ApprovalStatus = ({ approval }) => {
  switch (approval) {
    case 'APPROVED': {
      return <Chip color="success" label={status.APPROVED} size="small" />;
    }
    case 'PENDING': {
      return <Chip color="warning" label={status.PENDING} size="small" />;
    }
    case 'REJECTED': {
      return <Chip color="error" label={status.REJECTED} size="small" />;
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
