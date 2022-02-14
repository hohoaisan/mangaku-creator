import * as React from 'react';
import PropsType from 'prop-types';
import ToastService from 'services/toast.service';

// material
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem
} from '@mui/material';

// formik
import * as Yup from 'yup';

// react query
import { useQuery } from 'react-query';
import queryClient from 'query';
import { USER, USERS } from 'query/queryKeys';
import { getUser, updateUser } from 'apis/user';

// formik
import { useFormik } from 'formik';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import { selectableRoles, enumRoles, roleNames } from 'configs/roles';
import strings from 'constants/strings';

const {
  buttons,
  pages: { user: userPageStrings },
  entities: { user: userStrings }
} = strings;

const initialValues = {
  name: '',
  email: '',
  password: '',
  banned: false,
  role: '',
  emailVerified: false
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(255),
  email: Yup.string().max(255).email(),
  password: Yup.string().max(255),
  banned: Yup.boolean(),
  emailVerified: Yup.boolean()
});

const UpdateUser = ({ open, onClose, selectedItem } = {}) => {
  const query = useQuery([USER, selectedItem.id], () => getUser(selectedItem.id), {
    refetchOnMount: true,
    keepPreviousData: true
  });
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await updateUser(values);
      queryClient.invalidateQueries([USER, selectedItem.id]);
      queryClient.invalidateQueries(USERS);
      ToastService.success(userPageStrings.mutations.updateSuccess);
    } catch (err) {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  if (query.isError) {
    const message = getAPIErrorMessage(query.error);
    ToastService.error(message);
  }
  const { handleSubmit, values, handleBlur, handleChange, touched, errors, isSubmitting, setValues } = useFormik({
    validationSchema,
    initialValues,
    onSubmit
  });
  React.useEffect(() => {
    if (query.data) {
      setValues(query.data);
    }
  }, [query.isSuccess, query.data]);
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>Update user</DialogTitle>
      <DialogContent>
        <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
          <TextField
            id="name"
            name="name"
            value={values.name}
            type="text"
            fullWidth
            variant="outlined"
            label={userStrings.name}
            autoFocus
            required={false}
            margin="dense"
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={query.isFetching}
          />
          {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
          <TextField
            id="email"
            name="email"
            value={values.email}
            type="text"
            fullWidth
            variant="outlined"
            label={userStrings.email}
            autoFocus
            required={false}
            margin="dense"
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={query.isFetching}
          />
          {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
          <TextField
            id="password"
            name="password"
            value={values.password}
            type="password"
            fullWidth
            variant="outlined"
            label={userStrings.password}
            autoFocus
            required={false}
            margin="dense"
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={query.isFetching}
          />
          {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.banned && errors.banned)}>
          <FormControlLabel
            control={<Checkbox />}
            name="banned"
            checked={values.banned}
            value={values.banned}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={query.isFetching}
            label={userStrings.restrict}
          />
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.emailVerified && errors.emailVerified)}>
          <FormControlLabel
            control={<Checkbox />}
            name="emailVerified"
            checked={values.emailVerified}
            value={values.emailVerified}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={query.isFetching}
            label={userStrings.emailVerified}
          />
        </FormControl>

        <FormControl fullWidth error={Boolean(touched.role && errors.role)} required>
          <FormLabel>{userStrings.role}</FormLabel>
          <Select
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            id="role"
            name="role"
            disabled={values.role === enumRoles.AUTHOR}
          >
            {values.role === enumRoles.AUTHOR ? (
              <MenuItem value={enumRoles.AUTHOR}>{roleNames[enumRoles.AUTHOR]}</MenuItem>
            ) : (
              selectableRoles.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.name}
                </MenuItem>
              ))
            )}
          </Select>
          {touched.role && errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          {buttons.close}
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || query.isFetching || query.isError}>
          {buttons.update}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateUser.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default UpdateUser;
