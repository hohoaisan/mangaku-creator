import React, { useState, useEffect, useMemo } from 'react';
// material-ui
import { Button, IconButton, Box, Tabs, Tab } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Refresh as RefreshIcon, Delete as DeleteIcon, Edit as EditIcon, Restore as RestoreFromTrashIcon } from '@mui/icons-material';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

import UpdateAuthor from './UpdateAuthor';
import DeleteAuthor from './DeleteAuthor';
import CreateAuthor from './CreateAuthor';
import RestoreAuthor from './RestoreAuthor';

// react query
import queryClient from 'query';
import { useQuery } from 'react-query';
import { AUTHORS } from 'query/queryKeys';
import { getAllAuthors } from 'apis/author';

// utils
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Search from 'ui-component/Search';

import columns from './columns';
import useSearchParams from 'hooks/useSearchParams';

const scopes = [
  {
    label: 'Default',
    key: 'visible',
    hidden: ['deletedAt']
  },
  {
    label: 'Deleted',
    key: 'deleted',
    hidden: ['updatedAt']
  }
];

const initParams = {
  scope: 'visible',
  page: 1,
  limit: 10,
  search: '',
  sortBy: 'createdAt:DESC'
};

const ManageAuthors = () => {
  const [queries, setQueries] = useSearchParams(initParams);
  const [currentTab, setCurrentTab] = useState(scopes.findIndex(({ key }) => key === queries.scope));
  const authorsQuery = useQuery([AUTHORS, queries], () => getAllAuthors(queries), {
    keepPreviousData: true
  });
  const [selectedItem, setSelectedItem] = React.useState(null);

  const [openModal, setOpenModal] = React.useState({
    create: false,
    restore: false,
    update: false,
    delete: false
  });

  const handleOpenModal = (modal) => {
    setOpenModal({
      ...openModal,
      [modal]: true
    });
  };

  const handleCloseModal = () => {
    setOpenModal({
      create: false,
      restore: false,
      update: false,
      delete: false
    });
  };

  const handleActionItemClick = (params, modal) => () => {
    setSelectedItem(params.row);
    handleOpenModal(modal);
  };

  const columnsWithActions = useMemo(
    () => [
      ...columns.filter(({ field }) => scopes[currentTab].hidden.indexOf(field) < 0),
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) =>
          !params.row.deletedAt
            ? [
                <GridActionsCellItem
                  key="update-item"
                  onClick={handleActionItemClick(params, 'update')}
                  icon={<EditIcon />}
                  label="Edit"
                />,
                <GridActionsCellItem
                  key="delete-item"
                  onClick={handleActionItemClick(params, 'delete')}
                  icon={<DeleteIcon />}
                  label="Delete"
                />
              ]
            : [
                <GridActionsCellItem
                  key="restore-item"
                  onClick={handleActionItemClick(params, 'restore')}
                  icon={<RestoreFromTrashIcon />}
                  label="Restore"
                />
              ]
      }
    ],
    [currentTab]
  );
  const handleTabChange = (event, newTabIndex) => {
    setCurrentTab(newTabIndex);
    setQueries({
      scope: scopes[newTabIndex].key
    });
  };

  const refresh = () => {
    authorsQuery.refetch();
  };

  const handleRefreshClick = () => {
    refresh();
  };

  const handleSearchSubmit = (value) =>
    setQueries({
      page: 1,
      search: value
    });

  if (authorsQuery.isFetched && authorsQuery.isError) {
    const message = getAPIErrorMessage(authorsQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (authorsQuery.isLoading) {
    return <Spinner />;
  }
  console.log(queries);
  return (
    <MainCard
      title="Manage Authors"
      secondary={
        <Box display="flex">
          <Search key="search" name="search" onSubmit={handleSearchSubmit} initialValue={queries.search} />
          <IconButton key="refresh" sx={{ marginRight: 2 }} onClick={handleRefreshClick}>
            <RefreshIcon />
          </IconButton>
          <Button key="create" variant="contained" onClick={() => handleOpenModal('create')}>
            Create
          </Button>
        </Box>
      }
    >
      <Box mb={2}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {scopes.map(({ label, key }) => (
            <Tab key={key} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box height={600} width="100%">
        <DataGrid
          columns={columnsWithActions}
          rows={authorsQuery.data?.data || []}
          page={Number.parseInt(queries.page, 10) - 1}
          pageSize={Number.parseInt(queries.limit, 10)}
          rowCount={authorsQuery.data?.total}
          onPageChange={(newPage) => setQueries({ page: newPage + 1 })}
          pagination
          paginationMode="server"
        />
        {openModal.update && <UpdateAuthor open={openModal.update} onClose={handleCloseModal} selectedItem={selectedItem} />}
        {openModal.delete && <DeleteAuthor open={openModal.delete} onClose={handleCloseModal} selectedItem={selectedItem} />}
        {openModal.restore && <RestoreAuthor open={openModal.restore} onClose={handleCloseModal} selectedItem={selectedItem} />}
      </Box>
      <CreateAuthor open={openModal.create} onClose={handleCloseModal} />
    </MainCard>
  );
};

export default ManageAuthors;
