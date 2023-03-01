import { SignupRequest as SignupPayload, useSignupMutation } from '@/app/services/auth';
import { useReferralChannelsQuery } from '@/app/services/misc';
import { ReactComponent as Underline } from '@/assets/svg/yellow-underline-sm.svg';
import AuthCard from '@/components/auth/AuthCard';
import { FormInput, FormLeftAddonInput, FormSelect, PasswordInput } from '@/components/common';
import { SuccessMessage as VerifyMessage } from '@/components/message';
import { path } from '@/routes/path';
import ErrorMessages from '@/utils/components/ErrorMessages';
import { sanitize } from '@/utils/helpers';
import { Box, Button, Flex, Link, Stack, Text, useToast } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import VerifyEmailForm from './components/VerifyEmail';
import { SignupSchema } from './signup.schema';

export type SignupFormValues = {
  firstname: string;
  lastname: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  referral: string;
};

const Signup = () => {
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [emailExists] = useState(false);
  const [verifyEmailForm] = useState(false);

  const toast = useToast();

  const [signup] = useSignupMutation();

  const router = useNavigate();
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstname: '',
      lastname: '',
      businessName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
      referral: ''
    },
    onSubmit: async (formValues) => {
      const values = sanitize<SignupFormValues>(formValues);

      try {
        const payload: SignupPayload = {
          business_name: values.businessName,
          date_of_birth: values.dateOfBirth,
          email: values.email,
          name: values.firstname,
          password: values.password,
          password_confirmation: values.confirmPassword,
          phone_number: values.phoneNumber,
          referral_channel: values.referral
        };

        const response = await signup(payload).unwrap();

        toast({
          title: 'Success',
          description: response.message || 'You have successfully signed up',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });

        router(path.SIGNIN);
      } catch (err: any) {
        toast({
          title: err?.data?.message || 'An error occurred',
          description: <ErrorMessages errors={err?.data.errors} />,
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: SignupSchema
  });

  const { values, errors, touched, handleChange, isSubmitting } = formik;

  const { data } = useReferralChannelsQuery();
  const referralChannels = (data?.data || []).map(({ id, name }) => ({ value: id, label: name }));

  return (
    <>
      {verifyStatus ? (
        <AuthCard mt={['20px', '67px']} px={0}>
          {verifyStatus && (
            <Box mt={['100px', 0]}>
              <VerifyMessage />
            </Box>
          )}
        </AuthCard>
      ) : (
        <AuthCard
          mt={['20px', '67px']}
          headerText={verifyEmailForm ? 'Verify your E-mail' : 'Create an Account'}
          textAlign={verifyEmailForm ? 'left' : 'center'}
          subText={
            verifyEmailForm ? (
              <Text color='gray.300'>
                A code has been sent to your email address
                <br /> at{' '}
                <Box as='span' fontWeight={600} color='darkblue.DEFAULT'>
                  joshua@mail.com.
                </Box>
                <Text>
                  Not you?{' '}
                  <Link as={ReactRouterLink} color='black.DEFAULT' to='#'>
                    <Text as='span' fontWeight={600} color='darkblue.DEFAULT'>
                      Change Email Address
                    </Text>
                  </Link>
                </Text>
              </Text>
            ) : (
              'to get started'
            )
          }
        >
          {verifyEmailForm ? (
            <VerifyEmailForm setVerifyStatus={setVerifyStatus} />
          ) : (
            <FormikProvider value={formik}>
              <Form>
                <Stack spacing={5}>
                  <FormInput
                    id='firstname'
                    name='firstname'
                    label='First name'
                    value={values.firstname}
                    errorMessage={errors.firstname}
                    handleChange={handleChange}
                    touchedField={touched.firstname}
                  />
                  <FormInput
                    id='lastname'
                    name='lastname'
                    label='Last name'
                    value={values.lastname}
                    errorMessage={errors.lastname}
                    handleChange={handleChange}
                    touchedField={touched.lastname}
                  />
                  <FormInput
                    id='business-name'
                    name='businessName'
                    label='Business name'
                    value={values.businessName}
                    errorMessage={errors.businessName}
                    handleChange={handleChange}
                    touchedField={touched.businessName}
                  />
                  <Box>
                    <FormInput
                      id='email'
                      name='email'
                      label='Email address'
                      placeholder='Enter your email address'
                      value={values.email}
                      errorMessage={errors.email}
                      handleChange={handleChange}
                      touchedField={touched.email}
                    />
                    {emailExists ? (
                      <Flex justifyContent='space-between' textStyle='xs'>
                        <Text color='error' mt={0}>
                          This email is already registered
                        </Text>
                        <Text cursor='pointer' onClick={() => router('/signin')} fontWeight={700}>
                          Try logging in
                        </Text>
                      </Flex>
                    ) : null}
                  </Box>
                  <FormLeftAddonInput
                    addonText='+234'
                    errorMessage={errors.phoneNumber}
                    handleChange={handleChange}
                    inputProps={{
                      name: 'phoneNumber',
                      id: 'phone-number',
                      inputMode: 'tel',
                      maxLength: 11
                    }}
                    label='Phone number'
                    touchedField={touched.phoneNumber}
                    value={values.phoneNumber}
                  />
                  <FormInput
                    id='dob'
                    name='dateOfBirth'
                    label='Date of birth (Same as registered with your bank)'
                    type='date'
                    touchedField={touched.dateOfBirth}
                    errorMessage={errors.dateOfBirth}
                    handleChange={handleChange}
                    value={values.dateOfBirth}
                  />
                  <PasswordInput
                    id='password'
                    name='password'
                    label='Create password'
                    value={values.password}
                    errorMessage={errors.password}
                    handleChange={handleChange}
                    touchedField={touched.password}
                  />
                  <PasswordInput
                    id='confirm-password'
                    name='confirmPassword'
                    label='Confirm password'
                    value={values.confirmPassword}
                    errorMessage={errors.confirmPassword}
                    handleChange={handleChange}
                    touchedField={touched.confirmPassword}
                  />
                  <FormSelect
                    id='referral'
                    name='referral'
                    label='How did you hear about Lendha?'
                    value={values.referral}
                    onChange={handleChange}
                    errorMessage={errors.referral}
                    touchedField={touched.referral}
                    options={[{ value: '', label: 'Select referral channel' }, ...referralChannels]}
                  />
                  <Stack>
                    <Text textStyle='xs' color='gray.300'>
                      By clicking on{' '}
                      <Box
                        as='span'
                        sx={{ color: 'darkblue.DEFAULT !important', fontWeight: '600 !important' }}
                      >
                        Register
                      </Box>
                      , you agree to Lendha&apos;s
                      <br />
                      <Link
                        sx={{ color: 'darkblue.DEFAULT !important', fontWeight: '600 !important' }}
                        href='#'
                        textDecor='underline'
                      >
                        Terms and Conditions
                      </Link>
                    </Text>
                    <Button size='md' type='submit' isLoading={isSubmitting}>
                      register
                    </Button>
                    <Stack direction='row' justify='center' textStyle='sm'>
                      <Text>Already have an account?</Text>
                      <Link as={ReactRouterLink} color='black.DEFAULT' to={path.SIGNIN}>
                        Login
                        <Underline />
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Form>
            </FormikProvider>
          )}
        </AuthCard>
      )}
    </>
  );
};

Signup.authPage = true;

export default Signup;
