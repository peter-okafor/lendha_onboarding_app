import { accountName, useBankListQuery } from '@/app/services/bank';
import { FormInput, FormSelect, NextCancelButton } from '@/components/common';
import { Stack, useMediaQuery } from '@chakra-ui/react';
import { Form, FormikProps, FormikProvider } from 'formik';
import { useCallback, useEffect } from 'react';
import { VerificationInfoFormValues } from '../types';

interface Props {
  onBack: () => void;
  formik: FormikProps<VerificationInfoFormValues>;
}
const VerificationInfoForm = ({ formik, ...props }: Props) => {
  const { values, errors, touched, handleChange, setFieldValue, isSubmitting } = formik;

  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);

  const { data } = useBankListQuery();
  // const banks = data?.data.list
  //   .map(({ code, name }) => ({ value: code, label: name }))
  //   .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));
  const banks = data?.data.list
    .map(({ code, name }) => ({ value: code, label: name }))
    .sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));

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

  const [trigger] = accountName.useLazyQuerySubscription();

  const getAccountName = useCallback(() => {
    trigger({ code: values.bankName, number: values.accountNumber }, true).then((res) => {
      setFieldValue('accountName', res.data?.data.name || '');
      setFieldValue('accountName', res.data?.data.name || '');
    });
  }, [setFieldValue, trigger, values.accountNumber, values.bankName]);

  useEffect(() => {
    if (values.accountNumber.length === 10) {
      getAccountName();
    } else {
      setFieldValue('accountName', '');
    }
  }, [getAccountName, setFieldValue, values.accountNumber.length]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={5}>
          <FormInput
            label='NIN'
            name='nin'
            value={values.nin}
            handleChange={handleChange}
            errorMessage={errors.nin}
            touchedField={touched.nin}
            maxLength={11}
          />
          <FormInput
            label='BVN'
            name='bvn'
            value={values.bvn}
            handleChange={handleChange}
            errorMessage={errors.bvn}
            touchedField={touched.bvn}
            maxLength={11}
          />
          <FormSelect
            label='Bank name'
            name='bankName'
            id='bank-name'
            value={values.bankName}
            onChange={handleChange}
            errorMessage={errors.bankName}
            touchedField={touched.bankName}
            options={banks || bankList}
          />
          <FormInput
            label='Account number'
            name='accountNumber'
            value={values.accountNumber}
            handleChange={handleChange}
            errorMessage={errors.accountNumber}
            touchedField={touched.accountNumber}
            maxLength={10}
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
          <Stack direction='row' spacing={3}>
            <NextCancelButton
              isSubmitting={isSubmitting}
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
