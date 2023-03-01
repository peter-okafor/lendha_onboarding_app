import { DropzoneFileUpload, NextCancelButton } from '@/components/common';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';

export type DocumentsFormValues = {
  passport_photo: string;
  // work_id: string;
  valid_id: string;
};
interface Props {
  onBack: () => void;
  formik: FormikProps<DocumentsFormValues>;
}
const DocumentsForm = ({ formik, ...props }: Props) => {
  const { errors, touched, setFieldValue, isSubmitting } = formik;
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <DropzoneFileUpload
            name='passport_photo'
            setFieldValue={setFieldValue}
            label='Upload a passport photo'
            touchedField={touched.passport_photo}
            errorMessage={errors.passport_photo}
            fileSize={5}
          />
          {/* <DropzoneFileUpload
            name='work_id'
            setFieldValue={setFieldValue}
            label='Upload your Work ID'
            touchedField={touched.work_id}
            errorMessage={errors.work_id}
            fileSize={5}
          /> */}
          <DropzoneFileUpload
            name='valid_id'
            setFieldValue={setFieldValue}
            label='Upload a Govt Issued ID'
            touchedField={touched.valid_id}
            errorMessage={errors.valid_id}
            fileSize={5}
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

export default DocumentsForm;
