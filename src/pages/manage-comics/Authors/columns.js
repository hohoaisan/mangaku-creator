import { Chip, Avatar } from '@mui/material';
import { status, statusEnum } from 'constants/approvalStatus';
import strings from 'constants/strings';

const {
  common: { columns: columnStrings }
} = strings;

const columns = [
  {
    field: 'name',
    headerName: columnStrings.name,
    minWidth: 200,
    flex: 1
  },
  {
    field: 'description',
    headerName: columnStrings.description,
    minWidth: 200,
    flex: 1.5
  },
  {
    field: 'user',
    headerName: columnStrings.authorUser,
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
    headerName: columnStrings.approvalStatus,
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
    headerName: columnStrings.restricted,
    width: 120,
    renderCell: (rowParams) =>
      rowParams.value ? <Chip color="error" label="Restrict" size="small" /> : <Chip color="success" label="Normal" size="small" />
  },
  {
    field: 'createdAt',
    headerName: columnStrings.createdAt,
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
    headerName: columnStrings.deletedAt,
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
    headerName: columnStrings.updatedAt,
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
