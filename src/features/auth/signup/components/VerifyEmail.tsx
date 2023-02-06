import { AuthResendCodeLink } from '@/components/auth';
import { FormInput } from '@/components/common';
import { Button, Stack } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { VerifyEmailSchema } from '../signup.schema';

type VerifyEmailFormValues = {
  code: string;
};

interface Props {
  setVerifyStatus: (status: boolean) => void;
}
const VerifyEmailForm = ({ setVerifyStatus }: Props) => {
  const formik = useFormik<VerifyEmailFormValues>({
    initialValues: {
      code: ''
    },
    onSubmit: async () => {
      setVerifyStatus(true);
    },
    validationSchema: VerifyEmailSchema
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
            <Button size='md' type='submit' textTransform='none'>
              Verify e-mail address
            </Button>
            <AuthResendCodeLink />
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default VerifyEmailForm;
