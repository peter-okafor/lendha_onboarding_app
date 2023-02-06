import { AuthResendCodeLink } from '@/components/auth';
import { FormInput } from '@/components/common';
import { path } from '@/routes/path';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

type TwoFactorValues = {
  code: string;
};

const TwoFactorForm = () => {
  const router = useNavigate();
  const toast = useToast();

  const formik = useFormik<TwoFactorValues>({
    initialValues: {
      code: ''
    },
    onSubmit: async () => {
      toast({
        title: 'Success',
        description: 'You have successfully signed in',
        status: 'success',
        duration: 3000,
        position: 'top-right'
      });

      router(path.CUSTOMERS);
    },
    validationSchema: Yup.object().shape({
      code: Yup.string().required('Code is required')
    })
  });

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
              login
            </Button>
          </Stack>
          <AuthResendCodeLink />
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default TwoFactorForm;
