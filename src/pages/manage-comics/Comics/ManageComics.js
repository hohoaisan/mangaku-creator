/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// material-ui
import { Button, IconButton, Box, Tabs, Tab, Pagination, Grid } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

import DeleteComic from './DeleteComic';
import RestoreComic from './RestoreComic';

// react query
import { useQuery } from 'react-query';
import { COMICS } from 'query/queryKeys';
import { getAllComics } from 'apis/comic';

// utils
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Search from 'ui-component/Search';
import ComicManageCard from 'ui-component/ComicManageCard';
// import columns from './columns';
import useSearchParams from 'hooks/useSearchParams';
import resolveImgUrl from 'utils/resolveImageUrl';

const scopes = [
  {
    label: 'Default',
    key: 'manageVisible'
  },
  {
    label: 'Deleted',
    key: 'manageDeleted'
  }
];

const initParams = {
  scope: 'manageVisible',
  page: 1,
  limit: 9,
  search: '',
  sortBy: 'createdAt:DESC'
};

const ManageComics = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useSearchParams(initParams);
  const [currentTab, setCurrentTab] = useState(scopes.findIndex(({ key }) => key === queries.scope));
  const comicsQuery = useQuery([COMICS, queries], () => getAllComics(queries), {
    keepPreviousData: true
  });
  const [selectedItem, setSelectedItem] = React.useState(null);

  const [openModal, setOpenModal] = React.useState({
    restore: false,
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
      restore: false,
      delete: false
    });
  };

  const handleTabChange = (event, newTabIndex) => {
    setCurrentTab(newTabIndex);
    setQueries({
      ...queries,
      scope: scopes[newTabIndex].key,
      page: 1
    });
  };

  const refresh = () => {
    comicsQuery.refetch();
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

  if (comicsQuery.isFetched && comicsQuery.isError) {
    const message = getAPIErrorMessage(comicsQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (comicsQuery.isLoading) {
    return <Spinner />;
  }
  return (
    <MainCard
      title="Manage Comics"
      secondary={
        <Box display="flex">
          <Search key="search" name="search" onSubmit={handleSearchSubmit} initialValue={queries.search} />
          <IconButton key="refresh" sx={{ marginRight: 2 }} onClick={handleRefreshClick}>
            <RefreshIcon />
          </IconButton>
          <Button key="create" variant="contained" to="/comics/create" LinkComponent={Link}>
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
      <Box height={600} width="100%" sx={{ overflowY: 'scroll' }} mb={2}>
        {comicsQuery.data?.data?.length ? (
          <Grid container spacing={2}>
            {comicsQuery.data?.data.map(
              ({ id, cover, title, description, authors, approval_status, rating, numFavorites, createdAt, updatedAt, deletedAt }) => (
                <Grid key={id} item xs={12} sm={6} md={4}>
                  <ComicManageCard
                    title={title}
                    description={description}
                    authors={authors}
                    url={resolveImgUrl(cover)}
                    rating={rating}
                    approval={approval_status}
                    numFavorites={numFavorites}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    deletedAt={deletedAt}
                    onClick={() => navigate(`/comics/${id}`)}
                    onUpdate={() => navigate(`/comics/${id}/update`)}
                    onDelete={() => {
                      setSelectedItem({
                        name: title,
                        id
                      });
                      handleOpenModal('delete');
                    }}
                    onRestore={() => {
                      setSelectedItem({
                        name: title,
                        id
                      });
                      handleOpenModal('restore');
                    }}
                  />
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <Box sx={{ width: '100%', height: '100%' }}>
            <Error refresh={refresh}>No data found</Error>
          </Box>
        )}
        {openModal.delete && <DeleteComic open={openModal.delete} onClose={handleCloseModal} selectedItem={selectedItem} />}
        {openModal.restore && <RestoreComic open={openModal.restore} onClose={handleCloseModal} selectedItem={selectedItem} />}
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={comicsQuery.data.pages}
          defaultPage={1}
          size="large"
          onChange={(event, newPage) => {
            setQueries({
              ...queries,
              page: newPage
            });
          }}
        />
      </Box>
    </MainCard>
  );
};

export default ManageComics;
