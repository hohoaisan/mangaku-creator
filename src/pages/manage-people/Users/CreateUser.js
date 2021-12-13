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

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(255).required('Name is required'),
  description: Yup.string().max(255)
});

const forms = [
  {
    name: 'name',
    options: {
      label: 'User name',
      autoFocus: true,
      required: true
    }
  },
  {
    name: 'email',
    options: {
      label: 'User email',
      required: true
    }
  },
  {
    name: 'password',
    options: {
      label: 'User password',
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
      ToastService.success('User created');
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
      <DialogTitle>Create user</DialogTitle>
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
          Close
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          Create
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
