// import { useBankListQuery } from '@/app/services/bank';
import { DropzoneFileUpload, FormInput, FormSelect, NextCancelButton } from '@/components/common';
import { useBVN, useNIN } from '@/utils/hooks';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';
import { VerificationInfoFormValues } from '../types';

interface Props {
  onBack: () => void;
  formik: FormikProps<VerificationInfoFormValues>;
}
const VerificationInfoForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, setFieldValue } = formik;

  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  const bvn = useBVN(values.bvn);
  const nin = useNIN(values.nin);

  // const { data } = useBankListQuery();
  // const banks = data?.data.list;

  const fallbackBanks = [
    {
      id: 1,
      code: '044',
      name: 'Access Bank'
    },
    {
      id: 2,
      code: '023',
      name: 'Citi Bank'
    },
    {
      id: 4,
      code: '050',
      name: 'EcoBank PLC'
    }
  ];

  const bankList = fallbackBanks.map(({ code, name }) => ({ value: code, label: name }));

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            label='NIN'
            name='nin'
            value={nin}
            handleChange={handleChange}
            errorMessage={errors.nin}
            touchedField={touched.nin}
          />
          <FormInput
            label='BVN'
            name='bvn'
            value={bvn}
            handleChange={handleChange}
            errorMessage={errors.bvn}
            touchedField={touched.bvn}
          />
          <FormSelect
            label='Bank name'
            name='bankName'
            id='bank-name'
            value={values.bankName}
            onChange={handleChange}
            errorMessage={errors.bankName}
            touchedField={touched.bankName}
            options={bankList}
          />
          <FormInput
            label='Account number'
            name='accountNumber'
            value={values.accountNumber}
            handleChange={handleChange}
            errorMessage={errors.accountNumber}
            touchedField={touched.accountNumber}
          />
          <FormInput
            disabled
            label='Account name'
            name='accountName'
            value={values.accountName}
            handleChange={handleChange}
            errorMessage={errors.accountName}
            touchedField={touched.accountName}
          />
          <DropzoneFileUpload
            name='utilityBillFile'
            setFieldValue={setFieldValue}
            label='Upload Utility bill'
            labelSubText='(showing your house address)'
            touchedField={touched.utilityBillFile}
            errorMessage={errors.utilityBillFile}
            fileSize={5}
          />
          <DropzoneFileUpload
            name='idFile'
            setFieldValue={setFieldValue}
            label='Upload an ID'
            labelSubText='(Valid and Government Issued ID)'
            touchedField={touched.idFile}
            errorMessage={errors.idFile}
            fileSize={5}
          />{' '}
          <DropzoneFileUpload
            name='passportPhotograph'
            setFieldValue={setFieldValue}
            label='Passport Photograph'
            labelSubText='(Selfie while holding your ID)'
            touchedField={touched.passportPhotograph}
            errorMessage={errors.passportPhotograph}
            fileSize={5}
          />
          <Stack direction='row' spacing={3}>
            <NextCancelButton
              onCancel={props.onBack}
              showCancelBtn={isLargerThan810 ? false : true}
            />
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default VerificationInfoForm;
