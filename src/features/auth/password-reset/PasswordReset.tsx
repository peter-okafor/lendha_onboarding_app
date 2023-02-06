import AuthCard from '@/components/auth/AuthCard';
import { FormControlLabel } from '@/components/common';
import { path } from '@/routes/path';
import { Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { NewPasswordSchema } from '../forgot-password/forgot-password.schema';

type NewPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const PasswordReset = () => {
  const NewPasswordSwal = withReactContent(Swal);

  const formik = useFormik<NewPasswordFormValues>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: async () => {
      NewPasswordSwal.fire({
        text: 'Your password has been reset successfully',
        icon: 'success',
        showCancelButton: false,
        allowOutsideClick: false,
        timer: 3000
      }).then(() => {
        router('/signin');
      });
    },
    validationSchema: NewPasswordSchema
  });
  const router = useNavigate();

  const { values, errors, touched, handleChange } = formik;

  return (
    <AuthCard
      mt={{ base: '82px', lg: 0 }}
      headerText='New password'
      subText='Create a new password you can remember'
    >
      <FormikProvider value={formik}>
        <Form>
          <Stack spacing={5}>
            <FormControlLabel label='New password'>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Enter your email'
                value={values.password}
                onChange={handleChange}
              />

              {touched.password && errors.password ? (
                <Text color='error' textStyle='xs' mt={0}>
                  Password is required
                </Text>
              ) : null}
            </FormControlLabel>
            <FormControlLabel label='Confirm password'>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Enter your email'
                value={values.confirmPassword}
                onChange={handleChange}
              />

              {touched.confirmPassword && errors.confirmPassword ? (
                <Text color='error' textStyle='xs' mt={0}>
                  Password is required
                </Text>
              ) : null}
            </FormControlLabel>
            <Stack>
              <Button size='md' type='submit'>
                create new password
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
    </AuthCard>
  );
};

PasswordReset.authPage = true;

export default PasswordReset;
