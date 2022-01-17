import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText } from '@mui/material';

// formik
import * as Yup from 'yup';

// react query
import queryClient from 'query';
import { GENRES } from 'query/queryKeys';
import { createGenre } from 'apis/genre';

import ToastService from 'services/toast.service';

// formik
import { useFormik } from 'formik';
import strings from 'constants/strings';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const {
  buttons,
  forms: { labels, validations },
  pages: { genre: genrePageStrings }
} = strings;

const initialValues = {
  key: '',
  name: '',
  description: ''
};

const validationSchema = Yup.object().shape({
  key: Yup.string().max(20).required(validations.keyRequired),
  name: Yup.string().max(255).required(validations.nameRequired),
  description: Yup.string().max(255)
});

const forms = [
  {
    name: 'name',
    options: {
      label: labels.name,
      autoFocus: true,
      required: true
    }
  },
  {
    name: 'key',
    options: {
      label: labels.key,
      required: true
    }
  },
  {
    name: 'description',
    options: {
      label: labels.description,
      multiline: true,
      required: false,
      rows: 3
    }
  }
];

const CreateGenre = ({ open, onClose } = {}) => {
  const onSubmit = async (newGenre, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      await createGenre(newGenre);
      queryClient.invalidateQueries(GENRES);
      ToastService.success(genrePageStrings.mutations.createSuccess);
      resetForm();
    } catch (err) {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  const { handleSubmit, values, handleBlur, handleChange, touched, errors, isSubmitting } = useFormik({
    validationSchema,
    initialValues,
    onSubmit
  });
  return (
    <Dialog open={open} onClose={!isSubmitting && onClose} disableEscapeKeyDown>
      <DialogTitle>{genrePageStrings.create}</DialogTitle>
      <DialogContent>
        {forms.map(({ name, options }) => (
          <FormControl key={name} fullWidth error={Boolean(touched[name] && errors[name])}>
            <TextField
              required
              margin="dense"
              id={name}
              type="text"
              fullWidth
              variant="outlined"
              name={name}
              value={values[name]}
              onBlur={handleBlur}
              onChange={handleChange}
              {...options}
            />
            {touched[name] && errors[name] && <FormHelperText error>{errors[name]}</FormHelperText>}
          </FormControl>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          {buttons.close}
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {buttons.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateGenre.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func
};

export default CreateGenre;
