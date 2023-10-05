import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  feedback_date: yup.date().nullable(),
  feedback_notes: yup.string().nullable(),
  rating: yup.number().integer().nullable(),
  interview_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
