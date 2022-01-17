import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText } from '@mui/material';

// formik
import * as Yup from 'yup';

// react query
import queryClient from 'query';
import { USERS } from 'query/queryKeys';
import { createUser } from 'apis/user';

import ToastService from 'services/toast.service';

// formik
import { useFormik } from 'formik';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import strings from 'constants/strings';

const {
  buttons,
  forms: { labels, validations },
  pages: { user: userPageStrings }
} = strings;

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(255).required(validations.nameRequired),
  email: Yup.string().email(validations.emailValid).required(validations.emailRequired),
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
    name: 'email',
    options: {
      label: labels.email,
      required: true
    }
  },
  {
    name: 'password',
    options: {
      label: labels.password,
      required: true,
      type: 'password'
    }
  }
];

const UserCreate = ({ open, onClose } = {}) => {
  const onSubmit = async (newUser, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      await createUser(newUser);
      queryClient.invalidateQueries(USERS);
      ToastService.success(userPageStrings.mutations.createSuccess);
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
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>{userPageStrings.create}</DialogTitle>
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

UserCreate.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func
};

export default UserCreate;
