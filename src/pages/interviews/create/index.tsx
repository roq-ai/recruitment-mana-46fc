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

import { createInterview } from 'apiSdk/interviews';
import { interviewValidationSchema } from 'validationSchema/interviews';
import { CandidateInterface } from 'interfaces/candidate';
import { UserInterface } from 'interfaces/user';
import { getCandidates } from 'apiSdk/candidates';
import { getUsers } from 'apiSdk/users';
import { InterviewInterface } from 'interfaces/interview';

function InterviewCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InterviewInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInterview(values);
      resetForm();
      router.push('/interviews');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InterviewInterface>({
    initialValues: {
      interview_date: new Date(new Date().toDateString()),
      interview_time: '',
      interview_type: '',
      interview_status: '',
      candidate_id: (router.query.candidate_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: interviewValidationSchema,
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
              label: 'Interviews',
              link: '/interviews',
            },
            {
              label: 'Create Interview',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Interview
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="interview_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Interview Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.interview_date ? new Date(formik.values?.interview_date) : null}
              onChange={(value: Date) => formik.setFieldValue('interview_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.interview_time}
            label={'Interview Time'}
            props={{
              name: 'interview_time',
              placeholder: 'Interview Time',
              value: formik.values?.interview_time,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.interview_type}
            label={'Interview Type'}
            props={{
              name: 'interview_type',
              placeholder: 'Interview Type',
              value: formik.values?.interview_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.interview_status}
            label={'Interview Status'}
            props={{
              name: 'interview_status',
              placeholder: 'Interview Status',
              value: formik.values?.interview_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CandidateInterface>
            formik={formik}
            name={'candidate_id'}
            label={'Select Candidate'}
            placeholder={'Select Candidate'}
            fetcher={getCandidates}
            labelField={'email'}
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
              onClick={() => router.push('/interviews')}
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
    entity: 'interview',
    operation: AccessOperationEnum.CREATE,
  }),
)(InterviewCreatePage);
