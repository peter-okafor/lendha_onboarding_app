import { FormInput, NextCancelButton } from '@/components/common';
import FormTextArea from '@/components/common/input/form-textarea';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';

export type EmploymentFormValues = {
  name: string;
  email: string;
  site: string;
  address: string;
  phone: string;
  resumption_date: string;
};
interface Props {
  onBack: () => void;
  formik: FormikProps<EmploymentFormValues>;
}
const EmploymentForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, isSubmitting } = formik;
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            name='name'
            label='Employer name'
            errorMessage={errors.name}
            handleChange={handleChange}
            touchedField={touched.name}
            value={values.name}
            type='text'
          />
          <FormInput
            name='email'
            label='Email'
            errorMessage={errors.email}
            handleChange={handleChange}
            touchedField={touched.email}
            value={values.email}
            type='email'
          />
          <FormInput
            name='site'
            label='Site'
            errorMessage={errors.site}
            handleChange={handleChange}
            touchedField={touched.site}
            value={values.site}
            type='text'
          />
          <FormTextArea
            id='address'
            name='address'
            label='Address'
            errorMessage={errors.address}
            handleChange={handleChange}
            touchedField={touched.address}
            value={values.address}
          />
          <FormInput
            name='phone'
            label='Phone Number'
            errorMessage={errors.phone}
            handleChange={handleChange}
            touchedField={touched.phone}
            value={values.phone}
            type='text'
          />
          <FormInput
            id='resumption'
            name='resumption_date'
            label='Resumption date'
            type='date'
            touchedField={touched.resumption_date}
            errorMessage={errors.resumption_date}
            handleChange={handleChange}
            value={values.resumption_date}
          />
          <NextCancelButton
            isSubmitting={isSubmitting}
            onCancel={props.onBack}
            showCancelBtn={isLargerThan810 ? false : true}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default EmploymentForm;
