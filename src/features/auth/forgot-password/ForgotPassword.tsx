import AuthCard from '@/components/auth/AuthCard';
import { FormInput } from '@/components/common';
import { path } from '@/routes/path';
import { Button, Link, Stack } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ResetPasswordForm from './components/ResetPassword';
import { ForgotPasswordSchema } from './forgot-password.schema';

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPassword = () => {
  const [resetCodeSent, setResetCodeSent] = useState(false);

  const ForgotPasswordSwal = withReactContent(Swal);
  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      ForgotPasswordSwal.fire({
        text: `Your password reset code has been sent to ${values.email}`,
        icon: 'success',
        confirmButtonText: 'Enter Code',
        showCancelButton: true,
        allowOutsideClick: false
      }).then((val) => {
        if (val.isConfirmed) {
          setResetCodeSent(true);
        }
      });
    },
    validationSchema: ForgotPasswordSchema
  });

  const { values, errors, touched, handleChange } = formik;

  return (
    <AuthCard
      headerText='Reset password'
      subText={
        resetCodeSent
          ? 'A code has been sent to your email address at johndoe@mail.com'
          : 'A code will be sent to your email address.'
      }
      mt={{ base: '82px', lg: 0 }}
    >
      {resetCodeSent ? (
        <ResetPasswordForm />
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
                <Button size='md' type='submit'>
                  send code
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
