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
import strings from 'constants/strings';

const {
  pages: { author: authorPageStrings },
  buttons,
  forms: { labels }
} = strings;

const initialValues = {
  name: '',
  description: '',
  approval_status: null,
  restricted: false
};

const validationSchema = Yup.object().shape({
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
      ToastService.success(authorPageStrings.mutations.updateSuccess);
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
      <DialogTitle>{authorPageStrings.update}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
          <TextField
            id="name"
            name="name"
            value={values.name}
            type="text"
            fullWidth
            variant="outlined"
            label={labels.authorName}
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
            label={labels.authorDescription}
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
                label={labels.approvalStatus}
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
                label={labels.restrict}
              />
            </FormControl>
          </Box>
        )}
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

UpdateAuthor.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default UpdateAuthor;
