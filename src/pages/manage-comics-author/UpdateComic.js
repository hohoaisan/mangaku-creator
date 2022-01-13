import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// material-ui
import { TextField, FormControl, FormHelperText, Button, Stack, IconButton, FormLabel, Autocomplete, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useFormik } from 'formik';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ImageUploadToggle from 'ui-component/ImageUploadToggle';
import CoverImageCard from 'ui-component/CoverImageCard';
import { createSchema as validationSchema, formatComicFormData } from './helpers';

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
import { GENRES, FORMATS, COMICS, COMIC } from 'query/queryKeys';
import { getAllGenres } from 'apis/genre';
import { getAllFormats } from 'apis/format';
import { getAuthorComic, updateAuthorComic } from 'apis/comicAuthor';
import ToastService from 'services/toast.service';
import pick from 'utils/pick';

// ==============================|| SAMPLE PAGE ||============================== //

const initialValues = {
  title: '',
  description: '',
  genres: [],
  formats: [],
  covers: []
};

const UpdateComic = () => {
  const { comicId } = useParams();
  const comicQuery = useQuery([COMIC, comicId], () => getAuthorComic(comicId, { params: { scope: 'manageDetail' } }));

  const genresQuery = useQuery([GENRES], () => getAllGenres(), {
    keepPreviousData: true
  });

  const formatsQuery = useQuery([FORMATS], () => getAllFormats(), {
    keepPreviousData: true
  });
  const [openModal, setOpenModal] = useState({
    uploadCover: false
  });

  const uppy = useUppy();
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const formValues = formatComicFormData(values);
      await updateAuthorComic(comicId, formValues);
      queryClient.invalidateQueries(COMICS);
      ToastService.success('Comic updated');
      comicQuery.refetch();
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

  const resetForm = useCallback(() => {
    if (comicQuery.data) {
      const initialValue = pick(comicQuery.data, ['title', 'description', 'authors', 'genres', 'formats', 'covers']);
      setValues(initialValue);
    }
  }, [comicQuery.data, setValues]);

  useEffect(() => {
    resetForm();
  }, [comicQuery.data, resetForm]);

  if (!uppy) return null;
  uppy.on('complete', (result) => {
    if (result.successful) {
      const images = result.successful.map(({ response }) => ({ id: response.body.id, url: response.body.url, default: false }));
      if (!values.covers.length && images.length) {
        images[0].default = true;
      }
      setFieldValue('covers', [...values.covers, ...images]);
    }
  });
  const handleChangeDefaultCover = (id) => {
    const images = values.covers.map((image) => ({ ...image, default: image.id === id }));
    setFieldValue('covers', images);
  };
  const handleCoverDeletion = (id) => {
    const images = values.covers.filter((image) => image.id !== id);
    setFieldValue('covers', images);
  };

  const refresh = () => {
    comicQuery.refetch();
    genresQuery.refetch();
    formatsQuery.refetch();
  };

  if (comicQuery.isFetched && comicQuery.isError) {
    const message = getAPIErrorMessage(comicQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (genresQuery.isFetched && genresQuery.isError) {
    const message = getAPIErrorMessage(genresQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (formatsQuery.isFetched && formatsQuery.isError) {
    const message = getAPIErrorMessage(formatsQuery.error);
    return <Error refresh={refresh} message={message} />;
  }
  if (comicQuery.isLoading || genresQuery.isLoading || formatsQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <MainCard
      title="Update Comic"
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
      <Stack spacing={2} direction="column">
        <FormControl fullWidth error={Boolean(touched.title && errors.title)} required>
          <FormLabel>Title</FormLabel>
          <TextField
            required
            margin="dense"
            id="title"
            type="text"
            fullWidth
            variant="outlined"
            title="Title"
            value={values.title}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.title && errors.title && <FormHelperText error>{errors.title}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.description && errors.description)} required>
          <FormLabel>Description</FormLabel>
          <TextField
            required
            margin="dense"
            id="description"
            type="text"
            fullWidth
            variant="outlined"
            title="Description"
            value={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
            multiline
            minRows={3}
          />
          {touched.description && errors.description && <FormHelperText error>{errors.description}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.genres && errors.genres)} required>
          <FormLabel>Genres</FormLabel>
          <Autocomplete
            multiple
            options={genresQuery.data}
            getOptionLabel={(option) => option.name}
            value={values.genres}
            onChange={(event, values) => {
              handleChange(event);
              setFieldValue('genres', values);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterSelectedOptions
            renderInput={(params) => <TextField onBlur={handleBlur} name="genres" {...params} />}
          />
          {touched.genres && errors.genres && <FormHelperText error>{errors.genres}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.formats && errors.formats)} required>
          <FormLabel>Formats</FormLabel>
          <Autocomplete
            multiple
            options={formatsQuery.data}
            getOptionLabel={(option) => option.name}
            value={values.formats}
            onChange={(event, values) => {
              handleChange(event);
              setFieldValue('formats', values);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterSelectedOptions
            renderInput={(params) => <TextField onBlur={handleBlur} name="formats" {...params} />}
          />
          {touched.formats && errors.formats && <FormHelperText error>{errors.formats}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.covers && errors.covers)} required>
          <FormLabel>Covers</FormLabel>
          {touched.formats && errors.covers && <FormHelperText error>{errors.covers}</FormHelperText>}
          <Stack direction="row" flexWrap="wrap">
            {!!values?.covers?.length &&
              values.covers.map(({ id, url, ...props }) => (
                <Box minWidth="fit-content" key={id} display="inline-block" padding={1}>
                  <CoverImageCard
                    url={resolveImgUrl(url)}
                    checked={props.default}
                    onCheck={() => handleChangeDefaultCover(id)}
                    onRemove={() => handleCoverDeletion(id)}
                  />
                </Box>
              ))}
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
  );
};

export default UpdateComic;
