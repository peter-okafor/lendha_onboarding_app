import { ReactComponent as Underline } from '@/assets/svg/yellow-underline-sm.svg';
import AuthCard from '@/components/auth/AuthCard';
import { FormInput, FormLeftAddonInput, PasswordInput } from '@/components/common';
import { SuccessMessage as VerifyMessage } from '@/components/message';
import { path } from '@/routes/path';
import { usePhoneMask } from '@/utils/hooks';
import { Box, Button, Flex, Link, Stack, Text, useToast } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import VerifyEmailForm from './components/VerifyEmail';
import { SignupSchema } from './signup.schema';

type SignupFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [verifyEmailForm, setVerifyEmailForm] = useState(false);

  const toast = useToast();
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      if (values.email === 'johndoe@email.com') {
        setEmailExists(true);
      } else {
        setEmailExists(false);
        setVerifyEmailForm(true);
        toast({
          title: 'Success',
          description: 'You have successfully signed up',
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: SignupSchema
  });
  const router = useNavigate();

  const { values, errors, touched, handleChange } = formik;

  const maskedPhoneNumber = usePhoneMask(values.phoneNumber);

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
                      maxLength: 10,
                      inputMode: 'tel'
                    }}
                    label='Phone number'
                    touchedField={touched.phoneNumber}
                    value={maskedPhoneNumber}
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
                    <Button size='md' type='submit'>
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
