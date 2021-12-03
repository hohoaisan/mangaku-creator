import * as React from 'react';
// material-ui
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

import UpdateFormat from './UpdateFormat';
import DeleteFormat from './DeleteFormat';

// react query
import { useQuery } from 'react-query';
import { FORMATS } from 'query/queryKeys';
import { getAllFormats } from 'apis/format';

// utils
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

import columns from './columns';

const FormatsList = ({ search }) => {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [openModal, setOpenModal] = React.useState({
    update: false,
    delete: false
  });
  const formatsQuery = useQuery([FORMATS, { search }], () => getAllFormats({ search }), {
    keepPreviousData: true
  });

  const refresh = () => {
    formatsQuery.refetch();
  };

  if (formatsQuery.isFetched && formatsQuery.isError) {
    const message = getAPIErrorMessage(formatsQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (formatsQuery.isLoading) {
    return <Spinner />;
  }
  const handleOpenModal = (modal) => {
    setOpenModal({
      [modal]: true
    });
  };

  const handleCloseModal = () => {
    setOpenModal({
      update: false,
      delete: false
    });
  };

  const handleActionItemClick = (params, modal) => () => {
    setSelectedItem(params.row);
    handleOpenModal(modal);
  };

  const columnsWithActions = [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem key="update-item" onClick={handleActionItemClick(params, 'update')} icon={<EditIcon />} label="Edit" />,
        <GridActionsCellItem key="delete-item" onClick={handleActionItemClick(params, 'delete')} icon={<DeleteIcon />} label="Delete" />
      ]
    }
  ];
  return (
    <>
      <DataGrid columns={columnsWithActions} rows={formatsQuery.data || []} />
      {openModal.update && <UpdateFormat open={openModal.update} onClose={handleCloseModal} selectedItem={selectedItem} />}
      {openModal.delete && <DeleteFormat open={openModal.delete} onClose={handleCloseModal} selectedItem={selectedItem} />}
    </>
  );
};

export default FormatsList;
