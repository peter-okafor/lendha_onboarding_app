import { FormInput } from '@/components/common';
import { path } from '@/routes/path';
import { Button, Link, Stack } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { ResetPasswordSchema } from '../forgot-password.schema';

type ResetPasswordFormValues = {
  code: string;
};

const ResetPasswordForm = () => {
  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      code: ''
    },
    onSubmit: async () => {
      router(path.PASSWORD_RESET);
    },
    validationSchema: ResetPasswordSchema
  });
  const router = useNavigate();

  const { values, errors, touched, handleChange } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            id='code'
            name='code'
            label='Enter code'
            value={values.code}
            errorMessage={errors.code}
            handleChange={handleChange}
            touchedField={touched.code}
          />
          <Stack>
            <Button size='md' type='submit'>
              reset password
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
  );
};

export default ResetPasswordForm;
