import * as yup from 'yup';

export const interviewValidationSchema = yup.object().shape({
  interview_date: yup.date().nullable(),
  interview_time: yup.string().nullable(),
  interview_type: yup.string().nullable(),
  interview_status: yup.string().nullable(),
  candidate_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
