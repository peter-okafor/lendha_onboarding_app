import { ReactComponent as Underline } from '@/assets/svg/yellow-underline.svg';
import AuthCard from '@/components/auth/AuthCard';
import { FormInput, PasswordInput, UserAccountBlocked } from '@/components/common';
import { path } from '@/routes/path';
import { Box, Button, Link, Stack, Text, useToast } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { TwoFactorForm } from '../2fa';
import { SignInSchema } from './signin.schema';

type SignInFormValues = {
  email: string;
  password: string;
};

const Signin = () => {
  const [, setUserEmail] = useLocalStorage('email', '');

  const [sendCodeMedium, setSendCodeMedium] = useState<'phone' | 'email'>('email');
  const [twoFactor, setTwoFactor] = useState(false);
  const [incorrectAtempts, setIncorrectAtempts] = useState(0);
  const [maxAttempts] = useState(3);

  const toast = useToast();
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      if (
        (values.email === 'johndoe@email.com' ||
          values.email === 'johnsmith@email.com' ||
          values.email === 'creditofficer@email.com') &&
        values.password === '123456'
      ) {
        setTwoFactor(true);
        setUserEmail(() => values.email);
      } else {
        toast({
          title: 'Error',
          description: 'Incorrect login details',
          status: 'error',
          duration: 4000,
          position: 'top-right'
        });
        setIncorrectAtempts(incorrectAtempts + 1);
        // reset the password field
        setFieldValue('password', '');
      }
    },
    validationSchema: SignInSchema
  });

  const { values, errors, touched, handleChange, setFieldValue } = formik;

  return (
    <>
      {twoFactor ? (
        <AuthCard
          headerText={<Text textStyle='3xl'>2-Factor verification</Text>}
          subText={
            <Box textStyle='sm' color='gray.300'>
              <Text>
                A code has been sent to your{' '}
                {sendCodeMedium === 'phone' ? 'phone' : 'email address'}.
              </Text>

              <Box textStyle='sm' color='gray.300'>
                <Link as={ReactRouterLink} to='#'>
                  <Text
                    fontWeight={600}
                    cursor='pointer'
                    as='span'
                    color='darkblue.DEFAULT'
                    onClick={() => {
                      if (sendCodeMedium === 'phone') return setSendCodeMedium('email');
                      setSendCodeMedium('phone');
                    }}
                  >
                    Use {sendCodeMedium === 'phone' ? 'Email Address' : 'Phone Number'}{' '}
                  </Text>
                </Link>
                instead.
              </Box>
            </Box>
          }
          mt={{ base: '82px', lg: 0 }}
        >
          <TwoFactorForm />
        </AuthCard>
      ) : (
        <AuthCard
          headerText={incorrectAtempts >= maxAttempts ? '' : 'Welcome back'}
          subText={incorrectAtempts >= maxAttempts ? '' : 'Please enter your login details below'}
          mt={{ base: '82px', lg: 0 }}
        >
          <>
            {incorrectAtempts < maxAttempts ? (
              <FormikProvider value={formik}>
                <Form>
                  <Stack spacing={5}>
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
                    <Box>
                      <PasswordInput
                        id='password'
                        name='password'
                        label='Password'
                        value={values.password}
                        errorMessage={errors.password}
                        handleChange={handleChange}
                        touchedField={touched.password}
                      />
                      <Box textAlign='right'>
                        <Link
                          as={ReactRouterLink}
                          color='black.DEFAULT'
                          to={path.FORGOT_PASSWORD}
                          textStyle='sm'
                        >
                          Forget password
                        </Link>
                      </Box>
                    </Box>
                    <Stack>
                      <Button size='md' type='submit'>
                        proceed
                      </Button>
                      <Stack direction='row' justify='center' textStyle='sm' spacing={1}>
                        <Text>New here?</Text>
                        <Link as={ReactRouterLink} color='black.DEFAULT' to={path.SIGNUP}>
                          Register now
                          <Underline />
                        </Link>
                      </Stack>
                    </Stack>
                  </Stack>
                </Form>
              </FormikProvider>
            ) : (
              <UserAccountBlocked handleBackToLogin={() => setIncorrectAtempts(0)}>
                <Box textStyle='sm'>
                  <Box>
                    This is due to multiple incorrect login attempt,
                    <br /> please contact the customer care at
                    <br />
                    <Text color='darkblue.DEFAULT' fontWeight={700}>
                      support@lendha.com
                    </Text>
                  </Box>
                </Box>
              </UserAccountBlocked>
            )}
          </>
        </AuthCard>
      )}
    </>
  );
};

Signin.authPage = true;

export default Signin;
