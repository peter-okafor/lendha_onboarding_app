import { FormInput, NextCancelButton } from '@/components/common';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';

export type SocialHandlesFormValues = {
  facebook: string;
  instagram: string;
  linkedin: string;
};
interface Props {
  onBack: () => void;
  formik: FormikProps<SocialHandlesFormValues>;
}
const BusinessSocialHandlesForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, isSubmitting } = formik;
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            name='facebook'
            label='Facebook handle'
            errorMessage={errors.facebook}
            handleChange={handleChange}
            touchedField={touched.facebook}
            value={values.facebook}
            type='text'
          />
          <FormInput
            name='instagram'
            label='Instagram handle'
            errorMessage={errors.instagram}
            handleChange={handleChange}
            touchedField={touched.instagram}
            value={values.instagram}
            type='text'
          />
          <FormInput
            name='linkedin'
            label='Linkedin handle'
            errorMessage={errors.linkedin}
            handleChange={handleChange}
            touchedField={touched.linkedin}
            value={values.linkedin}
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

export default BusinessSocialHandlesForm;
