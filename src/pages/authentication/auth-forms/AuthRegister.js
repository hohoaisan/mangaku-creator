import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { becomeAuthorRegister } from 'apis/profile';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import queryClient from 'query';

import strings from 'constants/strings';

const {
  buttons,
  pages: { auth: authStrings },
  forms: { validations: validationStrings, labels }
} = strings;
// ===========================|| FIREBASE - REGISTER ||=========================== //

const validationSchema = Yup.object().shape({
  name: Yup.string().max(100).required(validationStrings.nameRequired),
  description: Yup.string().max(255).required(validationStrings.descriptionRequired)
});

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          description: '',
          submit: null
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: true });
            setSubmitting(false);
            await becomeAuthorRegister(values);
          } catch (err) {
            const message = getAPIErrorMessage(err);
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          } finally {
            queryClient.invalidateQueries('PROFILE_AUTHOR');
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name-register">{labels.authorName}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-register"
                type="name"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.description && errors.description)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-description-register">{labels.authorDescription}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-description-register"
                type="description"
                value={values.description}
                name="description"
                onBlur={handleBlur}
                multiline
                onChange={handleChange}
              />
              {touched.description && errors.description && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.description}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {buttons.register}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
