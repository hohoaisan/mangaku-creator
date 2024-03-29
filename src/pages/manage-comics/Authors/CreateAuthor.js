import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText } from '@mui/material';

// formik
import * as Yup from 'yup';

// react query
import queryClient from 'query';
import { AUTHORS } from 'query/queryKeys';
import { createAuthor } from 'apis/author';

import ToastService from 'services/toast.service';

// formik
import { useFormik } from 'formik';
import strings from 'constants/strings';

const {
  pages: { author: authorPageStrings },
  buttons,
  forms: { validations, labels }
} = strings;

const initialValues = {
  name: '',
  description: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(255).required(validations.nameRequired),
  description: Yup.string().max(255)
});

const forms = [
  {
    name: 'name',
    options: {
      label: labels.authorName,
      autoFocus: true,
      required: true
    }
  },
  {
    name: 'description',
    options: {
      label: labels.authorDescription,
      multiline: true,
      required: false,
      rows: 3
    }
  }
];

const CreateAuthor = ({ open, onClose } = {}) => {
  const onSubmit = async (newAuthor, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      await createAuthor(newAuthor);
      queryClient.invalidateQueries(AUTHORS);
      ToastService.success(authorPageStrings.mutations.createSuccess);
      resetForm();
    } catch (err) {
      let message = err.message;
      if (err.response?.data?.message) {
        message = err.response.data.message;
      }
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
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>{authorPageStrings.create}</DialogTitle>
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

CreateAuthor.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func
};

export default CreateAuthor;
