const { default: strings } = require('./strings');

const {
  common: { approvalStatus }
} = strings;

const statusEnum = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const allStatus = {
  [statusEnum.PENDING]: approvalStatus.pending,
  [statusEnum.APPROVED]: approvalStatus.approved,
  [statusEnum.REJECTED]: approvalStatus.rejected
};

const statusOptions = [
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

module.exports = {
  statusEnum,
  statusOptions,
  status: allStatus
};
