const columns = [
  {
    field: 'key',
    headerName: 'Unique key',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    flex: 1
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 300,
    flex: 2
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
    width: 200
  }
];

export default columns;
