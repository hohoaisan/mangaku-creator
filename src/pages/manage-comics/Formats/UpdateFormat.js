import * as React from 'react';
import PropsType from 'prop-types';
import ToastService from 'services/toast.service';

// material
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText } from '@mui/material';

// formik
import * as Yup from 'yup';

// react query
import { useQuery } from 'react-query';
import queryClient from 'query';
import { FORMAT, FORMATS } from 'query/queryKeys';
import { getFormat, updateFormat } from 'apis/format';

// formik
import { useFormik } from 'formik';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const initialValues = {
  key: '',
  name: '',
  description: ''
};

const validationSchema = Yup.object().shape({
  key: Yup.string().max(20),
  name: Yup.string().max(255),
  description: Yup.string().max(255)
});

const forms = [
  {
    name: 'name',
    options: {
      label: 'Format name',
      autoFocus: true,
      required: false
    }
  },
  {
    name: 'key',
    options: {
      label: 'Format key',
      required: false
    }
  },
  {
    name: 'description',
    options: {
      label: 'Format desciption',
      multiline: true,
      rows: 3,
      required: false
    }
  }
];

const UpdateFormat = ({ open, onClose, selectedItem } = {}) => {
  const query = useQuery([FORMAT, selectedItem.id], () => getFormat(selectedItem.id), {
    refetchOnMount: true,
    keepPreviousData: true
  });
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await updateFormat(values);
      queryClient.invalidateQueries([FORMAT, selectedItem.id]);
      queryClient.invalidateQueries(FORMATS);
      ToastService.success('Format updated');
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
    <Dialog open={open} onClose={!isSubmitting && onClose} disableEscapeKeyDown>
      <DialogTitle>Update format</DialogTitle>
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
              disabled={query.isFetching}
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
        <Button onClick={handleSubmit} disabled={isSubmitting || query.isFetching || query.isError}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateFormat.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default UpdateFormat;
