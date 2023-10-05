import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFeedback } from 'apiSdk/feedbacks';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { InterviewInterface } from 'interfaces/interview';
import { UserInterface } from 'interfaces/user';
import { getInterviews } from 'apiSdk/interviews';
import { getUsers } from 'apiSdk/users';
import { FeedbackInterface } from 'interfaces/feedback';

function FeedbackCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FeedbackInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFeedback(values);
      resetForm();
      router.push('/feedbacks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FeedbackInterface>({
    initialValues: {
      feedback_date: new Date(new Date().toDateString()),
      feedback_notes: '',
      rating: 0,
      interview_id: (router.query.interview_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Feedbacks',
              link: '/feedbacks',
            },
            {
              label: 'Create Feedback',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Feedback
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="feedback_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Feedback Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.feedback_date ? new Date(formik.values?.feedback_date) : null}
              onChange={(value: Date) => formik.setFieldValue('feedback_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.feedback_notes}
            label={'Feedback Notes'}
            props={{
              name: 'feedback_notes',
              placeholder: 'Feedback Notes',
              value: formik.values?.feedback_notes,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Rating"
            formControlProps={{
              id: 'rating',
              isInvalid: !!formik.errors?.rating,
            }}
            name="rating"
            error={formik.errors?.rating}
            value={formik.values?.rating}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<InterviewInterface>
            formik={formik}
            name={'interview_id'}
            label={'Select Interview'}
            placeholder={'Select Interview'}
            fetcher={getInterviews}
            labelField={'interview_time'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/feedbacks')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'feedback',
    operation: AccessOperationEnum.CREATE,
  }),
)(FeedbackCreatePage);
