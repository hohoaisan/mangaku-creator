import React, { useState, useMemo, useCallback } from 'react';
// material-ui
import { IconButton, Box, Tabs, Tab, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Refresh as RefreshIcon, Delete as DeleteIcon, Edit as EditIcon, Restore as RestoreFromTrashIcon } from '@mui/icons-material';

import { useParams, useNavigate } from 'react-router-dom';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

import DeleteChapter from './DeleteChapter';
import RestoreChapter from './RestoreChapter';
// react query
import { useQuery } from 'react-query';
import { CHAPTERS } from 'query/queryKeys';
import { getAllChapters } from 'apis/chapter';

// utils
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import useSearchParams from 'hooks/useSearchParams';
import ApprovalStatus from 'ui-component/ApprovalStatus';
import strings from 'constants/strings';

const {
  common: { columns: columnStrings, tabs },
  entities: { chapter: chapterStrings }
} = strings;

const columns = [
  {
    field: 'number',
    headerName: chapterStrings.number,
    minWidth: 120,
    flex: 1
  },
  {
    field: 'volume',
    headerName: chapterStrings.volume,
    minWidth: 120,
    flex: 1
  },
  {
    field: 'name',
    headerName: chapterStrings.name,
    minWidth: 120,
    flex: 2
  },
  {
    field: 'numPages',
    headerName: chapterStrings.numPages,
    minWidth: 120,
    flex: 1
  },
  {
    field: 'approval_status',
    headerName: columnStrings.approvalStatus,
    minWidth: 120,
    flex: 1,
    renderCell: (rowParams) => <ApprovalStatus approval={rowParams.value} />
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

const scopes = [
  {
    label: tabs.default,
    key: 'manageVisible',
    hidden: ['deletedAt']
  },
  {
    label: tabs.pending,
    key: 'managePending',
    hidden: ['deletedAt']
  },
  {
    label: tabs.rejected,
    key: 'manageRejected',
    hidden: ['deletedAt']
  },
  {
    label: tabs.deleted,
    key: 'manageDeleted',
    hidden: ['updatedAt']
  }
];

const initParams = {
  scope: 'manageVisible',
  page: 1,
  limit: 10
};

const ManageChapters = () => {
  const { comicId } = useParams();
  const navigate = useNavigate();
  const [queries, setQueries] = useSearchParams(initParams);
  const [currentTab, setCurrentTab] = useState(scopes.findIndex(({ key }) => key === queries.scope));
  const chapterQuery = useQuery([CHAPTERS, comicId, queries], () => getAllChapters(comicId, queries), {
    keepPreviousData: true
  });
  const [selectedItem, setSelectedItem] = React.useState(null);

  const [openModal, setOpenModal] = React.useState({
    restore: false,
    delete: false
  });

  const handleOpenModal = useCallback(
    (modal) => {
      setOpenModal({
        ...openModal,
        [modal]: true
      });
    },
    [setOpenModal, openModal]
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal({
      restore: false,
      delete: false
    });
  }, []);

  const handleActionItemClick = useCallback(
    (params, modal) => () => {
      setSelectedItem(params.row);
      handleOpenModal(modal);
    },
    [setSelectedItem, handleOpenModal]
  );

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
                  onClick={() => navigate(`/comics/${comicId}/chapters/${params.row.id}`)}
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
    [currentTab, comicId, handleActionItemClick, navigate]
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
    chapterQuery.refetch();
  };

  const handleRefreshClick = () => {
    refresh();
  };

  if (chapterQuery.isFetched && chapterQuery.isError) {
    const message = getAPIErrorMessage(chapterQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (chapterQuery.isLoading) {
    return <Spinner />;
  }
  return (
    <Box mb={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={2}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {scopes.map(({ label, key }) => (
            <Tab key={key} label={label} />
          ))}
        </Tabs>
        <IconButton onClick={handleRefreshClick}>
          <RefreshIcon />
        </IconButton>
      </Stack>
      <Box height={600} width="100%">
        <DataGrid
          columns={columnsWithActions}
          rows={chapterQuery.data?.data || []}
          page={Number.parseInt(queries.page, 10) - 1}
          pageSize={Number.parseInt(queries.limit, 10)}
          rowCount={chapterQuery.data?.total}
          onPageChange={(newPage) => setQueries({ page: newPage + 1 })}
          pagination
          paginationMode="server"
        />
        {openModal.delete && <DeleteChapter open={openModal.delete} onClose={handleCloseModal} selectedItem={selectedItem} />}
        {openModal.restore && <RestoreChapter open={openModal.restore} onClose={handleCloseModal} selectedItem={selectedItem} />}
      </Box>
    </Box>
  );
};

export default ManageChapters;
