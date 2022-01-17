import { Chip } from '@mui/material';
import { roleNames } from 'configs/roles';
import strings from 'constants/strings';

const {
  common: { columns: columnStrings },
  entities: { user: userStrings }
} = strings;
const columns = [
  {
    field: 'name',
    headerName: userStrings.name,
    minWidth: 200,
    flex: 1
  },
  {
    field: 'role',
    headerName: userStrings.role,
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
    headerName: userStrings.email,
    minWidth: 200,
    flex: 1.5
  },
  {
    field: 'emailVerified',
    headerName: userStrings.emailVerified,
    width: 120,
    renderCell: (rowParams) =>
      rowParams.value ? (
        <Chip color="success" label={userStrings.verified} size="small" />
      ) : (
        <Chip color="error" label={userStrings.notVerified} size="small" />
      )
  },
  {
    field: 'banned',
    headerName: userStrings.banned,
    width: 120,
    renderCell: (rowParams) => (rowParams.value ? <Chip color="error" label={userStrings.banned} size="small" /> : '')
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
