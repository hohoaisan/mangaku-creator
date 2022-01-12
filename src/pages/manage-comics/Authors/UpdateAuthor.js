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
  Select,
  MenuItem,
  InputLabel,
  Box
} from '@mui/material';

// formik
import * as Yup from 'yup';

// react query
import { useQuery } from 'react-query';
import queryClient from 'query';
import { AUTHOR, AUTHORS } from 'query/queryKeys';
import { getAuthor, updateAuthor } from 'apis/author';

// formik
import { useFormik } from 'formik';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import { statusOptions } from 'constants/approvalStatus';

const initialValues = {
  key: '',
  name: '',
  description: '',
  approval_status: null,
  restricted: false
};

const validationSchema = Yup.object().shape({
  key: Yup.string().max(20),
  name: Yup.string().max(255),
  description: Yup.string().max(255),
  restrict: Yup.boolean()
});

const UpdateAuthor = ({ open, onClose, selectedItem } = {}) => {
  const query = useQuery([AUTHOR, selectedItem.id], () => getAuthor(selectedItem.id), {
    refetchOnMount: true,
    keepPreviousData: true
  });
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await updateAuthor(values);
      queryClient.invalidateQueries([AUTHOR, selectedItem.id]);
      queryClient.invalidateQueries(AUTHORS);
      ToastService.success('Author updated');
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
      <DialogTitle>Update author</DialogTitle>
      <DialogContent>
        <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
          <TextField
            id="name"
            name="name"
            value={values.name}
            type="text"
            fullWidth
            variant="outlined"
            label="Author name"
            autoFocus
            required={false}
            margin="dense"
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={query.isFetching}
          />
          {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
          <TextField
            id="description"
            name="description"
            value={values.description}
            type="text"
            fullWidth
            variant="outlined"
            label="Author description"
            autoFocus
            multiline
            required={false}
            margin="dense"
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={query.isFetching}
          />
          {touched.description && errors.description && <FormHelperText error>{errors.description}</FormHelperText>}
        </FormControl>
        {values.approval_status !== null && (
          <Box marginY={2}>
            <FormControl fullWidth error={Boolean(touched.approval_status && errors.approval_status)} required>
              <InputLabel>Approval Status</InputLabel>
              <Select
                label="Approval Status"
                value={values.approval_status}
                onChange={handleChange}
                onBlur={handleBlur}
                id="approval_status"
                name="approval_status"
              >
                {statusOptions.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.approval_status && errors.approval_status && <FormHelperText error>{errors.approval_status}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.description && errors.description)}>
              <FormControlLabel
                control={<Checkbox />}
                name="restricted"
                checked={values.restricted}
                value={values.restricted}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={query.isFetching}
                label="Restrict"
              />
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Close
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || query.isFetching || query.isError}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateAuthor.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default UpdateAuthor;
