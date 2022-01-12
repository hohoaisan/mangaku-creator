const statusEnum = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const allStatus = {
  [statusEnum.PENDING]: 'Pending',
  [statusEnum.APPROVED]: 'Approved',
  [statusEnum.REJECTED]: 'Rejected'
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
