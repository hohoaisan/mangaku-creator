import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import pick from 'utils/pick';
// material-ui
import {
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Stack,
  Chip,
  IconButton,
  FormLabel,
  CardMedia,
  Box,
  Typography,
  Container,
  Grid
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Draggable } from 'react-drag-reorder';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ImageUploadToggle from 'ui-component/ImageUploadToggle';
import ChapterImageCard from 'ui-component/ChapterImageCard';
import { createChapterSchema as validationSchema, formatChapterFormData } from './helpers';

/// uppy
import useUppy from 'hooks/useUppy';
import { DashboardModal as UploadImageModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import Spinner from 'ui-component/api-process/Spinner';
import Error from 'ui-component/api-process/Error';

// utils
import resolveImgUrl from 'utils/resolveImageUrl';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

//

// react query
import queryClient from 'query';
import { useQuery } from 'react-query';
import { COMIC, CHAPTER } from 'query/queryKeys';
import { getAuthorComic } from 'apis/comicAuthor';
import { getChapter, updateComicChapter } from 'apis/chapterAuthor';
import ToastService from 'services/toast.service';

// ==============================|| SAMPLE PAGE ||============================== //

const initialValues = {
  number: 0,
  name: '',
  volume: 1,
  pages: []
};

const UpdateChapter = () => {
  const { comicId, chapterId } = useParams();
  const comicQuery = useQuery([COMIC, comicId], () => getAuthorComic(comicId, { params: { scope: 'manageDetail' } }));
  const chapterQuery = useQuery([CHAPTER, chapterId], () => getChapter(comicId, chapterId, { params: { scope: 'manageDetail' } }));

  const [openModal, setOpenModal] = useState({
    uploadCover: false
  });

  const uppy = useUppy();
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const formValues = formatChapterFormData(values);
      console.log(formValues);
      await updateComicChapter(comicId, chapterId, formValues);
      queryClient.invalidateQueries(CHAPTER);
      ToastService.success('Chapter updated');
    } catch (err) {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  const { handleSubmit, values, handleBlur, handleChange, touched, errors, setFieldValue, setValues } = useFormik({
    validationSchema,
    initialValues,
    onSubmit
  });

  const handlePageDeletion = useCallback(
    (id) => {
      const images = values.pages.filter((image) => image.imageId !== id);
      setFieldValue('pages', images);
    },
    [values.pages, setFieldValue]
  );

  const handlePagePositionChange = useCallback(
    (currentPos, newPos) => {
      const newOrder = [...values.pages];
      newOrder[newPos] = values.pages[currentPos];
      newOrder[currentPos] = values.pages[newPos];
      setFieldValue('pages', newOrder);
    },
    [values.pages, setFieldValue]
  );

  const resetForm = useCallback(() => {
    if (chapterQuery.data) {
      const initialValue = pick(chapterQuery.data, ['number', 'name', 'volume', 'pages']);
      setValues(initialValue);
    }
  }, [chapterQuery.data, setValues]);

  useEffect(() => {
    resetForm();
  }, [chapterQuery.data, resetForm]);

  const DraggableRender = useCallback(() => {
    if (values.pages && values.pages.length) {
      return (
        <Draggable onPosChange={handlePagePositionChange}>
          {values.pages.map(({ imageId, url }, index) => (
            <Box maxWidth="fit-content" key={imageId} padding={1}>
              <ChapterImageCard page={index + 1} url={resolveImgUrl(url)} onRemove={() => handlePageDeletion(imageId)} />
            </Box>
          ))}
        </Draggable>
      );
    }
    return null;
  }, [values.pages, handlePageDeletion, handlePagePositionChange]);

  if (!uppy) return null;
  uppy.on('complete', (result) => {
    if (result.successful) {
      const images = result.successful.map(({ response }) => ({ imageId: response.body.id, url: response.body.url }));
      setFieldValue('pages', [...values.pages, ...images]);
    }
  });

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
  const { title, cover, authors } = comicQuery.data;

  return (
    <Container>
      <MainCard
        title="Update chapter"
        secondary={
          <Stack direction="row" spacing={1}>
            <IconButton onClick={resetForm}>
              <RefreshIcon />
            </IconButton>
            <Button variant="contained" onClick={handleSubmit}>
              Update
            </Button>
          </Stack>
        }
      >
        <Box position="relative" marginBottom={2}>
          <Stack direction="row" flexWrap="wrap">
            <Box mr={2} marginBottom={2}>
              <CardMedia
                component="img"
                src={resolveImgUrl(cover)}
                sx={{
                  width: 80,
                  height: 100
                }}
                alt={title}
              />
            </Box>
            <Stack direction="column" flex={1}>
              <Box marginBottom={2}>
                <Typography variant="h3">{title}</Typography>
              </Box>
              <Box marginBottom={2}>
                {authors && authors.length
                  ? authors.map(({ id, name }) => (
                      <Box key={id} mr={1} display="inline-block" padding={0.2}>
                        <Chip size="small" label={name} />
                      </Box>
                    ))
                  : 'N/A'}
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Stack spacing={2} direction="column">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.number && errors.number)} required>
                <FormLabel>Number</FormLabel>
                <TextField
                  required
                  margin="dense"
                  id="number"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="number"
                  value={values.number}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.number && errors.number && <FormHelperText error>{errors.number}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(touched.volume && errors.volume)} required>
                <FormLabel>Volume</FormLabel>
                <TextField
                  required
                  margin="dense"
                  id="volume"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="volume"
                  value={values.volume}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.volume && errors.volume && <FormHelperText error>{errors.volume}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          <FormControl fullWidth error={Boolean(touched.name && errors.name)} required>
            <FormLabel>Name</FormLabel>
            <TextField
              required
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.pages && errors.pages)} required>
            <FormLabel>Pages</FormLabel>
            {touched.formats && errors.pages && <FormHelperText error>{errors.pages}</FormHelperText>}
            <Stack
              direction="row"
              flexWrap="wrap"
              sx={{
                '& .grabbable': {
                  flex: 'unset',
                  width: 'unset',
                  display: 'inline-block'
                }
              }}
            >
              <DraggableRender />
              <Box minWidth="fit-content" display="inline-block" padding={1}>
                <ImageUploadToggle onClick={() => setOpenModal({ ...openModal, uploadCover: true })} />
              </Box>
            </Stack>
          </FormControl>
        </Stack>
        <UploadImageModal
          uppy={uppy}
          open={openModal.uploadCover}
          onRequestClose={() => setOpenModal({ ...openModal, uploadCover: false })}
        />
      </MainCard>
    </Container>
  );
};

export default UpdateChapter;
