const allStatus = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
};

const statuses = Object.keys(allStatus);

module.exports = {
  statuses,
  status: allStatus
};
