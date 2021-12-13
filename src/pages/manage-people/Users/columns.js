import { Chip } from '@mui/material';
import { roleNames } from 'configs/roles';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    flex: 1
  },
  {
    field: 'role',
    headerName: 'Role',
    minWidth: 120,
    flex: 1,
    renderCell: (rowParams) => {
      if (rowParams.value in roleNames) {
        return <Chip color="success" label={roleNames[rowParams.value]} size="small" />;
      }
      return <Chip label="N/A" size="small" />;
    }
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 200,
    flex: 1.5
  },
  {
    field: 'emailVerified',
    headerName: 'Verifed',
    width: 120,
    renderCell: (rowParams) =>
      rowParams.value ? <Chip color="success" label="Verified" size="small" /> : <Chip color="error" label="Not verified" size="small" />
  },
  {
    field: 'banned',
    headerName: 'Banned',
    width: 120,
    renderCell: (rowParams) =>
      rowParams.value ? <Chip color="error" label="Banned" size="small" /> : <Chip color="success" label="Normal" size="small" />
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
