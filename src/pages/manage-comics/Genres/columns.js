import strings from 'constants/strings';

const {
  common: { columns: columnStrings }
} = strings;

const columns = [
  {
    field: 'key',
    headerName: columnStrings.uniqueKey,
    minWidth: 100,
    flex: 1
  },
  {
    field: 'name',
    headerName: columnStrings.name,
    minWidth: 200,
    flex: 1
  },
  {
    field: 'description',
    headerName: columnStrings.description,
    minWidth: 300,
    flex: 2
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
    width: 200
  }
];

export default columns;
