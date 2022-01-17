import React, { useState, useEffect, useMemo } from 'react';
// material-ui
import { Button, IconButton, Box, Tabs, Tab } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Refresh as RefreshIcon, Delete as DeleteIcon, Edit as EditIcon, Restore as RestoreFromTrashIcon } from '@mui/icons-material';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import CreateUser from './CreateUser';
import RestoreUser from './RestoreUser';

// react query
import { useQuery } from 'react-query';
import { USERS } from 'query/queryKeys';
import { getAllUsers } from 'apis/user';

// utils
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Search from 'ui-component/Search';

import columns from './columns';
import useSearchParams from 'hooks/useSearchParams';
import strings from 'constants/strings';

const {
  pages: { user: userPageStrings },
  buttons,
  common: { tabs }
} = strings;

const scopes = [
  {
    label: tabs.default,
    key: 'visible',
    hidden: ['deletedAt']
  },
  {
    label: tabs.deleted,
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

const ManageUsers = () => {
  const [queries, setQueries] = useSearchParams(initParams);
  const [currentTab, setCurrentTab] = useState(scopes.findIndex(({ key }) => key === queries.scope));
  const usersQuery = useQuery([USERS, queries], () => getAllUsers(queries), {
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
      ...queries,
      scope: scopes[newTabIndex].key,
      page: 1
    });
  };

  const refresh = () => {
    usersQuery.refetch();
  };

  const handleRefreshClick = () => {
    refresh();
  };

  const handleSearchSubmit = (value) =>
    setQueries({
      ...queries,
      page: 1,
      search: value
    });

  if (usersQuery.isFetched && usersQuery.isError) {
    const message = getAPIErrorMessage(usersQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (usersQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <MainCard
      title={userPageStrings.manage}
      secondary={
        <Box display="flex">
          <Search key="search" name="search" onSubmit={handleSearchSubmit} initialValue={queries.search} />
          <IconButton key="refresh" sx={{ marginRight: 2 }} onClick={handleRefreshClick}>
            <RefreshIcon />
          </IconButton>
          <Button key="create" variant="contained" onClick={() => handleOpenModal('create')}>
            {buttons.create}
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
          rows={usersQuery.data?.data || []}
          page={Number.parseInt(queries.page, 10) - 1}
          pageSize={Number.parseInt(queries.limit, 10)}
          rowCount={usersQuery.data?.total}
          onPageChange={(newPage) => setQueries({ page: newPage + 1 })}
          pagination
          paginationMode="server"
        />
        {openModal.update && <UpdateUser open={openModal.update} onClose={handleCloseModal} selectedItem={selectedItem} />}
        {openModal.delete && <DeleteUser open={openModal.delete} onClose={handleCloseModal} selectedItem={selectedItem} />}
        {openModal.restore && <RestoreUser open={openModal.restore} onClose={handleCloseModal} selectedItem={selectedItem} />}
      </Box>
      <CreateUser open={openModal.create} onClose={handleCloseModal} />
    </MainCard>
  );
};

export default ManageUsers;
