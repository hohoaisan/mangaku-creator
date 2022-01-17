import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText } from '@mui/material';

// formik
import * as Yup from 'yup';

// react query
import queryClient from 'query';
import { FORMATS } from 'query/queryKeys';
import { createFormat } from 'apis/format';

import ToastService from 'services/toast.service';

// formik
import { useFormik } from 'formik';
import strings from 'constants/strings';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const {
  buttons,
  forms: { labels, validations },
  pages: { format: formatPageStrings }
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

const CreateFormat = ({ open, onClose } = {}) => {
  const onSubmit = async (newFormat, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      await createFormat(newFormat);
      queryClient.invalidateQueries(FORMATS);
      ToastService.success(formatPageStrings.mutations.createSuccess);
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
      <DialogTitle>{formatPageStrings.create}</DialogTitle>
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

CreateFormat.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func
};

export default CreateFormat;
