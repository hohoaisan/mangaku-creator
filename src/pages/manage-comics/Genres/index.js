import * as React from 'react';
// material-ui
import { Button, IconButton, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Search from 'ui-component/Search';
import GenresList from './GenresList';
import CreateGenre from './CreateGenre';

// react query
import queryClient from 'query';
import { GENRES } from 'query/queryKeys';

import strings from 'constants/strings';

const {
  buttons,
  pages: { genre: genrePageStrings }
} = strings;

const ManageGenres = () => {
  const [searchQuery, setSearchQuery] = React.useState(null);

  const [openCreateModal, setOpenCreateModal] = React.useState(false);

  const handleCreateClickOpen = () => {
    setOpenCreateModal(true);
  };

  const handleModalClose = () => {
    setOpenCreateModal(false);
  };
  const handleRefreshClick = () => {
    queryClient.invalidateQueries(GENRES);
  };

  const handleSearchSubmit = (value) => setSearchQuery(value);
  return (
    <MainCard
      title={genrePageStrings.manage}
      secondary={
        <Box display="flex">
          <Search key="search" name="search" onSubmit={handleSearchSubmit} />
          <IconButton key="refresh" sx={{ marginRight: 2 }} onClick={handleRefreshClick}>
            <RefreshIcon />
          </IconButton>
          <Button key="create" variant="contained" onClick={handleCreateClickOpen}>
            {buttons.create}
          </Button>
        </Box>
      }
    >
      <Box height={600} width="100%">
        <GenresList search={searchQuery} />
      </Box>
      <CreateGenre open={openCreateModal} onClose={handleModalClose} />
    </MainCard>
  );
};

export default ManageGenres;
