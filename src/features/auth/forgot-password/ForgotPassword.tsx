import { usePasswordResetMutation } from '@/app/services/auth';
import AuthCard from '@/components/auth/AuthCard';
import { FormInput } from '@/components/common';
import { path } from '@/routes/path';
import { sanitize } from '@/utils/helpers';
import { Button, Link, Stack, useToast } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ForgotPasswordSchema } from './forgot-password.schema';

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPassword = () => {
  const [resetCodeSent, setResetCodeSent] = useState(false);

  const toast = useToast();

  const [resetPassword] = usePasswordResetMutation();

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: ''
    },
    onSubmit: async (formValues) => {
      const values = sanitize(formValues);

      try {
        const data = await resetPassword(values).unwrap();

        toast({
          title: 'Reset your password',
          description:
            data.message ||
            "Check your email for a link to reset your password. If it doesn't appear within few minutes, check your span folder",
          status: 'success',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
        setResetCodeSent(true);
      } catch (err: any) {
        toast({
          title: 'Reset your password',
          description: err?.data?.error || err?.data?.message,
          status: 'error',
          duration: 4000,
          position: 'top-right',
          isClosable: true
        });
      }
    },
    validationSchema: ForgotPasswordSchema
  });

  const { values, errors, touched, handleChange, isSubmitting } = formik;

  return (
    <AuthCard
      headerText='Reset password'
      subText={
        resetCodeSent
          ? `A link has been sent to your email address at ${values.email}. If it doesn't appear within a few minutes, check your spam folder. `
          : 'A link will be sent to your email address.'
      }
      mt={{ base: '82px', lg: 0 }}
    >
      {resetCodeSent ? (
        <ReactRouterLink to={path.SIGNIN}>
          <Button size='md' type='submit' w='full' textTransform='none'>
            Back to Signin
          </Button>
        </ReactRouterLink>
      ) : (
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
                type='email'
              />
              <Stack>
                <Button size='md' type='submit' isLoading={isSubmitting}>
                  send link
                </Button>
                <Stack direction='row' justify='center' textStyle='sm'>
                  <Link as={ReactRouterLink} color='black.DEFAULT' to={path.SIGNIN}>
                    Back to Sign In
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      )}
    </AuthCard>
  );
};

export default ForgotPassword;
