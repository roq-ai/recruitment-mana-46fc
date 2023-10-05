import * as yup from 'yup';

export const candidateValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().nullable(),
  phone: yup.string().nullable(),
  resume: yup.string().nullable(),
  status: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
