/* eslint-disable camelcase */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// material-ui
import { Button, Stack, IconButton, CardMedia, Box, Typography, Grid, Chip } from '@mui/material';
import { Refresh as RefreshIcon, Edit as EditIcon } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Rating from 'ui-component/Rating';
import ManageChapters from './ManageChapters';

/// uppy
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

// utils
// eslint-disable-next-line import/no-extraneous-dependencies
import resolveImgUrl from 'utils/resolveImageUrl';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

// react query
import { useQuery } from 'react-query';
import { COMIC } from 'query/queryKeys';
import { getAuthorComic } from 'apis/comicAuthor';

// ==============================|| SAMPLE PAGE ||============================== //

const ComicDetail = () => {
  const { comicId } = useParams();
  const navigate = useNavigate();
  const comicQuery = useQuery([COMIC, comicId], () => getAuthorComic(comicId, { params: { scope: 'manageDetail' } }));
  const refresh = () => {
    comicQuery.refetch();
  };

  if (comicQuery.isFetched && comicQuery.isError) {
    const message = getAPIErrorMessage(comicQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (comicQuery.isLoading) {
    return <Spinner />;
  }
  const { title, description, cover, rating, numFavorites, authors, genres, formats } = comicQuery.data;
  return (
    <MainCard
      title={`Comic ${comicQuery.data.title}`}
      secondary={
        <Stack direction="row" spacing={1}>
          <IconButton onClick={refresh}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={() => navigate(`/comics/${comicId}/update`)}>
            <EditIcon />
          </IconButton>
        </Stack>
      }
    >
      <Box position="relative" marginBottom={2}>
        <Stack direction="row" flexWrap="wrap">
          <Box mr={2} marginBottom={2}>
            <CardMedia
              component="img"
              src={resolveImgUrl(cover)}
              sx={(theme) => ({
                width: 120,
                height: 160,
                [theme.breakpoints.up('md')]: {
                  width: 150,
                  height: 200
                },
                [theme.breakpoints.up('lg')]: {
                  width: 200,
                  height: 280
                }
              })}
              alt={title}
            />
          </Box>
          <Stack direction="column" flex={1}>
            <Box marginBottom={2}>
              <Typography variant="h1">{title}</Typography>
            </Box>
            <Grid container alignItems="center" marginBottom={1}>
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Typography fontWeight="bold">Rating</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                <Typography fontWeight="bold">{rating ? <Rating rating={rating} /> : 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" marginBottom={1}>
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Typography fontWeight="bold">Favorites</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                <Typography fontWeight="bold">{numFavorites || 'N/A'}</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" marginBottom={1}>
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Typography fontWeight="bold">Authors</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                {authors && authors.length
                  ? authors.map(({ id, name }) => (
                      <Box key={id} mr={1} display="inline-block" padding={0.2}>
                        <Chip size="small" label={name} />
                      </Box>
                    ))
                  : 'N/A'}
              </Grid>
            </Grid>
            <Grid container alignItems="center" marginBottom={1}>
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Typography fontWeight="bold">Genres</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                {genres && genres.length
                  ? genres.map(({ id, name }) => (
                      <Box key={id} mr={1} display="inline-block" padding={0.2}>
                        <Chip size="small" label={name} />
                      </Box>
                    ))
                  : 'N/A'}
              </Grid>
            </Grid>
            <Grid container alignItems="center" marginBottom={1}>
              <Grid item xs={12} sm={4} md={2} lg={1}>
                <Typography fontWeight="bold">Formats</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={10} lg={11}>
                {formats && formats.length
                  ? formats.map(({ id, name }) => (
                      <Box key={id} mr={1} display="inline-block" padding={0.2}>
                        <Chip size="small" label={name} />
                      </Box>
                    ))
                  : 'N/A'}
              </Grid>
            </Grid>
            <Box>
              <Typography fontWeight="bold">Description: </Typography>
              <Typography>{description}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box>
        <Box marginBottom={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h2">Chapters</Typography>
            <Button variant="outlined" onClick={() => navigate(`/comics/${comicId}/chapters/upload`)}>
              Upload new chapter
            </Button>
          </Stack>
        </Box>
        <Box>
          <ManageChapters />
        </Box>
      </Box>
    </MainCard>
  );
};

export default ComicDetail;
