import strings from './strings';

const {
  common: { approvalStatus }
} = strings;

export const statusEnum = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const allStatus = {
  [statusEnum.PENDING]: approvalStatus.pending,
  [statusEnum.APPROVED]: approvalStatus.approved,
  [statusEnum.REJECTED]: approvalStatus.rejected
};

export const statusOptions = [
  {
    name: allStatus[statusEnum.PENDING],
    value: statusEnum.PENDING
  },
  {
    name: allStatus[statusEnum.APPROVED],
    value: statusEnum.APPROVED
  },
  {
    name: allStatus[statusEnum.REJECTED],
    value: statusEnum.REJECTED
  }
];

export const status = allStatus;
