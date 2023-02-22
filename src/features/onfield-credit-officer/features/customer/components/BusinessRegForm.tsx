import { Form, FormikProps, FormikProvider } from 'formik';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { DropzoneFileUpload, FormInput, NextCancelButton } from '@/components/common';

export type BusRegFormValues = {
  busRegNumber: string;
  cacDocument: string;
};
interface Props {
  onBack: () => void;
  formik: FormikProps<BusRegFormValues>;
}
const BusinessRegForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, setFieldValue } = formik;
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            name='busRegNumber'
            label='Business registration number'
            errorMessage={errors.busRegNumber}
            handleChange={handleChange}
            touchedField={touched.busRegNumber}
            value={values.busRegNumber}
            type='text'
          />
          <DropzoneFileUpload
            name='cacDocument'
            setFieldValue={setFieldValue}
            label='Upload your CAC document'
            touchedField={touched.cacDocument}
            errorMessage={errors.cacDocument}
            fileSize={5}
          />
          <NextCancelButton
            onCancel={props.onBack}
            showCancelBtn={isLargerThan810 ? false : true}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default BusinessRegForm;
