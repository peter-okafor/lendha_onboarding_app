import { useLoginMutation } from '@/app/services/auth';
import { ReactComponent as Underline } from '@/assets/svg/yellow-underline.svg';
import AuthCard from '@/components/auth/AuthCard';
import { FormInput, PasswordInput, UserAccountBlocked } from '@/components/common';
import { path } from '@/routes/path';
import ErrorMessages from '@/utils/components/ErrorMessages';
import { sanitize } from '@/utils/helpers';
import { Box, Button, Link, Stack, Text, useToast } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { SignInSchema } from './signin.schema';

type SignInFormValues = {
  email: string;
  password: string;
};

const Signin = () => {
  const router = useNavigate();
  const [incorrectAtempts, setIncorrectAtempts] = useState(0);
  const [maxAttempts] = useState(3);

  const toast = useToast();

  const [signin] = useLoginMutation();

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (formValues) => {
      const values = sanitize(formValues);

      try {
        await signin(values).unwrap();

        router(path.CUSTOMERS);
      } catch (err: any) {
        resetForm();
        toast({
          title: err?.data?.message || 'An error occurred',
          description: <ErrorMessages errors={err?.data.errors} />,
          status: 'info',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: SignInSchema
  });

  const { values, errors, touched, handleChange, isSubmitting, resetForm } = formik;

  return (
    <>
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
                    <Button size='md' type='submit' isLoading={isSubmitting}>
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
    </>
  );
};

export default Signin;
