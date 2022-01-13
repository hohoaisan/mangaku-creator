import { Chip, Avatar } from '@mui/material';
import { status, statusEnum } from 'constants/approvalStatus';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    flex: 1
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 200,
    flex: 1.5
  },
  {
    field: 'user',
    headerName: 'Author User',
    minWidth: 100,
    flex: 1,
    renderCell: (rowParams) =>
      rowParams?.value?.name ? (
        <Chip
          avatar={<Avatar alt={rowParams.value.name} src="https://via.placeholder.com/30x30" />}
          label={rowParams.value.name}
          variant="outlined"
        />
      ) : (
        <Chip label="N/A" size="small" />
      )
  },
  {
    field: 'approval_status',
    headerName: 'Author approval',
    minWidth: 120,
    flex: 1,
    renderCell: (rowParams) => {
      switch (rowParams.value) {
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
    }
  },
  {
    field: 'restricted',
    headerName: 'Restricted',
    width: 120,
    renderCell: (rowParams) =>
      rowParams.value ? <Chip color="error" label="Restrict" size="small" /> : <Chip color="success" label="Normal" size="small" />
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    type: 'dateTime',
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
    valueParser: (value) => new Date(value).getTime(),
    width: 180
  },
  {
    field: 'deletedAt',
    headerName: 'Deleted at',
    type: 'dateTime',
    valueFormatter: (params) => {
      if (params.value) {
        const date = new Date(params.value);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }
      return 'N/A';
    },
    width: 200
  },
  {
    field: 'updatedAt',
    headerName: 'Last modified',
    type: 'dateTime',
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
    valueParser: (value) => new Date(value).getTime(),
    width: 180
  }
];

export default columns;
