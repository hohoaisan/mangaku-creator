import yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
});

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup.string().required()
});
