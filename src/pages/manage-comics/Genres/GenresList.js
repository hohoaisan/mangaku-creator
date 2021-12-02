import * as React from 'react';
// material-ui
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

import UpdateGenre from './UpdateGenre';
import DeleteGenre from './DeleteGenre';

// react query
import { useQuery } from 'react-query';
import { GENRES } from 'query/queryKeys';
import { getAllGenres } from 'apis/genre';

// utils
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

import columns from './columns';

const GenresList = ({ search }) => {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [openModal, setOpenModal] = React.useState({
    update: false,
    delete: false
  });
  const genresQuery = useQuery([GENRES, { search }], () => getAllGenres({ search }), {
    keepPreviousData: true
  });

  const refresh = () => {
    genresQuery.refetch();
  };

  if (genresQuery.isFetched && genresQuery.isError) {
    const message = getAPIErrorMessage(genresQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (genresQuery.isLoading) {
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
      <DataGrid columns={columnsWithActions} rows={genresQuery.data || []} />
      {openModal.update && <UpdateGenre open={openModal.update} onClose={handleCloseModal} selectedItem={selectedItem} />}
      {openModal.delete && <DeleteGenre open={openModal.delete} onClose={handleCloseModal} selectedItem={selectedItem} />}
    </>
  );
};

export default GenresList;
