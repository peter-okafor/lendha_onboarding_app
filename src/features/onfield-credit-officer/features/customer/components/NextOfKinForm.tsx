import { FormInput, NextCancelButton } from '@/components/common';
import FormTextArea from '@/components/common/input/form-textarea';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';

export type NextOfKinFormValues = {
  name: string;
  phone: string;
  address: string;
  relationship: string;
};
interface Props {
  onBack: () => void;
  formik: FormikProps<NextOfKinFormValues>;
}
const NextOfKinForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, isSubmitting } = formik;
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            name='name'
            label='Name'
            errorMessage={errors.name}
            handleChange={handleChange}
            touchedField={touched.name}
            value={values.name}
            type='text'
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
            name='relationship'
            label='Relationship'
            errorMessage={errors.relationship}
            handleChange={handleChange}
            touchedField={touched.relationship}
            value={values.relationship}
            type='text'
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

export default NextOfKinForm;
